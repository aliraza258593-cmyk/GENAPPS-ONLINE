import React, { useState, useEffect, useRef } from 'react';
import { Target, Heart, Lightbulb, Rocket, Users, Globe, Code2, Award } from 'lucide-react';

const values = [
    { icon: Target, title: 'Mission-Driven', description: 'We believe everyone should be able to bring their ideas to life on the web, regardless of technical skill.' },
    { icon: Heart, title: 'User-First Design', description: 'Every feature we build starts with the user experience. Simplicity is our north star.' },
    { icon: Lightbulb, title: 'AI Innovation', description: 'We push the boundaries of what AI can do for web development, making the impossible routine.' },
    { icon: Rocket, title: 'Ship Fast', description: 'We believe in rapid iteration. Build, test, learn, repeat — and help our users do the same.' },
];

const stats = [
    { value: '50K+', label: 'Websites Generated' },
    { value: '10K+', label: 'Active Users' },
    { value: '9', label: 'Templates' },
    { value: '120+', label: 'Countries' },
];

const team = [
    { name: 'Alex Chen', role: 'Founder & CEO', bio: 'Ex-Google engineer passionate about democratizing web development.' },
    { name: 'Sarah Kim', role: 'Head of AI', bio: 'PhD in ML from Stanford. Building the future of AI-assisted coding.' },
    { name: 'Marcus Johnson', role: 'Lead Designer', bio: 'Former Apple designer. Obsessed with pixel-perfect interfaces.' },
    { name: 'Emily Zhang', role: 'Head of Engineering', bio: 'Full-stack wizard with a love for clean, performant code.' },
];

function AnimatedCounter({ target }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);

    // Parse the target: "50K+" → {num: 50, suffix: "K+"}
    const numMatch = target.match(/^(\d+)/);
    const num = numMatch ? parseInt(numMatch[1]) : 0;
    const suffix = target.replace(/^\d+/, '');

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasAnimated) {
                setHasAnimated(true);
                const duration = 1500;
                const startTime = Date.now();
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    setCount(Math.round(num * eased));
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            }
        }, { threshold: 0.5 });
        observer.observe(el);
        return () => observer.disconnect();
    }, [num, hasAnimated]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
    return (
        <div className="pt-24">
            {/* Hero */}
            <section className="py-16 sm:py-24 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="cloud-shape cloud-shape-1 top-[10%] left-[20%] animate-cloud-drift opacity-40" />
                    <div className="cloud-shape cloud-shape-2 top-[5%] right-[10%] animate-cloud-drift-reverse opacity-30" />
                </div>
                <div className="section-container relative z-10 text-center">
                    <span className="section-badge">
                        <Users className="h-3.5 w-3.5 mr-2" />
                        About Us
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 font-display text-slate-900">
                        Making Web Development<br />
                        <span className="gradient-text">Accessible to Everyone</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Genapps AI was born from a simple idea: what if anyone could build a beautiful,
                        production-ready website just by describing what they want?
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 border-y border-slate-200/50 section-bg-soft">
                <div className="section-container">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
                                    <AnimatedCounter target={stat.value} />
                                </div>
                                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="section-padding">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6 font-display">Our Story</h2>
                    <div className="space-y-4 text-slate-500 leading-relaxed">
                        <p>
                            We started Genapps in 2024 with a clear mission: eliminate the barriers between ideas and live websites.
                            As developers ourselves, we knew the pain of spending days setting up boilerplate, configuring build tools,
                            and making responsive designs work across devices.
                        </p>
                        <p>
                            With advances in AI, we saw an opportunity to change all of that. What if you could describe your website
                            in plain English and get a fully functional, beautifully designed site in under 30 seconds?
                        </p>
                        <p>
                            Today, Genapps powers over 50,000 websites across 120+ countries. From startups launching their first
                            landing page to agencies delivering client projects faster — our AI makes it possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding section-bg-soft">
                <div className="section-container">
                    <div className="text-center mb-12">
                        <h2 className="section-title">Our <span className="gradient-text">Values</span></h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {values.map((val) => (
                            <div key={val.title} className="glass-card p-6 group">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-50 border border-brand-200/50 mb-4 group-hover:bg-brand-100 transition-colors">
                                    <val.icon className="h-5 w-5 text-brand-500" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">{val.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{val.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section-padding">
                <div className="section-container">
                    <div className="text-center mb-12">
                        <h2 className="section-title">Meet the <span className="gradient-text">Team</span></h2>
                        <p className="section-subtitle">The people behind Genapps AI.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {team.map((member) => (
                            <div key={member.name} className="glass-card p-6 text-center group">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-400 to-lavender-500 mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">{member.name}</h3>
                                <p className="text-xs text-brand-500 font-medium mb-2">{member.role}</p>
                                <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
