import Link from "next/link";
import { Sparkles } from "lucide-react";

export function SiteFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-10 pb-16 md:pb-10 mt-auto print:hidden">
            {/* 1. pt-10 pb-16 md:pb-10:
            增加了底部内边距，特别是移动端(pb-16)，防止被手机底部的Home条或Vercel按钮遮挡
      */}

            <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-8 text-center md:text-left">
                {/* max-w-6xl: 限制最大宽度，防止在大屏幕上太散 */}

                {/* --- 左侧区域：品牌 & 核心导航 --- */}
                <div className="flex flex-col gap-6 items-center md:items-start flex-1">
                    {/* 品牌标识 */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 justify-center md:justify-start text-foreground">
                            <Sparkles className="h-5 w-5 text-primary" />
                            <span className="font-heading font-bold text-lg tracking-tight">
                                六爻在线排盘
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                            数由心生，诚心求测。
                            <br className="hidden md:block" />
                            融合《增删卜易》古法与现代天文算法，提供严谨的周易排盘服务。
                        </p>
                    </div>

                    {/* 导航链接 (移到了左侧品牌下方，逻辑更顺畅) */}
                    <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground/80">
                        <Link
                            href="/"
                            className="hover:text-primary transition-colors"
                        >
                            首页
                        </Link>
                        <Link
                            href="/dict"
                            className="hover:text-primary transition-colors"
                        >
                            六十四卦字典
                        </Link>
                        <span className="text-border">|</span>
                        <Link
                            href="/about"
                            className="opacity-50 hover:text-foreground transition-colors"
                            title="暂未开放"
                        >
                            关于我们
                        </Link>
                    </nav>
                </div>

                {/* --- 右侧区域：合规 & 版权 --- */}
                <div className="flex flex-col gap-4 items-center md:items-end flex-1">
                    {/* 免责声明 */}
                    <div className="bg-muted/30 p-3 rounded-lg border border-border/50 max-w-md text-left">
                        <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
                            <span className="font-bold text-muted-foreground">
                                免责声明：
                            </span>
                            测试结果仅供民俗文化研究与娱乐参考，不应作为医疗、法律、投资等重大决策的依据。命运掌握在自己手中，请相信科学，理性生活。
                        </p>
                    </div>

                    {/* 版权行 */}
                    <div className="flex flex-col md:flex-row items-center gap-2 text-[10px] text-muted-foreground/40 font-mono mt-auto">
                        <span>© {currentYear} Six Yao Divination.</span>
                        <span className="hidden md:inline">·</span>
                        <span>All rights reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
