import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const stats = [
    { value: '50K+', label: 'Websites Built' },
    { value: '2min', label: 'Avg Build Time' },
    { value: '99%', label: 'Satisfaction Rate' },
];

export default function CTA() {
    return (
        <section className="relative py-28 sm:py-36 overflow-hidden">
            {/* Premium gradient mesh background */}
            <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 20%, #e8eeff 40%, #f3e8ff 60%, #fce7f3 80%, #f0f7ff 100%)'
            }} />

            {/* Animated orbs */}
            <motion.div
                className="absolute top-[10%] left-[8%] w-[400px] h-[400px] rounded-full opacity-30 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }}
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full opacity-25 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }}
                animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            />

            {/* Clouds */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="cloud-shape cloud-shape-1 top-[15%] left-[10%] animate-cloud-drift opacity-40" />
                <div className="cloud-shape cloud-shape-2 bottom-[15%] right-[10%] animate-cloud-drift-reverse opacity-30" />
            </div>

            <div className="section-container relative z-10 text-center">
                {/* Stats row */}
                <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display gradient-text-vivid">{stat.value}</div>
                            <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 font-display leading-tight">
                    Ready to build your<br />
                    <span className="gradient-text">next big thing?</span>
                </h2>

                <p className="max-w-xl mx-auto text-lg text-slate-500 mb-10 leading-relaxed">
                    From idea to deployed website in under 2 minutes.
                    No code. No templates. Just describe and launch.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/builder" className="btn-glow text-base px-10 py-4 rounded-full group inline-flex items-center sparkle-btn">
                        <Sparkles className="mr-2 h-5 w-5" />
                        Start Building Free
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/pricing" className="btn-secondary px-8 py-4 rounded-full text-base">
                        View Pricing
                    </Link>
                </div>

                <p className="mt-6 text-sm text-slate-400">
                    No credit card required · Free tier available · Cancel anytime
                </p>
            </div>
        </section>
    );
}
