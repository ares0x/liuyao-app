// lib/liuyao-engine.ts

export type YaoValue = 6 | 7 | 8 | 9; // 6=Old Yin, 7=Young Yang, 8=Young Yin, 9=Old Yang
export type CastingMethod = "random" | "time" | "manual";

export interface DivinationResult {
    lines: YaoValue[]; // Index 0 is bottom line (Chu Yao), Index 5 is top line (Shang Yao)
    timestamp: Date;
    method: CastingMethod;
}

/**
 * Probability model for 3 coins:
 * 1 Head (Yang), 2 Tails (Yin) -> Young Yang (7) - Prob: 3/8
 * 2 Heads (Yang), 1 Tail (Yin) -> Young Yin (8) - Prob: 3/8
 * 3 Heads (Yang) -> Old Yang (9) - Prob: 1/8
 * 3 Tails (Yin) -> Old Yin (6) - Prob: 1/8
 */
export function tossCoins(): YaoValue {
    // Simulate 3 coins: 0 = Tail (Yin = 2), 1 = Head (Yang = 3)
    // Sum: 6 (Old Yin), 7 (Young Yang), 8 (Young Yin), 9 (Old Yang)
    const coin1 = Math.random() < 0.5 ? 2 : 3;
    const coin2 = Math.random() < 0.5 ? 2 : 3;
    const coin3 = Math.random() < 0.5 ? 2 : 3;
    return (coin1 + coin2 + coin3) as YaoValue;
}

/**
 * Method 1: Random (Computer Generated)
 * Generates a full hexagram instantly using coin probabilities.
 */
export function generateRandomHexagram(): YaoValue[] {
    return Array.from({ length: 6 }, () => tossCoins());
}

/**
 * Method 2: Time Based (Mei Hua Yi Shu style simplified for Liu Yao)
 * Uses (Year+Month+Day)%8 for Upper, (+Hour)%8 for Lower, (+Hour)%6 for Moving.
 * Note: This returns a specific specific set of moving lines based on remainder.
 * For true Liu Yao consistency, we often map this to specific YaoValues.
 * HERE: We simulate the result as YaoValues for consistency with the system.
 */
export function generateTimeHexagram(date: Date = new Date()): YaoValue[] {
    // Simplified logic for demo: seeded random based on time to ensure consistency for same minute
    // In production, implement full Lunar Calendar conversion here.
    const seed =
        date.getFullYear() +
        date.getMonth() +
        date.getDate() +
        date.getHours() +
        date.getMinutes();
    const pseudoRandom = (input: number) => {
        const x = Math.sin(input) * 10000;
        return x - Math.floor(x);
    };

    return Array.from({ length: 6 }, (_, i) => {
        const r = pseudoRandom(seed + i);
        if (r < 0.125) return 6;
        if (r < 0.5) return 7;
        if (r < 0.875) return 8;
        return 9;
    });
}
