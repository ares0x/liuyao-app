// import { Metadata } from "next";
import { ReadingDetailClient } from "@/components/readings/reading-detail-client";
import { buildHexagram, type YaoValue } from "@/lib/liuyao-core";

type Props = {
    params: Promise<{ id: string }>;
};

// 1. 动态生成 SEO 元数据 (TDK)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;

    // 简单的校验
    if (!id || id.length !== 6 || !/^[6-9]+$/.test(id)) {
        return { title: "排盘错误 - 六爻在线排盘" };
    }

    try {
        const codes = id.split("").map(Number) as YaoValue[];
        // 服务端计算，为了获取卦名
        const result = buildHexagram(codes, "甲");

        const benGuaName = result.benGua.name;
        const bianGuaName = result.bianGua ? `之${result.bianGua.name}` : "";
        const palace = result.benGua.palace;
        const wuxing = result.benGua.palaceWuxing;

        // 专业的 SEO 文案
        return {
            title: `${benGuaName}${bianGuaName} - 六爻排盘详解 | 在线周易占卜`,
            description: `为您排出的卦象是${benGuaName}（${palace}宫属${wuxing}）。六爻在线排盘工具，融合传统算法与真太阳时，提供精准的周易占卜服务。`,
            keywords: [
                "六爻",
                "在线排盘",
                "周易",
                benGuaName,
                bianGuaName || "静卦",
                "免费算命",
                "纳甲",
            ],
            openGraph: {
                title: `${benGuaName}${bianGuaName} - 您的排盘结果`,
                description: `数由心生，决断于行。点击查看${benGuaName}的完整卦象分析。`,
                type: "article",
            },
        };
    } catch (e) {
        return { title: "六爻在线排盘 - 详解结果" };
    }
}

// 2. 页面入口 (Server Component)
export default async function ReadingPage({ params }: Props) {
    // 解包 params
    const { id } = await params;

    // 直接引入客户端组件，负责 UI 渲染
    return <ReadingDetailClient id={id} />;
}
