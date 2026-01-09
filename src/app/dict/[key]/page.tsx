import { notFound } from "next/navigation";
import { getHexagram } from "@/lib/services/hexagramService";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { HEXAGRAM_DATA } from "@/lib/cons";
import Link from "next/link";

// 定义 Props 类型，注意 params 是 Promise
type Props = {
    params: Promise<{ key: string }>;
};

// 1. 生成静态路径 (SSG) - 这里不需要改动
export async function generateStaticParams() {
    return Object.keys(HEXAGRAM_DATA).map((key) => ({
        key: key,
    }));
}

// 2. 页面元数据 (SEO) - 需要 await params
export async function generateMetadata({ params }: Props) {
    // ★★★ 关键修改：必须先 await params ★★★
    const { key } = await params;

    const data = getHexagram(key);
    if (!data) return { title: "卦象未找到" };

    return {
        title: `${data.name} - ${data.nature} | 周易六十四卦详解`,
        description: data.guaci,
    };
}

// 3. 页面主组件 - 需要 await params
export default async function HexagramDictPage({ params }: Props) {
    // ★★★ 关键修改：必须先 await params ★★★
    const { key } = await params;

    // 获取数据
    const data = getHexagram(key);

    // 如果 Key 不存在，返回 404
    if (!data) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#fdfbf7] py-12 px-4 sm:px-6 lg:px-8 text-slate-800">
            <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-stone-200">
                {/* === 头部区域：卦名与基本信息 === */}
                <div className="bg-stone-900 text-amber-50 p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex items-center justify-center text-9xl font-serif">
                        {data.name[0]}
                    </div>

                    <div className="relative z-10">
                        <span className="inline-block py-1 px-3 rounded-full bg-amber-700/50 text-amber-200 text-sm mb-4 border border-amber-600/30">
                            {data.palace}宫 · {data.nature}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-widest mb-2">
                            {data.name}
                        </h1>
                        <p className="text-stone-400 text-sm font-mono tracking-wider">
                            KEY: {key}
                        </p>
                    </div>
                </div>

                {/* === 原文区域：卦辞与象辞 === */}
                <div className="bg-amber-50/50 p-8 border-b border-stone-100">
                    <div className="flex flex-col gap-6">
                        <div className="text-center">
                            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                                卦辞
                            </h3>
                            <p className="text-xl font-serif text-stone-800 leading-relaxed">
                                “{data.guaci}”
                            </p>
                        </div>

                        <div className="w-16 h-px bg-stone-300 mx-auto"></div>

                        <div className="text-center">
                            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                                象辞
                            </h3>
                            <p className="text-lg font-serif text-stone-700 italic">
                                “{data.xiangci}”
                            </p>
                        </div>
                    </div>
                </div>

                {/* === 详解区域：Markdown 内容 === */}
                <div className="p-8 md:p-12 bg-white rounded-b-2xl">
                    <MarkdownRenderer content={data.explanation} />
                </div>
            </div>

            <div className="max-w-3xl mx-auto mt-8 text-center">
                <Link
                    href="/"
                    className="text-stone-500 hover:text-stone-800 underline underline-offset-4 transition-colors"
                >
                    &larr; 返回首页
                </Link>
            </div>
        </main>
    );
}
