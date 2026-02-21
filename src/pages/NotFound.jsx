import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles, BookOpen, HelpCircle } from 'lucide-react';

const suggestions = [
    { label: 'Generate a Website', to: '/builder', icon: Sparkles, color: 'text-brand-500' },
    { label: 'Browse Features', to: '/features', icon: BookOpen, color: 'text-emerald-500' },
    { label: 'Get Help', to: '/contact', icon: HelpCircle, color: 'text-amber-500' },
];

export default function NotFound() {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 200);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pt-24 min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="cloud-shape cloud-shape-1 top-[10%] left-[20%] animate-cloud-drift opacity-40" />
                <div className="cloud-shape cloud-shape-2 top-[5%] right-[15%] animate-cloud-drift-reverse opacity-30" />
            </div>

            <div className="section-container relative z-10 text-center max-w-lg animate-scale-in">
                <div className="glass-card p-10 sm:p-12">
                    {/* Animated 404 */}
                    <div className="relative mb-6">
                        <h1
                            className={`text-[6rem] leading-none font-extrabold font-display transition-all duration-100 ${glitch ? 'text-red-400 translate-x-0.5' : 'text-slate-200'}`}
                        >
                            404
                        </h1>
                        <h1
                            className="text-[6rem] leading-none font-extrabold font-display absolute inset-0 gradient-text"
                            style={{ WebkitBackgroundClip: 'text' }}
                        >
                            404
                        </h1>
                    </div>

                    <h2 className="text-xl font-bold text-slate-800 font-display mb-2">
                        Lost in the cloud
                    </h2>
                    <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                        This page doesn't exist or may have moved. Here are some helpful links:
                    </p>

                    {/* Suggested pages */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {suggestions.map((s) => (
                            <Link
                                key={s.to}
                                to={s.to}
                                className="glass-card p-3 hover:shadow-lg transition-all group"
                            >
                                <s.icon className={`h-5 w-5 mx-auto mb-1.5 ${s.color} group-hover:scale-110 transition-transform`} />
                                <span className="text-[11px] font-semibold text-slate-600">{s.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Home button */}
                    <Link
                        to="/"
                        className="btn-primary w-full py-3.5 rounded-xl sparkle-btn flex items-center justify-center"
                    >
                        <Home className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
