import React, { useState, useEffect } from 'react';
import {
    User,
    Settings,
    CreditCard,
    Github,
    Zap,
    Crown,
    LogOut,
    ChevronRight,
    Check,
    Link,
    ExternalLink,
    Trash2,
    Shield
} from 'lucide-react';
import { cn } from '../../../lib/utils';

interface ProfilePageProps {
    isPremium?: boolean;
    onUpgradeClick?: () => void;
}

export const ProfilePage = ({ isPremium: initialPremium = false, onUpgradeClick }: ProfilePageProps) => {
    const [isPremium, setIsPremium] = useState(initialPremium);
    const [userEmail, setUserEmail] = useState('user@example.com');
    const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'connections'>('profile');

    // Connected accounts
    const [connectedGithub, setConnectedGithub] = useState(false);
    const [connectedVercel, setConnectedVercel] = useState(false);

    useEffect(() => {
        // Load from localStorage
        const storedEmail = localStorage.getItem('genapps_user_email');
        if (storedEmail) setUserEmail(storedEmail);

        const premium = localStorage.getItem('genapps_premium') === 'true';
        setIsPremium(premium);

        const github = localStorage.getItem('genapps_github_connected') === 'true';
        const vercel = localStorage.getItem('genapps_vercel_connected') === 'true';
        setConnectedGithub(github);
        setConnectedVercel(vercel);
    }, []);

    const handleConnectGithub = () => {
        if (!isPremium) {
            onUpgradeClick?.();
            return;
        }
        // Simulate OAuth
        setConnectedGithub(true);
        localStorage.setItem('genapps_github_connected', 'true');
    };

    const handleConnectVercel = () => {
        if (!isPremium) {
            onUpgradeClick?.();
            return;
        }
        // Simulate OAuth
        setConnectedVercel(true);
        localStorage.setItem('genapps_vercel_connected', 'true');
    };

    const handleDisconnect = (service: 'github' | 'vercel') => {
        if (service === 'github') {
            setConnectedGithub(false);
            localStorage.removeItem('genapps_github_connected');
        } else {
            setConnectedVercel(false);
            localStorage.removeItem('genapps_vercel_connected');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('genapps_auth');
        localStorage.removeItem('genapps_user_email');
        window.location.href = '/';
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
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">G</span>
                        </div>
                        <span className="text-white font-semibold">GenApps</span>
                    </a>

                    <div className="flex items-center gap-4">
                        <a href="/templates" className="text-gray-400 hover:text-white text-sm transition-colors">
                            Back to Templates
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
                {/* Profile Header */}
                <div className="flex items-center gap-6 mb-12">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-3xl font-bold text-white">
                        {userEmail.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">{userEmail}</h1>
                        <div className="flex items-center gap-2">
                            {isPremium ? (
                                <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium">
                                    <Crown className="w-4 h-4" />
                                    Pro Plan
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 text-sm">
                                    Free Plan
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-8 p-1 bg-white/5 rounded-xl w-fit">
                    {[
                        { id: 'profile', label: 'Profile', icon: User },
                        { id: 'billing', label: 'Billing', icon: CreditCard },
                        { id: 'connections', label: 'Connections', icon: Link }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                activeTab === tab.id
                                    ? "bg-violet-500 text-white"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                    {activeTab === 'profile' && (
                        <>
                            {/* Account Settings */}
                            <div className="p-6 bg-[#0c0c0e] border border-white/10 rounded-2xl">
                                <h2 className="text-lg font-semibold text-white mb-6">Account Settings</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-400 mb-2 block">Email</label>
                                        <input
                                            type="email"
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-400 mb-2 block">Password</label>
                                        <input
                                            type="password"
                                            value="••••••••"
                                            readOnly
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-500"
                                        />
                                    </div>

                                    <button className="px-4 py-2 bg-violet-500 text-white font-medium rounded-lg hover:bg-violet-600 transition-colors">
                                        Save Changes
                                    </button>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl">
                                <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-medium">Delete Account</p>
                                        <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                                    </div>
                                    <button className="px-4 py-2 bg-red-500/20 text-red-400 font-medium rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2">
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'billing' && (
                        <>
                            {/* Current Plan */}
                            <div className="p-6 bg-[#0c0c0e] border border-white/10 rounded-2xl">
                                <h2 className="text-lg font-semibold text-white mb-6">Current Plan</h2>

                                <div className={cn(
                                    "p-6 rounded-xl border",
                                    isPremium
                                        ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30"
                                        : "bg-white/5 border-white/10"
                                )}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            {isPremium ? (
                                                <Crown className="w-8 h-8 text-amber-400" />
                                            ) : (
                                                <Zap className="w-8 h-8 text-gray-400" />
                                            )}
                                            <div>
                                                <p className="text-xl font-bold text-white">
                                                    {isPremium ? 'Pro Plan' : 'Free Plan'}
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    {isPremium ? '$29/month' : '$0/month'}
                                                </p>
                                            </div>
                                        </div>
                                        {!isPremium && (
                                            <button
                                                onClick={onUpgradeClick}
                                                className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium rounded-lg hover:opacity-90 transition-all"
                                            >
                                                Upgrade to Pro
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-black/20 rounded-xl">
                                            <p className="text-sm text-gray-400 mb-1">Credits Used</p>
                                            <p className="text-2xl font-bold text-white">
                                                {isPremium ? '∞' : '8'}<span className="text-gray-500 text-lg">/{isPremium ? '∞' : '10'}</span>
                                            </p>
                                        </div>
                                        <div className="p-4 bg-black/20 rounded-xl">
                                            <p className="text-sm text-gray-400 mb-1">Apps Created</p>
                                            <p className="text-2xl font-bold text-white">12</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="p-6 bg-[#0c0c0e] border border-white/10 rounded-2xl">
                                <h2 className="text-lg font-semibold text-white mb-6">Your Features</h2>

                                <div className="space-y-3">
                                    {[
                                        { label: 'AI App Generation', included: true },
                                        { label: 'Live Preview', included: true },
                                        { label: 'Download ZIP', included: true },
                                        { label: 'All AI Models', included: isPremium },
                                        { label: 'Deep Thinking Mode', included: isPremium },
                                        { label: 'GitHub Integration', included: isPremium },
                                        { label: 'Vercel Deployment', included: isPremium },
                                        { label: 'Custom Domain Sharing', included: isPremium },
                                        { label: 'No Watermark', included: isPremium },
                                        { label: 'Priority Support', included: isPremium },
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-5 h-5 rounded-full flex items-center justify-center",
                                                feature.included ? "bg-emerald-500/20" : "bg-white/5"
                                            )}>
                                                {feature.included ? (
                                                    <Check className="w-3 h-3 text-emerald-400" />
                                                ) : (
                                                    <span className="w-2 h-2 bg-gray-600 rounded-full" />
                                                )}
                                            </div>
                                            <span className={feature.included ? "text-white" : "text-gray-500"}>
                                                {feature.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'connections' && (
                        <>
                            {/* GitHub */}
                            <div className="p-6 bg-[#0c0c0e] border border-white/10 rounded-2xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#24292e] flex items-center justify-center">
                                            <Github className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">GitHub</p>
                                            <p className="text-sm text-gray-400">
                                                {connectedGithub ? 'Connected' : 'Push code to repositories'}
                                            </p>
                                        </div>
                                    </div>

                                    {connectedGithub ? (
                                        <button
                                            onClick={() => handleDisconnect('github')}
                                            className="px-4 py-2 bg-red-500/20 text-red-400 font-medium rounded-lg hover:bg-red-500/30 transition-colors"
                                        >
                                            Disconnect
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleConnectGithub}
                                            className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                                        >
                                            {!isPremium && <Crown className="w-4 h-4 text-amber-400" />}
                                            Connect
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Vercel */}
                            <div className="p-6 bg-[#0c0c0e] border border-white/10 rounded-2xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center border border-white/10">
                                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 1L24 22H0L12 1Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">Vercel</p>
                                            <p className="text-sm text-gray-400">
                                                {connectedVercel ? 'Connected' : 'Deploy with one click'}
                                            </p>
                                        </div>
                                    </div>

                                    {connectedVercel ? (
                                        <button
                                            onClick={() => handleDisconnect('vercel')}
                                            className="px-4 py-2 bg-red-500/20 text-red-400 font-medium rounded-lg hover:bg-red-500/30 transition-colors"
                                        >
                                            Disconnect
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleConnectVercel}
                                            className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                                        >
                                            {!isPremium && <Crown className="w-4 h-4 text-amber-400" />}
                                            Connect
                                        </button>
                                    )}
                                </div>
                            </div>

                            {!isPremium && (
                                <div className="p-6 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl text-center">
                                    <Crown className="w-10 h-10 text-amber-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">Unlock Integrations</h3>
                                    <p className="text-gray-400 mb-4">
                                        Upgrade to Pro to connect GitHub and Vercel for seamless deployment.
                                    </p>
                                    <button
                                        onClick={onUpgradeClick}
                                        className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium rounded-xl hover:opacity-90 transition-all"
                                    >
                                        Upgrade to Pro
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Logout Button */}
                <div className="mt-12 pt-8 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </main>
        </div>
    );
};
