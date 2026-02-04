import React, { useState, useEffect, useRef } from "react";
import {
    Sparkles,
    ArrowRight,
    Play,
    Zap,
    Globe,
    Shield,
    Code2,
    Layers,
    Palette,
    Rocket,
    Star,
    Users,
    CheckCircle2,
    ChevronRight
} from "lucide-react";
import { cn } from "../../../lib/utils";

// Animated counter hook
const useCounter = (end: number, duration: number = 2000, startDelay: number = 0) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setStarted(true), startDelay);
        return () => clearTimeout(timeout);
    }, [startDelay]);

    useEffect(() => {
        if (!started) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, started]);

    return count;
};

const stats = [
    { value: 50000, suffix: '+', label: 'Apps Built', icon: Rocket },
    { value: 15000, suffix: '+', label: 'Happy Creators', icon: Users },
    { value: 99.9, suffix: '%', label: 'Uptime', icon: Shield, decimals: 1 },
    { value: 4.9, suffix: '/5', label: 'User Rating', icon: Star, decimals: 1 }
];

const features = [
    {
        icon: Zap,
        title: 'Lightning Fast',
        desc: 'Generate production-ready apps in under 30 seconds',
        gradient: 'from-yellow-500 to-orange-500'
    },
    {
        icon: Palette,
        title: 'Stunning Design',
        desc: 'AI creates beautiful, modern UIs with perfect styling',
        gradient: 'from-pink-500 to-rose-500'
    },
    {
        icon: Code2,
        title: 'Clean Code',
        desc: 'Readable, maintainable React code with best practices',
        gradient: 'from-cyan-500 to-blue-500'
    },
    {
        icon: Globe,
        title: 'Deploy Anywhere',
        desc: 'One-click deploy to Vercel, GitHub, or download files',
        gradient: 'from-emerald-500 to-teal-500'
    },
    {
        icon: Layers,
        title: 'Component Library',
        desc: 'Rich library of pre-built components and templates',
        gradient: 'from-violet-500 to-purple-500'
    },
    {
        icon: Shield,
        title: 'Enterprise Ready',
        desc: 'Secure, scalable infrastructure for serious builders',
        gradient: 'from-indigo-500 to-blue-500'
    }
];

const testimonials = [
    {
        quote: "GenApps turned my idea into a working prototype in minutes. Absolutely game-changing!",
        author: "Sarah Chen",
        role: "Startup Founder",
        avatar: "SC"
    },
    {
        quote: "The code quality is remarkable. I was able to customize and deploy the same day.",
        author: "Michael Ross",
        role: "Full-Stack Developer",
        avatar: "MR"
    },
    {
        quote: "We use GenApps to rapidly prototype new features before committing to development.",
        author: "Emily Zhang",
        role: "Product Manager at Stripe",
        avatar: "EZ"
    }
];

const logos = ['Google', 'Microsoft', 'Stripe', 'Vercel', 'Shopify', 'Notion'];

export const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleGetStarted = () => {
        window.location.href = '/login';
    };

    return (
        <div className="relative min-h-screen bg-[#09090b] overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Gradient orbs */}
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-violet-600/20 rounded-full blur-[180px] animate-pulse-slow" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-fuchsia-600/15 rounded-full blur-[150px] animate-pulse-slow delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-600/10 rounded-full blur-[200px]" />

                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '80px 80px'
                    }}
                />

                {/* Noise overlay */}
                <div className="absolute inset-0 bg-noise opacity-[0.02]" />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Badge */}
                    <div className={cn(
                        "flex justify-center mb-8 transition-all duration-1000",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-full text-sm backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                            </span>
                            <span className="text-violet-300 font-medium">Now with GPT-5.2 & Claude Opus 4.5</span>
                            <ChevronRight className="w-4 h-4 text-violet-400" />
                        </div>
                    </div>

                    {/* Main Headline */}
                    <div className={cn(
                        "text-center transition-all duration-1000 delay-100",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}>
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.05] mb-6">
                            Turn Ideas Into
                            <br />
                            <span className="relative inline-block">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
                                    Working Apps
                                </span>
                                <svg
                                    className="absolute -bottom-2 left-0 w-full h-3"
                                    viewBox="0 0 300 12"
                                    fill="none"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M2 10C50 4 100 4 150 7C200 10 250 6 298 4"
                                        stroke="url(#underline-grad)"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        className="animate-draw"
                                    />
                                    <defs>
                                        <linearGradient id="underline-grad" x1="0" y1="0" x2="300" y2="0">
                                            <stop offset="0%" stopColor="#8b5cf6" />
                                            <stop offset="50%" stopColor="#d946ef" />
                                            <stop offset="100%" stopColor="#ec4899" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
                            The AI-powered platform that transforms your descriptions into
                            <span className="text-white font-medium"> production-ready web applications</span>.
                            No coding required. Just describe and deploy.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className={cn(
                        "flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-200",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}>
                        <button
                            onClick={handleGetStarted}
                            className="group relative px-8 py-4 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105"
                        >
                            <span className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                Get Started Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>

                        <button className="group flex items-center gap-3 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 text-white ml-0.5" />
                            </div>
                            <span className="text-white font-medium">Watch Demo</span>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className={cn(
                        "grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto mb-20 transition-all duration-1000 delay-300",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}>
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <stat.icon className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                    <CounterDisplay end={stat.value} decimals={stat.decimals} />
                                    <span className="text-violet-400">{stat.suffix}</span>
                                </div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Everything You Need
                        </h2>
                        <p className="text-xl text-gray-400">
                            Powerful features for serious builders
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="group p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-300"
                            >
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 group-hover:scale-110 transition-transform",
                                    feature.gradient
                                )}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
                        Loved by Builders
                    </h2>

                    <div className="relative h-48">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "absolute inset-0 flex flex-col items-center justify-center transition-all duration-500",
                                    activeTestimonial === i
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4 pointer-events-none"
                                )}
                            >
                                <p className="text-2xl text-gray-300 italic mb-6 max-w-2xl">
                                    "{t.quote}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-medium">
                                        {t.avatar}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-white font-medium">{t.author}</p>
                                        <p className="text-sm text-gray-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTestimonial(i)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all",
                                    activeTestimonial === i
                                        ? "bg-violet-500 w-8"
                                        : "bg-white/20 hover:bg-white/40"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Logos */}
            <section className="relative z-10 py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-xs text-gray-600 uppercase tracking-[0.2em] mb-10">
                        Trusted by teams at
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                        {logos.map((logo, i) => (
                            <div
                                key={i}
                                className="text-2xl font-bold text-gray-700 hover:text-gray-500 transition-colors cursor-default"
                            >
                                {logo}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="relative p-12 rounded-3xl overflow-hidden">
                        {/* Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-90" />
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                        <div className="relative z-10 text-center">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Ready to Build?
                            </h2>
                            <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
                                Join thousands of creators building amazing apps with AI
                            </p>
                            <button
                                onClick={handleGetStarted}
                                className="px-8 py-4 bg-white text-violet-600 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
                            >
                                Start Building Free →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Styles */}
            <style>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(1.05); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }
                .delay-1000 {
                    animation-delay: 1s;
                }
                @keyframes draw {
                    from { stroke-dashoffset: 300; }
                    to { stroke-dashoffset: 0; }
                }
                .animate-draw {
                    stroke-dasharray: 300;
                    animation: draw 1.5s ease-out forwards;
                    animation-delay: 0.5s;
                }
            `}</style>
        </div>
    );
};

// Counter display component
const CounterDisplay = ({ end, decimals = 0 }: { end: number; decimals?: number }) => {
    const count = useCounter(end);
    return <>{decimals > 0 ? (count / Math.pow(10, decimals)).toFixed(decimals) : count.toLocaleString()}</>;
};
