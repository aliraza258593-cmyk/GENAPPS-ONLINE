import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Sparkles, ArrowRight, Zap, Crown, Palette, Headphones } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const planFeatures = {
    starter: {
        name: 'Starter',
        icon: Zap,
        color: 'from-blue-500 to-cyan-400',
        features: ['50 generations/month', 'All 9 templates', '4 AI models', 'Priority support'],
    },
    pro: {
        name: 'Pro',
        icon: Crown,
        color: 'from-brand-500 to-lavender-500',
        features: ['Unlimited generations', 'All templates + priority', 'Deep Thinking mode', 'GitHub & Vercel deploy guides', 'Priority support'],
    },
    business: {
        name: 'Business',
        icon: Palette,
        color: 'from-amber-500 to-orange-400',
        features: ['Everything in Pro', 'Team collaboration', 'Custom branding', 'API access', 'Dedicated support'],
    },
};

// Simple confetti
function Confetti() {
    const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 2,
        size: Math.random() * 8 + 4,
        color: ['#0ea5e9', '#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b'][Math.floor(Math.random() * 6)],
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute top-0 rounded-sm"
                    style={{
                        left: p.left,
                        width: p.size,
                        height: p.size * 0.6,
                        backgroundColor: p.color,
                        animation: `confetti-drop ${p.duration}s ${p.delay}s ease-in forwards`,
                        opacity: 0,
                    }}
                />
            ))}
            <style>{`
                @keyframes confetti-drop {
                    0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
            `}</style>
        </div>
    );
}

export default function CheckoutSuccess() {
    const { updateSubscription, user } = useAuth();
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(true);

    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan') || 'pro';
    const planInfo = planFeatures[plan] || planFeatures.pro;
    const PlanIcon = planInfo.icon;

    useEffect(() => {
        // Activate subscription — persists to Supabase via AuthContext
        // In production, this should also be verified via webhook
        if (user) {
            updateSubscription({
                plan,
                status: 'active',
                activatedAt: new Date().toISOString(),
            });
        }

        // Stop confetti after a few seconds
        const timer = setTimeout(() => setShowConfetti(false), 4000);
        return () => clearTimeout(timer);
    }, [user]);

    return (
        <div className="pt-24 min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="cloud-shape cloud-shape-1 top-[10%] left-[20%] animate-cloud-drift opacity-40" />
                <div className="cloud-shape cloud-shape-2 top-[5%] right-[15%] animate-cloud-drift-reverse opacity-30" />
            </div>

            {/* Confetti */}
            {showConfetti && <Confetti />}

            <div className="section-container relative z-10 text-center max-w-lg animate-scale-in">
                <div className="glass-card p-10 sm:p-12">
                    {/* Success Icon */}
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${planInfo.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}
                        style={{ boxShadow: '0 12px 40px rgba(99,102,241,0.3)' }}>
                        <CheckCircle2 className="h-10 w-10 text-white" />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-extrabold text-slate-900 font-display mb-3">
                        Welcome to <span className="gradient-text">{planInfo.name}</span>! 🎉
                    </h1>
                    <p className="text-slate-500 mb-6 leading-relaxed">
                        Your subscription is now active. Here's what you've unlocked:
                    </p>

                    {/* Features unlocked */}
                    <div className="bg-slate-50/60 rounded-2xl p-5 mb-8 text-left">
                        <div className="flex items-center gap-2 mb-3">
                            <PlanIcon className="h-4 w-4 text-brand-500" />
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{planInfo.name} Plan Features</span>
                        </div>
                        <ul className="space-y-2">
                            {planInfo.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-3">
                        <Link
                            to="/builder"
                            className="btn-primary w-full py-3.5 rounded-xl sparkle-btn flex items-center justify-center"
                        >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Start Building
                        </Link>
                        <Link
                            to="/dashboard"
                            className="btn-secondary w-full py-3.5 rounded-xl flex items-center justify-center"
                        >
                            Go to Dashboard
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
