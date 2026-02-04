import React, { useState, useCallback, useEffect, useRef } from 'react';
import { WebContainerProvider, useWebContainer } from '../../../contexts/WebContainerContext';
import { BuilderHeader } from './BuilderHeader';
import { ChatInterface } from './ChatInterface';
import { PreviewFrame } from './PreviewFrame';
import { CodeEditor } from './CodeEditor';
import { Sidebar } from './Sidebar';
import { ResizeHandle } from './ResizeHandle';
import { PricingModal } from '../pricing/PricingModal';
import { cn } from '../../../lib/utils';

// Panel configuration
const MIN_CHAT_WIDTH = 360;
const MAX_CHAT_WIDTH = 600;
const MIN_CODE_WIDTH = 300;
const MAX_CODE_WIDTH = 700;
const DEFAULT_CHAT_WIDTH = 420;
const DEFAULT_CODE_WIDTH = 400;

function BuilderContent() {
    const { project, files, activeFile, setActiveFile, canUndoAction, canRedoAction, handleUndo, handleRedo } = useWebContainer();

    // UI State
    const [isPremium, setIsPremium] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('genapps_premium') === 'true';
        }
        return false;
    });
    const [showPricing, setShowPricing] = useState(false);
    const [showCode, setShowCode] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    // Panel widths
    const [chatWidth, setChatWidth] = useState(() => {
        if (typeof window !== 'undefined') {
            return parseInt(localStorage.getItem('genapps_chat_width') || String(DEFAULT_CHAT_WIDTH));
        }
        return DEFAULT_CHAT_WIDTH;
    });
    const [codeWidth, setCodeWidth] = useState(() => {
        if (typeof window !== 'undefined') {
            return parseInt(localStorage.getItem('genapps_code_width') || String(DEFAULT_CODE_WIDTH));
        }
        return DEFAULT_CODE_WIDTH;
    });

    // Save panel widths
    useEffect(() => {
        localStorage.setItem('genapps_chat_width', String(chatWidth));
    }, [chatWidth]);

    useEffect(() => {
        localStorage.setItem('genapps_code_width', String(codeWidth));
    }, [codeWidth]);

    // Toggle premium (for demo)
    const togglePremium = useCallback(() => {
        setIsPremium(prev => {
            const newValue = !prev;
            localStorage.setItem('genapps_premium', String(newValue));
            return newValue;
        });
    }, []);

    const handleUpgradeClick = useCallback(() => {
        setShowPricing(true);
    }, []);

    const handleChatResize = useCallback((delta: number) => {
        setChatWidth(prev => {
            const newWidth = prev + delta;
            return Math.min(MAX_CHAT_WIDTH, Math.max(MIN_CHAT_WIDTH, newWidth));
        });
    }, []);

    const handleCodeResize = useCallback((delta: number) => {
        setCodeWidth(prev => {
            const newWidth = prev - delta; // Negative because dragging right shrinks code panel
            return Math.min(MAX_CODE_WIDTH, Math.max(MIN_CODE_WIDTH, newWidth));
        });
    }, []);

    const handleFileSelect = useCallback((file: any) => {
        setActiveFile(file);
        if (!showCode && isPremium) {
            setShowCode(true);
        }
    }, [setActiveFile, showCode, isPremium]);

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-[#09090b]">
            {/* Header */}
            <BuilderHeader
                onTogglePremium={togglePremium}
                isPremium={isPremium}
                projectName={project.name}
                showCode={showCode}
                onToggleCode={() => setShowCode(!showCode)}
                canUndo={canUndoAction}
                canRedo={canRedoAction}
                onUndo={handleUndo}
                onRedo={handleRedo}
                onUpgradeClick={handleUpgradeClick}
            />

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* Sidebar */}
                <Sidebar
                    isCollapsed={sidebarCollapsed}
                    onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                    files={files}
                    activeFile={activeFile}
                    onFileSelect={handleFileSelect}
                />

                {/* Chat Panel */}
                <div
                    className="flex flex-col border-r border-white/5 shrink-0"
                    style={{ width: chatWidth }}
                >
                    <ChatInterface
                        isPremium={isPremium}
                        onUpgradeClick={handleUpgradeClick}
                    />
                </div>

                {/* Chat Resize Handle */}
                <ResizeHandle onResize={handleChatResize} />

                {/* Code Editor (Premium Only) */}
                {showCode && isPremium && (
                    <>
                        <div
                            className="flex flex-col border-r border-white/5 shrink-0"
                            style={{ width: codeWidth }}
                        >
                            <CodeEditor
                                file={activeFile}
                                files={files}
                            />
                        </div>
                        <ResizeHandle onResize={handleCodeResize} />
                    </>
                )}

                {/* Preview Panel */}
                <div className="flex-1 min-w-0">
                    <PreviewFrame
                        isPremium={isPremium}
                        onUpgradeClick={handleUpgradeClick}
                    />
                </div>
            </div>

            {/* Pricing Modal */}
            {showPricing && (
                <PricingModal
                    onClose={() => setShowPricing(false)}
                    onUpgrade={() => {
                        togglePremium();
                        setShowPricing(false);
                    }}
                />
            )}
        </div>
    );
}

export const BuilderLayout = () => {
    return (
        <WebContainerProvider>
            <BuilderContent />
        </WebContainerProvider>
    );
};
