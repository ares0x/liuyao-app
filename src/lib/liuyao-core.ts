import {
    TRIGRAMS,
    NAJIA_MAP,
    ZHI_WUXING,
    WUXING_GENERATION,
    WUXING_CONTROL,
    LIU_SHOU_ORDER,
    LIU_SHOU_MAP,
    HEXAGRAM_DATA,
    type WuXing,
    type Gan,
    type Zhi,
    type SixRel,
    type YaoValue,
} from "./constants";

// --- Types ---
export interface FuShenInfo {
    zhi: Zhi;
    wuxing: WuXing;
    liuQin: SixRel;
}

export interface YaoDetail {
    index: number;
    value: YaoValue;
    isMoving: boolean;
    binary: 0 | 1;
    zhi: Zhi;
    wuxing: WuXing;
    liuQin: SixRel;
    liuShou: string;
    isShi: boolean;
    isYing: boolean;
    fuShen?: FuShenInfo;
}

export interface HexagramResult {
    benGua: {
        name: string;
        palace: string;
        palaceWuxing: WuXing;
        lines: YaoDetail[];
    };
    bianGua?: {
        name: string;
        lines: YaoDetail[];
    } | null;
    dayGan: Gan;
}

// --- Helpers ---
function getLiuQin(gongWx: WuXing, lineWx: WuXing): SixRel {
    if (gongWx === lineWx) return "兄弟";
    if (WUXING_GENERATION[lineWx] === gongWx) return "父母";
    if (WUXING_GENERATION[gongWx] === lineWx) return "子孙";
    if (WUXING_CONTROL[lineWx] === gongWx) return "官鬼";
    if (WUXING_CONTROL[gongWx] === lineWx) return "妻财";
    return "兄弟";
}

function getBinaryKey(codes: YaoValue[]): string {
    // Input: Bottom -> Top
    // Logic: 7/9 => 1 (Yang), 6/8 => 0 (Yin)
    const binaryArr = codes.map((c) => (c === 7 || c === 9 ? "1" : "0"));
    // Upper (5,4,3) + Lower (2,1,0)
    const upperKey = binaryArr[5] + binaryArr[4] + binaryArr[3];
    const lowerKey = binaryArr[2] + binaryArr[1] + binaryArr[0];
    return upperKey + lowerKey;
}

// --- Main Logic ---
export function buildHexagram(
    codes: YaoValue[],
    dayGan: Gan = "甲",
): HexagramResult {
    // 1. 解析本卦
    const fullKey = getBinaryKey(codes);
    const guaData = HEXAGRAM_DATA[fullKey];
    if (!guaData) throw new Error(`Invalid Hexagram Key: ${fullKey}`);

    const upperBinary = fullKey.substring(0, 3);
    const lowerBinary = fullKey.substring(3, 6);
    const upperTrigram = TRIGRAMS[upperBinary];
    const lowerTrigram = TRIGRAMS[lowerBinary];

    // 1.1 确定宫位五行
    const palaceName = guaData.palace;
    const palaceTrigramKey = Object.keys(TRIGRAMS).find(
        (k) => TRIGRAMS[k].name === palaceName,
    );
    const palaceWuxing = palaceTrigramKey
        ? TRIGRAMS[palaceTrigramKey].wx
        : "金";

    // 1.2 纳甲基础
    const lowerNajia = NAJIA_MAP[lowerTrigram.name].inner;
    const upperNajia = NAJIA_MAP[upperTrigram.name].outer;
    const allZhi = [...lowerNajia, ...upperNajia];

    const startBeastIdx = LIU_SHOU_MAP[dayGan];
    const shiIndex = guaData.shi;
    const yingIndex = (shiIndex + 3) % 6;

    // 1.3 构建本卦 Lines
    const tempLines = codes.map((code, idx) => {
        const zhi = allZhi[idx];
        const wuxing = ZHI_WUXING[zhi];
        const beastIdx = (startBeastIdx + idx) % 6;
        const isYang = code === 7 || code === 9;

        return {
            index: idx,
            value: code,
            isMoving: code === 6 || code === 9,
            binary: isYang ? 1 : (0 as 0 | 1),
            zhi,
            wuxing,
            liuQin: getLiuQin(palaceWuxing, wuxing),
            liuShou: LIU_SHOU_ORDER[beastIdx],
            isShi: idx === shiIndex,
            isYing: idx === yingIndex,
        };
    });

    // --- 2. 伏神查找 (Fix: 泽风大过 无伏神 Bug) ---

    // A. 统计已存在的六亲 (Set 去重)
    const presentLiuQin = new Set(tempLines.map((l) => l.liuQin));
    const allLiuQin: SixRel[] = ["父母", "兄弟", "官鬼", "妻财", "子孙"];
    // B. 找出缺失的六亲
    const missingLiuQin = allLiuQin.filter((lq) => !presentLiuQin.has(lq));

    const finalLines = [...tempLines];

    // C. 只有当缺失时才去本宫找
    if (missingLiuQin.length > 0) {
        // 获取本宫卦纳甲 (上卦=宫名, 下卦=宫名)
        const baseInner = NAJIA_MAP[palaceName]?.inner || [];
        const baseOuter = NAJIA_MAP[palaceName]?.outer || [];
        const baseZhis = [...baseInner, ...baseOuter];

        if (baseZhis.length === 6) {
            baseZhis.forEach((zhi, idx) => {
                const wx = ZHI_WUXING[zhi];
                // 本宫卦的六亲，必须基于【本宫五行】计算
                const lq = getLiuQin(palaceWuxing, wx);

                // 如果这个六亲是缺失列表里的
                if (missingLiuQin.includes(lq)) {
                    // 借入伏神 (挂载到相同索引位置)
                    finalLines[idx].fuShen = {
                        zhi: zhi,
                        wuxing: wx,
                        liuQin: lq,
                    };
                }
            });
        }
    }

    // --- 3. 变卦逻辑 (Fix: 阴阳画反 Bug) ---
    let bianGuaResult = null;
    const hasMoving = codes.some((c) => c === 6 || c === 9);

    if (hasMoving) {
        // 3.1 生成变卦代码
        const changedCodes = codes.map((c) => {
            if (c === 6) return 7; // 老阴 -> 少阳
            if (c === 9) return 8; // 老阳 -> 少阴
            return c;
        });

        const changedKey = getBinaryKey(changedCodes);
        const changedGuaData = HEXAGRAM_DATA[changedKey];

        if (changedGuaData) {
            const cUpperBin = changedKey.substring(0, 3);
            const cLowerBin = changedKey.substring(3, 6);
            const cUpperTri = TRIGRAMS[cUpperBin];
            const cLowerTri = TRIGRAMS[cLowerBin];

            const cLowerNajia = NAJIA_MAP[cLowerTri.name].inner;
            const cUpperNajia = NAJIA_MAP[cUpperTri.name].outer;
            const cAllZhi = [...cLowerNajia, ...cUpperNajia];

            const bianGuaLines = changedCodes.map((code, idx) => {
                const zhi = cAllZhi[idx];
                const wuxing = ZHI_WUXING[zhi];

                // 关键 Fix: 显式计算 binary
                // code 此时只有 7(阳) 或 8(阴)
                // 7 => 1 (实线), 8 => 0 (虚线)
                const isYang = code === 7 || code === 9;

                return {
                    index: idx,
                    value: code,
                    isMoving: false,
                    binary: isYang ? 1 : (0 as 0 | 1),
                    zhi,
                    wuxing,
                    liuQin: getLiuQin(palaceWuxing, wuxing), // 变卦六亲对比本卦宫位
                    liuShou: "",
                    isShi: false,
                    isYing: false,
                };
            });

            bianGuaResult = {
                name: changedGuaData.name,
                lines: bianGuaLines,
            };
        }
    }

    return {
        benGua: {
            name: guaData.name,
            palace: guaData.palace,
            palaceWuxing,
            lines: finalLines,
        },
        bianGua: bianGuaResult,
        dayGan,
    };
}
