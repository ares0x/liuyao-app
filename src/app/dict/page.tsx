import Link from "next/link";
import { HEXAGRAM_DATA } from "@/lib/guawen";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "六十四卦全解查询 - 六爻在线排盘字典",
    description:
        "周易六十四卦完整索引。包含乾为天、坤为地等所有卦象的五行、世应、纳甲详解，助您深入研习易理。",
};

export default function DictIndexPage() {
    // 将 HEXAGRAM_DATA 转换为数组方便渲染
    const allGua = Object.entries(HEXAGRAM_DATA).map(([key, data]) => ({
        key,
        ...data,
    }));

    return (
        <div className="container py-12 max-w-5xl">
            <div className="text-center mb-12 space-y-4">
                <h1 className="text-3xl font-heading font-bold">
                    周易六十四卦字典
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    这里收录了《易经》六十四卦的完整排盘信息。点击卦名，查看该卦的纳甲、五行、世应及详细结构。
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {allGua.map((gua) => (
                    <Link
                        key={gua.key}
                        href={`/dict/${gua.key}`}
                        className="group relative flex flex-col items-center justify-center p-6 border rounded-lg bg-card hover:bg-muted/50 transition-colors hover:border-primary/50"
                    >
                        <div className="text-2xl font-bold font-heading group-hover:text-primary transition-colors">
                            {gua.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2 font-mono opacity-60">
                            {gua.palace}宫 · {gua.key}
                        </div>
                        {/* 简单的卦画示意 (CSS实现) */}
                        <div className="mt-4 flex flex-col gap-[2px] w-8 opacity-30 group-hover:opacity-100 transition-opacity">
                            {/* 将二进制字符串拆分渲染 */}
                            {gua.key.split("").map((bit, i) => (
                                <div
                                    key={i}
                                    className="flex w-full h-1 justify-between"
                                >
                                    {bit === "1" ? (
                                        <div className="w-full bg-foreground h-full rounded-[1px]" />
                                    ) : (
                                        <>
                                            <div className="w-[45%] bg-foreground h-full rounded-[1px]" />
                                            <div className="w-[45%] bg-foreground h-full rounded-[1px]" />
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
