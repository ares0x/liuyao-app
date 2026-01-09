// src/hooks/useHexagram.ts
import { useMemo } from "react";
import { getHexagram } from "@/lib/services/hexagramService";

export const useHexagram = (lines: number[]) => {
    // 使用 useMemo 缓存结果，避免每次渲染都重新查询大对象
    // 虽然 Object lookup 很快，但在 React 中保持引用稳定是好习惯
    const hexagramData = useMemo(() => {
        return getHexagram(lines);
    }, [lines]); // 只有当 lines 变化时才重新获取

    return {
        data: hexagramData,
        isLoading: false, // 为未来 API 化做准备
        error: hexagramData ? null : "卦象数据未找到",
    };
};
