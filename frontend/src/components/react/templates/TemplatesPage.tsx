import React, { useState } from 'react';
import {
    Sparkles,
    ArrowRight,
    Brain,
    Zap,
    Crown,
    Lock,
    Check,
    Wand2,
    Layout,
    ShoppingCart,
    BarChart3,
    FileText,
    Users,
    MessageSquare,
    Calendar,
    Image as ImageIcon,
    ChevronDown
} from 'lucide-react';
import { cn } from '../../../lib/utils';

// Model options
const models = [
    {
        id: 'gemini-3-flash',
        name: 'Gemini 3 Flash',
        icon: '⚡',
        description: 'Fast & efficient for quick builds',
        premium: false,
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'claude-opus-4.5',
        name: 'Claude Opus 4.5',
        icon: '🧠',
        description: 'Best for complex logic & clean code',
        premium: true,
        color: 'from-orange-500 to-amber-500'
    },
    {
        id: 'gpt-5.2',
        name: 'GPT 5.2',
        icon: '✨',
        description: 'Most creative & versatile',
        premium: true,
        color: 'from-emerald-500 to-teal-500'
    },
    {
        id: 'kimi-k2.5',
        name: 'Kimi K2.5',
        icon: '🚀',
        description: 'Optimized for speed & accuracy',
        premium: true,
        color: 'from-violet-500 to-purple-500'
    }
];

// Template categories
const templates = [
    {
        id: 'landing',
        name: 'Landing Page',
        icon: Layout,
        prompt: 'Create a modern SaaS landing page with hero section, features, pricing, and testimonials',
        gradient: 'from-violet-500 to-fuchsia-500'
    },
    {
        id: 'dashboard',
        name: 'Dashboard',
        icon: BarChart3,
        prompt: 'Build an analytics dashboard with charts, stats cards, sidebar navigation, and dark theme',
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'ecommerce',
        name: 'E-commerce',
        icon: ShoppingCart,
        prompt: 'Create an e-commerce product catalog with shopping cart, filters, and checkout flow',
        gradient: 'from-emerald-500 to-teal-500'
    },
    {
        id: 'blog',
        name: 'Blog / CMS',
        icon: FileText,
        prompt: 'Build a modern blog with article cards, categories, search, and reading view',
        gradient: 'from-orange-500 to-amber-500'
    },
    {
        id: 'portfolio',
        name: 'Portfolio',
        icon: ImageIcon,
        prompt: 'Create a creative portfolio with project gallery, about section, and contact form',
        gradient: 'from-pink-500 to-rose-500'
    },
    {
        id: 'crm',
        name: 'CRM App',
        icon: Users,
        prompt: 'Build a customer relationship management app with contacts, deals pipeline, and activity log',
        gradient: 'from-indigo-500 to-blue-500'
    },
    {
        id: 'chat',
        name: 'Chat App',
        icon: MessageSquare,
        prompt: 'Create a real-time chat interface with conversations, messages, and user presence',
        gradient: 'from-cyan-500 to-blue-500'
    },
    {
        id: 'calendar',
        name: 'Calendar App',
        icon: Calendar,
        prompt: 'Build a calendar application with monthly view, events, and scheduling features',
        gradient: 'from-purple-500 to-violet-500'
    }
];

interface TemplatesPageProps {
    isPremium?: boolean;
    onUpgradeClick?: () => void;
}

export const TemplatesPage = ({ isPremium = false, onUpgradeClick }: TemplatesPageProps) => {
    const [selectedModel, setSelectedModel] = useState('gemini-3-flash');
    const [prompt, setPrompt] = useState('');
    const [deepThinking, setDeepThinking] = useState(false);
    const [showModelDropdown, setShowModelDropdown] = useState(false);
    const [isBuilding, setIsBuilding] = useState(false);

    const currentModel = models.find(m => m.id === selectedModel) || models[0];

    const handleSelectModel = (modelId: string) => {
        const model = models.find(m => m.id === modelId);
        if (model?.premium && !isPremium) {
            onUpgradeClick?.();
            return;
        }
        setSelectedModel(modelId);
        setShowModelDropdown(false);
    };

    const handleSelectTemplate = (templatePrompt: string) => {
        setPrompt(templatePrompt);
    };

    const handleBuild = () => {
        if (!prompt.trim()) return;

        // Store prompt and model in localStorage for builder
        localStorage.setItem('genapps_initial_prompt', prompt);
        localStorage.setItem('genapps_model', selectedModel);
        localStorage.setItem('genapps_deep_thinking', String(deepThinking));

        // Navigate to builder
        window.location.href = '/builder';
    };

    return (
        <div className="min-h-screen bg-[#09090b]">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[150px]" />
            </div>

            {/* Header */}
            <header className="relative z-10 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">G</span>
                        </div>
                        <span className="text-white font-semibold">GenApps</span>
                    </a>

                    <div className="flex items-center gap-4">
                        {!isPremium && (
                            <button
                                onClick={onUpgradeClick}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg text-amber-400 text-sm font-medium hover:from-amber-500/30 hover:to-orange-500/30 transition-all"
                            >
                                <Crown className="w-4 h-4" />
                                Upgrade to Pro
                            </button>
                        )}
                        <a
                            href="/settings"
                            className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-sm font-medium"
                        >
                            U
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                {/* Page Title */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        What do you want to build?
                    </h1>
                    <p className="text-lg text-gray-400">
                        Choose a template or describe your idea. We'll bring it to life.
                    </p>
                </div>

                {/* Model Selection & Prompt */}
                <div className="max-w-3xl mx-auto mb-16">
                    <div className="p-6 bg-[#0c0c0e] border border-white/10 rounded-2xl">
                        {/* Model Selector */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="text-sm text-gray-400">Model:</span>

                            <div className="relative">
                                <button
                                    onClick={() => setShowModelDropdown(!showModelDropdown)}
                                    className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                                >
                                    <span className="text-lg">{currentModel.icon}</span>
                                    <span className="text-white font-medium">{currentModel.name}</span>
                                    <ChevronDown className={cn(
                                        "w-4 h-4 text-gray-400 transition-transform",
                                        showModelDropdown && "rotate-180"
                                    )} />
                                </button>

                                {showModelDropdown && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setShowModelDropdown(false)}
                                        />
                                        <div className="absolute top-full left-0 mt-2 w-80 bg-[#0c0c0e] border border-white/10 rounded-xl shadow-2xl z-50 p-2">
                                            {models.map((model) => (
                                                <button
                                                    key={model.id}
                                                    onClick={() => handleSelectModel(model.id)}
                                                    className={cn(
                                                        "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left",
                                                        selectedModel === model.id
                                                            ? "bg-violet-500/20 border border-violet-500/30"
                                                            : "hover:bg-white/5 border border-transparent"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-gradient-to-br",
                                                        model.color
                                                    )}>
                                                        {model.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white font-medium">{model.name}</span>
                                                            {model.premium && (
                                                                <span className="px-1.5 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-[10px] text-amber-400 font-medium">
                                                                    PRO
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500">{model.description}</p>
                                                    </div>
                                                    {selectedModel === model.id && (
                                                        <Check className="w-4 h-4 text-violet-400" />
                                                    )}
                                                    {model.premium && !isPremium && (
                                                        <Lock className="w-4 h-4 text-gray-600" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Deep Thinking Toggle */}
                            <button
                                onClick={() => {
                                    if (!isPremium) {
                                        onUpgradeClick?.();
                                        return;
                                    }
                                    setDeepThinking(!deepThinking);
                                }}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                                    deepThinking
                                        ? "bg-violet-500/20 border-violet-500/30 text-violet-300"
                                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                                )}
                            >
                                <Brain className="w-4 h-4" />
                                Deep Thinking
                                {!isPremium && <Lock className="w-3 h-3 text-gray-600" />}
                            </button>
                        </div>

                        {/* Prompt Input */}
                        <div className="relative mb-4">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe your app in detail... e.g., 'Create a task management app with kanban boards, due dates, priority levels, and a beautiful dark theme'"
                                className="w-full h-32 p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 resize-none focus:outline-none focus:border-violet-500/50 transition-colors"
                            />
                            <Wand2 className="absolute bottom-4 right-4 w-5 h-5 text-gray-600" />
                        </div>

                        {/* Build Button */}
                        <button
                            onClick={handleBuild}
                            disabled={!prompt.trim() || isBuilding}
                            className={cn(
                                "w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2",
                                prompt.trim()
                                    ? "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white hover:opacity-90 shadow-lg shadow-violet-500/20"
                                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                            )}
                        >
                            <Sparkles className="w-5 h-5" />
                            Build My App
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Templates Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        Or start with a template
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {templates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => handleSelectTemplate(template.prompt)}
                                className={cn(
                                    "group p-6 bg-[#0c0c0e] border rounded-2xl text-left transition-all hover:border-violet-500/30 hover:bg-white/[0.02]",
                                    prompt === template.prompt
                                        ? "border-violet-500/50 bg-violet-500/5"
                                        : "border-white/10"
                                )}
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                                    template.gradient
                                )}>
                                    <template.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-1">
                                    {template.name}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2">
                                    {template.prompt}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};
