import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/private/", "/admin/"], // 举例
        },
        sitemap: "https://six-yao.vercel.app/sitemap.xml", // 替换为真实域名
    };
}
