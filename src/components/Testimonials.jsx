import React, { useRef, useState, useEffect } from 'react';
import { Star, BadgeCheck, Users } from 'lucide-react';

const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'Founder, TechVenture',
        company: 'TechVenture',
        avatar: 'SC',
        gradient: 'from-blue-500 to-cyan-500',
        quote: 'Genapps saved us 3 weeks of development. We launched our SaaS landing page in 10 minutes and got our first 100 signups the same day.',
        stars: 5,
    },
    {
        name: 'Marcus Johnson',
        role: 'Freelance Developer',
        company: 'Freelance',
        avatar: 'MJ',
        gradient: 'from-purple-500 to-pink-500',
        quote: 'I use Genapps for every client project now. Generate the base, customize, deploy. My turnaround time went from 2 weeks to 2 days.',
        stars: 5,
    },
    {
        name: 'Aisha Patel',
        role: 'CTO, CloudSync',
        company: 'CloudSync',
        avatar: 'AP',
        gradient: 'from-emerald-500 to-teal-500',
        quote: 'The code quality is surprisingly good. Clean React components, proper Tailwind usage, semantic HTML. It\'s better than most junior devs write.',
        stars: 5,
    },
    {
        name: 'James Wright',
        role: 'Restaurant Owner',
        company: 'FoodieHub',
        avatar: 'JW',
        gradient: 'from-orange-500 to-red-500',
        quote: 'I know nothing about coding. I described my restaurant and Genapps built me a beautiful website. My customers love it.',
        stars: 5,
    },
    {
        name: 'Elena Rodriguez',
        role: 'Product Designer',
        company: 'DesignCo',
        avatar: 'ER',
        gradient: 'from-pink-500 to-rose-500',
        quote: 'As a designer, I\'m picky about aesthetics. Genapps actually produces designs I\'m proud to show. The AI understands modern design.',
        stars: 5,
    },
    {
        name: 'David Kim',
        role: 'Startup Founder',
        company: 'LaunchPad',
        avatar: 'DK',
        gradient: 'from-violet-500 to-purple-500',
        quote: 'We went from idea to deployed MVP in 30 minutes. Raised our seed round with a site built entirely by Genapps. Incredible.',
        stars: 5,
    },
];

export default function Testimonials() {
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let animationId;
        let scrollPos = 0;
        const speed = 0.5;

        const animate = () => {
            if (!isPaused) {
                scrollPos += speed;
                if (scrollPos >= el.scrollWidth / 2) {
                    scrollPos = 0;
                }
                el.scrollLeft = scrollPos;
            }
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [isPaused]);

    return (
        <section id="testimonials" className="section-padding relative overflow-hidden section-bg-soft">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="cloud-shape cloud-shape-1 top-[5%] left-[20%] animate-cloud-drift opacity-30" />
                <div className="cloud-shape cloud-shape-2 bottom-[10%] right-[15%] animate-cloud-drift-reverse opacity-20" />
            </div>

            <div className="section-container relative z-10">
                <div className="text-center mb-12">
                    <span className="section-badge">Testimonials</span>
                    <h2 className="section-title">
                        Loved by <span className="gradient-text">Builders</span>
                    </h2>
                    <p className="section-subtitle">
                        Join thousands of developers, designers, and entrepreneurs who ship faster with Genapps.
                    </p>

                    {/* Rating Aggregate */}
                    <div className="flex items-center justify-center mt-6 space-x-4">
                        <div className="flex space-x-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span className="text-slate-900 font-bold">4.9/5</span>
                        <span className="text-slate-500 text-sm">from 2,000+ reviews</span>
                    </div>
                </div>
            </div>

            {/* Scrolling Testimonials */}
            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white/80 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white/80 to-transparent z-10" />

                <div
                    ref={scrollRef}
                    className="flex overflow-hidden gap-5 px-4"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="glass-card group p-6 flex flex-col flex-shrink-0 w-[350px] sm:w-[400px]"
                        >
                            {/* Stars */}
                            <div className="flex space-x-1 mb-4">
                                {Array.from({ length: t.stars }).map((_, j) => (
                                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                                "{t.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center space-x-3">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${t.gradient} text-white text-xs font-bold`}>
                                    {t.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-1.5">
                                        <span className="text-sm font-semibold text-slate-900">{t.name}</span>
                                        <BadgeCheck className="h-3.5 w-3.5 text-brand-500" />
                                    </div>
                                    <div className="text-xs text-slate-500">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
