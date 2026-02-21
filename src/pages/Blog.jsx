import React, { useState } from 'react';
import { Search, Clock, Tag, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';

const categories = ['All', 'Tutorials', 'Updates', 'Engineering', 'Design', 'AI'];

const categoryColors = {
    Tutorials: 'from-emerald-400 to-teal-500',
    Updates: 'from-brand-400 to-lavender-500',
    Engineering: 'from-blue-400 to-cyan-500',
    Design: 'from-pink-400 to-rose-500',
    AI: 'from-amber-400 to-orange-500',
};

const posts = [
    {
        title: 'How We Generate Production-Ready Websites in Under 30 Seconds',
        excerpt: 'A deep dive into the AI pipeline behind Genapps — from prompt to deployed site.',
        category: 'Engineering',
        date: 'Feb 10, 2025',
        readTime: '8 min',
        featured: true,
    },
    {
        title: 'Introducing 9 New Templates: YouTube, Netflix, Spotify & More',
        excerpt: 'Build clone-quality interfaces with our new entertainment templates.',
        category: 'Updates',
        date: 'Feb 5, 2025',
        readTime: '4 min',
    },
    {
        title: '5 Design Principles That Make AI-Generated Websites Look Human',
        excerpt: 'Why our generated sites don\'t look "AI-made" — and the design system behind it.',
        category: 'Design',
        date: 'Jan 28, 2025',
        readTime: '6 min',
    },
    {
        title: 'Building Your First SaaS Landing Page with Genapps',
        excerpt: 'Step-by-step tutorial on creating a conversion-optimized SaaS landing page.',
        category: 'Tutorials',
        date: 'Jan 20, 2025',
        readTime: '10 min',
    },
    {
        title: 'The Future of AI in Web Development',
        excerpt: 'Where we think AI-assisted coding is headed in 2025 and beyond.',
        category: 'AI',
        date: 'Jan 15, 2025',
        readTime: '7 min',
    },
    {
        title: 'How Freelancers Use Genapps to 10x Client Delivery',
        excerpt: 'Real stories from freelancers who cut their website delivery time from days to minutes.',
        category: 'Tutorials',
        date: 'Jan 10, 2025',
        readTime: '5 min',
    },
];

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = posts.filter(post => {
        const matchesCat = activeCategory === 'All' || post.category === activeCategory;
        const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
    });

    return (
        <div className="pt-24">
            {/* Hero */}
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="cloud-shape cloud-shape-1 top-[10%] left-[20%] animate-cloud-drift opacity-40" />
                </div>
                <div className="section-container relative z-10 text-center">
                    <span className="section-badge">
                        <BookOpen className="h-3.5 w-3.5 mr-2" />
                        Blog
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-display text-slate-900">
                        Latest from <span className="gradient-text">Genapps</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Tutorials, updates, and insights from the team building the future of AI web development.
                    </p>
                </div>
            </section>

            <section className="section-padding pt-8">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search + Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white/60 border border-slate-200/50 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300/50"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${activeCategory === cat
                                        ? 'bg-brand-50 text-brand-600 border border-brand-200/50'
                                        : 'bg-white/40 text-slate-500 border border-white/30 hover:text-slate-700 hover:bg-white/60'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Featured Post */}
                    {activeCategory === 'All' && !searchQuery && (
                        <div className="mb-8">
                            {posts.filter(p => p.featured).map((post) => (
                                <div key={post.title} className="glass-card p-8 group cursor-pointer">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs font-bold text-brand-500 uppercase">Featured</span>
                                        <span className="text-xs text-slate-400">•</span>
                                        <span className="text-xs text-slate-400">{post.category}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-3 font-display group-hover:text-brand-500 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-500 mb-4 leading-relaxed">{post.excerpt}</p>
                                    <div className="flex items-center gap-4 text-xs text-slate-400">
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} read</span>
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {filtered.filter(p => !(activeCategory === 'All' && !searchQuery && p.featured)).map((post) => (
                            <div key={post.title} className="glass-card overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
                                {/* Gradient top accent bar */}
                                <div className={`h-1 bg-gradient-to-r ${categoryColors[post.category] || 'from-slate-300 to-slate-400'}`} />
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-medium text-brand-500 px-2 py-0.5 rounded-full bg-brand-50">{post.category}</span>
                                        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-medium border border-amber-200/50">Coming Soon</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 font-display group-hover:text-brand-500 transition-colors leading-snug">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">{post.excerpt}</p>
                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                                        <div className="flex items-center gap-2">
                                            <span>{post.date}</span>
                                            <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-slate-500">No articles found matching your search.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
