"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, ChevronRight, Calendar, Search } from "lucide-react";
import Link from "next/link";

// 模拟的数据结构 - 后续会从 LocalStorage 读取
type HistoryItem = {
    id: string;
    question: string;
    date: string;
    hexagramName: string; // e.g. "火水未济"
    type: "manual" | "time" | "random";
};

const MOCK_HISTORY: HistoryItem[] = [
    {
        id: "1",
        question: "2024年事业发展如何？",
        date: "2024-01-08 10:30",
        hexagramName: "乾为天",
        type: "manual",
    },
    {
        id: "2",
        question: "下周面试能否通过？",
        date: "2024-01-07 15:20",
        hexagramName: "山水蒙",
        type: "time",
    },
    {
        id: "3",
        question: "丢失的钥匙在哪个方位？",
        date: "2024-01-05 09:15",
        hexagramName: "地火明夷",
        type: "random",
    },
];

export function HistorySheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-muted-foreground hover:text-foreground"
                >
                    <History className="h-4 w-4" />
                    <span className="hidden sm:inline">卦例记录</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[320px] sm:w-[400px] flex flex-col">
                <SheetHeader className="mb-4 text-left">
                    <SheetTitle className="flex items-center gap-2 text-xl font-heading">
                        <History className="h-5 w-5" />
                        历史卦象
                    </SheetTitle>
                    <div className="text-sm text-muted-foreground">
                        记录您的每一次问道。
                    </div>
                </SheetHeader>

                {/* 搜索/过滤栏 (视觉占位) */}
                <div className="relative mb-4">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-9 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        placeholder="搜索记录..."
                    />
                </div>

                {/* 列表区域 */}
                <ScrollArea className="flex-1 -mx-6 px-6">
                    <div className="flex flex-col gap-3 pb-8">
                        {MOCK_HISTORY.length > 0 ? (
                            MOCK_HISTORY.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/readings/${item.id}`}
                                    className="group relative flex flex-col gap-2 rounded-lg border border-transparent bg-muted/40 p-4 transition-all hover:bg-muted hover:border-border/50"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                                            {item.hexagramName}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-background px-1.5 py-0.5 rounded border">
                                            {item.type === "manual"
                                                ? "手动"
                                                : item.type === "time"
                                                  ? "时间"
                                                  : "随机"}
                                        </span>
                                    </div>
                                    <p className="line-clamp-1 text-sm text-muted-foreground/80 font-medium">
                                        {item.question || "无标题"}
                                    </p>
                                    <div className="flex items-center justify-between mt-1">
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {item.date}
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground/50 opacity-0 transition-all -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100" />
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                                <History className="h-12 w-12 mb-4 opacity-20" />
                                <p>暂无排盘记录</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                <div className="mt-auto border-t pt-4">
                    <Button variant="outline" className="w-full">
                        清空历史
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
