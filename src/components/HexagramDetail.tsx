// src/components/HexagramDetail.tsx (示例)
import ReactMarkdown from "react-markdown";

// 自定义样式，让渲染出来的 Markdown 更符合古风/算命网站的调性
const markdownStyles = {
    // 针对段落增加间距
    p: ({ node, ...props }) => (
        <p className="mb-4 text-gray-700 leading-relaxed" {...props} />
    ),
    // 针对加粗文字（如小标题）增加颜色或字重
    strong: ({ node, ...props }) => (
        <strong
            className="font-bold text-primary-600 block mt-6 mb-2 text-lg"
            {...props}
        />
    ),
    // 针对列表
    li: ({ node, ...props }) => (
        <li className="ml-4 list-disc text-gray-600" {...props} />
    ),
};

export const HexagramExplanation = ({ content }: { content: string }) => {
    return (
        <div className="prose prose-slate max-w-none">
            {/* 使用插件处理换行，或者利用 CSS white-space */}
            <ReactMarkdown components={markdownStyles}>{content}</ReactMarkdown>
        </div>
    );
};
