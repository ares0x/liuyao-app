// src/lib/constants.ts

export type WuXing = "金" | "木" | "水" | "火" | "土";
export type Gan =
    | "甲"
    | "乙"
    | "丙"
    | "丁"
    | "戊"
    | "己"
    | "庚"
    | "辛"
    | "壬"
    | "癸";
export type Zhi =
    | "子"
    | "丑"
    | "寅"
    | "卯"
    | "辰"
    | "巳"
    | "午"
    | "未"
    | "申"
    | "酉"
    | "戌"
    | "亥";
export type SixRel = "父母" | "兄弟" | "官鬼" | "妻财" | "子孙";

export const WUXING_GENERATION: Record<WuXing, WuXing> = {
    金: "水",
    水: "木",
    木: "火",
    火: "土",
    土: "金",
};
export const WUXING_CONTROL: Record<WuXing, WuXing> = {
    金: "木",
    木: "土",
    土: "水",
    水: "火",
    火: "金",
};

export const ZHI_WUXING: Record<Zhi, WuXing> = {
    子: "水",
    亥: "水",
    寅: "木",
    卯: "木",
    巳: "火",
    午: "火",
    申: "金",
    酉: "金",
    辰: "土",
    戌: "土",
    丑: "土",
    未: "土",
};

// 八卦基础属性 (Key: Top->Bottom, e.g. 100=艮)
// 1=Yang, 0=Yin
export const TRIGRAMS: Record<string, { name: string; wx: WuXing }> = {
    "111": { name: "乾", wx: "金" },
    "011": { name: "兑", wx: "金" },
    "101": { name: "离", wx: "火" },
    "001": { name: "震", wx: "木" },
    "110": { name: "巽", wx: "木" },
    "010": { name: "坎", wx: "水" },
    "100": { name: "艮", wx: "土" },
    "000": { name: "坤", wx: "土" },
};

// 纳甲表：内卦纳支(inner)，外卦纳支(outer)
// 顺序：初->三 (内), 四->六 (外)
export const NAJIA_MAP: Record<string, { inner: Zhi[]; outer: Zhi[] }> = {
    乾: { inner: ["子", "寅", "辰"], outer: ["午", "申", "戌"] },
    坤: { inner: ["未", "巳", "卯"], outer: ["丑", "亥", "酉"] },
    震: { inner: ["子", "寅", "辰"], outer: ["午", "申", "戌"] },
    巽: { inner: ["丑", "亥", "酉"], outer: ["未", "巳", "卯"] },
    坎: { inner: ["寅", "辰", "午"], outer: ["申", "戌", "子"] },
    离: { inner: ["卯", "丑", "亥"], outer: ["酉", "未", "巳"] },
    艮: { inner: ["辰", "午", "申"], outer: ["戌", "子", "寅"] },
    兑: { inner: ["巳", "卯", "丑"], outer: ["亥", "酉", "未"] },
};

export const LIU_SHOU_ORDER = ["青龙", "朱雀", "勾陈", "螣蛇", "白虎", "玄武"];
export const LIU_SHOU_MAP: Record<Gan, number> = {
    甲: 0,
    乙: 0,
    丙: 1,
    丁: 1,
    戊: 2,
    己: 3,
    庚: 4,
    辛: 4,
    壬: 5,
    癸: 5,
};

// 64卦全映射表 (Corrected & Verified)
// Key: Upper(3bit) + Lower(3bit)
export const HEXAGRAM_DATA: Record<
    string,
    { name: string; palace: string; shi: number }
> = {
    // --- 乾宫 (Metal) ---
    "111111": { name: "乾为天", palace: "乾", shi: 5 },
    "111110": { name: "天风姤", palace: "乾", shi: 0 },
    "111100": { name: "天山遁", palace: "乾", shi: 1 },
    "111000": { name: "天地否", palace: "乾", shi: 2 },
    "110000": { name: "风地观", palace: "乾", shi: 3 },
    "100000": { name: "山地剥", palace: "乾", shi: 4 },
    "101000": { name: "火地晋", palace: "乾", shi: 3 }, // 游魂
    "101111": { name: "火天大有", palace: "乾", shi: 2 }, // 归魂

    // --- 兑宫 (Metal) ---
    "011011": { name: "兑为泽", palace: "兑", shi: 5 },
    "011010": { name: "泽水困", palace: "兑", shi: 0 },
    "011000": { name: "泽地萃", palace: "兑", shi: 1 },
    "011100": { name: "泽山咸", palace: "兑", shi: 2 }, // Fixed Key: 011 + 100
    "010100": { name: "水山蹇", palace: "兑", shi: 3 }, // Fixed Key: 010 + 100
    "000100": { name: "地山谦", palace: "兑", shi: 4 }, // Fixed Key: 000 + 100
    "001100": { name: "雷山小过", palace: "兑", shi: 3 }, // Fixed Key: 001 + 100 (Your Error Was Here)
    "001011": { name: "雷泽归妹", palace: "兑", shi: 2 },

    // --- 离宫 (Fire) ---
    "101101": { name: "离为火", palace: "离", shi: 5 },
    "101100": { name: "火山旅", palace: "离", shi: 0 },
    "101110": { name: "火风鼎", palace: "离", shi: 1 },
    "101010": { name: "火水未济", palace: "离", shi: 2 },
    "100010": { name: "山水蒙", palace: "离", shi: 3 },
    "110010": { name: "风水涣", palace: "离", shi: 4 },
    "111010": { name: "天水讼", palace: "离", shi: 3 }, // 游魂
    "111101": { name: "天火同人", palace: "离", shi: 2 }, // 归魂

    // --- 震宫 (Wood) ---
    "001001": { name: "震为雷", palace: "震", shi: 5 },
    "001000": { name: "雷地豫", palace: "震", shi: 0 },
    "001010": { name: "雷水解", palace: "震", shi: 1 },
    "001110": { name: "雷风恒", palace: "震", shi: 2 },
    "000110": { name: "地风升", palace: "震", shi: 3 },
    "010110": { name: "水风井", palace: "震", shi: 4 },
    "011110": { name: "泽风大过", palace: "震", shi: 3 }, // 游魂
    "011001": { name: "泽雷随", palace: "震", shi: 2 }, // 归魂

    // --- 巽宫 (Wood) ---
    "110110": { name: "巽为风", palace: "巽", shi: 5 },
    "110111": { name: "风天小畜", palace: "巽", shi: 0 },
    "110101": { name: "风火家人", palace: "巽", shi: 1 },
    "110001": { name: "风雷益", palace: "巽", shi: 2 },
    "111001": { name: "天雷无妄", palace: "巽", shi: 3 },
    "101001": { name: "火雷噬嗑", palace: "巽", shi: 4 },
    "100001": { name: "山雷颐", palace: "巽", shi: 3 }, // 游魂
    "100110": { name: "山风蛊", palace: "巽", shi: 2 }, // 归魂

    // --- 坎宫 (Water) ---
    "010010": { name: "坎为水", palace: "坎", shi: 5 },
    "010011": { name: "水泽节", palace: "坎", shi: 0 },
    "010001": { name: "水雷屯", palace: "坎", shi: 1 },
    "010101": { name: "水火既济", palace: "坎", shi: 2 },
    "011101": { name: "泽火革", palace: "坎", shi: 3 },
    "001101": { name: "雷火丰", palace: "坎", shi: 4 },
    "000101": { name: "地火明夷", palace: "坎", shi: 3 }, // 游魂
    "000010": { name: "地水师", palace: "坎", shi: 2 }, // 归魂

    // --- 艮宫 (Earth) ---
    "100100": { name: "艮为山", palace: "艮", shi: 5 },
    "100101": { name: "山火贲", palace: "艮", shi: 0 },
    "100111": { name: "山天大畜", palace: "艮", shi: 1 },
    "100011": { name: "山泽损", palace: "艮", shi: 2 },
    "101011": { name: "火泽睽", palace: "艮", shi: 3 },
    "111011": { name: "天泽履", palace: "艮", shi: 4 },
    "110011": { name: "风泽中孚", palace: "艮", shi: 3 }, // 游魂
    "110100": { name: "风山渐", palace: "艮", shi: 2 }, // 归魂

    // --- 坤宫 (Earth) ---
    "000000": { name: "坤为地", palace: "坤", shi: 5 },
    "000001": { name: "地雷复", palace: "坤", shi: 0 },
    "000011": { name: "地泽临", palace: "坤", shi: 1 },
    "000111": { name: "地天泰", palace: "坤", shi: 2 },
    "001111": { name: "雷天大壮", palace: "坤", shi: 3 },
    "011111": { name: "泽天夬", palace: "坤", shi: 4 },
    "010111": { name: "水天需", palace: "坤", shi: 3 }, // 游魂
    "010000": { name: "水地比", palace: "坤", shi: 2 }, // 归魂
};
