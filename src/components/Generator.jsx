import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Wand2, Loader2, AlertCircle, Palette, Layout, ChevronRight, ChevronDown, Brain, Smartphone, Globe, Zap, Check, Code2, Cpu, Paintbrush, Rocket, PenTool, ArrowRight, Send, Star, TrendingUp, Users, Clock, Lock, Crown, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { generateWebsite, enhancePrompt, GenerationError } from '../lib/longcat';
import PreviewWindow from './PreviewWindow';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { saveGeneration, getGenerationCount } from '../lib/supabase';

const templates = [
    { id: 'saas', label: 'SaaS Landing', emoji: 'ðŸš€', desc: 'Startup-ready', prompt: 'Build a premium SaaS startup website for "CloudFlow" €” an AI-powered project management tool. Include: sticky glassmorphism navbar with mobile hamburger menu, dramatic hero with animated gradient headline and 2 CTA buttons, features grid (6 features with icons), pricing section with monthly/annual toggle that recalculates prices live, FAQ accordion with smooth open/close animations, customer testimonials carousel, stats counter section (10K+ users, 99.9% uptime, etc.), contact form with real-time validation and animated success state, toast notification system for all interactions, scroll-triggered fade-in animations on every section, dark mode with purple/indigo gradient accents. Mocked backend with realistic data in JS objects, all forms functional, every button clickable.' },
    { id: 'portfolio', label: 'Portfolio', emoji: 'ðŸ‘¤', desc: 'Showcase work', prompt: 'Build a stunning creative developer portfolio for "Alex Rivera" €” a senior full-stack developer. Include: animated hero with typing effect cycling through roles (Full-Stack Developer, UI Designer, Problem Solver), project showcase section with category filter buttons (All, Web, Mobile, AI) that filter projects with smooth animations, 6 detailed projects with gradient thumbnails and tech stack tags, skills section with animated progress bars that fill on scroll, experience timeline with dates and descriptions, stats counters (50+ Projects, 8 Years, 30+ Clients), contact form with real-time validation per field on blur and animated success state, toast notifications, smooth scroll navigation with active link highlighting, dark theme with violet/cyan gradient accents, scroll-triggered reveal animations on every section. All data in JavaScript objects.' },
    { id: 'restaurant', label: 'Restaurant', emoji: 'ðŸ½ï¸', desc: 'Fine dining', prompt: 'Build an elegant restaurant website for "Bella Notte" €” an upscale Italian fine dining restaurant. Include: parallax-style hero with gradient background, full menu organized by category tabs (Appetizers, Pasta, Mains, Desserts, Wine) that switch content on click, each dish with name/description/price, reservation modal with date picker and form validation, gallery section with lightbox that opens full-size images on click with prev/next navigation, chef spotlight section, customer reviews with star ratings, stats counters (15 Years, 50K+ Guests, 4.9 Rating), newsletter signup, Google Maps placeholder, toast notifications for reservation and newsletter, scroll animations, warm amber/gold color scheme on dark background. All interactive elements must work.' },
    { id: 'ecommerce', label: 'E-Commerce', emoji: 'ðŸ›’', desc: 'Online store', prompt: 'Build a premium e-commerce store called "TechVault" €” selling electronics and lifestyle products. Include: 8+ products with names/descriptions/prices/ratings stored in JavaScript objects, product category filter buttons (All, Electronics, Accessories, Clothing), sort dropdown (Featured, Price Low-High, Price High-Low, Top Rated), shopping cart drawer that slides in from the right with add/remove/quantity controls and total calculation with localStorage persistence, wishlist with heart toggle on each product and localStorage persistence, product quick-view modal with size selection and details, search bar that filters products in real-time, flash deals section with countdown timer, customer reviews, newsletter signup form, toast notifications for add-to-cart/wishlist/checkout actions, scroll animations, dark theme with violet/pink gradient accents.' },
    { id: 'agency', label: 'Agency', emoji: 'œ¨', desc: 'Creative studio', prompt: 'Build a premium digital agency website for "Pixel Studio" €” a full-service creative agency. Include: hero with animated gradient text and floating background orbs, 6 service cards with icons (Branding, Web Design, App Dev, Marketing, Motion, UX Research), portfolio section with category filter (All, Branding, Web, App, Marketing) showing 6 case studies with gradient thumbnails and tags, 4-step process visualization (Discovery, Strategy, Create, Launch), team section with 4 member cards showing role and social links, testimonials from 4 clients with star ratings and company names, FAQ accordion, contact form with name/email/budget dropdown/message fields and real-time validation with animated success state, stats counters (150+ Projects, 50 Clients, 12 Awards), toast notifications, scroll-triggered animations, dark theme with indigo/purple accents.' },
    { id: 'fitness', label: 'Fitness', emoji: 'ðŸ’ª', desc: 'Gym & wellness', prompt: 'Build a premium fitness center website for "IronPulse Gym". Include: motivational hero with animated gradient text, weekly class schedule with day tabs (Mon-Sun) showing classes with time/trainer/duration/intensity/spots and a Book button for each, 4 trainer profile cards with specialties and bios, pricing section with 3 tiers (Starter/Pro/Elite) and monthly/annual toggle that recalculates prices with savings shown, BMI calculator that takes height/weight input and shows result with category and personalized advice, member transformation testimonials with results tags, join form with name/email/phone/fitness goal fields and validation, stats counters (2000+ Members, 50 Classes, 15 Trainers, 24/7 Access), toast notifications for all bookings and form submissions, scroll animations, dark theme with red/orange gradient accents.' },
    { id: 'youtube', label: 'YouTube', emoji: '–¶ï¸', desc: 'Video platform', prompt: 'Build a video streaming platform called "VidStream" €” clone-style UI inspired by YouTube. Include: top navbar with search bar and notification bell, collapsible sidebar with Home/Shorts/Subscriptions/Watch Later/Liked/History, category filter pills (All, Music, Gaming, News, Sports, Comedy, Education, Tech, Cooking, Travel), video grid with 12 realistic video cards showing gradient thumbnails/title/channel/views/timestamp, video detail modal that opens on click with large player area, like/dislike/share/save buttons, subscribe button, comment section with input, and related videos, Watch Later list with localStorage persistence, Liked Videos list with localStorage, watch History tracking, search that filters videos by title/channel/category, toast notifications, dark theme similar to YouTube Dark Mode.' },
    { id: 'netflix', label: 'Netflix', emoji: 'ðŸŽ¬', desc: 'Streaming app', prompt: 'Build a movie streaming service called "CineMax" €” clone-style UI inspired by Netflix. Include: cinematic hero billboard that auto-rotates through 3 featured titles every 8 seconds with prev/next arrows, showing title/description/match%/year/rating with Play and More Info buttons, genre filter pills (All, Action, Drama, Comedy, Thriller, Sci-Fi), 3 horizontal scrolling content rows (Trending Now, Popular Movies, Binge-Worthy Series) with arrow scroll buttons, content cards that scale up on hover showing title/match%/year with Play and + My List buttons, My List functionality with localStorage persistence, search overlay that opens full-screen with results filtered by title/genre, detail modal showing full info with similar titles, 18+ content items stored in JavaScript objects with gradient thumbnails, dark cinematic theme with red accents.' },
    { id: 'spotify', label: 'Spotify', emoji: 'ðŸŽµ', desc: 'Music player', prompt: 'Build a music streaming app called "SoundWave" €” clone-style UI inspired by Spotify. Include: left sidebar with Home/Search/Library navigation and playlist list, main content area with greeting section and quick-play grid, 5 featured playlists and 6 artist cards, 18 tracks stored in JavaScript objects with title/artist/album/duration, playlist view that shows track list with play-on-click functionality, bottom player bar with play/pause/prev/next/shuffle/repeat controls, progress bar with seek functionality, volume slider with mute toggle, now-playing info showing track title and artist, Liked Songs with localStorage persistence and heart toggle, create playlist button, search with results filtered by title/artist, genre browsing cards, keyboard shortcuts (Space=play/pause, arrows=prev/next), dark theme with green/emerald accents similar to Spotify.' },
];

const colorStyles = [
    { id: 'dark', label: 'Dark', colors: ['#0f172a', '#1e293b', '#6366f1'] },
    { id: 'light', label: 'Light', colors: ['#ffffff', '#f1f5f9', '#4f46e5'] },
    { id: 'gradient', label: 'Gradient', colors: ['#4f46e5', '#7c3aed', '#06b6d4'] },
    { id: 'minimal', label: 'Minimal', colors: ['#fafafa', '#e5e5e5', '#404040'] },
];

const aiModels = [
    { id: 'gemini-3-flash', label: 'Gemini 3 Flash', icon: 'š¡', desc: 'Ultra fast', color: 'from-blue-500 to-cyan-400', badge: 'Popular' },
    { id: 'claude-opus-4.5', label: 'Claude Opus 4.5', icon: 'ðŸ§ ', desc: 'Advanced reasoning', color: 'from-orange-500 to-amber-400', badge: null },
    { id: 'gpt-5.3', label: 'GPT 5.3', icon: 'ðŸ¤–', desc: 'Max creativity', color: 'from-emerald-500 to-green-400', badge: null },
    { id: 'glm-5', label: 'GLM 5', icon: 'ðŸ”¬', desc: 'Research grade', color: 'from-purple-500 to-pink-400', badge: 'New' },
];

/* ••••••••••••••••••••••••••••••••••••••••
   LIVE CODING OVERLAY €” Shows real streamed code
   •••••••••••••••••••••••••••••••••••••••• */
function LiveCodingOverlay({ streamedCode, selectedModel, buildType }) {
    const [elapsed, setElapsed] = useState(0);
    const codeEndRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setElapsed(e => e + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    // Auto-scroll to bottom as code streams in
    useEffect(() => {
        if (codeEndRef.current) {
            codeEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [streamedCode]);

    const lines = (streamedCode || '').split('\n');
    const lineCount = lines.length;
    const charCount = (streamedCode || '').length;

    // Basic syntax highlighting
    const highlightLine = (raw) => {
        let s = raw
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        s = s
            .replace(/(&lt;\/?[a-zA-Z][a-zA-Z0-9-]*)/g, '<span style="color:#ff79c6">$1</span>')
            .replace(/(\/?&gt;)/g, '<span style="color:#ff79c6">$1</span>')
            .replace(/(class|className|style|id|href|src|rel|content|name|type|placeholder|value|onclick|onsubmit)=/g, '<span style="color:#50fa7b">$1</span>=')
            .replace(/(".*?")/g, '<span style="color:#f1fa8c">$1</span>')
            .replace(/(&#x27;.*?&#x27;)/g, '<span style="color:#f1fa8c">$1</span>')
            .replace(/(\/\/.*$)/gm, '<span style="color:#6272a4">$1</span>')
            .replace(/\b(const |let |var |function |return |import |export |from |if |else |for |while |async |await |new |this |true|false|null|undefined)\b/g, '<span style="color:#bd93f9">$1</span>')
            .replace(/\b(document|window|console|Math|localStorage|JSON|setTimeout|setInterval|querySelector|addEventListener|getElementById|createElement)\b/g, '<span style="color:#8be9fd">$1</span>');
        return s;
    };

    return (
        <div className="fixed inset-0 z-[100] flex flex-col" style={{ background: '#0d1117' }}>
            {/* Top bar €” IDE style */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10" style={{ background: '#161b22' }}>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-md" style={{ background: '#0d1117' }}>
                        <Code2 className="h-3.5 w-3.5 text-[#58a6ff]" />
                        <span className="text-xs font-mono text-slate-400">
                            {buildType === 'mobile' ? 'app' : buildType === 'uidesign' ? 'design' : 'index'}.html
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                        <Code2 className="h-3 w-3" />
                        <span className="text-emerald-400 font-semibold">{lineCount.toLocaleString()}</span> lines
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                        <Zap className="h-3 w-3" />
                        <span className="text-amber-400 font-semibold">{charCount.toLocaleString()}</span> chars
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                        <Clock className="h-3 w-3" />
                        <span className="text-blue-400 font-semibold">
                            {elapsed < 60 ? `${elapsed}s` : `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`}
                        </span>
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-500 font-mono">{selectedModel?.icon}</span>
                        <span className="text-xs text-slate-400 font-medium">{selectedModel?.label || 'AI'}</span>
                    </div>
                </div>
            </div>

            {/* Generating banner */}
            <div className="flex items-center gap-2 px-4 py-1.5 border-b border-white/5" style={{ background: '#1c2333' }}>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-medium text-emerald-400">
                    AI is writing your {buildType === 'mobile' ? 'app' : buildType === 'uidesign' ? 'design' : 'website'}...
                </span>
                <div className="flex-1" />
                <Loader2 className="h-3 w-3 text-slate-500 animate-spin" />
            </div>

            {/* Code editor area */}
            <div className="flex-1 overflow-y-auto font-mono text-[13px] leading-[1.6]" style={{ background: '#0d1117' }}>
                <div className="flex min-h-full">
                    {/* Line numbers gutter */}
                    <div className="flex-shrink-0 text-right pr-4 pl-4 pt-3 pb-6 select-none border-r border-white/5" style={{ color: '#484f58', minWidth: '56px' }}>
                        {lines.map((_, i) => (
                            <div key={i} className="leading-[1.6]" style={{ fontSize: '13px' }}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                    {/* Code content */}
                    <div className="flex-1 pt-3 pb-6 pl-4 pr-4 overflow-x-auto">
                        {lines.map((line, i) => (
                            <div
                                key={i}
                                className="leading-[1.6] whitespace-pre"
                                style={{ fontSize: '13px', color: '#e6edf3' }}
                                dangerouslySetInnerHTML={{ __html: highlightLine(line) || '&nbsp;' }}
                            />
                        ))}
                        {/* Blinking cursor */}
                        <span className="inline-block w-2 h-4 ml-0.5 align-middle" style={{ background: '#58a6ff', animation: 'cursor-blink 1s steps(2) infinite' }} />
                        <div ref={codeEndRef} />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes cursor-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
}




/* ••••••••••••••••••••••••••••••••••••••••
   MODEL SELECTOR €” Compact Dropdown
   •••••••••••••••••••••••••••••••••••••••• */
function ModelSelector({ selectedModel, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const activeModel = aiModels.find(m => m.id === selectedModel);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Compact trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 backdrop-blur-xl border border-slate-200/50 hover:border-brand-300/50 hover:bg-white/90 transition-all duration-300"
                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}
            >
                <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${activeModel?.color} flex items-center justify-center text-xs`}>
                    {activeModel?.icon}
                </div>
                <span className="text-xs font-semibold text-slate-700 hidden sm:inline">{activeModel?.label}</span>
                <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown list */}
            {isOpen && (
                <div
                    className="absolute top-full left-0 mt-2 z-50 w-64 bg-white/95 backdrop-blur-2xl border border-white/60 rounded-2xl overflow-hidden"
                    style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)' }}
                >
                    <div className="p-1.5 max-h-[280px] overflow-y-auto">
                        <div className="px-3 py-1.5 mb-0.5">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Select Model</p>
                        </div>
                        {aiModels.map((model) => {
                            const isSelected = selectedModel === model.id;
                            return (
                                <button
                                    key={model.id}
                                    onClick={() => { onSelect(model.id); setIsOpen(false); }}
                                    className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-left transition-all duration-200 group ${isSelected
                                        ? 'bg-brand-50 border border-brand-200/50'
                                        : 'hover:bg-slate-50 border border-transparent'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${model.color} flex items-center justify-center text-sm group-hover:scale-110 transition-transform`}>
                                        {model.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs font-semibold text-slate-800">{model.label}</span>
                                            {model.badge && (
                                                <span className={`text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md ${model.badge === 'Popular' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                    {model.badge}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-slate-400">{model.desc}</span>
                                    </div>
                                    {isSelected && (
                                        <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
                                            <Check className="h-3 w-3 text-white" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}


/* ••••••••••••••••••••••••••••••••••••••••
   MAIN GENERATOR COMPONENT
   •••••••••••••••••••••••••••••••••••••••• */
export default function Generator({ initialPrompt = '' }) {
    const [prompt, setPrompt] = useState(initialPrompt);
    const [selectedTemplate, setSelectedTemplate] = useState('saas');
    const [selectedColor, setSelectedColor] = useState('dark');
    const [selectedModel, setSelectedModel] = useState('gemini-3-flash');
    const [deepThinking, setDeepThinking] = useState(false);
    const [buildType, setBuildType] = useState('website');
    const [loading, setLoading] = useState(false);
    const [streamedCode, setStreamedCode] = useState('');
    const [enhancing, setEnhancing] = useState(false);
    const [error, setError] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [generatedHtml, setGeneratedHtml] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [lastGenTime, setLastGenTime] = useState(0);
    const { user, subscription } = useAuth();
    const { warning: showWarning, error: showError, info: showInfo, success: showSuccess } = useToast();

    const FREE_TIER_LIMIT = 3;
    const RATE_LIMIT_MS = 10000; // 10 seconds between generations

    const getHistory = () => {
        try { return JSON.parse(localStorage.getItem('genapps_history') || '[]'); }
        catch { return []; }
    };

    const isPaidUser = subscription?.plan && subscription?.status === 'active';
    const [genCount, setGenCount] = useState(0);

    useEffect(() => {
        if (user?.id) {
            getGenerationCount(user.id).then(count => setGenCount(count));
        } else {
            setGenCount(getHistory().length);
        }
    }, [user]);

    const remainingFree = Math.max(0, FREE_TIER_LIMIT - genCount);

    useEffect(() => {
        if (initialPrompt) setPrompt(initialPrompt);
    }, [initialPrompt]);

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template.id);
        setPrompt(template.prompt);
    };

    // Keyboard shortcut: Ctrl+Enter to generate
    const handleKeyDown = useCallback((e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !loading) {
            e.preventDefault();
            handleGenerate();
        }
    }, [loading, prompt, selectedTemplate, selectedColor, selectedModel, deepThinking, buildType]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Quick prompt suggestions
    const promptSuggestions = [
        'Modern SaaS landing page for a project management tool',
        'Creative developer portfolio with dark theme',
        'Restaurant website with menu and reservations',
        'Online store for electronics with shopping cart',
        'Fitness gym website with class schedule and pricing',
    ];

    const handleEnhancePrompt = async () => {
        if (!prompt.trim() || enhancing) return;
        setEnhancing(true);
        try {
            const enhanced = await enhancePrompt(prompt.trim(), buildType);
            setPrompt(enhanced);
        } catch (err) {
            console.error('Enhance failed:', err);
        } finally {
            setEnhancing(false);
        }
    };

    const handleGenerate = async () => {
        if (loading) return;

        // Rate limiting
        const now = Date.now();
        if (now - lastGenTime < RATE_LIMIT_MS) {
            const waitSec = Math.ceil((RATE_LIMIT_MS - (now - lastGenTime)) / 1000);
            showWarning(`Please wait ${waitSec}s before generating again.`);
            return;
        }

        // Free tier limit check
        if (!isPaidUser && getHistory().length >= FREE_TIER_LIMIT) {
            setError('free_limit');
            showWarning('Free tier limit reached! Upgrade to continue generating.');
            return;
        }

        setLoading(true);
        setError(null);
        setCurrentStep(1);
        setStreamedCode('');
        setLastGenTime(Date.now());

        try {
            const html = await generateWebsite(
                prompt || templates.find(t => t.id === selectedTemplate)?.prompt || 'My Awesome Project',
                selectedTemplate,
                selectedColor,
                (step) => setCurrentStep(step),
                { selectedModel, deepThinking, buildType, onCodeChunk: (chunk) => setStreamedCode(prev => prev + chunk) }
            );
            setGeneratedHtml(html);
            setShowPreview(true);

            // Save generation to Supabase (falls back to localStorage)
            try {
                const genData = {
                    prompt: prompt || templates.find(t => t.id === selectedTemplate)?.label || 'Untitled',
                    template: selectedTemplate,
                    color: selectedColor,
                    model: selectedModel,
                    buildType,
                    deepThinking,
                    html: html,
                };

                if (user?.id) {
                    await saveGeneration(user.id, genData);
                    setGenCount(prev => prev + 1);
                } else {
                    // Fallback for non-authenticated users
                    const history = JSON.parse(localStorage.getItem('genapps_history') || '[]');
                    history.unshift({
                        ...genData,
                        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    });
                    localStorage.setItem('genapps_history', JSON.stringify(history.slice(0, 50)));
                    setGenCount(prev => prev + 1);
                }
            } catch { /* ignore save errors */ }
        } catch (err) {
            console.error('Generation failed:', err);
            const errorMsg = err instanceof GenerationError
                ? err.message
                : (err.message || 'Failed to generate website. Please try again.');
            const errorType = err instanceof GenerationError ? err.type : 'unknown';
            setError({ message: errorMsg, type: errorType, retryable: err.retryable !== false });
            showError(errorMsg);
        } finally {
            setLoading(false);
            setCurrentStep(0);
        }
    };

    const handleRegenerate = () => {
        setShowPreview(false);
        setTimeout(() => handleGenerate(), 100);
    };

    return (
        <>
            <section id="generator" className="section-padding relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'linear-gradient(180deg, #f0f7ff 0%, #f8faff 50%, #ffffff 100%)'
                }} />

                <div className="section-container relative z-10">
                    <div className="max-w-4xl mx-auto">

                        {/* ••••••••••••••••••••••••••••••••••••••••
                           PROMPT CARD €” Front & Center
                           •••••••••••••••••••••••••••••••••••••••• */}
                        <div
                            className="relative bg-white/65 backdrop-blur-2xl border border-white/50 rounded-[2rem] overflow-hidden"
                            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.07), 0 4px 20px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.7)' }}
                        >
                            {/* Gradient accent bar */}
                            <div className="h-1" style={{ background: 'linear-gradient(90deg, #0ea5e9, #6366f1, #a855f7, #ec4899)' }} />

                            <div className="p-6 sm:p-8 lg:p-10">
                                {/* Top controls: Build type + Model */}
                                <div className="flex items-center gap-2 mb-6 flex-wrap">
                                    {/* Build Type Pills */}
                                    <div className="flex items-center bg-slate-100/60 rounded-xl p-1 border border-slate-200/30">
                                        {[
                                            { id: 'website', label: 'Website', icon: Globe },
                                            { id: 'mobile', label: 'App', icon: Smartphone },
                                            { id: 'uidesign', label: 'UI Design', icon: PenTool },
                                        ].map(bt => (
                                            <button
                                                key={bt.id}
                                                onClick={() => setBuildType(bt.id)}
                                                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${buildType === bt.id
                                                    ? 'bg-white text-slate-800 shadow-sm'
                                                    : 'text-slate-400 hover:text-slate-600'
                                                    }`}
                                            >
                                                <bt.icon className="h-3.5 w-3.5" />
                                                {bt.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Model Selector */}
                                    <ModelSelector selectedModel={selectedModel} onSelect={setSelectedModel} />

                                    {/* Deep Think Toggle */}
                                    <button
                                        onClick={() => setDeepThinking(!deepThinking)}
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${deepThinking
                                            ? 'bg-violet-100 border border-violet-300/50 text-violet-700'
                                            : 'bg-white/60 border border-slate-200/40 text-slate-400 hover:text-slate-600 hover:border-slate-300/60'
                                            }`}
                                    >
                                        <Brain className="h-3 w-3" />
                                        Deep Think
                                        {deepThinking && <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />}
                                    </button>
                                </div>

                                {/* THE PROMPT AREA */}
                                <div className="relative">
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder={`Describe your ${buildType === 'uidesign' ? 'design' : buildType === 'mobile' ? 'app' : 'website'} in detail...\n\nExample: "Build a modern SaaS landing page for a project management tool called TeamFlow. Include hero section, features grid, pricing with 3 tiers, testimonials, and FAQ."`}
                                        rows={7}
                                        className="w-full bg-transparent border-none outline-none text-slate-700 placeholder-slate-300 text-[15px] leading-relaxed resize-none py-2 font-medium"
                                        style={{ minHeight: '180px' }}
                                    />
                                    {prompt.length > 0 && (
                                        <div className="absolute bottom-1 right-0 text-[10px] text-slate-300 font-medium tabular-nums">
                                            {prompt.length} chars
                                        </div>
                                    )}
                                </div>

                                {/* Quick prompt suggestions */}
                                {!prompt.trim() && (
                                    <div className="flex flex-wrap gap-2 mt-3 mb-2">
                                        {promptSuggestions.map((suggestion, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPrompt(suggestion)}
                                                className="text-[11px] px-3 py-1.5 rounded-full bg-slate-100/60 border border-slate-200/40 text-slate-500 hover:text-slate-700 hover:bg-white hover:border-slate-300/60 hover:shadow-sm transition-all duration-200"
                                            >
                                                {suggestion.length > 45 ? suggestion.slice(0, 45) + '...' : suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent mb-4 mt-2" />

                                {/* Bottom toolbar */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {/* Enhance Prompt */}
                                        <button
                                            onClick={handleEnhancePrompt}
                                            disabled={!prompt.trim() || enhancing}
                                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/40 text-amber-700 hover:from-amber-100 hover:to-orange-100 hover:shadow-md"
                                        >
                                            {enhancing ? (
                                                <><Loader2 className="h-3 w-3 animate-spin" /> Enhancing</>
                                            ) : (
                                                <><Wand2 className="h-3 w-3" /> Enhance</>
                                            )}
                                        </button>

                                        {/* Color Style */}
                                        <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/60 border border-slate-200/40">
                                            <Palette className="h-3 w-3 text-slate-400" />
                                            {colorStyles.map((c) => (
                                                <button
                                                    key={c.id}
                                                    onClick={() => setSelectedColor(c.id)}
                                                    title={c.label}
                                                    className={`flex -space-x-0.5 p-0.5 rounded-lg transition-all ${selectedColor === c.id
                                                        ? 'ring-2 ring-brand-300 ring-offset-1 scale-110'
                                                        : 'opacity-50 hover:opacity-100 hover:scale-105'
                                                        }`}
                                                >
                                                    {c.colors.map((color, i) => (
                                                        <div key={i} className="w-3 h-3 rounded-full border border-white/80" style={{ backgroundColor: color }} />
                                                    ))}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Generate Button */}
                                    <button
                                        onClick={handleGenerate}
                                        disabled={loading}
                                        title="Ctrl+Enter to generate"
                                        className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white text-sm font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed sparkle-btn"
                                        style={{
                                            background: 'linear-gradient(135deg, #0ea5e9, #6366f1, #a855f7)',
                                            boxShadow: '0 4px 16px rgba(14,165,233,0.3), 0 0 40px rgba(99,102,241,0.1)',
                                        }}
                                    >
                                        {loading ? (
                                            <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
                                        ) : (
                                            <><Sparkles className="h-4 w-4" /> Generate <span className="text-[10px] ml-1 opacity-60 hidden sm:inline">Œ˜†µ</span></>
                                        )}
                                    </button>
                                </div>

                                {error && error === 'free_limit' ? (
                                    <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                                                <Crown className="h-5 w-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-900 text-sm mb-1">Free tier limit reached</h4>
                                                <p className="text-xs text-slate-500 mb-3">You've used all {FREE_TIER_LIMIT} free generations. Upgrade to a paid plan for unlimited website generation.</p>
                                                <Link
                                                    to="/pricing"
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-brand-500 to-lavender-500 text-white text-xs font-bold hover:shadow-lg transition-all"
                                                >
                                                    <Zap className="h-3.5 w-3.5" /> View Plans
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ) : error ? (
                                    <div className={`flex items-start gap-3 p-4 rounded-2xl border mt-4 ${error.type === 'network' || error.type === 'timeout'
                                        ? 'bg-amber-50 border-amber-200/50'
                                        : error.type === 'rate_limit'
                                            ? 'bg-blue-50 border-blue-200/50'
                                            : 'bg-red-50 border-red-200/50'
                                        }`}>
                                        {error.type === 'network' || error.type === 'timeout' ? (
                                            <WifiOff className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                        ) : error.type === 'rate_limit' ? (
                                            <Clock className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                                        )}
                                        <div className="flex-1">
                                            <p className={`text-sm ${error.type === 'network' || error.type === 'timeout' ? 'text-amber-700'
                                                : error.type === 'rate_limit' ? 'text-blue-700'
                                                    : 'text-red-600'
                                                }`}>{error.message}</p>
                                            {error.retryable && (
                                                <button
                                                    onClick={handleGenerate}
                                                    className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-800 font-semibold bg-white/80 px-3 py-1.5 rounded-lg border border-slate-200/60 hover:shadow-sm transition-all"
                                                >
                                                    <RefreshCw className="h-3 w-3" /> Try Again
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) : null}

                                {/* Remaining generations counter for free users */}
                                {!isPaidUser && !error && (
                                    <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400">
                                        <Zap className="h-3 w-3" />
                                        <span>{remainingFree} free generation{remainingFree !== 1 ? 's' : ''} remaining</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ••••••••••••••••••••••••••••••••••••••••
                           TEMPLATES €” Below Prompt, Enlarged
                           •••••••••••••••••••••••••••••••••••••••• */}
                        <div className="mt-10">
                            <div className="flex items-center gap-2 mb-5">
                                <Layout className="h-4 w-4 text-brand-400" />
                                <h3 className="text-sm font-bold text-slate-700">Quick Start Templates</h3>
                                <span className="text-[11px] text-slate-400">€” click to fill prompt</span>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                                {templates.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => handleTemplateClick(t)}
                                        className={`group relative flex flex-col items-center px-3 py-5 rounded-2xl transition-all duration-300 ${selectedTemplate === t.id
                                            ? 'bg-white border-2 border-brand-300/50 text-brand-700 shadow-xl shadow-brand-500/10 scale-[1.03]'
                                            : 'bg-white/60 border-2 border-transparent text-slate-500 hover:text-slate-700 hover:bg-white/90 hover:border-slate-200/60 hover:shadow-lg hover:scale-[1.02]'
                                            }`}
                                    >
                                        <span className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">{t.emoji}</span>
                                        <span className="font-bold text-sm">{t.label}</span>
                                        <span className={`text-[10px] mt-0.5 ${selectedTemplate === t.id ? 'text-brand-400' : 'text-slate-400'}`}>{t.desc}</span>
                                        {selectedTemplate === t.id && (
                                            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shadow-md">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ••••••••••••••••••••••••••••••••••••••••
                           TRUST & SOCIAL PROOF €” Below Templates
                           •••••••••••••••••••••••••••••••••••••••• */}
                        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/50 border border-white/40 backdrop-blur-xl"
                                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                                    <TrendingUp className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-base font-extrabold text-slate-800 font-display">50K+</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Sites Generated</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/50 border border-white/40 backdrop-blur-xl"
                                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-blue-500 flex items-center justify-center">
                                    <Clock className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-base font-extrabold text-slate-800 font-display">~30s</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Build Time</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/50 border border-white/40 backdrop-blur-xl"
                                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                    <Star className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-base font-extrabold text-slate-800 font-display">4.9˜…</p>
                                    <p className="text-[10px] text-slate-400 font-medium">User Rating</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/50 border border-white/40 backdrop-blur-xl"
                                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lavender-400 to-purple-500 flex items-center justify-center">
                                    <Users className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-base font-extrabold text-slate-800 font-display">12K+</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Happy Users</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LOADING OVERLAY */}
            {loading && (
                <LiveCodingOverlay
                    streamedCode={streamedCode}
                    selectedModel={aiModels.find(m => m.id === selectedModel)}
                    buildType={buildType}
                />
            )}

            {showPreview && (
                <PreviewWindow
                    htmlContent={generatedHtml}
                    onClose={() => setShowPreview(false)}
                    buildType={buildType}
                    onRegenerate={handleRegenerate}
                />
            )}
        </>
    );
}
