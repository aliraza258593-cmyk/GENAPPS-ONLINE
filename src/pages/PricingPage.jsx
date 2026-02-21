import React from 'react';
import { Sparkles } from 'lucide-react';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import { motion } from 'framer-motion';

export default function PricingPage() {
    return (
        <div>
            {/* Premium Hero Section */}
            <section className="page-hero">
                <div className="page-hero-bg" />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="cloud-shape cloud-shape-1 top-[10%] left-[15%] animate-cloud-drift opacity-40" />
                    <div className="cloud-shape cloud-shape-2 top-[20%] right-[10%] animate-cloud-drift-reverse opacity-30" />
                </div>
                <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
                <div className="section-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-badge">
                            <Sparkles className="h-3.5 w-3.5 mr-2" />
                            Pricing
                        </span>
                    </motion.div>
                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 font-display text-slate-900"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        Simple, Transparent <span className="gradient-text">Pricing</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        Start free. Upgrade when you're ready. No hidden fees, no surprises. Cancel anytime.
                    </motion.p>
                </div>
            </section>

            <Pricing />
            <FAQ />
        </div>
    );
}
