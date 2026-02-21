import React from 'react';
import { Sparkles, Rocket, Zap, Bug, Palette, Globe, Database, Code2, ArrowUpCircle } from 'lucide-react';

const releases = [
    {
        version: '2.1.0',
        date: 'February 12, 2025',
        badge: 'Latest',
        badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200/50',
        changes: [
            { type: 'feature', icon: Sparkles, text: 'Real AI-powered website generation using LongCat API' },
            { type: 'feature', icon: Globe, text: 'Multi-page routing with React Router' },
            { type: 'feature', icon: Code2, text: 'Code view in preview window with syntax highlighting' },
            { type: 'improvement', icon: Palette, text: 'Redesigned all pages with premium glassmorphic aesthetics' },
            { type: 'improvement', icon: ArrowUpCircle, text: 'Responsive device previews (desktop, tablet, mobile)' },
        ],
    },
    {
        version: '2.0.0',
        date: 'January 28, 2025',
        badge: 'Major',
        badgeColor: 'bg-brand-50 text-brand-600 border-brand-200/50',
        changes: [
            { type: 'feature', icon: Rocket, text: 'Full website generation with 9 template categories' },
            { type: 'feature', icon: Database, text: 'Supabase authentication integration' },
            { type: 'feature', icon: Globe, text: 'One-click deploy to Vercel' },
            { type: 'improvement', icon: Zap, text: 'Optimized generation speed — 3x faster' },
            { type: 'fix', icon: Bug, text: 'Fixed mobile responsive issues in generator UI' },
        ],
    },
    {
        version: '1.5.0',
        date: 'January 10, 2025',
        changes: [
            { type: 'feature', icon: Sparkles, text: 'Added 6 new templates: Fitness, YouTube, Netflix, Spotify, E-commerce, Agency' },
            { type: 'improvement', icon: Palette, text: 'Color scheme selector with 4 style options' },
            { type: 'improvement', icon: Code2, text: 'Improved code quality in generated output' },
            { type: 'fix', icon: Bug, text: 'Fixed download button not working in Safari' },
        ],
    },
    {
        version: '1.0.0',
        date: 'December 15, 2024',
        badge: 'Initial Release',
        badgeColor: 'bg-lavender-50 text-lavender-600 border-lavender-200/50',
        changes: [
            { type: 'feature', icon: Rocket, text: 'Launch of Genapps AI website builder' },
            { type: 'feature', icon: Code2, text: 'SaaS, Portfolio, and Restaurant templates' },
            { type: 'feature', icon: Globe, text: 'HTML download and code copy functionality' },
            { type: 'feature', icon: Palette, text: 'Premium glassmorphism design system' },
        ],
    },
];

const typeColors = {
    feature: 'text-emerald-500',
    improvement: 'text-blue-500',
    fix: 'text-amber-500',
};

const typeLabels = {
    feature: 'New',
    improvement: 'Improved',
    fix: 'Fixed',
};

export default function Changelog() {
    return (
        <div className="pt-24">
            {/* Hero */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="cloud-shape cloud-shape-1 top-[10%] left-[20%] animate-cloud-drift opacity-40" />
                </div>
                <div className="section-container relative z-10 text-center">
                    <span className="section-badge">
                        <Rocket className="h-3.5 w-3.5 mr-2" />
                        Changelog
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-display text-slate-900">
                        What's <span className="gradient-text">New</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        All the latest features, improvements, and fixes in Genapps.
                    </p>
                </div>
            </section>

            {/* Timeline */}
            <section className="section-padding pt-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand-400/50 via-slate-200/50 to-transparent hidden sm:block" />

                        <div className="space-y-12">
                            {releases.map((release, i) => (
                                <div key={release.version} className="relative pl-0 sm:pl-16">
                                    {/* Timeline dot */}
                                    <div className="hidden sm:flex absolute left-4 top-2 w-5 h-5 rounded-full bg-white border-2 border-brand-500 items-center justify-center shadow-sm">
                                        <div className="w-2 h-2 rounded-full bg-brand-400" />
                                    </div>

                                    {/* Release Card */}
                                    <div className="glass-card p-6 sm:p-8">
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <h2 className="text-2xl font-bold text-slate-900 font-display">v{release.version}</h2>
                                            {release.badge && (
                                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${release.badgeColor}`}>
                                                    {release.badge}
                                                </span>
                                            )}
                                            <span className="text-sm text-slate-400">{release.date}</span>
                                        </div>

                                        <div className="space-y-3">
                                            {release.changes.map((change, j) => (
                                                <div key={j} className="flex items-start space-x-3 group">
                                                    <change.icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${typeColors[change.type]}`} />
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`text-xs font-bold uppercase ${typeColors[change.type]}`}>
                                                            {typeLabels[change.type]}
                                                        </span>
                                                        <span className="text-sm text-slate-600">{change.text}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
