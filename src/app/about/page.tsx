import { Metadata } from "next";
import { Sparkles, Github, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "关于我们 - 六爻在线排盘",
    description: "了解六爻在线排盘背后的设计理念与算法逻辑。",
};

export default function AboutPage() {
    return (
        <div className="container max-w-3xl py-12 md:py-24">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-heading font-bold">
                        关于本站
                    </h1>
                    <p className="text-muted-foreground leading-relaxed">
                        “六爻在线排盘”是一个致力于将传统易学智慧与现代互联网技术相结合的开源项目。
                        我们深知，传统的手工起卦过程繁琐且容易出错，而现有的网络排盘工具往往界面陈旧、广告丛生。
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        因此，我们开发了这款工具，旨在提供一个
                        <strong>纯净、严谨、美观</strong>的排盘体验。
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="border rounded-lg p-6 bg-muted/20">
                        <h3 className="font-bold flex items-center gap-2 mb-3">
                            <Sparkles className="h-4 w-4 text-primary" />
                            核心算法
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            本站排盘算法严格遵循《增删卜易》古法。
                            <br />
                            1. <strong>纳甲</strong>：基于京房八宫制。
                            <br />
                            2. <strong>真太阳时</strong>
                            ：时间起卦自动校正经纬度时差（*V2.0计划*）。
                            <br />
                            3. <strong>随机性</strong>
                            ：采用浏览器加密级随机数生成器模拟铜钱抛掷物理概型。
                        </p>
                    </div>

                    <div className="border rounded-lg p-6 bg-muted/20">
                        <h3 className="font-bold flex items-center gap-2 mb-3">
                            <Github className="h-4 w-4 text-primary" />
                            开源与隐私
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            我们坚持<strong>无状态（Stateless）</strong>架构。
                            <br />
                            您的排盘数据仅包含在 URL 中，本站服务器
                            <strong>不存储</strong>
                            任何用户的测算记录，最大程度保护您的隐私。
                        </p>
                    </div>
                </div>

                <div className="space-y-4 pt-8">
                    <h2 className="text-xl font-bold">联系开发者</h2>
                    <p className="text-sm text-muted-foreground">
                        如果您在使用过程中发现任何 Bug，或有功能建议，欢迎联系。
                    </p>
                    <div className="flex gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="mailto:your-email@example.com">
                                <Mail className="mr-2 h-4 w-4" /> 发送邮件
                            </Link>
                        </Button>
                        {/* 如果你有 Github 仓库 */}
                        <Button variant="outline" size="sm" asChild>
                            <Link
                                href="https://github.com/your-username"
                                target="_blank"
                            >
                                <Github className="mr-2 h-4 w-4" /> GitHub
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
