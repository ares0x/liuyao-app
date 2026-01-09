"use client";

import { cn } from "@/lib/utils";
import { type HexagramResult, type YaoDetail } from "@/lib/liuyao-core";

interface HexagramTableProps {
    data: HexagramResult;
}

export function HexagramTable({ data }: HexagramTableProps) {
    const { benGua, bianGua } = data;
    const hasBianGua = !!bianGua;

    // --- Grid 布局策略 ---
    // 10列布局 (有变卦): 六神 | 伏神 | 六亲 | 爻图 | 世应 | 纳甲 | 箭头 | 纳甲 | 六亲 | 爻图
    // 6列布局 (无变卦):  六神 | 伏神 | 六亲 | 爻图 | 世应 | 纳甲
    const gridClass = hasBianGua
        ? "grid grid-cols-[40px_45px_50px_60px_30px_1fr_30px_1fr_50px_60px]"
        : "grid grid-cols-[50px_50px_60px_80px_40px_1fr]";

    // --- 行渲染组件 ---
    const RenderRow = ({
        line,
        bianLine,
    }: {
        line: YaoDetail;
        bianLine?: YaoDetail;
    }) => {
        const isMoving = line.isMoving;
        const isYang = line.binary === 1;

        // 视觉强调：动爻使用红色 + 加粗
        const textStyle = isMoving
            ? "text-destructive font-bold"
            : "text-foreground";
        const barColor = isMoving ? "bg-destructive" : "bg-primary";

        return (
            <div
                className={cn(
                    gridClass,
                    "gap-2 py-3 border-b border-border/40 items-center text-sm transition-colors hover:bg-muted/30",
                    textStyle,
                )}
            >
                {/* COL 1: 六神 */}
                <div className="text-xs text-muted-foreground/80 font-mono text-center">
                    {line.liuShou}
                </div>

                {/* COL 2: 伏神 (Hidden Spirit) - 关键修复 */}
                <div className="flex flex-col items-center justify-center leading-none min-h-[2rem]">
                    {line.fuShen ? (
                        <div className="flex flex-col items-center text-[10px] sm:text-xs text-muted-foreground/50 font-mono transform scale-90 origin-center">
                            <span className="mb-0.5 whitespace-nowrap">
                                {line.fuShen.liuQin}
                            </span>
                            <span className="whitespace-nowrap">
                                {line.fuShen.zhi}
                                {line.fuShen.wuxing}
                            </span>
                        </div>
                    ) : (
                        <span className="w-full" /> // 占位
                    )}
                </div>

                {/* COL 3: 本卦六亲 */}
                <div className="text-center font-medium">{line.liuQin}</div>

                {/* COL 4: 本卦爻象 (Bars) */}
                <div className="flex justify-center px-1">
                    {isYang ? (
                        <div className={cn("h-3 w-12 rounded-sm", barColor)} />
                    ) : (
                        <div className="flex w-12 gap-1">
                            <div
                                className={cn("h-3 w-1/2 rounded-sm", barColor)}
                            />
                            <div
                                className={cn("h-3 w-1/2 rounded-sm", barColor)}
                            />
                        </div>
                    )}
                </div>

                {/* COL 5: 世应 */}
                <div className="text-xs text-center flex justify-center">
                    {line.isShi && (
                        <span className="bg-primary/10 text-primary border border-primary/20 px-1 py-0.5 rounded-[2px] scale-90 leading-none">
                            世
                        </span>
                    )}
                    {line.isYing && (
                        <span className="text-muted-foreground border border-border px-1 py-0.5 rounded-[2px] scale-90 leading-none">
                            应
                        </span>
                    )}
                </div>

                {/* COL 6: 本卦纳甲 */}
                <div className="text-left pl-2 font-mono whitespace-nowrap">
                    {line.zhi}
                    {line.wuxing}
                </div>

                {/* --- 右侧变卦区域 --- */}
                {hasBianGua && (
                    <>
                        {/* COL 7: 箭头 */}
                        <div className="text-center text-muted-foreground/30 font-mono">
                            {isMoving ? "→" : ""}
                        </div>

                        {/* COL 8, 9, 10 */}
                        {bianLine ? (
                            <>
                                {/* COL 8: 变卦纳甲 */}
                                <div
                                    className={cn(
                                        "text-right pr-2 font-mono whitespace-nowrap",
                                        isMoving ? "opacity-100" : "opacity-30",
                                    )}
                                >
                                    {bianLine.zhi}
                                    {bianLine.wuxing}
                                </div>

                                {/* COL 9: 变卦六亲 */}
                                <div
                                    className={cn(
                                        "text-center font-medium",
                                        isMoving ? "opacity-100" : "opacity-30",
                                    )}
                                >
                                    {bianLine.liuQin}
                                </div>

                                {/* COL 10: 变卦爻象 - 关键修复: 这里使用了修正后的 binary */}
                                <div
                                    className={cn(
                                        "flex justify-center px-1",
                                        isMoving ? "opacity-100" : "opacity-30",
                                    )}
                                >
                                    {bianLine.binary === 1 ? (
                                        <div className="h-3 w-12 rounded-sm bg-primary/60" />
                                    ) : (
                                        <div className="flex w-12 gap-1">
                                            <div className="h-3 w-1/2 rounded-sm bg-primary/60" />
                                            <div className="h-3 w-1/2 rounded-sm bg-primary/60" />
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="col-span-3" /> // Grid 占位
                        )}
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="w-full bg-card rounded-xl border shadow-sm overflow-hidden overflow-x-auto">
            {/* 头部信息 */}
            <div className="bg-muted/30 px-4 py-3 border-b flex justify-between items-center whitespace-nowrap min-w-[600px]">
                <div className="flex items-center gap-3">
                    <h3 className="font-heading text-lg font-bold text-primary tracking-tight">
                        {benGua.name}
                    </h3>
                    <span className="text-xs font-normal text-muted-foreground px-2 py-0.5 border rounded-full bg-background/50">
                        {benGua.palace}宫 ({benGua.palaceWuxing})
                    </span>
                </div>
                {hasBianGua && (
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm font-serif italic">
                            之
                        </span>
                        <h3 className="font-heading text-lg font-bold text-primary tracking-tight">
                            {bianGua.name}
                        </h3>
                    </div>
                )}
            </div>

            {/* 核心表格 */}
            <div className="p-4 min-w-[600px]">
                {/* 表头 */}
                <div
                    className={cn(
                        gridClass,
                        "gap-2 pb-2 text-[10px] text-muted-foreground uppercase tracking-wider border-b-2 border-primary/10 mb-2 font-bold select-none",
                    )}
                >
                    <div className="text-center">六神</div>
                    <div className="text-center">伏神</div>
                    <div className="text-center">六亲</div>
                    <div className="text-center">本卦</div>
                    <div className="text-center">世应</div>
                    <div className="text-left pl-2">纳甲</div>
                    {hasBianGua && (
                        <>
                            <div className="text-center"></div>
                            <div className="text-right pr-2">纳甲</div>
                            <div className="text-center">六亲</div>
                            <div className="text-center">变卦</div>
                        </>
                    )}
                </div>

                {/* 倒序渲染行 (上爻 -> 初爻) */}
                {[5, 4, 3, 2, 1, 0].map((idx) => (
                    <RenderRow
                        key={idx}
                        line={benGua.lines[idx]}
                        bianLine={bianGua?.lines[idx]}
                    />
                ))}
            </div>
        </div>
    );
}
