import React from "react";
import { Check } from "lucide-react";
import { Button } from "../global/Button";
import { cn } from "../../../lib/utils";

interface PricingTier {
    name: string;
    price: string;
    description: string;
    features: string[];
    highlight?: boolean;
    buttonText?: string;
}

const TIERS: PricingTier[] = [
    {
        name: "Starter",
        price: "Free",
        description: "Perfect for exploring what GenApps can do.",
        features: ["Unlimited Previews", "Basic Templates", "Community Support"],
        buttonText: "Get Started Free",
    },
    {
        name: "Pro",
        price: "$19",
        description: "For hobbyists and side projects.",
        features: ["Everything in Starter", "Code Access & Export", "500 AI Messages / mo", "Standard Support"],
        buttonText: "Upgrade to Pro",
    },
    {
        name: "Plus",
        price: "$49",
        description: "For serious developers building production apps.",
        features: ["Everything in Pro", "GitHub Sync", "Priority Support", "2000 AI Messages / mo", "Custom Domains"],
        highlight: true,
        buttonText: "Upgrade to Plus",
    },
    {
        name: "Business",
        price: "$199",
        description: "Dedicated resources for teams and agencies.",
        features: ["Everything in Plus", "Team Access (5 Seats)", "Custom AI Models", "Dedicated Support", "SLA Guarantee"],
        buttonText: "Contact Sales",
    },
];

export const PricingSection = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-[#09090b]">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple, transparent pricing</h2>
                    <p className="text-lg text-gray-400">Choose the plan that fits your needs. No hidden fees, cancel anytime.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TIERS.map((tier) => (
                        <div key={tier.name} className={cn(
                            "relative p-8 rounded-3xl border flex flex-col transition-all duration-300",
                            tier.highlight
                                ? "bg-[#0e0e11] border-violet-500/50 shadow-2xl shadow-violet-500/10 scale-105 z-10"
                                : "bg-[#0c0c0e] border-white/5 hover:border-white/10"
                        )}>
                            {tier.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Best Value
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-medium text-white mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                                    <span className="text-gray-500">/month</span>
                                </div>
                                <p className="text-gray-400 text-sm">{tier.description}</p>
                            </div>

                            <div className="flex-1 mb-8">
                                <ul className="space-y-4">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                                            <div className={cn("mt-0.5 p-0.5 rounded-full flex items-center justify-center shrink-0", tier.highlight ? "bg-violet-500/20 text-violet-400" : "bg-white/10 text-gray-400")}>
                                                <Check className="w-3 h-3" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button
                                variant={tier.highlight ? "glow" : "secondary"}
                                className="w-full justify-center"
                            >
                                {tier.buttonText}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
