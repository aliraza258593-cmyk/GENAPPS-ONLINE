import React, { useState } from 'react';
import {
    Monitor,
    Tablet,
    Smartphone,
    RefreshCw,
    ExternalLink,
    Maximize2,
    Minimize2,
    Terminal as TerminalIcon,
    Share2,
    Github,
    Globe,
    Link,
    Copy,
    Check,
    Lock,
    Crown,
    X
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useWebContainer } from '../../../contexts/WebContainerContext';

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

interface PreviewFrameProps {
    isPremium?: boolean;
    onUpgradeClick?: () => void;
}

const deviceSizes: Record<DeviceMode, { width: string; height: string; label: string }> = {
    desktop: { width: '100%', height: '100%', label: 'Desktop' },
    tablet: { width: '768px', height: '100%', label: 'Tablet' },
    mobile: { width: '375px', height: '100%', label: 'Mobile' }
};

export const PreviewFrame = ({ isPremium = false, onUpgradeClick }: PreviewFrameProps) => {
    const { previewUrl, isLoading, terminalOutput } = useWebContainer();
    const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showTerminal, setShowTerminal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleRefresh = () => {
        const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
        if (iframe && previewUrl) {
            iframe.src = previewUrl;
        }
    };

    const handleOpenNewTab = () => {
        if (previewUrl) {
            window.open(previewUrl, '_blank');
        }
    };

    const handleToggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleCopyLink = () => {
        // Generate mock share link
        const shareLink = `https://preview.genapps.online/${Math.random().toString(36).substring(2, 10)}`;
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const currentSize = deviceSizes[deviceMode];

    return (
        <>
            <div className={cn(
                "flex flex-col h-full bg-[#09090b] relative",
                isFullscreen && "fixed inset-0 z-50"
            )}>
                {/* Browser Chrome Header */}
                <div className="h-12 border-b border-white/5 bg-[#0c0c0e] flex items-center px-4 gap-4 shrink-0">
                    {/* Traffic Lights */}
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
                    </div>

                    {/* URL Bar */}
                    <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 max-w-md h-7 bg-white/5 rounded-lg flex items-center px-3 gap-2">
                            <Globe className="w-3.5 h-3.5 text-gray-500" />
                            <span className="text-xs text-gray-400 truncate font-mono">
                                {previewUrl || 'localhost:5173'}
                            </span>
                        </div>
                    </div>

                    {/* Device Toggle */}
                    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
                        {[
                            { mode: 'desktop', icon: Monitor },
                            { mode: 'tablet', icon: Tablet },
                            { mode: 'mobile', icon: Smartphone }
                        ].map(({ mode, icon: Icon }) => (
                            <button
                                key={mode}
                                onClick={() => setDeviceMode(mode as DeviceMode)}
                                className={cn(
                                    "p-1.5 rounded-md transition-all",
                                    deviceMode === mode
                                        ? "bg-violet-500 text-white"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                                title={deviceSizes[mode as DeviceMode].label}
                            >
                                <Icon className="w-4 h-4" />
                            </button>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handleRefresh}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            title="Refresh"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleOpenNewTab}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            title="Open in new tab"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setShowTerminal(!showTerminal)}
                            className={cn(
                                "p-2 rounded-lg transition-all",
                                showTerminal
                                    ? "bg-violet-500/20 text-violet-400"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                            title="Toggle Terminal"
                        >
                            <TerminalIcon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setShowShareModal(true)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            title="Share"
                        >
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleToggleFullscreen}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                        >
                            {isFullscreen ? (
                                <Minimize2 className="w-4 h-4" />
                            ) : (
                                <Maximize2 className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Preview Content */}
                <div className={cn(
                    "flex-1 bg-[#121212] relative overflow-hidden flex items-center justify-center p-4",
                    showTerminal && "pb-0"
                )}>
                    {!previewUrl ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            {/* Loading Animation */}
                            <div className="relative mb-8">
                                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/40 to-fuchsia-500/40 flex items-center justify-center animate-pulse">
                                        <Globe className="w-8 h-8 text-violet-400" />
                                    </div>
                                </div>
                                {isLoading && (
                                    <div className="absolute inset-0 rounded-3xl border-2 border-violet-500/30 animate-ping" />
                                )}
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-2">
                                {isLoading ? 'Starting Environment...' : 'Ready to Preview'}
                            </h3>
                            <p className="text-sm text-gray-400 text-center max-w-xs">
                                {isLoading
                                    ? 'Booting WebContainer and installing dependencies...'
                                    : 'Enter a prompt to generate your app and see it live here'
                                }
                            </p>
                        </div>
                    ) : (
                        <div
                            className={cn(
                                "relative bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-500",
                                deviceMode === 'mobile' && "rounded-[2rem] border-4 border-gray-800"
                            )}
                            style={{
                                width: currentSize.width,
                                height: deviceMode === 'desktop' ? currentSize.height : 'calc(100% - 40px)',
                                maxWidth: '100%',
                                maxHeight: '100%'
                            }}
                        >
                            {/* Mobile Notch */}
                            {deviceMode === 'mobile' && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-10" />
                            )}

                            <iframe
                                id="preview-iframe"
                                src={previewUrl}
                                className="w-full h-full border-none"
                                title="Live Preview"
                            />

                            {/* Free User Watermark */}
                            {!isPremium && (
                                <div className="absolute bottom-4 right-4 z-20">
                                    <div className="px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg border border-white/10 flex items-center gap-2">
                                        <span className="text-xs text-gray-400">Built with</span>
                                        <span className="text-xs font-semibold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                            GenApps.online
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Terminal Panel */}
                {showTerminal && (
                    <div className="h-48 border-t border-white/5 bg-[#0c0c0e] flex flex-col shrink-0">
                        <div className="h-8 border-b border-white/5 flex items-center justify-between px-3">
                            <span className="text-xs text-gray-500 font-medium">Terminal</span>
                            <button
                                onClick={() => setShowTerminal(false)}
                                className="text-gray-500 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex-1 p-3 overflow-y-auto font-mono text-xs custom-scrollbar">
                            {terminalOutput.length === 0 ? (
                                <p className="text-gray-600">Waiting for terminal output...</p>
                            ) : (
                                terminalOutput.map((line, i) => (
                                    <div key={i} className="text-gray-400 whitespace-pre-wrap">
                                        {line}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowShareModal(false)}
                    />
                    <div className="relative bg-[#0c0c0e] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-white">Share Project</h2>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {/* Copy Link */}
                            <button
                                onClick={handleCopyLink}
                                className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                                    {copied ? (
                                        <Check className="w-5 h-5 text-green-400" />
                                    ) : (
                                        <Link className="w-5 h-5 text-violet-400" />
                                    )}
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-white">
                                        {copied ? 'Link Copied!' : 'Copy Share Link'}
                                    </p>
                                    <p className="text-sm text-gray-400">Get a shareable link to your project</p>
                                </div>
                            </button>

                            {/* GitHub */}
                            <button
                                onClick={isPremium ? () => { } : onUpgradeClick}
                                className={cn(
                                    "w-full flex items-center gap-4 p-4 border rounded-xl transition-all group",
                                    isPremium
                                        ? "bg-white/5 hover:bg-white/10 border-white/5"
                                        : "bg-white/5 border-white/5 opacity-60"
                                )}
                            >
                                <div className="w-10 h-10 rounded-xl bg-gray-700 flex items-center justify-center">
                                    <Github className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left flex-1">
                                    <p className="font-medium text-white">Push to GitHub</p>
                                    <p className="text-sm text-gray-400">Export to a GitHub repository</p>
                                </div>
                                {!isPremium && (
                                    <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 rounded-lg">
                                        <Crown className="w-3 h-3 text-amber-400" />
                                        <span className="text-xs text-amber-400">Pro</span>
                                    </div>
                                )}
                            </button>

                            {/* Vercel */}
                            <button
                                onClick={isPremium ? () => { } : onUpgradeClick}
                                className={cn(
                                    "w-full flex items-center gap-4 p-4 border rounded-xl transition-all group",
                                    isPremium
                                        ? "bg-white/5 hover:bg-white/10 border-white/5"
                                        : "bg-white/5 border-white/5 opacity-60"
                                )}
                            >
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                                    <svg className="w-5 h-5 text-black" viewBox="0 0 76 65" fill="currentColor">
                                        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                                    </svg>
                                </div>
                                <div className="text-left flex-1">
                                    <p className="font-medium text-white">Deploy to Vercel</p>
                                    <p className="text-sm text-gray-400">One-click deployment to Vercel</p>
                                </div>
                                {!isPremium && (
                                    <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 rounded-lg">
                                        <Crown className="w-3 h-3 text-amber-400" />
                                        <span className="text-xs text-amber-400">Pro</span>
                                    </div>
                                )}
                            </button>
                        </div>

                        {!isPremium && (
                            <div className="mt-6 p-4 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-xl">
                                <p className="text-sm text-gray-300 mb-3">
                                    Upgrade to Pro to unlock GitHub, Vercel, and custom domain sharing.
                                </p>
                                <button
                                    onClick={onUpgradeClick}
                                    className="w-full py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition"
                                >
                                    Upgrade to Pro
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Fade in animation for modal */}
            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.2s ease-out;
                }
            `}</style>
        </>
    );
};
