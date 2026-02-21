import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Wand2, ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';
import Generator from '../components/Generator';
import { motion } from 'framer-motion';

export default function Builder() {
    const [searchParams] = useSearchParams();
    const initialPrompt = searchParams.get('prompt') || '';

    return (
        <div className="pt-20">
            {/* ═══ Attractive Hero Banner ═══ */}
            <section className="relative py-12 sm:py-16 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(135deg, #eef4ff 0%, #f5f0ff 40%, #fdf2f8 70%, #f0f7ff 100%)'
                }} />
                {/* Floating orbs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-10 right-[15%] w-72 h-72 rounded-full opacity-30"
                        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.25), transparent 70%)', filter: 'blur(60px)', animation: 'particle-float 8s ease-in-out infinite' }} />
                    <div className="absolute bottom-0 left-[10%] w-60 h-60 rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.25), transparent 70%)', filter: 'blur(60px)', animation: 'particle-float 10s ease-in-out infinite reverse' }} />
                </div>

                <div className="section-container relative z-10">
                    <motion.div
                        className="text-center max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 text-xs font-semibold text-slate-500 mb-5"
                            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="flex h-2 w-2 relative">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            AI is ready to build
                        </motion.div>

                        {/* Headline */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display leading-tight mb-4">
                            Describe it.{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #0ea5e9, #6366f1, #a855f7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                We build it.
                            </span>
                        </h1>

                        {/* Subtext — short! */}
                        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto mb-8">
                            Production-ready websites in seconds. Powered by the world's best AI models.
                        </p>

                        {/* Animated feature pills */}
                        <motion.div
                            className="flex items-center justify-center gap-2 flex-wrap"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {[
                                { icon: Zap, text: 'Instant generation' },
                                { icon: Shield, text: 'Production code' },
                                { icon: Globe, text: 'Deploy anywhere' },
                                { icon: Sparkles, text: 'AI-powered design' },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur border border-white/40 text-[11px] font-medium text-slate-500"
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    <item.icon className="h-3 w-3 text-brand-400" />
                                    {item.text}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Generator */}
            <Generator initialPrompt={initialPrompt} />
        </div>
    );
}
