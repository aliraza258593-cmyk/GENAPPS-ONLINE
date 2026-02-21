import React, { useState } from 'react';
import { Plus, Minus, Search } from 'lucide-react';

const faqs = [
    {
        category: 'General',
        items: [
            {
                q: 'What kind of websites can Genapps build?',
                a: 'Genapps can generate landing pages, full-stack SaaS apps, portfolios, e-commerce sites, restaurant websites, dashboards, and more. We support React + Tailwind, Node.js backends, and Supabase database integration.',
            },
            {
                q: 'Do I own the code that Genapps generates?',
                a: 'Absolutely! You own 100% of the generated code. Download it, modify it, deploy it anywhere — it\'s yours. No lock-in, no attribution required (though we appreciate the "Built by Genapps" badge!).',
            },
            {
                q: 'How is this different from Wix or WordPress?',
                a: 'Unlike drag-and-drop builders, Genapps generates real, production-quality source code. You get clean React components, proper CSS, and actual deployable files — not a proprietary locked platform.',
            },
        ],
    },
    {
        category: 'Technical',
        items: [
            {
                q: 'Can I customize the generated code?',
                a: 'Yes! The code is clean, well-structured, and fully editable. Open it in VS Code, make changes, and deploy. It\'s standard React + Tailwind — no proprietary framework to learn.',
            },
            {
                q: 'How does deployment work?',
                a: 'One-click deploy to Vercel (free tier available). You can also push the code to a GitHub repository or download it and deploy to any hosting provider — AWS, Netlify, your own VPS, etc.',
            },
            {
                q: 'What AI model does Genapps use?',
                a: 'We use the latest large language models specifically fine-tuned for code generation. Our system produces clean, error-free code with proper modern web development practices.',
            },
        ],
    },
    {
        category: 'Billing',
        items: [
            {
                q: 'Is there a free tier?',
                a: 'Yes! You can generate and preview websites for free. The Starter plan ($19/mo) unlocks downloads and basic deployment. Pro ($49/mo) adds advanced templates and Vercel deployment.',
            },
            {
                q: 'Can I use Genapps for client projects?',
                a: 'Yes! Many freelancers and agencies use Genapps to speed up client work. Generate the base, customize to your client\'s brand, and deliver — all covered under our license.',
            },
        ],
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const [activeCategory, setActiveCategory] = useState('General');
    const [searchQuery, setSearchQuery] = useState('');

    const allFaqs = faqs.find(f => f.category === activeCategory)?.items || [];
    const filteredFaqs = searchQuery
        ? faqs.flatMap(f => f.items).filter(item =>
            item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : allFaqs;

    return (
        <section id="faq" className="section-padding relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <span className="section-badge">FAQ</span>
                    <h2 className="section-title">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                    <p className="section-subtitle">
                        Everything you need to know about Genapps.
                    </p>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300/50 focus:border-brand-300 transition-all"
                        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
                    />
                </div>

                {/* Category Tabs */}
                {!searchQuery && (
                    <div className="flex justify-center gap-2 mb-8">
                        {faqs.map((cat) => (
                            <button
                                key={cat.category}
                                onClick={() => { setActiveCategory(cat.category); setOpenIndex(null); }}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat.category
                                    ? 'bg-white text-brand-600 border border-white/60'
                                    : 'bg-white/30 text-slate-500 border border-white/20 hover:bg-white/50 hover:text-slate-700'
                                    }`}
                                style={activeCategory === cat.category ? { boxShadow: '0 4px 16px rgba(0,0,0,0.06)' } : {}}
                            >
                                {cat.category}
                            </button>
                        ))}
                    </div>
                )}

                {/* Accordion */}
                <div className="space-y-3">
                    {filteredFaqs.map((faq, i) => (
                        <div
                            key={i}
                            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === i
                                ? 'bg-white/70 border-brand-200/50 backdrop-blur-xl'
                                : 'bg-white/40 border-white/40 hover:bg-white/55 backdrop-blur-xl'
                                }`}
                            style={{ boxShadow: openIndex === i ? '0 8px 32px rgba(0,0,0,0.06)' : '0 2px 8px rgba(0,0,0,0.02)' }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full px-6 py-5 text-left flex items-center justify-between"
                            >
                                <span className={`font-semibold text-sm sm:text-base pr-4 ${openIndex === i ? 'text-slate-900' : 'text-slate-700'}`}>
                                    {faq.q}
                                </span>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${openIndex === i
                                    ? 'bg-brand-50 text-brand-500'
                                    : 'bg-slate-100/60 text-slate-400'
                                    }`}>
                                    {openIndex === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                </div>
                            </button>

                            <div className={`transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                <div className="px-6 pb-5">
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
