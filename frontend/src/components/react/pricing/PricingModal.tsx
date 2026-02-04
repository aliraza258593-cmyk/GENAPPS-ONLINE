import React, { useState, useEffect } from 'react';
import { X, Crown, Check, Sparkles, Zap, Shield, Globe, Lock } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface PricingModalProps {
    onClose: () => void;
    onUpgrade: () => void;
}

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for trying out GenApps',
        features: [
            { text: 'Gemini 3 Flash model', included: true },
            { text: '3 projects', included: true },
            { text: 'Preview in builder', included: true },
            { text: 'Basic components', included: true },
            { text: 'Premium AI models', included: false },
            { text: 'GitHub/Vercel deploy', included: false },
            { text: 'Remove watermark', included: false },
            { text: 'Priority support', included: false }
        ],
        cta: 'Current Plan',
        current: true
    },
    {
        name: 'Pro',
        price: '$19',
        period: 'per month',
        description: 'For serious builders and creators',
        features: [
            { text: 'All AI models (Claude, GPT, Kimi)', included: true },
            { text: 'Unlimited projects', included: true },
            { text: 'Deep Thinking mode', included: true },
            { text: 'GitHub & Vercel deploy', included: true },
            { text: 'No watermark', included: true },
            { text: 'Share links on your domain', included: true },
            { text: 'Code editor access', included: true },
            { text: 'Priority support', included: true }
        ],
        cta: 'Upgrade Now',
        popular: true
    }
];

export const PricingModal = ({ onClose, onUpgrade }: PricingModalProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 200);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200",
                    isVisible ? "opacity-100" : "opacity-0"
                )}
                onClick={handleClose}
            />

            {/* Modal */}
            <div className={cn(
                "relative bg-[#09090b] border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl transition-all duration-200",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}>
                {/* Header */}
                <div className="relative p-8 pb-0">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 rounded-full text-violet-400 text-xs font-medium mb-4">
                            <Sparkles className="w-3 h-3" />
                            Unlock Full Power
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Upgrade to Pro
                        </h2>
                        <p className="text-gray-400">
                            Get access to premium AI models and advanced features
                        </p>
                    </div>
                </div>

                {/* Plans */}
                <div className="grid md:grid-cols-2 gap-6 p-8 pt-4">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={cn(
                                "relative p-6 rounded-2xl border transition-all",
                                plan.popular
                                    ? "bg-gradient-to-b from-violet-500/10 to-transparent border-violet-500/30"
                                    : "bg-white/5 border-white/10"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full text-xs font-medium text-white">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                                    {plan.name}
                                    {plan.popular && <Crown className="w-4 h-4 text-amber-400" />}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-500">/{plan.period}</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-2">{plan.description}</p>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        {feature.included ? (
                                            <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-violet-400" />
                                            </div>
                                        ) : (
                                            <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                                                <Lock className="w-3 h-3 text-gray-600" />
                                            </div>
                                        )}
                                        <span className={cn(
                                            "text-sm",
                                            feature.included ? "text-gray-300" : "text-gray-600"
                                        )}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={plan.popular ? onUpgrade : undefined}
                                disabled={plan.current}
                                className={cn(
                                    "w-full py-3 rounded-xl font-medium transition-all",
                                    plan.popular
                                        ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90 shadow-lg shadow-violet-500/20"
                                        : "bg-white/5 border border-white/10 text-gray-400 cursor-not-allowed"
                                )}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 text-center">
                    <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Secure Payment
                        </span>
                        <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Instant Access
                        </span>
                        <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            Cancel Anytime
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
