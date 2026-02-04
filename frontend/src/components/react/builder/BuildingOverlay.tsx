import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles, Code2, FileCode, Palette, Rocket } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface BuildingOverlayProps {
    isVisible: boolean;
    progress: number;
    status: string;
    onComplete?: () => void;
}

const BUILDING_STEPS = [
    { icon: Sparkles, label: 'Analyzing requirements', color: 'text-violet-400' },
    { icon: Code2, label: 'Generating components', color: 'text-cyan-400' },
    { icon: Palette, label: 'Applying styles', color: 'text-pink-400' },
    { icon: FileCode, label: 'Creating files', color: 'text-green-400' },
    { icon: Rocket, label: 'Launching preview', color: 'text-amber-400' }
];

export const BuildingOverlay = ({ isVisible, progress, status, onComplete }: BuildingOverlayProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [fakeFiles, setFakeFiles] = useState<string[]>([]);

    // Determine current step based on progress
    useEffect(() => {
        if (progress < 20) setCurrentStep(0);
        else if (progress < 40) setCurrentStep(1);
        else if (progress < 60) setCurrentStep(2);
        else if (progress < 80) setCurrentStep(3);
        else setCurrentStep(4);
    }, [progress]);

    // Add fake file creation animation
    useEffect(() => {
        if (!isVisible || progress >= 100) return;

        const files = [
            'package.json',
            'vite.config.js',
            'index.html',
            'src/main.jsx',
            'src/App.jsx',
            'src/components/Header.jsx',
            'src/components/Hero.jsx',
            'src/components/Features.jsx',
            'src/components/Footer.jsx'
        ];

        const interval = setInterval(() => {
            setFakeFiles(prev => {
                const nextIndex = prev.length;
                if (nextIndex >= files.length) return prev;
                return [...prev, files[nextIndex]];
            });
        }, 800);

        return () => clearInterval(interval);
    }, [isVisible, progress]);

    // Reset when hidden
    useEffect(() => {
        if (!isVisible) {
            setFakeFiles([]);
            setCurrentStep(0);
        }
    }, [isVisible]);

    // Call onComplete when progress reaches 100
    useEffect(() => {
        if (progress >= 100 && onComplete) {
            const timer = setTimeout(onComplete, 500);
            return () => clearTimeout(timer);
        }
    }, [progress, onComplete]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 bg-[#09090b]/95 backdrop-blur-xl flex items-center justify-center">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-[100px] animate-pulse delay-500" />
                </div>
            </div>

            <div className="relative max-w-lg w-full mx-4 space-y-8">
                {/* Main Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-violet-500/30">
                            <Loader2 className="w-12 h-12 text-white animate-spin" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-white">Building Your App</h2>
                    <p className="text-gray-400">{status || 'Generating code...'}</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-3">
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <div
                            className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-full transition-all duration-500 ease-out relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </div>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-white font-mono font-bold">{Math.round(progress)}%</span>
                    </div>
                </div>

                {/* Steps */}
                <div className="space-y-3">
                    {BUILDING_STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStep;
                        const isComplete = index < currentStep;

                        return (
                            <div
                                key={index}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
                                    isActive && "bg-white/5 border border-white/10",
                                    isComplete && "opacity-50"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                    isActive ? "bg-violet-500/20" : "bg-white/5"
                                )}>
                                    {isComplete ? (
                                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <Icon className={cn("w-4 h-4", isActive ? step.color : "text-gray-500")} />
                                    )}
                                </div>
                                <span className={cn(
                                    "text-sm font-medium transition-colors",
                                    isActive ? "text-white" : "text-gray-500"
                                )}>
                                    {step.label}
                                </span>
                                {isActive && (
                                    <div className="ml-auto flex gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse delay-150" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse delay-300" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* File Creation Log */}
                <div className="bg-[#0c0c0e] border border-white/5 rounded-xl p-4 max-h-40 overflow-hidden">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Files Created</p>
                    <div className="space-y-1 font-mono text-xs overflow-y-auto max-h-24 custom-scrollbar">
                        {fakeFiles.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-gray-400 animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <span className="text-green-400">✓</span>
                                <span>{file}</span>
                            </div>
                        ))}
                        {fakeFiles.length === 0 && (
                            <div className="text-gray-600">Waiting for files...</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Shimmer animation styles */}
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
