import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { ProjectFile } from '../../../lib/projectStore';
import { useWebContainer } from '../../../contexts/WebContainerContext';

// Import Prism for syntax highlighting
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';

interface CodeEditorProps {
  file?: ProjectFile | null;
  files?: ProjectFile[];
}

const getLanguage = (path: string): string => {
  const ext = path.split('.').pop()?.toLowerCase() || '';
  const langMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'jsx',
    'ts': 'typescript',
    'tsx': 'tsx',
    'css': 'css',
    'html': 'markup',
    'json': 'json'
  };
  return langMap[ext] || 'javascript';
};

export const CodeEditor = ({ file, files = [] }: CodeEditorProps) => {
  const { updateFile } = useWebContainer();
  const [openTabs, setOpenTabs] = useState<ProjectFile[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [highlightedCode, setHighlightedCode] = useState('');

  // Update tabs when file prop changes
  useEffect(() => {
    if (file && !openTabs.find(t => t.path === file.path)) {
      setOpenTabs(prev => [...prev, file]);
    }
    if (file) {
      setActiveTab(file.path);
      setCode(file.content);
    }
  }, [file]);

  // Update code when active tab changes
  useEffect(() => {
    const tab = openTabs.find(t => t.path === activeTab);
    if (tab) {
      setCode(tab.content);
    }
  }, [activeTab, openTabs]);

  // Highlight code
  useEffect(() => {
    if (!code || !activeTab) {
      setHighlightedCode('');
      return;
    }

    const language = getLanguage(activeTab);
    try {
      const grammar = Prism.languages[language] || Prism.languages.javascript;
      const highlighted = Prism.highlight(code, grammar, language);
      setHighlightedCode(highlighted);
    } catch (error) {
      setHighlightedCode(code);
    }
  }, [code, activeTab]);

  const handleCloseTab = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenTabs(prev => prev.filter(t => t.path !== path));
    if (activeTab === path) {
      const remaining = openTabs.filter(t => t.path !== path);
      setActiveTab(remaining.length > 0 ? remaining[remaining.length - 1].path : null);
    }
  };

  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);

    // Debounce save
    if (activeTab) {
      updateFile(activeTab, newCode);
    }
  }, [activeTab, updateFile]);

  const lines = code.split('\n');
  const activeFile = openTabs.find(t => t.path === activeTab);

  return (
    <div className="flex flex-col h-full bg-[#09090b]">
      {/* Tab Bar */}
      <div className="h-9 border-b border-white/5 flex items-end overflow-x-auto custom-scrollbar shrink-0">
        {openTabs.map((tab) => (
          <div
            key={tab.path}
            onClick={() => setActiveTab(tab.path)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 border-r border-white/5 cursor-pointer group min-w-0",
              activeTab === tab.path
                ? "bg-[#0c0c0e] border-t-2 border-t-violet-500 text-white"
                : "text-gray-500 hover:text-white hover:bg-white/5"
            )}
          >
            <span className="text-xs truncate max-w-[120px]">
              {tab.path.split('/').pop()}
            </span>
            <button
              onClick={(e) => handleCloseTab(tab.path, e)}
              className="p-0.5 rounded hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {openTabs.length === 0 && (
          <div className="px-3 py-1.5 text-xs text-gray-600">
            No files open
          </div>
        )}
      </div>

      {/* Breadcrumb */}
      {activeFile && (
        <div className="h-7 border-b border-white/5 flex items-center px-3 gap-1 text-xs text-gray-500 shrink-0">
          {activeFile.path.split('/').map((part, i, arr) => (
            <React.Fragment key={i}>
              <span className={i === arr.length - 1 ? "text-gray-300" : ""}>
                {part}
              </span>
              {i < arr.length - 1 && <ChevronRight className="w-3 h-3" />}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Editor Area */}
      <div className="flex-1 overflow-auto custom-scrollbar relative">
        {activeFile ? (
          <div className="flex min-h-full">
            {/* Line Numbers */}
            <div className="w-12 bg-[#0c0c0e] border-r border-white/5 text-right pr-3 py-2 select-none shrink-0">
              {lines.map((_, i) => (
                <div key={i} className="text-xs text-gray-600 leading-5">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code */}
            <div className="flex-1 relative font-mono text-xs">
              {/* Highlighted overlay */}
              <pre
                className="absolute inset-0 p-2 pointer-events-none overflow-hidden"
                style={{
                  fontFamily: 'JetBrains Mono, Consolas, monospace',
                  fontSize: '12px',
                  lineHeight: '20px'
                }}
              >
                <code
                  className="language-jsx"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </pre>

              {/* Editable textarea */}
              <textarea
                value={code}
                onChange={handleCodeChange}
                className="absolute inset-0 w-full h-full p-2 bg-transparent text-transparent caret-white resize-none focus:outline-none"
                style={{
                  fontFamily: 'JetBrains Mono, Consolas, monospace',
                  fontSize: '12px',
                  lineHeight: '20px'
                }}
                spellCheck={false}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-600">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
              <ChevronRight className="w-8 h-8" />
            </div>
            <p className="text-sm">Select a file to edit</p>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-6 border-t border-white/5 flex items-center px-3 text-[10px] text-gray-500 justify-between shrink-0">
        <div className="flex items-center gap-4">
          <span>{activeFile ? getLanguage(activeFile.path).toUpperCase() : 'No file'}</span>
          <span>{lines.length} lines</span>
        </div>
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span>Spaces: 2</span>
        </div>
      </div>

      {/* Prism CSS */}
      <style>{`
                .token.comment,
                .token.prolog,
                .token.doctype,
                .token.cdata { color: #6a737d; }
                .token.punctuation { color: #6a737d; }
                .token.property,
                .token.tag,
                .token.boolean,
                .token.number,
                .token.constant,
                .token.symbol,
                .token.deleted { color: #f97583; }
                .token.selector,
                .token.attr-name,
                .token.string,
                .token.char,
                .token.builtin,
                .token.inserted { color: #9ecbff; }
                .token.operator,
                .token.entity,
                .token.url { color: #79b8ff; }
                .token.atrule,
                .token.attr-value,
                .token.keyword { color: #f97583; }
                .token.function,
                .token.class-name { color: #b392f0; }
                .token.regex,
                .token.important,
                .token.variable { color: #ffab70; }
            `}</style>
    </div>
  );
};
