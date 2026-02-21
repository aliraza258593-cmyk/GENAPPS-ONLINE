import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Showcase from '../components/Showcase';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import ScrollReveal from '../components/ScrollReveal';

export default function Home() {
    return (
        <div>
            <Hero />
            <ScrollReveal>
                <HowItWorks />
            </ScrollReveal>
            <ScrollReveal delay={100}>
                <Features />
            </ScrollReveal>
            <ScrollReveal delay={100}>
                <Showcase />
            </ScrollReveal>
            <ScrollReveal delay={100}>
                <Pricing />
            </ScrollReveal>
            <ScrollReveal delay={100}>
                <Testimonials />
            </ScrollReveal>
            <ScrollReveal delay={100}>
                <CTA />
            </ScrollReveal>
        </div>
    );
}
