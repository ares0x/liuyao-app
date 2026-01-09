"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { HexagramTable } from "@/components/divination/hexagram-table";
import {
    ArrowLeft,
    Share2,
    Calendar,
    Download,
    AlertCircle,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import { buildHexagram, type YaoValue } from "@/lib/liuyao-core";
import html2canvas from "html2canvas";

export function ReadingDetailClient({ id }: { id: string }) {
    const printRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        const codeString = id;
        if (
            !codeString ||
            codeString.length !== 6 ||
            !/^[6-9]+$/.test(codeString)
        ) {
            setError("无效的卦象代码。请返回首页重新起卦。");
            return;
        }
        const codes = codeString.split("").map(Number) as YaoValue[];

        try {
            // 客户端计算用于渲染
            const result = buildHexagram(codes, "甲");
            setData(result);
        } catch (e) {
            console.error(e);
            setError("排盘计算出错，请检查卦码。");
        }
    }, [id]);

    const handleShareImage = async () => {
        if (!printRef.current || isExporting) return;
        setIsExporting(true);

        try {
            const canvas = await html2canvas(printRef.current, {
                scale: 2,
                backgroundColor: "#F9F9F8",
                useCORS: true,
                ignoreElements: (element) =>
                    element.classList.contains("no-print"),
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `六爻排盘-${data.benGua.name}.png`;
            link.click();
        } catch (err) {
            console.error("生成图片失败", err);
            alert("生成图片失败，请重试");
        } finally {
            setIsExporting(false);
        }
    };

    if (!data && !error)
        return (
            <div className="flex h-screen w-full items-center justify-center text-muted-foreground animate-pulse">
                正在推演天机...
            </div>
        );

    if (error)
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
                <AlertCircle className="h-10 w-10 text-destructive" />
                <p className="text-lg font-medium">{error}</p>
                <Button asChild>
                    <Link href="/">返回首页</Link>
                </Button>
            </div>
        );

    return (
        <div className="min-h-screen bg-background pb-20">
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur px-4 h-14 flex items-center justify-between relative">
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="-ml-2 text-muted-foreground z-10"
                >
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        返回
                    </Link>
                </Button>
                <span className="font-semibold text-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    排盘详情
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleShareImage}
                    disabled={isExporting}
                    className="z-10"
                >
                    <Share2 className="h-4 w-4" />
                </Button>
            </header>

            <main className="container max-w-3xl py-8 space-y-8" ref={printRef}>
                <div className="space-y-4 text-center mb-8">
                    <div className="inline-flex items-center gap-2 text-xs text-muted-foreground border px-3 py-1 rounded-full">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>

                    <div className="space-y-1">
                        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary">
                            {data.benGua.name}
                            {data.bianGua && (
                                <span className="text-muted-foreground font-light mx-3">
                                    之
                                </span>
                            )}
                            {data.bianGua?.name}
                        </h1>
                        <p className="text-muted-foreground text-xs font-mono tracking-widest opacity-50">
                            CODE: {id}
                        </p>
                    </div>
                </div>

                <div className="my-8">
                    <HexagramTable data={data} />
                </div>

                <div className="rounded-lg border bg-muted/20 p-6 space-y-4 text-left">
                    <h4 className="font-bold flex items-center gap-2 text-sm">
                        <Sparkles className="h-4 w-4 text-primary" />
                        AI 辅助解读
                    </h4>
                    <p className="text-sm leading-loose text-muted-foreground text-justify">
                        本卦<strong>{data.benGua.name}</strong>，五行属
                        <strong>{data.benGua.palaceWuxing}</strong>。
                        {data.bianGua ? (
                            <>
                                {" "}
                                卦中有动爻，局势有变。凡测事，动必有因。请重点关注
                                <strong>动爻</strong>
                                （红色标注）及其变出之爻对世爻的生克关系。
                            </>
                        ) : (
                            <>
                                {" "}
                                六爻安静，属于静卦，吉凶成败主要看世爻旺衰以及日月的生克。
                            </>
                        )}
                    </p>
                </div>

                <div className="hidden flex-col items-center justify-center pt-12 opacity-0 space-y-2 print-footer">
                    <div className="h-px w-16 bg-border mb-4" />
                    <div className="text-primary font-heading font-bold tracking-[0.2em]">
                        六爻排盘
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono">
                        six-yao.vercel.app
                    </div>
                </div>
            </main>

            <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-4 no-print pointer-events-none">
                <Button
                    variant="outline"
                    className="gap-2 shadow-lg bg-background pointer-events-auto"
                    onClick={handleShareImage}
                    disabled={isExporting}
                >
                    {isExporting ? (
                        <Sparkles className="h-4 w-4 animate-spin" />
                    ) : (
                        <Download className="h-4 w-4" />
                    )}
                    {isExporting ? "生成中..." : "保存图片"}
                </Button>
            </div>

            <style jsx global>{`
                .print-footer {
                    display: none;
                }
                [data-html2canvas-ignore] {
                    display: none;
                }
            `}</style>
        </div>
    );
}
