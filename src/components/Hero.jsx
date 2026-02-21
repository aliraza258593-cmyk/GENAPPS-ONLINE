import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap, Shield, Star, Users, Play, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const rotatingWords = ['Websites', 'Landing Pages', 'Portfolios', 'Web Apps', 'Stores'];

const trustItems = [
    { icon: Zap, text: 'Ready in seconds' },
    { icon: Shield, text: 'Production-grade code' },
    { icon: Sparkles, text: 'AI-powered design' },
];

const logoCloud = ['Vercel', 'Stripe', 'Notion', 'Linear', 'Figma', 'Shopify'];

function FloatingOrb({ className, delay = 0, duration = 6, style }) {
    return (
        <motion.div
            className={`absolute rounded-full pointer-events-none ${className}`}
            style={style}
            animate={{
                y: [0, -30, 0],
                x: [0, 15, -10, 0],
                scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
            }}
        />
    );
}

/* Floating particle dots */
function FloatingParticles() {
    const particles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 4,
        opacity: Math.random() * 0.3 + 0.1,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        background: `linear-gradient(135deg, rgba(14,165,233,${p.opacity}), rgba(168,85,247,${p.opacity}))`,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        opacity: [p.opacity, p.opacity * 2, p.opacity],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

/* Floating browser mockup */
function BrowserMockup() {
    const codeLines = [
        { text: '<div class="hero">', color: 'text-rose-400' },
        { text: '  <h1>Your Website</h1>', color: 'text-sky-400' },
        { text: '  <p>Built with AI</p>', color: 'text-emerald-400' },
        { text: '  <button>Get Started</button>', color: 'text-amber-400' },
        { text: '</div>', color: 'text-rose-400' },
    ];

    return (
        <motion.div
            className="relative max-w-md mx-auto mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Glow behind mockup */}
            <div className="absolute -inset-8 bg-gradient-to-r from-brand-400/20 via-lavender-400/15 to-pink-400/10 rounded-3xl blur-3xl" />

            <div className="relative bg-white/80 backdrop-blur-2xl border border-white/60 rounded-2xl overflow-hidden shadow-2xl">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100/80 bg-slate-50/60">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="px-4 py-1 bg-white/80 rounded-lg border border-slate-200/50 text-xs text-slate-400 flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-emerald-400/40 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            </div>
                            genapps.online
                        </div>
                    </div>
                </div>

                {/* Code preview */}
                <div className="p-5 font-mono text-sm space-y-1.5 bg-slate-900/95 min-h-[140px]">
                    {codeLines.map((line, i) => (
                        <motion.div
                            key={i}
                            className={`${line.color} opacity-80`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 0.8, x: 0 }}
                            transition={{ delay: 0.9 + i * 0.15, duration: 0.4 }}
                        >
                            {line.text}
                        </motion.div>
                    ))}
                    <motion.div
                        className="text-slate-500 flex items-center gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8 }}
                    >
                        <span className="animate-subtle-pulse">▊</span>
                    </motion.div>
                </div>
            </div>

            {/* Floating badge */}
            <motion.div
                className="absolute -right-4 -top-3 px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                ✓ Live Preview
            </motion.div>
        </motion.div>
    );
}

export default function Hero() {
    const [wordIndex, setWordIndex] = useState(0);
    const [promptText, setPromptText] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        const q = promptText.trim();
        navigate(q ? `/builder?prompt=${encodeURIComponent(q)}` : '/builder');
    };

    const placeholders = [
        'A modern SaaS landing page with pricing...',
        'An online store for handmade candles...',
        'A portfolio site for a photographer...',
        'A restaurant website with a menu section...',
    ];
    const [phIndex, setPhIndex] = useState(0);

    useEffect(() => {
        const w = setInterval(() => setWordIndex(i => (i + 1) % rotatingWords.length), 2800);
        const p = setInterval(() => setPhIndex(i => (i + 1) % placeholders.length), 4500);
        return () => { clearInterval(w); clearInterval(p); };
    }, []);

    return (
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
            {/* Sky background with gradient mesh */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(180deg, #bae6fd 0%, #dbeafe 12%, #e8f4fd 28%, #f0f7ff 48%, #f8faff 72%, #ffffff 100%)'
            }} />

            {/* Animated gradient orbs */}
            <FloatingOrb
                className="top-[15%] left-[10%] w-[400px] h-[400px] opacity-25 aurora-glow"
                style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)', filter: 'blur(80px)' }}
                duration={8}
            />
            <FloatingOrb
                className="top-[20%] right-[10%] w-[350px] h-[350px] opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
                delay={2}
                duration={10}
            />
            <FloatingOrb
                className="bottom-[15%] left-[30%] w-[300px] h-[300px] opacity-15"
                style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}
                delay={4}
                duration={7}
            />
            <FloatingOrb
                className="top-[40%] right-[25%] w-[250px] h-[250px] opacity-10 mesh-pulse"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }}
                delay={1}
                duration={9}
            />

            {/* Floating particles */}
            <FloatingParticles />

            {/* Clouds */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="cloud-shape cloud-shape-1 top-[8%] left-[12%] animate-cloud-drift" />
                <div className="cloud-shape cloud-shape-2 top-[18%] right-[8%] animate-cloud-drift-reverse" />
            </div>

            {/* Dot grid overlay */}
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

            <div className="section-container relative z-10 text-center pt-24 pb-16">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 text-sm font-semibold text-slate-700 mb-8"
                        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        AI-Powered Website Builder — Now with Deep Thinking
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6 font-display"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="text-slate-900">Build </span>
                    <span className="relative inline-block min-w-[200px] sm:min-w-[280px] lg:min-w-[340px]">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={wordIndex}
                                className="gradient-text-shimmer inline-block"
                                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                            >
                                {rotatingWords[wordIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                    <br />
                    <span className="text-slate-900">with </span>
                    <span className="gradient-text">AI</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="max-w-xl mx-auto text-lg sm:text-xl text-slate-500 mb-12 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    Describe what you want. Genapps builds it in seconds.
                    <br className="hidden sm:block" />
                    Real code. Ready to deploy. No experience needed.
                </motion.p>

                {/* Prompt Bar */}
                <motion.div
                    className="max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div
                        className="relative bg-white/70 backdrop-blur-2xl border border-white/60 rounded-2xl p-2 glow-pulse"
                        style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)' }}
                    >
                        <div className="flex items-center">
                            <div className="pl-4 pr-2">
                                <Sparkles className="h-5 w-5 text-brand-400" />
                            </div>
                            <input
                                type="text"
                                value={promptText}
                                onChange={e => setPromptText(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                                placeholder={placeholders[phIndex]}
                                className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 text-base px-3 py-3.5 font-medium"
                            />
                            <button
                                onClick={handleSubmit}
                                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 flex-shrink-0 sparkle-btn"
                                style={{
                                    background: 'linear-gradient(135deg, #0ea5e9, #6366f1, #a855f7)',
                                    boxShadow: '0 4px 14px rgba(14,165,233,0.3)',
                                }}
                            >
                                <span className="hidden sm:inline">Generate</span>
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Trust items */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-6 mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    {trustItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                            <item.icon className="h-4 w-4 text-brand-400" />
                            <span>{item.text}</span>
                        </div>
                    ))}
                    <span className="text-slate-300">·</span>
                    <span className="text-sm text-slate-400">No credit card required</span>
                </motion.div>

                {/* Browser Mockup */}
                <BrowserMockup />

                {/* Logo Cloud */}
                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                >
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold mb-6">
                        Trusted by teams building with
                    </p>
                    <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
                        {logoCloud.map((name, i) => (
                            <motion.span
                                key={name}
                                className="text-lg font-bold text-slate-300/60 hover:text-slate-400 transition-colors cursor-default font-display"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 + i * 0.1 }}
                            >
                                {name}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
