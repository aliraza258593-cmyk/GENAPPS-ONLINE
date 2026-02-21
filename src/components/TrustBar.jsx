import React, { useState, useEffect, useRef } from 'react';
import { Shield, Globe, Clock, Users, TrendingUp, Award } from 'lucide-react';

function AnimatedStat({ target, suffix, label, icon: Icon }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const start = Date.now();
                    const duration = 2000;
                    const step = () => {
                        const elapsed = Date.now() - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * target));
                        if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return (
        <div className="text-center group" ref={ref}>
            <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200/50 mb-4 group-hover:bg-brand-100 transition-all duration-300">
                <Icon className="h-6 w-6 text-brand-500" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display count-up">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-sm text-slate-500 mt-1">{label}</div>
        </div>
    );
}

export default function TrustBar() {
    return (
        <section className="relative py-20 overflow-hidden section-bg-soft border-y border-slate-200/50">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="cloud-shape cloud-shape-1 top-[20%] left-[30%] animate-cloud-drift opacity-20" />
            </div>

            <div className="section-container relative z-10">
                <div className="text-center mb-12">
                    <span className="section-badge">
                        <Shield className="h-3.5 w-3.5 mr-2" />
                        Trusted by Builders
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                        The numbers speak for themselves
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                    <AnimatedStat target={10000} suffix="+" label="Websites Built" icon={Globe} />
                    <AnimatedStat target={5000} suffix="+" label="Active Users" icon={Users} />
                    <AnimatedStat target={99} suffix=".9%" label="Uptime" icon={Clock} />
                    <AnimatedStat target={50} suffix="+" label="Templates" icon={Award} />
                    <AnimatedStat target={92} suffix="%" label="Satisfaction" icon={TrendingUp} />
                    <AnimatedStat target={120} suffix="s" label="Avg Build Time" icon={Clock} />
                </div>
            </div>
        </section>
    );
}
