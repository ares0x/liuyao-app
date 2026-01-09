// src/components/HexagramResult.tsx
import { useHexagram } from "@/hooks/useHexagram";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer"; // 假设您封装了渲染器

const HexagramResult = ({ currentLines }: { currentLines: number[] }) => {
    // 调用 Hook，不关心 Key 是字符串还是数组，也不关心数据存在哪
    const { data, error } = useHexagram(currentLines);

    if (error || !data) return <div>暂无数据</div>;

    return (
        <div className="p-6 bg-paper-texture">
            {/* 头部元信息 */}
            <header className="mb-4 border-b border-gray-300 pb-2">
                <h1 className="text-2xl font-serif text-primary-800">
                    {data.name}{" "}
                    <span className="text-sm text-gray-500">
                        ({data.nature})
                    </span>
                </h1>
                <div className="text-gray-600 mt-1">{data.guaci}</div>
            </header>

            {/* 核心 Markdown 渲染 */}
            <article className="prose prose-stone max-w-none">
                <MarkdownRenderer content={data.explanation} />
            </article>
        </div>
    );
};
