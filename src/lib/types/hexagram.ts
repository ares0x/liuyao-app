export interface HexagramData {
    name: string;
    palace: string; // 宫位
    shi: number; // 世爻位置
    nature: string; // 卦象性质 (如：上上卦)
    guaci: string; // 卦辞
    xiangci: string; // 象辞
    explanation: string; // Markdown 格式的详细解释
}

// 这是一个 Lookup Table 的类型定义
export type HexagramMap = Record<string, HexagramData>;
