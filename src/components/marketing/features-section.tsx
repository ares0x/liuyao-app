import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hand, Cpu, BookOpen } from "lucide-react";

export function FeaturesSection() {
    const features = [
        {
            title: "Haptic Coin Casting",
            category: "The Digital Ritual",
            description:
                "Experience the gravity of the ritual. Shake and cast three coins virtually with physics-based interactions that respect the randomness of the Tao.",
            icon: Hand,
        },
        {
            title: "Astronomical Precision",
            category: "The Logic Engine",
            description:
                "Automatic calculation of Lunar dates, Solar terms (Jieqi), and the Six Beasts. We handle the complex mathematics so you can focus on the interpretation.",
            icon: Cpu,
        },
        {
            title: "Insight Journal",
            category: "The Archive",
            description:
                "Your spiritual timeline. Save every reading with personal notes, allowing you to reflect on past divinations and track the accuracy of outcomes over time.",
            icon: BookOpen,
        },
    ];

    return (
        <section id="features" className="container py-24 sm:py-32">
            <div className="grid gap-8 md:grid-cols-3">
                {features.map((feature, index) => (
                    <Card
                        key={index}
                        className="group relative overflow-hidden border-primary/10 bg-background transition-all hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                    >
                        {/* Hover Accent: A subtle brush stroke in the corner */}
                        <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />

                        <CardHeader>
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-primary/10 bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <div className="text-sm font-medium text-muted-foreground">
                                {feature.category}
                            </div>
                            <CardTitle className="font-heading text-xl">
                                {feature.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="leading-relaxed text-muted-foreground">
                                {feature.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
