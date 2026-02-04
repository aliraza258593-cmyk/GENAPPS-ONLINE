import React, { useState } from 'react';
import { ChevronDown, Check, Lock, Crown, Brain, Sparkles } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { UI_MODELS, type UIModelName, isPremiumModel } from '../../../lib/longcat';

interface ModelSelectorProps {
    selectedModel: UIModelName;
    onSelectModel: (model: UIModelName) => void;
    deepThinking: boolean;
    onToggleDeepThinking: (value: boolean) => void;
    isPremium: boolean;
    onUpgradeClick?: () => void;
}

export const ModelSelector = ({
    selectedModel,
    onSelectModel,
    deepThinking,
    onToggleDeepThinking,
    isPremium,
    onUpgradeClick
}: ModelSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentModel = UI_MODELS.find(m => m.id === selectedModel) || UI_MODELS[0];

    const handleSelectModel = (modelId: UIModelName) => {
        if (isPremiumModel(modelId) && !isPremium) {
            onUpgradeClick?.();
            return;
        }
        onSelectModel(modelId);
        setIsOpen(false);
    };

    const handleToggleDeep = () => {
        if (!isPremium) {
            onUpgradeClick?.();
            return;
        }
        onToggleDeepThinking(!deepThinking);
    };

    return (
        <div className="flex items-center gap-2">
            {/* Model Selector Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors"
                >
                    <span className="text-base">{currentModel.icon}</span>
                    <span className="text-white font-medium hidden sm:inline">{currentModel.name}</span>
                    <ChevronDown className={cn(
                        "w-4 h-4 text-gray-400 transition-transform",
                        isOpen && "rotate-180"
                    )} />
                </button>

                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <div className="absolute top-full left-0 mt-2 w-72 bg-[#0c0c0e] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in-up">
                            <div className="p-2">
                                <p className="text-[10px] uppercase tracking-wider text-gray-500 px-2 py-1 font-medium">
                                    Select Model
                                </p>
                            </div>

                            <div className="px-2 pb-2 space-y-1">
                                {UI_MODELS.map((model) => {
                                    const isSelected = model.id === selectedModel;
                                    const isLocked = model.premium && !isPremium;

                                    return (
                                        <button
                                            key={model.id}
                                            onClick={() => handleSelectModel(model.id as UIModelName)}
                                            className={cn(
                                                "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left group",
                                                isSelected
                                                    ? "bg-violet-500/10 border border-violet-500/30"
                                                    : "hover:bg-white/5 border border-transparent",
                                                isLocked && "opacity-60"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br",
                                                model.color
                                            )}>
                                                {model.icon}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-white">
                                                        {model.name}
                                                    </span>
                                                    {model.premium && (
                                                        <span className="px-1.5 py-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded text-[10px] text-amber-400 font-medium">
                                                            PRO
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {model.description}
                                                </p>
                                            </div>

                                            {isSelected ? (
                                                <Check className="w-4 h-4 text-violet-400 shrink-0" />
                                            ) : isLocked ? (
                                                <Lock className="w-4 h-4 text-gray-500 shrink-0" />
                                            ) : null}
                                        </button>
                                    );
                                })}
                            </div>

                            {!isPremium && (
                                <div className="p-3 border-t border-white/5 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5">
                                    <button
                                        onClick={onUpgradeClick}
                                        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white text-sm font-medium rounded-lg transition-all"
                                    >
                                        <Crown className="w-4 h-4" />
                                        Upgrade to Pro
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Deep Thinking Toggle */}
            <button
                onClick={handleToggleDeep}
                className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all border",
                    deepThinking
                        ? "bg-violet-500/20 border-violet-500/30 text-violet-300"
                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                )}
                title={isPremium ? "Toggle Deep Thinking" : "Pro feature - Upgrade to unlock"}
            >
                <Brain className={cn("w-4 h-4", deepThinking && "text-violet-400")} />
                <span className="hidden md:inline">Deep Think</span>
                {!isPremium && <Lock className="w-3 h-3 text-gray-500" />}
            </button>
        </div>
    );
};
