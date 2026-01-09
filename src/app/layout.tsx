import "./globals.css";
// ... 其他 imports
import { SiteHeader } from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer"; // 引入 Footer
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh-CN">
            <body className="min-h-screen flex flex-col bg-background font-sans antialiased">
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <SiteFooter /> {/* 放在这里 */}
            </body>
            <GoogleAnalytics gaId="G-H73ZSVQQ26" />
        </html>
    );
}
