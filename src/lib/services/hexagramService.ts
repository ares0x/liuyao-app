// src/lib/services/hexagramService.ts
import { HEXAGRAM_DATA } from "@/lib/cons"; // 原始数据
import type { HexagramData } from "@/lib/types/hexagram";

/**
 * 核心：Key 生成逻辑
 * 将六爻数组 (如 [1,1,1,0,0,0]) 转换为存储用的 Key ("111000")
 * 确保这是唯一能生成 Key 的地方，避免逻辑分散。
 */
export const generateHexagramKey = (lines: number[]): string => {
    if (!lines || lines.length !== 6) {
        console.error("Invalid lines input:", lines);
        return "000000"; // Fallback key
    }
    // 注意：确认您的数据 Key 是从下到上还是从上到下。
    // 假设您的数据 Key 是按数组顺序 join 的。
    return lines.join("");
};

/**
 * 获取卦象数据的纯函数
 */
export const getHexagram = (lines: number[] | string): HexagramData | null => {
    let key = "";

    if (Array.isArray(lines)) {
        key = generateHexagramKey(lines);
    } else if (typeof lines === "string") {
        key = lines;
    }

    const data = HEXAGRAM_DATA[key as keyof typeof HEXAGRAM_DATA];

    if (!data) {
        console.warn(`Hexagram not found for key: ${key}`);
        return null;
    }

    return data;
};

/**
 * 辅助函数：解析 Markdown 里的结构（可选）
 * 如果您想在 Service 层就把 Markdown 里的“【白话解释】”等标题拆分开
 * 可以在这里做正则处理，返回一个结构化的对象而不是纯字符串。
 */
export const getStructuredExplanation = (lines: number[]) => {
    const data = getHexagram(lines);
    if (!data) return null;

    // 简单的示例：分离出各个板块
    // 实际项目中可以使用更严谨的 Regex
    return {
        ...data,
        sections: {
            whiteTalk: extractSection(data.explanation, "【白话解释】"),
            fateVerse: extractSection(data.explanation, "【运势偈语】"),
            // ... 其他部分
        },
    };
};

// 私有辅助函数
function extractSection(text: string, title: string): string {
    // 实现简单的文本截取逻辑
    const parts = text.split(title);
    if (parts.length > 1) {
        return parts[1].split("**【")[0].trim(); // 取到下一个标题前
    }
    return "";
}
