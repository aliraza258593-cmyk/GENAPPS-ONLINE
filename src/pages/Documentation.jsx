import React, { useState } from 'react';
import { Book, Code2, Palette, Rocket, Zap, Database, Search, ChevronRight, Copy, Check } from 'lucide-react';

const sections = [
    { id: 'getting-started', label: 'Getting Started', icon: Rocket },
    { id: 'templates', label: 'Templates', icon: Palette },
    { id: 'api', label: 'API Reference', icon: Code2 },
    { id: 'deployment', label: 'Deployment', icon: Zap },
    { id: 'database', label: 'Database', icon: Database },
];

const content = {
    'getting-started': {
        title: 'Getting Started',
        description: 'Learn how to generate your first website with Genapps AI.',
        blocks: [
            {
                title: '1. Describe Your Website',
                text: 'Navigate to the Generator section on the homepage. Enter a description of the website you want to build. Be specific — mention the type of business, target audience, key features, and preferred style.',
            },
            {
                title: '2. Choose a Template',
                text: 'Select from 9 template categories: SaaS, Portfolio, Restaurant, E-Commerce, Agency, Fitness, YouTube, Netflix, or Spotify. Each template provides a specialized structure for that type of website.',
            },
            {
                title: '3. Select Color Style',
                text: 'Choose from Dark, Light, Gradient, or Minimal color themes. This sets the overall visual tone of your generated website.',
            },
            {
                title: '4. Generate & Preview',
                text: 'Click "Generate My Website" and wait ~30 seconds. Your AI-generated website will appear in a responsive preview window where you can switch between desktop, tablet, and mobile views.',
            },
            {
                title: '5. Download or Deploy',
                text: 'Download the HTML file to your computer, copy the code to your clipboard, or open it in a new tab. The generated code is 100% yours — no lock-in.',
            },
        ],
    },
    templates: {
        title: 'Templates',
        description: 'Explore all available templates and their best use cases.',
        blocks: [
            { title: 'SaaS', text: 'Perfect for startup landing pages, feature showcases, and product pages. Includes hero, features grid, pricing tables, testimonials, FAQ, and CTA sections.' },
            { title: 'Portfolio', text: 'Ideal for developers, designers, and freelancers. Includes about section, project showcase, skills display, experience timeline, and contact form.' },
            { title: 'Restaurant', text: 'Restaurant, café, or food business websites. Includes menu display, reservation form, gallery, location info, and customer reviews.' },
            { title: 'E-Commerce', text: 'Online stores with product grids, category pages, shopping features, deal sections, and trust badges.' },
            { title: 'Agency', text: 'Creative and digital agency websites with service listings, portfolio/case studies, team profiles, and client logos.' },
            { title: 'Fitness', text: 'Gym, studio, and personal trainer websites with class schedules, trainer profiles, membership pricing, and booking.' },
            { title: 'YouTube', text: 'Video platform clone with search, sidebar, category filters, and video grid layout.' },
            { title: 'Netflix', text: 'Streaming entertainment interface with hero banner, horizontal scrolling content rows, and immersive dark design.' },
            { title: 'Spotify', text: 'Music player interface with sidebar navigation, playlist views, song lists, and bottom player bar.' },
        ],
    },
    api: {
        title: 'API Reference',
        description: 'Integrate Genapps AI into your own application.',
        blocks: [
            { title: 'Generate Website', text: 'Use the generateWebsite() function to create websites programmatically.', code: `import { generateWebsite } from './lib/longcat';\n\nconst html = await generateWebsite(\n  "A modern fitness studio website",\n  "fitness",\n  "dark",\n  (step) => console.log("Step:", step)\n);\n\n// Returns complete HTML string` },
            { title: 'Parameters', text: 'prompt (string) — description of the website to generate.\ntemplate (string) — one of: saas, portfolio, restaurant, ecommerce, agency, fitness, youtube, netflix, spotify.\ncolorStyle (string) — one of: dark, light, gradient, minimal.\nonProgress (function) — callback receiving step number (1-3).' },
            { title: 'Response', text: 'Returns a complete HTML string (<!DOCTYPE html>...) ready to be rendered in an iframe, saved as a file, or deployed. The HTML includes Tailwind CSS via CDN, Google Fonts, and all styling inline.' },
        ],
    },
    deployment: {
        title: 'Deployment',
        description: 'Deploy your generated website to the web.',
        blocks: [
            { title: 'Download HTML', text: 'Click the Download button in the preview window. You\'ll get a single .html file that works anywhere — just upload it to any web host.' },
            { title: 'Static Hosting', text: 'Upload the HTML file to any static hosting provider: Vercel, Netlify, GitHub Pages, AWS S3, or Firebase Hosting. All work with a free tier.' },
            { title: 'Custom Domain', text: 'After deploying to a host, point your custom domain\'s DNS to the hosting provider. Most providers offer free SSL certificates.' },
        ],
    },
    database: {
        title: 'Database Integration',
        description: 'Add data persistence with Supabase.',
        blocks: [
            { title: 'Supabase Setup', text: 'Genapps uses Supabase for authentication. Create a free Supabase project at supabase.com, then add your project URL and anon key to the .env file.' },
            { title: 'Authentication', text: 'Email/password signup and login are built in. GitHub OAuth is also supported. User sessions are managed automatically by Supabase.' },
            { title: 'Coming Soon', text: 'Future versions will include generated CRUD operations, real-time data subscriptions, and row-level security policies — all configured automatically.' },
        ],
    },
};

export default function Documentation() {
    const [activeSection, setActiveSection] = useState('getting-started');
    const [copiedBlock, setCopiedBlock] = useState(null);

    const section = content[activeSection];

    const handleCopyCode = (code, blockIndex) => {
        navigator.clipboard.writeText(code);
        setCopiedBlock(blockIndex);
        setTimeout(() => setCopiedBlock(null), 2000);
    };

    return (
        <div className="pt-24">
            {/* Hero */}
            <section className="py-12 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="cloud-shape cloud-shape-1 top-[10%] left-[30%] animate-cloud-drift opacity-30" />
                </div>
                <div className="section-container relative z-10 text-center">
                    <span className="section-badge">
                        <Book className="h-3.5 w-3.5 mr-2" />
                        Documentation
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-display text-slate-900">
                        <span className="gradient-text">Docs</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Everything you need to know about using Genapps AI.
                    </p>
                </div>
            </section>

            <section className="section-padding pt-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-[220px_1fr] gap-8">
                        {/* Sidebar */}
                        <div className="lg:sticky lg:top-24 lg:h-fit">
                            <nav className="space-y-1">
                                {sections.map((s) => (
                                    <button
                                        key={s.id}
                                        onClick={() => setActiveSection(s.id)}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${activeSection === s.id
                                            ? 'bg-brand-50 text-brand-600 border border-brand-200/50'
                                            : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                                            }`}
                                    >
                                        <s.icon className="h-4 w-4 flex-shrink-0" />
                                        {s.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Content */}
                        <div className="min-w-0">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 font-display mb-2">{section.title}</h2>
                                <p className="text-slate-500">{section.description}</p>
                            </div>

                            <div className="space-y-6">
                                {section.blocks.map((block, i) => (
                                    <div key={i} className="glass-card p-6">
                                        <h3 className="font-semibold text-slate-900 mb-2">{block.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{block.text}</p>
                                        {block.code && (
                                            <div className="mt-4 relative">
                                                <button
                                                    onClick={() => handleCopyCode(block.code, i)}
                                                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
                                                >
                                                    {copiedBlock === i ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                                                </button>
                                                <pre className="bg-slate-900 rounded-xl p-4 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed">
                                                    <code>{block.code}</code>
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
