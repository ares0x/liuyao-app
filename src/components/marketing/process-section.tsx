import { Target, Shuffle, Sparkles } from "lucide-react";

export function ProcessSection() {
    const steps = [
        {
            title: "Formulate Intent",
            description:
                "Clear your mind. Type your question specifically to focus your Qi.",
            icon: Target,
        },
        {
            title: "Cast Hexagram",
            description:
                "Toss the digital coins six times. Watch the lines form your Gua.",
            icon: Shuffle,
        },
        {
            title: "Receive Insight",
            description:
                "Read the judgment and line interpretations to guide your decision.",
            icon: Sparkles,
        },
    ];

    return (
        <section className="border-t bg-muted/30 py-24 sm:py-32">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                        How It Works
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        A seamless bridge between ancient tradition and modern
                        technology.
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-3 md:gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center text-center"
                        >
                            {/* Connector Line (Desktop Only) */}
                            {index !== steps.length - 1 && (
                                <div className="absolute top-8 left-1/2 hidden h-0.5 w-full -translate-y-1/2 translate-x-1/2 border-t-2 border-dashed border-primary/20 md:block" />
                            )}

                            {/* Step Circle */}
                            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-card shadow-sm">
                                <step.icon className="h-8 w-8 text-primary/80" />
                                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
                                    {index + 1}
                                </span>
                            </div>

                            <h3 className="mt-6 text-xl font-bold">
                                {step.title}
                            </h3>
                            <p className="mt-2 text-muted-foreground">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
