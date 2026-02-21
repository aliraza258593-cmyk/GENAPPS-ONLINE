import React, { useRef, useEffect, useState } from 'react';
import { MessageSquare, Wand2, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: '01',
        icon: MessageSquare,
        title: 'Describe your vision',
        description: 'Tell Genapps what you want — a SaaS landing page, an online store, a portfolio. One prompt is all it takes.',
        gradient: 'from-blue-500 to-cyan-500',
        bgGradient: 'from-blue-50 to-cyan-50',
        mockup: 'prompt',
    },
    {
        number: '02',
        icon: Wand2,
        title: 'AI builds it instantly',
        description: 'Watch as Genapps generates a complete, production-ready website with clean React code, responsive design, and modern UI.',
        gradient: 'from-brand-500 to-lavender-500',
        bgGradient: 'from-blue-50 to-indigo-50',
        mockup: 'editor',
    },
    {
        number: '03',
        icon: Rocket,
        title: 'Deploy & go live',
        description: 'One-click deploy to Vercel, push to GitHub, or download the code. Your site is live in seconds with your own domain.',
        gradient: 'from-lavender-500 to-pink-500',
        bgGradient: 'from-purple-50 to-pink-50',
        mockup: 'launch',
    },
];

function MockupCard({ type }) {
    if (type === 'prompt') {
        return (
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-5" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                    <span className="text-xs text-slate-400 font-medium">AI is listening...</span>
                </div>
                <div className="text-sm text-slate-700 font-medium mb-4">"Build me a modern SaaS landing page with pricing"</div>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold border border-brand-200/50">✨ Generate</span>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-100/80 text-slate-500 text-xs font-medium border border-slate-200/50">🎨 Templates</span>
                    <div className="ml-auto">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0ea5e9, #7c3aed)' }}>
                            <ArrowRight className="h-3.5 w-3.5 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (type === 'editor') {
        return (
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-5" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                {/* Fake editor top bar */}
                <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                    <span className="ml-2 text-[10px] text-slate-400 font-mono">index.tsx</span>
                </div>
                {/* Fake code lines */}
                <div className="space-y-1.5 font-mono text-[11px]">
                    <div><span className="text-purple-500">import</span> <span className="text-blue-500">React</span> <span className="text-purple-500">from</span> <span className="text-green-600">'react'</span></div>
                    <div><span className="text-purple-500">export</span> <span className="text-blue-500">function</span> <span className="text-orange-500">Hero</span>()</div>
                    <div className="text-slate-300">{'  '}{'// AI-generated component'}</div>
                </div>
                <div className="mt-3 flex gap-1.5">
                    <div className="h-1 w-12 rounded-full bg-brand-400/30" />
                    <div className="h-1 w-8 rounded-full bg-lavender-400/30" />
                    <div className="h-1 w-16 rounded-full bg-brand-400/20" />
                </div>
            </div>
        );
    }
    return (
        <div className="space-y-3">
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl p-5" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Rocket className="h-4 w-4 text-brand-500" />
                        <span className="text-sm font-bold text-slate-800">Deploy</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">LIVE</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50/80 rounded-lg px-3 py-2 border border-slate-200/50">
                    <span className="text-xs text-slate-500 font-mono">mywebsite.com</span>
                    <span className="text-[10px] font-bold text-emerald-500 ml-auto">● Connected</span>
                </div>
            </div>
        </div>
    );
}

function StepCard({ step, index, isVisible }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
        >
            {/* Step number accent */}
            <div className="absolute -top-3 -left-2 z-10">
                <div className={`flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-r ${step.gradient} text-white text-sm font-extrabold shadow-lg`}
                    style={{ boxShadow: '0 4px 16px rgba(14,165,233,0.2)' }}
                >
                    {step.number}
                </div>
            </div>

            <div className="premium-card p-7 h-full">
                {/* Mockup Area */}
                <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-br ${step.bgGradient} min-h-[160px] flex items-center justify-center`}>
                    <div className="w-full">
                        <MockupCard type={step.mockup} />
                    </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-slate-900 font-display mb-2">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{step.description}</p>
            </div>
        </motion.div>
    );
}

export default function HowItWorks() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="how-it-works" className="section-padding relative overflow-hidden" ref={sectionRef}>
            {/* Soft gradient background */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #f0f7ff 30%, #e8f4fd 60%, #f0f7ff 100%)'
            }} />

            <div className="section-container relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-badge">
                        How it Works
                    </span>
                    <h2 className="section-title">
                        From Idea to Live Website<br />
                        <span className="gradient-text">in Under 2 Minutes</span>
                    </h2>
                    <p className="section-subtitle">
                        Three simple steps. No coding, no design skills, no DevOps — just describe and launch.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <StepCard key={i} step={step} index={i} isVisible={isVisible} />
                    ))}
                </div>
            </div>
        </section>
    );
}
