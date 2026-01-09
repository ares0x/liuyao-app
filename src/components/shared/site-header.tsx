import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                {/* Logo 区域 */}
                <div className="mr-4 flex">
                    <Link
                        href="/"
                        className="mr-6 flex items-center space-x-2 transition-opacity hover:opacity-80"
                    >
                        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-background" />
                        </div>
                        <span className="font-heading font-bold text-lg tracking-tight sm:inline-block">
                            六爻排盘
                        </span>
                    </Link>
                </div>

                {/* 右侧功能区 */}
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <nav className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            asChild
                        >
                            <Link
                                href="https://github.com/ares0x/liuyao-app"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </Button>
                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    );
}
