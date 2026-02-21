import React, { useRef, useState, useEffect } from 'react';
import { Code2, Zap, Globe, Palette, Smartphone, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        name: 'Full-Stack Apps',
        description: 'Generate complete websites with frontend, backend, APIs, and databases — not just templates.',
        icon: Code2,
        gradient: 'from-blue-400 to-cyan-400',
    },
    {
        name: 'One-Click Deploy',
        description: 'Push to Vercel or GitHub with a single click. Zero DevOps knowledge needed.',
        icon: Globe,
        gradient: 'from-indigo-400 to-blue-400',
    },
    {
        name: 'Production Ready',
        description: 'Clean React + Tailwind code with semantic HTML, optimized assets, and SEO — all baked in.',
        icon: Zap,
        gradient: 'from-emerald-400 to-teal-400',
    },
    {
        name: 'AI-Powered Design',
        description: 'Choose from Startup, Corporate, or Creative styles. AI adapts colors, typography, and layout.',
        icon: Palette,
        gradient: 'from-orange-400 to-pink-400',
    },
    {
        name: 'Mobile Responsive',
        description: 'Every generated site is mobile-first and looks stunning on any device — phone, tablet, or desktop.',
        icon: Smartphone,
        gradient: 'from-pink-400 to-rose-400',
    },
    {
        name: '50+ Templates',
        description: 'Professional templates for SaaS, e-commerce, portfolios, restaurants, fitness, agencies, and more.',
        icon: Layers,
        gradient: 'from-violet-400 to-purple-400',
    },
];

export default function Features() {
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
        <section id="features" className="section-padding relative overflow-hidden" ref={sectionRef}>
            <div className="section-container relative z-10">
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-badge">Features</span>
                    <h2 className="section-title">
                        Everything you need to<br />
                        <span className="gradient-text">build and grow.</span>
                    </h2>
                    <p className="section-subtitle">
                        Not just a page builder — your full-stack engineering team in a box.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.name}
                            className="glass-card group p-7"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Icon */}
                            <div className="relative inline-flex mb-5">
                                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                    <feature.icon className="h-5 w-5 text-white" />
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-base font-bold text-slate-900 mb-2 font-display">
                                {feature.name}
                            </h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
