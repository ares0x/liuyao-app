import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
    content,
    className = "",
}) => {
    // === 核心修复逻辑 ===
    const preprocessContent = (text: string) => {
        if (!text) return "";

        let processed = text;

        // 1. 修复标题：确保 "【标题】" 前后有足够的换行，独立成段
        // 同时也处理可能存在的 "** 【标题】 **" 这种带空格的情况
        processed = processed.replace(
            /\s*\*\*\s*【(.*?)】\s*\*\*\s*/g,
            "\n\n**【$1】**\n\n",
        );

        // 2. 修复“文字墙”列表 (这是解决您截图问题的关键！)
        // 逻辑：找到所有 " *文字：" 或 " * **文字**：" 的模式
        // 强制在它们前面加双换行 "\n\n"，并确保星号后有空格，使其变成标准列表
        // 这里的正则意思是：匹配 (句号/分号/开始) + (可能的空白) + 星号 + (内容) + (冒号)
        processed = processed.replace(
            /([。！？；]|^|\n)\s*\*\s*([^*:：\n]+)(:|：)/g,
            "$1\n\n* **$2**$3",
        );

        // 3. 修复已有的加粗列表但没换行的情况 (针对 image 1 的情况)
        processed = processed.replace(
            /([。！？；])\s*\*\*\s*(.*?)\s*\*\*/g,
            "$1\n\n* **$2**",
        );

        return processed;
    };

    const cleanContent = preprocessContent(content);

    return (
        <article className={`prose prose-stone max-w-none ${className}`}>
            <ReactMarkdown
                components={{
                    // === 样式微调 ===

                    // 1. 段落：增加下边距，让文字不拥挤
                    p: ({ node, children, ...props }) => (
                        <p
                            className="mb-4 leading-relaxed text-gray-700 text-justify"
                            {...props}
                        >
                            {children}
                        </p>
                    ),

                    // 2. 标题与加粗高亮
                    strong: ({ node, children, ...props }) => {
                        const text = String(children);
                        // 识别标题（带黄色左边框的那个样式）
                        if (text.includes("【") || text.includes("】")) {
                            return (
                                <strong className="block mt-8 mb-4 text-lg font-bold text-amber-600 border-l-4 border-amber-500 pl-3 bg-amber-50 py-2 rounded-r shadow-sm">
                                    {children}
                                </strong>
                            );
                        }
                        // 列表中的关键词高亮（如 "事业"、"经商"）
                        return (
                            <strong
                                className="font-bold text-stone-900 bg-stone-100 px-1 rounded"
                                {...props}
                            >
                                {children}
                            </strong>
                        );
                    },

                    // 3. 列表容器 (ul)
                    ul: ({ node, children, ...props }) => (
                        <ul className="list-none space-y-3 mb-6" {...props}>
                            {children}
                        </ul>
                    ),

                    // 4. 列表项 (li) - 使用 Flex 布局自定义图标，比默认圆点更好看
                    li: ({ node, children, ...props }) => (
                        <li
                            className="flex items-start text-gray-700"
                            {...props}
                        >
                            <span className="mr-2 mt-1.5 min-w-[6px] h-[6px] rounded-full bg-amber-500 flex-shrink-0"></span>
                            <span>{children}</span>
                        </li>
                    ),
                }}
            >
                {cleanContent}
            </ReactMarkdown>
        </article>
    );
};
