import React, { useState, useEffect, useRef } from 'react';
import { X, Monitor, Tablet, Smartphone, Copy, Download, Code2, Eye, Check, ExternalLink, Github, Upload, Loader2, Rocket, RefreshCw, Maximize2, Minimize2, BookOpen, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const deviceSizes = {
    desktop: { width: '100%', label: 'Desktop' },
    tablet: { width: '768px', label: 'Tablet' },
    mobile: { width: '375px', label: 'Mobile' },
};

/* ═══ Syntax Highlighting (lightweight, no external deps) ═══ */
function highlightHtml(code) {
    return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        // HTML comments
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="syn-comment">$1</span>')
        // Doctype
        .replace(/(&lt;!DOCTYPE\s+\w+&gt;)/gi, '<span class="syn-doctype">$1</span>')
        // HTML tags
        .replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="syn-tag">$2</span>')
        // Attributes
        .replace(/\s([\w-]+)=/g, ' <span class="syn-attr">$1</span>=')
        // Strings
        .replace(/"([^"]*)"/g, '<span class="syn-string">"$1"</span>')
        .replace(/'([^']*)'/g, "<span class=\"syn-string\">'$1'</span>")
        // JS keywords
        .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|default|from|async|await|new|this|try|catch|throw|switch|case|break|continue|typeof|instanceof|true|false|null|undefined)\b/g, '<span class="syn-keyword">$1</span>')
        // Numbers
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="syn-number">$1</span>');
}

/* ═══ Deploy Guide Modal ═══ */
function DeployGuideModal({ type, onClose, onCopy }) {
    const githubSteps = [
        { step: '1', title: 'Create a new repository', desc: 'Go to github.com/new and create a new repository.' },
        { step: '2', title: 'Copy the generated code', desc: 'Click "Copy" above to copy your generated HTML to the clipboard.' },
        { step: '3', title: 'Create index.html', desc: 'In your repo, create a new file called index.html and paste your code.' },
        { step: '4', title: 'Enable GitHub Pages', desc: 'Go to Settings → Pages → Deploy from branch (main). Your site will be live!' },
    ];

    const vercelSteps = [
        { step: '1', title: 'Download the HTML file', desc: 'Click "Download" above to save your generated site as an HTML file.' },
        { step: '2', title: 'Go to Vercel', desc: 'Visit vercel.com/new and click "Upload" to deploy a static site.' },
        { step: '3', title: 'Upload your file', desc: 'Drag and drop your downloaded HTML file (or a folder containing it).' },
        { step: '4', title: 'Deploy', desc: 'Vercel will auto-deploy your site and give you a live URL in seconds!' },
    ];

    const steps = type === 'github' ? githubSteps : vercelSteps;
    const title = type === 'github' ? 'Deploy to GitHub Pages' : 'Deploy to Vercel';
    const link = type === 'github' ? 'https://github.com/new' : 'https://vercel.com/new';

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div
                className="bg-white w-full max-w-lg rounded-2xl overflow-hidden animate-scale-in"
                style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.2)' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: type === 'github' ? '#24292e' : 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}>
                            {type === 'github' ? <Github className="h-5 w-5 text-white" /> : <Rocket className="h-5 w-5 text-white" />}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
                            <p className="text-xs text-slate-400">Follow these steps to go live</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Steps */}
                <div className="px-6 py-5 space-y-4">
                    {steps.map((s, i) => (
                        <div key={i} className="flex gap-3">
                            <div className="w-7 h-7 rounded-full bg-brand-50 border border-brand-200/50 flex items-center justify-center flex-shrink-0 text-xs font-bold text-brand-600">
                                {s.step}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800">{s.title}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button onClick={onCopy} className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:shadow-sm transition-all">
                        <Copy className="h-3.5 w-3.5" /> Copy Code First
                    </button>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:shadow-lg"
                        style={{ background: type === 'github' ? '#24292e' : 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}
                    >
                        Open {type === 'github' ? 'GitHub' : 'Vercel'} <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>
        </div>
    );
}


export default function PreviewWindow({ htmlContent, onClose, buildType = 'website', onRegenerate }) {
    const [activeDevice, setActiveDevice] = useState(buildType === 'mobile' ? 'mobile' : 'desktop');
    const [activeTab, setActiveTab] = useState('preview');
    const [copied, setCopied] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [deployGuide, setDeployGuide] = useState(null); // 'github' | 'vercel' | null
    const { success: showSuccess, warning: showWarning, info: showInfo } = useToast();
    const containerRef = useRef(null);

    // Escape key handler
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(htmlContent);
            setCopied(true);
            showSuccess('Code copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const ta = document.createElement('textarea');
            ta.value = htmlContent;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopied(true);
            showSuccess('Code copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `genapps-${buildType === 'mobile' ? 'app' : 'website'}.html`;
        a.click();
        URL.revokeObjectURL(url);
        showSuccess('File downloaded!');
    };

    const handleOpenInNewTab = () => {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            containerRef.current?.requestFullscreen?.().catch(() => { });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen?.().catch(() => { });
            setIsFullscreen(false);
        }
    };

    // Listen for fullscreen exit
    useEffect(() => {
        const handler = () => {
            if (!document.fullscreenElement) setIsFullscreen(false);
        };
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    // Code view with line numbers and syntax highlighting
    const renderCodeView = () => {
        const lines = htmlContent.split('\n');
        const highlighted = highlightHtml(htmlContent);
        const highlightedLines = highlighted.split('\n');

        return (
            <div className="w-full h-full overflow-auto bg-[#0d1117]">
                <style>{`
                    .syn-tag { color: #7ee787; }
                    .syn-attr { color: #79c0ff; }
                    .syn-string { color: #a5d6ff; }
                    .syn-comment { color: #8b949e; font-style: italic; }
                    .syn-doctype { color: #ff7b72; }
                    .syn-keyword { color: #ff7b72; }
                    .syn-number { color: #79c0ff; }
                    .code-line:hover { background: rgba(110,118,129,0.1); }
                `}</style>
                <table className="w-full border-collapse">
                    <tbody>
                        {highlightedLines.map((line, i) => (
                            <tr key={i} className="code-line">
                                <td className="text-right pr-4 pl-4 py-0 select-none text-xs font-mono text-slate-600 border-r border-slate-800 sticky left-0 bg-[#0d1117]"
                                    style={{ minWidth: '50px', lineHeight: '20px' }}>
                                    {i + 1}
                                </td>
                                <td className="pl-4 pr-6 py-0 text-sm font-mono text-slate-300 whitespace-pre"
                                    style={{ lineHeight: '20px' }}
                                    dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }}
                                />
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const lineCount = htmlContent?.split('\n').length || 0;

    return (
        <>
            <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
                <div className="bg-white w-full h-full max-w-7xl rounded-3xl overflow-hidden flex flex-col border border-slate-200/60 animate-scale-in"
                    style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.15)' }}
                >

                    {/* Title Bar */}
                    <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200/60">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <span className="text-xs text-slate-400 font-mono hidden sm:inline">genapps-preview</span>
                        </div>

                        {/* Device Switcher */}
                        <div className="flex items-center bg-white rounded-full p-0.5 border border-slate-200/60">
                            {Object.entries(deviceSizes).map(([key, val]) => {
                                const Icon = key === 'desktop' ? Monitor : key === 'tablet' ? Tablet : Smartphone;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setActiveDevice(key)}
                                        className={`p-1.5 rounded-full transition-all ${activeDevice === key
                                            ? 'text-white'
                                            : 'text-slate-400 hover:text-slate-700'
                                            }`}
                                        style={activeDevice === key ? { background: 'linear-gradient(135deg, #0ea5e9, #7c3aed)' } : {}}
                                        title={val.label}
                                    >
                                        <Icon className="h-3.5 w-3.5" />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1">
                            <button
                                onClick={() => setActiveTab(activeTab === 'preview' ? 'code' : 'preview')}
                                className="flex items-center px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all"
                            >
                                {activeTab === 'preview' ? <Code2 className="h-3.5 w-3.5 mr-1" /> : <Eye className="h-3.5 w-3.5 mr-1" />}
                                {activeTab === 'preview' ? 'Code' : 'Preview'}
                            </button>
                            <button
                                onClick={handleCopy}
                                className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all ${copied
                                    ? 'text-emerald-600 bg-emerald-50'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                                    }`}
                            >
                                {copied ? <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex items-center px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all"
                            >
                                <Download className="h-3.5 w-3.5 mr-1" />
                                Download
                            </button>
                            <button
                                onClick={handleOpenInNewTab}
                                className="flex items-center px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all hidden sm:flex"
                            >
                                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                                Open
                            </button>
                            <button
                                onClick={toggleFullscreen}
                                className="flex items-center px-2 py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all hidden sm:flex"
                                title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                            >
                                {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                            </button>
                            {onRegenerate && (
                                <button
                                    onClick={onRegenerate}
                                    className="flex items-center px-3 py-1.5 rounded-full text-xs font-medium text-brand-500 hover:text-brand-700 hover:bg-brand-50 transition-all"
                                >
                                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                                    Regenerate
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all ml-1"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-slate-50 relative overflow-hidden">
                        {activeTab === 'preview' ? (
                            <div className="w-full h-full flex justify-center bg-slate-100 p-2">
                                <div
                                    className="h-full bg-white transition-all duration-500"
                                    style={{
                                        width: deviceSizes[activeDevice].width,
                                        maxWidth: '100%',
                                        boxShadow: activeDevice !== 'desktop' ? '0 0 40px rgba(0,0,0,0.1)' : 'none',
                                        borderRadius: activeDevice !== 'desktop' ? '16px' : '0',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <iframe
                                        srcDoc={htmlContent}
                                        className="w-full h-full border-0"
                                        title="Generated Preview"
                                        sandbox="allow-scripts allow-same-origin"
                                    />
                                </div>
                            </div>
                        ) : (
                            renderCodeView()
                        )}
                    </div>

                    {/* Bottom Bar with Deploy Actions */}
                    <div className="px-5 py-3 bg-white border-t border-slate-200/60 flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                            ⚡ Built with <span className="text-brand-500 font-medium">Genapps AI</span>
                            <span className="ml-2 text-slate-300">•</span>
                            <span className="ml-2">{(htmlContent?.length / 1024).toFixed(1)} KB</span>
                            <span className="ml-2 text-slate-300">•</span>
                            <span className="ml-2">{lineCount} lines</span>
                            <span className="ml-2 text-slate-300">•</span>
                            <span className="ml-2">{activeDevice}</span>
                        </span>

                        <div className="flex items-center gap-2">
                            {/* Push to GitHub */}
                            <button
                                onClick={() => setDeployGuide('github')}
                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg"
                            >
                                <Github className="h-3.5 w-3.5" /> Push to GitHub
                            </button>

                            {/* Deploy to Vercel */}
                            <button
                                onClick={() => setDeployGuide('vercel')}
                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 bg-gradient-to-r from-brand-500 to-lavender-500 text-white hover:shadow-lg hover:shadow-brand-500/20"
                            >
                                <Rocket className="h-3.5 w-3.5" /> Deploy to Vercel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deploy Guide Modal */}
            {deployGuide && (
                <DeployGuideModal
                    type={deployGuide}
                    onClose={() => setDeployGuide(null)}
                    onCopy={handleCopy}
                />
            )}
        </>
    );
}
