import React, { useState } from 'react';
import {
    ArrowLeft,
    Undo2,
    Redo2,
    Save,
    Download,
    Rocket,
    Code2,
    Crown,
    Check,
    ChevronDown,
    RefreshCw,
    Github
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useWebContainer } from '../../../contexts/WebContainerContext';
import { exportProjectAsZip } from '../../../lib/projectStore';

interface BuilderHeaderProps {
    onTogglePremium?: () => void;
    isPremium?: boolean;
    projectName?: string;
    showCode?: boolean;
    onToggleCode?: () => void;
    canUndo?: boolean;
    canRedo?: boolean;
    onUndo?: () => void;
    onRedo?: () => void;
    onUpgradeClick?: () => void;
}

export const BuilderHeader = ({
    onTogglePremium,
    isPremium = false,
    projectName = 'Untitled Project',
    showCode = false,
    onToggleCode,
    canUndo = false,
    canRedo = false,
    onUndo,
    onRedo,
    onUpgradeClick
}: BuilderHeaderProps) => {
    const { project, saveCurrentProject } = useWebContainer();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(projectName);
    const [isSaving, setIsSaving] = useState(false);
    const [showSaved, setShowSaved] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        saveCurrentProject();
        setTimeout(() => {
            setIsSaving(false);
            setShowSaved(true);
            setTimeout(() => setShowSaved(false), 2000);
        }, 500);
    };

    const handleExport = async () => {
        try {
            await exportProjectAsZip(project);
        } catch (error) {
            console.error('Export failed:', error);
        }
    };

    return (
        <header className="h-14 border-b border-white/5 bg-[#09090b]/90 backdrop-blur-xl flex items-center justify-between px-4 z-20 relative shrink-0">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                <a
                    href="/"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm hidden md:inline">Back</span>
                </a>

                <div className="w-px h-6 bg-white/10" />

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">G</span>
                    </div>
                </div>

                <div className="w-px h-6 bg-white/10" />

                {/* Project Name */}
                <div className="flex items-center gap-2">
                    {isEditing ? (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => setIsEditing(false)}
                            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
                            className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-violet-500"
                            autoFocus
                        />
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-sm font-medium text-white hover:text-violet-400 transition-colors"
                        >
                            {name}
                        </button>
                    )}
                    <span className="text-xs text-gray-500">
                        {showSaved ? (
                            <span className="text-green-400 flex items-center gap-1">
                                <Check className="w-3 h-3" /> Saved
                            </span>
                        ) : (
                            'Auto-saved'
                        )}
                    </span>
                </div>
            </div>

            {/* Center Section - Undo/Redo */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
                <button
                    onClick={onUndo}
                    disabled={!canUndo}
                    className={cn(
                        "p-2 rounded-lg transition-all",
                        canUndo
                            ? "text-gray-400 hover:text-white hover:bg-white/5"
                            : "text-gray-600 cursor-not-allowed"
                    )}
                    title="Undo"
                >
                    <Undo2 className="w-4 h-4" />
                </button>
                <button
                    onClick={onRedo}
                    disabled={!canRedo}
                    className={cn(
                        "p-2 rounded-lg transition-all",
                        canRedo
                            ? "text-gray-400 hover:text-white hover:bg-white/5"
                            : "text-gray-600 cursor-not-allowed"
                    )}
                    title="Redo"
                >
                    <Redo2 className="w-4 h-4" />
                </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
                {/* Premium Toggle */}
                {!isPremium && (
                    <button
                        onClick={onUpgradeClick}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg text-amber-400 text-xs font-medium hover:from-amber-500/30 hover:to-orange-500/30 transition-all"
                    >
                        <Crown className="w-3.5 h-3.5" />
                        <span>Go Pro</span>
                    </button>
                )}

                {/* Code Toggle */}
                <button
                    onClick={onToggleCode}
                    className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                        showCode
                            ? "bg-violet-500/20 border border-violet-500/30 text-violet-400"
                            : "bg-white/5 border border-white/5 text-gray-400 hover:text-white"
                    )}
                    title={isPremium ? "Toggle Code Editor" : "Pro feature"}
                >
                    <Code2 className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Code</span>
                </button>

                {/* Sync to GitHub */}
                <button
                    onClick={isPremium ? undefined : onUpgradeClick}
                    className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                        isPremium
                            ? "bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                            : "bg-white/5 border border-white/5 text-gray-500 opacity-50"
                    )}
                    title={isPremium ? "Sync to GitHub" : "Pro feature"}
                >
                    <Github className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Sync</span>
                </button>

                {/* Save */}
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 text-xs font-medium transition-all"
                >
                    {isSaving ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                        <Save className="w-3.5 h-3.5" />
                    )}
                    <span className="hidden md:inline">Save</span>
                </button>

                {/* Export */}
                <button
                    onClick={handleExport}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 text-xs font-medium transition-all"
                >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Export</span>
                </button>

                {/* Deploy */}
                <button
                    onClick={isPremium ? undefined : onUpgradeClick}
                    className={cn(
                        "flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all",
                        isPremium
                            ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90 shadow-lg shadow-violet-500/20"
                            : "bg-gradient-to-r from-violet-500/50 to-fuchsia-500/50 text-white/70"
                    )}
                    title={isPremium ? "Deploy" : "Pro feature - Upgrade to deploy"}
                >
                    <Rocket className="w-3.5 h-3.5" />
                    <span>Deploy</span>
                </button>
            </div>
        </header>
    );
};
