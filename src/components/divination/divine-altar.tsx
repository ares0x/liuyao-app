"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
    Loader2,
    RefreshCw,
    Hand,
    Clock,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import {
    generateRandomHexagram,
    generateTimeHexagram,
    tossCoins,
    type YaoValue,
} from "@/lib/liuyao-engine";

// --- YaoLine 组件保持不变 ---
function YaoLine({ value, animate }: { value: YaoValue; animate?: boolean }) {
    const isYang = value === 7 || value === 9;
    const isMoving = value === 6 || value === 9;

    return (
        <div
            className={cn(
                "flex items-center gap-4 h-12 w-full transition-all duration-700",
                animate && "animate-in slide-in-from-bottom-4 fade-in",
            )}
        >
            <div className="flex-1 flex items-center justify-center gap-4">
                {isYang ? (
                    <div
                        className={cn(
                            "h-6 w-full rounded bg-primary shadow-sm ring-1 ring-primary/20",
                            isMoving && "ring-destructive/30",
                        )}
                    />
                ) : (
                    <div className="flex w-full gap-6">
                        <div
                            className={cn(
                                "h-6 w-1/2 rounded bg-primary shadow-sm ring-1 ring-primary/20",
                                isMoving && "ring-destructive/30",
                            )}
                        />
                        <div
                            className={cn(
                                "h-6 w-1/2 rounded bg-primary shadow-sm ring-1 ring-primary/20",
                                isMoving && "ring-destructive/30",
                            )}
                        />
                    </div>
                )}
            </div>
            <div className="w-10 flex justify-center">
                {isMoving && (
                    <div
                        className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full text-base font-black shadow-sm transition-all",
                            isYang
                                ? "bg-destructive/10 text-destructive ring-1 ring-destructive/20"
                                : "bg-destructive text-destructive-foreground ring-1 ring-destructive",
                        )}
                    >
                        {isYang ? "O" : "X"}
                    </div>
                )}
            </div>
        </div>
    );
}

export function DivineAltar() {
    const router = useRouter();
    const [lines, setLines] = useState<YaoValue[]>([]);
    const [isCasting, setIsCasting] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [activeTab, setActiveTab] = useState("manual");
    const [currentStep, setCurrentStep] = useState(0);

    const handleRandomCast = () => {
        setIsCasting(true);
        setTimeout(() => {
            setLines(generateRandomHexagram());
            setIsCasting(false);
        }, 600);
    };

    const handleTimeCast = () => {
        setIsCasting(true);
        setTimeout(() => {
            setLines(generateTimeHexagram(new Date()));
            setIsCasting(false);
        }, 600);
    };

    const handleManualToss = () => {
        if (currentStep >= 6) return;
        setIsCasting(true);
        setTimeout(() => {
            setLines((prev) => [...prev, tossCoins()]);
            setCurrentStep((prev) => prev + 1);
            setIsCasting(false);
        }, 400);
    };

    const resetDivination = () => {
        setLines([]);
        setCurrentStep(0);
        setIsRedirecting(false);
    };

    const isComplete = lines.length === 6;

    const handleViewDetails = () => {
        if (!isComplete) return;
        setIsRedirecting(true);
        setTimeout(() => {
            const codeString = lines.join("");
            router.push(`/readings/${codeString}`);
        }, 800);
    };

    return (
        <Card className="border-muted shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <div className="grid md:grid-cols-[1fr_360px] min-h-[500px]">
                {/* LEFT: Controls */}
                <div className="p-6 md:p-8 flex flex-col border-b md:border-b-0 md:border-r border-border/50">
                    <Tabs
                        value={activeTab}
                        onValueChange={(v) => {
                            setActiveTab(v);
                            resetDivination();
                        }}
                        className="w-full h-full flex flex-col"
                    >
                        <TabsList className="grid w-full grid-cols-3 mb-8">
                            <TabsTrigger value="manual">手动摇卦</TabsTrigger>
                            <TabsTrigger value="random">电脑随机</TabsTrigger>
                            <TabsTrigger value="time">时间起卦</TabsTrigger>
                        </TabsList>

                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                            {activeTab === "manual" && (
                                <>
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full" />
                                        <Hand className="relative h-16 w-16 text-primary/80" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold font-heading">
                                            {isComplete
                                                ? "卦象已成"
                                                : `第 ${currentStep + 1} 爻`}
                                        </h3>
                                        <p className="text-muted-foreground max-w-xs mx-auto">
                                            {isComplete
                                                ? "请点击下方按钮进行排盘分析。"
                                                : "请心中默念所测之事，点击按钮模拟掷币。"}
                                        </p>
                                    </div>
                                    {!isComplete ? (
                                        <Button
                                            size="lg"
                                            onClick={handleManualToss}
                                            disabled={isCasting}
                                            className="w-full max-w-[200px] text-lg h-12"
                                        >
                                            {isCasting ? (
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            ) : (
                                                "掷 币"
                                            )}
                                        </Button>
                                    ) : (
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            onClick={resetDivination}
                                        >
                                            重新起卦
                                        </Button>
                                    )}
                                </>
                            )}

                            {activeTab === "random" && (
                                <>
                                    <RefreshCw className="h-16 w-16 text-primary/80" />
                                    <p className="text-muted-foreground">
                                        数由心生，随机即天意。
                                    </p>
                                    <Button
                                        size="lg"
                                        onClick={handleRandomCast}
                                        disabled={lines.length > 0}
                                        className="w-full max-w-[200px]"
                                    >
                                        {lines.length > 0
                                            ? "已生成"
                                            : "自动起卦"}
                                    </Button>
                                    {lines.length > 0 && (
                                        <Button
                                            variant="ghost"
                                            onClick={resetDivination}
                                        >
                                            重置
                                        </Button>
                                    )}
                                </>
                            )}

                            {activeTab === "time" && (
                                <>
                                    <Clock className="h-16 w-16 text-primary/80" />
                                    <p className="text-muted-foreground">
                                        以当前时空坐标（真太阳时）起卦。
                                    </p>
                                    <Button
                                        size="lg"
                                        onClick={handleTimeCast}
                                        disabled={lines.length > 0}
                                        className="w-full max-w-[200px]"
                                    >
                                        当前时间起卦
                                    </Button>
                                    {lines.length > 0 && (
                                        <Button
                                            variant="ghost"
                                            onClick={resetDivination}
                                        >
                                            重置
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    </Tabs>
                </div>

                {/* RIGHT: Display (修复部分) */}
                {/* 1. 移除 relative */}
                <div className="p-6 md:p-8 bg-muted/10 flex flex-col h-full">
                    {/* 2. 中间显示区：使用 flex-1 占据剩余空间，py-4 减少上下间距 */}
                    <div className="flex-1 flex flex-col-reverse justify-center gap-3 sm:gap-4 py-4 min-h-[300px]">
                        {Array.from({ length: 6 }).map((_, i) => {
                            const lineData = lines[i];
                            return lineData ? (
                                <YaoLine
                                    key={i}
                                    value={lineData}
                                    animate={true}
                                />
                            ) : (
                                <div
                                    key={i}
                                    className="h-12 w-full flex items-center gap-4 opacity-50"
                                >
                                    <div className="h-6 w-full rounded border-2 border-dashed border-muted-foreground/20" />
                                    <div className="w-10" />
                                </div>
                            );
                        })}
                    </div>

                    {/* 3. 按钮区域：不再使用 absolute，而是普通的文档流 */}
                    {/* mt-auto 确保它尽量靠下，pt-4 增加与上方线条的间距 */}
                    <div className="mt-auto pt-4 h-14">
                        {isComplete && (
                            <div className="animate-in fade-in zoom-in duration-300">
                                <Button
                                    className="w-full h-12 text-lg font-bold shadow-lg"
                                    variant="destructive"
                                    onClick={handleViewDetails}
                                    disabled={isRedirecting}
                                >
                                    {isRedirecting ? (
                                        <>
                                            <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                                            正在推演天机...
                                        </>
                                    ) : (
                                        <>
                                            查看排盘详解{" "}
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
