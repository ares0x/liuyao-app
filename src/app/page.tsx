"use client";

import { DivineAltar } from "@/components/divination/divine-altar";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowUp } from "lucide-react";

export default function HomePage() {
    // 简单的滚动到顶部函数
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="flex flex-col items-center">
            {/* SECTION 1: The Altar (Utility First) */}
            <section className="w-full bg-gradient-to-b from-background to-muted/20 pb-12 pt-8 md:pt-12">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center text-center mb-8 space-y-4">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                            <Sparkles className="mr-1 h-3 w-3" />
                            在线六爻排盘 v1.0
                        </div>
                        <h1 className="text-3xl font-heading font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            问道于心，决断于行
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                            融合传统易理与现代算法，为您提供三种精准起卦方式。
                        </p>
                    </div>

                    {/* THE TOOL ITSELF */}
                    <div className="mx-auto max-w-4xl">
                        <DivineAltar />
                    </div>
                </div>
            </section>

            {/* SECTION 2: Explainer & Footer Content */}
            <section className="container py-12 md:py-24 lg:py-32">
                <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
                    {/* 左侧：文案介绍 */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                            为什么要使用在线排盘？
                        </h2>
                        <p className="text-muted-foreground">
                            传统摇卦讲究繁琐，而数字化排盘不仅保留了随机性的数理逻辑，更通过天文算法自动修正真太阳时，排除了人工查表的失误。
                        </p>
                        <ul className="grid gap-3 text-sm text-muted-foreground mt-4">
                            <li className="flex items-center">
                                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>支持手动摇卦模拟（物理引擎）</span>
                            </li>
                            <li className="flex items-center">
                                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>时间起卦自动换算真太阳时</span>
                            </li>
                            <li className="flex items-center">
                                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>排盘结果URL即存储，方便分享</span>
                            </li>
                        </ul>
                    </div>

                    {/* 右侧：改造为“易经智慧”卡片 */}
                    <div className="flex flex-col justify-center space-y-4 rounded-xl border bg-card p-6 shadow-sm">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="font-serif font-bold">
                                        易
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg">易经智慧</h3>
                            </div>

                            <blockquote className="border-l-2 pl-4 italic text-muted-foreground">
                                &quot;天行健，君子以自强不息；地势坤，君子以厚德载物。&quot;
                            </blockquote>

                            <p className="text-sm text-muted-foreground">
                                卜筮之道，在于决疑。心诚则灵，不诚不占。建议每日仅针对一事起卦，切勿反复占问。
                            </p>

                            <div className="pt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={scrollToTop}
                                    className="w-full"
                                >
                                    返回顶部起卦{" "}
                                    <ArrowUp className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
