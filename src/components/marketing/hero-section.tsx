import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden w-full py-24 lg:py-32 xl:py-40">
            {/* Background Texture: Rice Paper Grain */}
            <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none mix-blend-multiply dark:mix-blend-screen">
                <svg
                    className="h-full w-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <filter id="noise">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.8"
                            numOctaves="4"
                            stitchTiles="stitch"
                        />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>

            {/* Background Decor: Subtle Ink Wash (Gradient) */}
            <div className="absolute top-1/2 left-1/2 -z-20 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />

            <div className="container flex flex-col items-center gap-8 text-center">
                {/* Badge: "The Seal" Style */}
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-background px-3 py-1 text-sm font-medium text-primary shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)] transition-transform hover:scale-105">
                    <span className="flex h-2 w-2 rounded-full bg-destructive mr-2 animate-pulse" />
                    Six Yao Divination v1.0
                </div>

                {/* Headline with "Ink Bleed" effect via subtle drop-shadow */}
                <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl drop-shadow-sm">
                    Ancient Wisdom for <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/70">
                        Modern Clarity
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
                    Cast the coins, consult the I Ching, and navigate
                    uncertainty. <br />A precision tool for the traditional art
                    of Six Yao divination.
                </p>

                {/* Visual Anchor: The Floating Coin (CSS Art) */}
                <div className="relative py-8">
                    <div className="relative flex items-center justify-center h-24 w-24 rounded-full border-[6px] border-primary/20 bg-background shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)] animate-[bounce_3s_infinite]">
                        {/* The Square Hole */}
                        <div className="h-8 w-8 border-[3px] border-primary/20" />

                        {/* Inner Ring Detail */}
                        <div className="absolute inset-2 rounded-full border border-dashed border-primary/10" />
                    </div>

                    {/* Reflection/Shadow beneath the coin */}
                    <div className="absolute -bottom-4 left-1/2 h-2 w-16 -translate-x-1/2 rounded-[100%] bg-primary/20 blur-sm" />
                </div>

                {/* Action Group */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* Primary CTA: "Cinnabar Seal" Style */}
                    <Button
                        size="lg"
                        className="group relative overflow-hidden bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_4px_14px_0_rgba(var(--destructive),0.39)] transition-all hover:-translate-y-1"
                        asChild
                    >
                        <Link href="/app/divine">
                            Begin Ritual
                            <Sparkles className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                        </Link>
                    </Button>

                    {/* Secondary CTA: "Ink Stroke" Style */}
                    <Button
                        variant="outline"
                        size="lg"
                        className="border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
                        asChild
                    >
                        <Link href="#features">
                            Learn the Basics
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
