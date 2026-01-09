import { MetadataRoute } from "next";
import { HEXAGRAM_DATA } from "@/lib/constants";

// 请替换为你的真实域名
const BASE_URL = "https://six-yao.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
    // 1. 静态页面
    const staticPages = [
        {
            url: `${BASE_URL}`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 1,
        },
        {
            url: `${BASE_URL}/dict`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.5,
        },
    ];

    // 2. 动态生成的 64 卦页面
    const hexagramPages = Object.keys(HEXAGRAM_DATA).map((key) => ({
        url: `${BASE_URL}/dict/${key}`,
        lastModified: new Date(), // 实际上如果是静态内容，可以写死一个日期
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...hexagramPages];
}
