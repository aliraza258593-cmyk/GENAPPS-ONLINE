import React from 'react';
import { Layers } from 'lucide-react';
import Features from '../components/Features';
import IndustryShowcase from '../components/IndustryShowcase';
import Testimonials from '../components/Testimonials';
import TrustBar from '../components/TrustBar';
import ScrollReveal from '../components/ScrollReveal';
import { motion } from 'framer-motion';

export default function FeaturesPage() {
    return (
        <div>
            {/* Premium Hero Section */}
            <section className="page-hero">
                <div className="page-hero-bg" />
                <div className="absolute inset-0 pointer-events-none">
                    <div className="cloud-shape cloud-shape-1 top-[12%] left-[20%] animate-cloud-drift opacity-40" />
                    <div className="cloud-shape cloud-shape-2 top-[25%] right-[15%] animate-cloud-drift-reverse opacity-25" />
                </div>
                <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
                <div className="section-container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-badge">
                            <Layers className="h-3.5 w-3.5 mr-2" />
                            Features
                        </span>
                    </motion.div>
                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 font-display text-slate-900"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        Everything You Need to<br />
                        <span className="gradient-text">Build & Grow</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        Not just a page builder — your full-stack engineering team in a box. From design to deploy, we've got you covered.
                    </motion.p>
                </div>
            </section>

            <Features />
            <ScrollReveal>
                <IndustryShowcase />
            </ScrollReveal>
            <ScrollReveal delay={100}>
                <TrustBar />
            </ScrollReveal>
            <ScrollReveal delay={100}>
                <Testimonials />
            </ScrollReveal>
        </div>
    );
}
