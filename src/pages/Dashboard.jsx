import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, Sparkles, CreditCard, Settings, LogOut,
    Zap, Crown, ChevronRight, Clock, Globe, Palette, ExternalLink,
    Download, Trash2, User, Mail, Link2, Github, Check, X, Smartphone, Lock, RefreshCw, BookOpen, Rocket, ArrowRight
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { getGenerations, deleteGeneration as deleteGenerationFromDb } from '../lib/supabase';

/* ═══ Skeleton Loading ═══ */
function SkeletonCard({ className = '' }) {
    return (
        <div className={`glass-card p-5 animate-pulse ${className}`}>
            <div className="w-10 h-10 rounded-xl bg-slate-200/60 mb-3" />
            <div className="h-6 w-20 bg-slate-200/60 rounded-lg mb-2" />
            <div className="h-3 w-28 bg-slate-100/60 rounded" />
        </div>
    );
}

function SkeletonRow() {
    return (
        <div className="glass-card p-5 flex items-center gap-4 animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-slate-200/60 flex-shrink-0" />
            <div className="flex-1">
                <div className="h-4 w-48 bg-slate-200/60 rounded mb-2" />
                <div className="h-3 w-32 bg-slate-100/60 rounded" />
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, accent }) {
    return (
        <div className="glass-card p-5 group">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 transition-colors ${accent}`}>
                <Icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 font-display">{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
        </div>
    );
}

function DeployGuideCard({ name, icon, description, color, steps, link }) {
    return (
        <div className="glass-card p-6">
            <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
                    {icon}
                </div>
                <div>
                    <h4 className="font-bold text-slate-900">{name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{description}</p>
                </div>
            </div>
            <div className="space-y-2 mb-4">
                {steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-brand-50 border border-brand-200/50 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-brand-600 mt-0.5">
                            {i + 1}
                        </span>
                        <p className="text-xs text-slate-600">{step}</p>
                    </div>
                ))}
            </div>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
            >
                Open {name} <ArrowRight className="h-3 w-3" />
            </a>
        </div>
    );
}

export default function Dashboard() {
    const { user, subscription, signOut } = useAuth();
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadHistory = async () => {
            if (user?.id) {
                const data = await getGenerations(user.id);
                setHistory(data);
            } else {
                // Fallback to localStorage for non-authenticated view
                const stored = localStorage.getItem('genapps_history');
                if (stored) {
                    try { setHistory(JSON.parse(stored)); } catch { /* ignore */ }
                }
            }
            setIsLoading(false);
        };
        loadHistory();
    }, [user]);

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const deleteHistoryItem = async (index) => {
        const item = history[index];
        // If the item has an ID, delete from Supabase
        if (item?.id) {
            await deleteGenerationFromDb(item.id);
        }
        const updated = history.filter((_, i) => i !== index);
        setHistory(updated);
        localStorage.setItem('genapps_history', JSON.stringify(updated));
    };

    const planNames = {
        starter: 'Starter',
        pro: 'Pro',
        business: 'Business',
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'history', label: 'History', icon: Clock },
        { id: 'integrations', label: 'Integrations', icon: Link2 },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="pt-24 pb-16 min-h-screen">
            {/* Hero */}
            <section className="py-8 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="cloud-shape cloud-shape-1 top-[10%] left-[20%] animate-cloud-drift opacity-30" />
                    <div className="cloud-shape cloud-shape-2 top-[5%] right-[15%] animate-cloud-drift-reverse opacity-20" />
                </div>
                <div className="section-container relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900">
                                Welcome back{user?.user_metadata?.name ? `, ${user.user_metadata.name.split(' ')[0]}` : ''} 👋
                            </h1>
                            <p className="text-slate-500 mt-1">{user?.email}</p>
                        </div>
                        <Link
                            to="/builder"
                            className="btn-primary px-6 py-3 rounded-xl sparkle-btn inline-flex items-center self-start sm:self-auto"
                        >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Generate Website
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section-container">
                {/* Tabs */}
                <div className="flex gap-1 mb-8 bg-white/40 border border-white/40 rounded-2xl p-1.5 w-fit overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-white text-slate-900 shadow-glass-sm border border-white/60'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-white/40'
                                }`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Stats */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <StatCard
                                    icon={Sparkles}
                                    label="Websites Generated"
                                    value={history.length}
                                    accent="bg-brand-50 border-brand-200/50 text-brand-500 group-hover:bg-brand-100"
                                />
                                <StatCard
                                    icon={CreditCard}
                                    label="Current Plan"
                                    value={planNames[subscription.plan] || 'Free'}
                                    accent="bg-lavender-50 border-lavender-200/50 text-lavender-500 group-hover:bg-lavender-100"
                                />
                                <StatCard
                                    icon={Zap}
                                    label="Generations Left"
                                    value={subscription.plan ? '∞' : `${Math.max(0, 3 - history.length)}/3`}
                                    accent="bg-emerald-50 border-emerald-200/50 text-emerald-500 group-hover:bg-emerald-100"
                                />
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <Link to="/builder" className="glass-card p-4 text-center hover:shadow-lg transition-all group">
                                <Sparkles className="h-5 w-5 text-brand-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-semibold text-slate-700">New Website</span>
                            </Link>
                            <button onClick={() => setActiveTab('history')} className="glass-card p-4 text-center hover:shadow-lg transition-all group">
                                <Clock className="h-5 w-5 text-lavender-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-semibold text-slate-700">View History</span>
                            </button>
                            <Link to="/pricing" className="glass-card p-4 text-center hover:shadow-lg transition-all group">
                                <Crown className="h-5 w-5 text-amber-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-semibold text-slate-700">{subscription.plan ? 'Manage Plan' : 'Upgrade'}</span>
                            </Link>
                            <Link to="/docs" className="glass-card p-4 text-center hover:shadow-lg transition-all group">
                                <BookOpen className="h-5 w-5 text-emerald-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-semibold text-slate-700">Documentation</span>
                            </Link>
                        </div>

                        {/* Subscription Card */}
                        <div className="glass-card p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-lavender-500 flex items-center justify-center">
                                        <Crown className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">
                                            {subscription.plan ? `${planNames[subscription.plan]} Plan` : 'Free Plan'}
                                        </h3>
                                        <p className="text-xs text-slate-500">
                                            {subscription.plan
                                                ? 'All features unlocked'
                                                : 'Upgrade for unlimited generations'
                                            }
                                        </p>
                                    </div>
                                </div>
                                {!subscription.plan ? (
                                    <Link
                                        to="/pricing"
                                        className="btn-primary px-4 py-2 rounded-xl text-sm inline-flex items-center"
                                    >
                                        Upgrade
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Link>
                                ) : (
                                    <a
                                        href="https://app.lemonsqueezy.com/my-orders"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary px-4 py-2 rounded-xl text-sm inline-flex items-center"
                                    >
                                        Manage Subscription
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </a>
                                )}
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-200/50 flex items-center justify-center gap-2">
                                <Lock className="h-3.5 w-3.5 text-emerald-500" />
                                <span className="text-xs text-slate-400">Billing securely managed by</span>
                                <a href="https://www.lemonsqueezy.com" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-slate-500 hover:text-brand-500 transition-colors">🍋 Lemon Squeezy</a>
                            </div>
                        </div>

                        {/* Recent Generations */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 font-display">Recent Generations</h3>
                            {isLoading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <SkeletonRow />
                                    <SkeletonRow />
                                </div>
                            ) : history.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {history.slice(0, 4).map((item, i) => (
                                        <div key={i} className="glass-card p-5 group">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    {item.buildType === 'mobile' ? (
                                                        <Smartphone className="h-4 w-4 text-brand-500" />
                                                    ) : (
                                                        <Globe className="h-4 w-4 text-brand-500" />
                                                    )}
                                                    <span className="text-xs font-medium text-brand-500 uppercase">
                                                        {item.template}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-slate-400">{item.date}</span>
                                            </div>
                                            <p className="text-sm text-slate-700 font-medium line-clamp-2 mb-2">
                                                {item.prompt || 'Untitled generation'}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="flex items-center gap-1 text-xs text-slate-400">
                                                    <Palette className="h-3 w-3" />
                                                    {item.color}
                                                </span>
                                                {item.model && (
                                                    <span className="text-xs text-slate-400">• {item.model}</span>
                                                )}
                                            </div>
                                            <Link
                                                to={`/builder?prompt=${encodeURIComponent(item.prompt || '')}`}
                                                className="flex items-center gap-1 text-xs text-brand-500 hover:text-brand-600 font-medium mt-2"
                                            >
                                                <RefreshCw className="h-3 w-3" /> Regenerate
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="glass-card p-10 text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-100 to-lavender-100 flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="h-7 w-7 text-brand-400" />
                                    </div>
                                    <h4 className="font-bold text-slate-800 mb-1">No websites generated yet</h4>
                                    <p className="text-sm text-slate-500 mb-5">Create your first AI-powered website in seconds</p>
                                    <Link to="/builder" className="btn-primary px-6 py-2.5 rounded-xl text-sm inline-flex items-center">
                                        <Sparkles className="h-4 w-4 mr-2" />
                                        Generate Your First Site
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                    <div className="animate-fade-in">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 font-display">Generation History</h3>
                        {history.length > 0 ? (
                            <div className="space-y-3">
                                {history.map((item, i) => (
                                    <div key={i} className="glass-card p-5 flex items-center justify-between group">
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200/50 flex items-center justify-center flex-shrink-0">
                                                {item.buildType === 'mobile' ? (
                                                    <Smartphone className="h-5 w-5 text-brand-500" />
                                                ) : (
                                                    <Globe className="h-5 w-5 text-brand-500" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-900 truncate">
                                                    {item.prompt || 'Untitled generation'}
                                                </p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-xs text-brand-500 font-medium">{item.template}</span>
                                                    <span className="text-xs text-slate-400">{item.color}</span>
                                                    {item.model && <span className="text-xs text-slate-400">{item.model}</span>}
                                                    <span className="text-xs text-slate-400">{item.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Link
                                                to={`/builder?prompt=${encodeURIComponent(item.prompt || '')}`}
                                                className="p-2 rounded-lg text-brand-400 hover:text-brand-600 hover:bg-brand-50 transition-all opacity-0 group-hover:opacity-100"
                                                title="Regenerate"
                                            >
                                                <RefreshCw className="h-4 w-4" />
                                            </Link>
                                            <button
                                                onClick={() => deleteHistoryItem(i)}
                                                className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="glass-card p-10 text-center">
                                <Clock className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                                <p className="text-sm text-slate-500">No generation history yet</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Integrations Tab */}
                {activeTab === 'integrations' && (
                    <div className="animate-fade-in max-w-2xl">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Deploy Your Sites</h3>
                        <p className="text-sm text-slate-500 mb-6">Follow these guides to deploy your generated websites to popular hosting platforms.</p>

                        <div className="space-y-4">
                            <DeployGuideCard
                                name="GitHub Pages"
                                icon={<Github className="h-6 w-6 text-white" />}
                                description="Free hosting for static sites via GitHub"
                                color="bg-slate-900"
                                steps={[
                                    'Create a new GitHub repository',
                                    'Copy your generated code and paste into index.html',
                                    'Go to Settings → Pages → Deploy from branch',
                                    'Your site will be live at username.github.io/repo-name',
                                ]}
                                link="https://github.com/new"
                            />
                            <DeployGuideCard
                                name="Vercel"
                                icon={
                                    <svg className="h-5 w-5 text-white" viewBox="0 0 76 65" fill="currentColor">
                                        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                                    </svg>
                                }
                                description="Instant deployment with custom domain support"
                                color="bg-black"
                                steps={[
                                    'Download your generated site as an HTML file',
                                    'Go to vercel.com/new and click Upload',
                                    'Drag and drop your HTML file',
                                    'Vercel auto-deploys and gives you a live URL!',
                                ]}
                                link="https://vercel.com/new"
                            />
                        </div>

                        <div className="mt-8 p-5 rounded-2xl bg-brand-50/50 border border-brand-200/30">
                            <p className="text-sm text-slate-600">
                                <strong className="text-slate-800">💡 Tip:</strong> After generating a website, use the "Download" or "Copy" buttons in the preview window to get your code, then follow the steps above.
                            </p>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="animate-fade-in max-w-2xl">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 font-display">Account Settings</h3>

                        <div className="space-y-4">
                            <div className="glass-card p-6">
                                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <User className="h-4 w-4 text-brand-500" />
                                    Profile
                                </h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Name</label>
                                        <p className="text-sm text-slate-900 font-medium bg-white/50 border border-slate-200/50 rounded-xl px-4 py-3">
                                            {user?.user_metadata?.name || user?.user_metadata?.full_name || 'Not set'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Email</label>
                                        <p className="text-sm text-slate-900 font-medium bg-white/50 border border-slate-200/50 rounded-xl px-4 py-3 flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-slate-400" />
                                            {user?.email || 'Not set'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-6">
                                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <CreditCard className="h-4 w-4 text-brand-500" />
                                    Subscription
                                </h4>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">
                                            {planNames[subscription.plan] || 'Free'} Plan
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            {subscription.plan ? 'Active' : 'No active subscription'}
                                        </p>
                                    </div>
                                    <Link to="/pricing" className="btn-secondary px-4 py-2 rounded-xl text-sm">
                                        {subscription.plan ? 'Manage' : 'Upgrade'}
                                    </Link>
                                </div>
                            </div>

                            <div className="glass-card p-6">
                                <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </h4>
                                <p className="text-xs text-slate-500 mb-4">Sign out of your Genapps account.</p>
                                <button
                                    onClick={handleSignOut}
                                    className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200/50 rounded-xl hover:bg-red-100 transition-colors"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
