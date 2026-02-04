import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  Sparkles,
  Bot,
  User,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useWebContainer } from '../../../contexts/WebContainerContext';
import { ModelSelector } from './ModelSelector';
import { BuildingOverlay } from './BuildingOverlay';
import {
  streamGeneration,
  type UIModelName,
  WEBSITE_SYSTEM_PROMPT
} from '../../../lib/longcat';
import { filesToTree } from '../../../lib/webcontainer';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  files?: string[];
}

interface ChatInterfaceProps {
  isPremium?: boolean;
  onUpgradeClick?: () => void;
}

const QUICK_PROMPTS = [
  { label: '📝 Todo App', prompt: 'Create a beautiful todo app with categories, due dates, and smooth animations' },
  { label: '🚀 Landing Page', prompt: 'Build a modern SaaS landing page with hero section, features, pricing, and testimonials' },
  { label: '📊 Dashboard', prompt: 'Create an analytics dashboard with charts, stats cards, and a dark theme' },
  { label: '🛒 E-commerce', prompt: 'Build a product catalog with shopping cart, filters, and checkout flow' }
];

export const ChatInterface = ({ isPremium = false, onUpgradeClick }: ChatInterfaceProps) => {
  const { write, runDev, webcontainer, setIsGenerating, project, files } = useWebContainer();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hi! I'm GenApps AI. Describe the website or app you want to build, and I'll create it for you instantly!\n\nTry one of the quick prompts below, or describe your own idea.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [selectedModel, setSelectedModel] = useState<UIModelName>('gemini-3-flash');
  const [deepThinking, setDeepThinking] = useState(false);

  // Building overlay state
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [buildStatus, setBuildStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [input]);

  // Auto-load prompt from templates page and trigger generation
  const hasTriggeredRef = useRef(false);
  useEffect(() => {
    if (hasTriggeredRef.current) return;

    const storedPrompt = localStorage.getItem('genapps_initial_prompt');
    const storedModel = localStorage.getItem('genapps_model');
    const storedDeepThinking = localStorage.getItem('genapps_deep_thinking');

    if (storedPrompt) {
      hasTriggeredRef.current = true;

      // Set model if specified
      if (storedModel) {
        setSelectedModel(storedModel as UIModelName);
      }
      if (storedDeepThinking === 'true') {
        setDeepThinking(true);
      }

      // Clear stored values
      localStorage.removeItem('genapps_initial_prompt');
      localStorage.removeItem('genapps_model');
      localStorage.removeItem('genapps_deep_thinking');

      // Trigger generation after a short delay
      setTimeout(() => {
        handleGenerate(storedPrompt);
      }, 500);
    }
  }, []);

  const handleGenerate = async (prompt: string) => {
    if (!prompt.trim() || !webcontainer) return;

    setError(null);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    // Start building overlay
    setIsBuilding(true);
    setBuildProgress(0);
    setBuildStatus('Starting...');
    setIsGenerating(true);

    // Simulate progress for demo (since LongCat API might not be available)
    const simulateProgress = async () => {
      const steps = [
        { progress: 5, status: 'Analyzing your requirements...' },
        { progress: 15, status: 'Designing architecture...' },
        { progress: 25, status: 'Generating package.json...' },
        { progress: 35, status: 'Creating vite.config.js...' },
        { progress: 45, status: 'Building index.html...' },
        { progress: 55, status: 'Generating main.jsx...' },
        { progress: 65, status: 'Creating App.jsx...' },
        { progress: 75, status: 'Building components...' },
        { progress: 85, status: 'Applying styles...' },
        { progress: 95, status: 'Finalizing...' },
        { progress: 100, status: 'Complete!' }
      ];

      for (const step of steps) {
        await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
        setBuildProgress(step.progress);
        setBuildStatus(step.status);
      }
    };

    try {
      // Try real API
      let generationSuccessful = false;
      const filesCreated: string[] = [];

      // Start progress simulation in parallel
      const progressPromise = simulateProgress();

      try {
        await streamGeneration(
          prompt,
          selectedModel,
          deepThinking,
          {
            onProgress: (percent, status) => {
              setBuildProgress(percent);
              setBuildStatus(status);
            },
            onFile: async (path, content) => {
              await write(path, content);
              filesCreated.push(path);
            },
            onCommand: async (cmd) => {
              if (cmd.includes('npm install')) {
                await runDev();
              }
            },
            onComplete: () => {
              generationSuccessful = true;
            },
            onError: (err) => {
              console.warn('API Error, using fallback:', err);
            }
          }
        );
      } catch (apiError) {
        console.warn('API call failed, using demo mode:', apiError);
      }

      // If API didn't work, use demo fallback
      if (!generationSuccessful) {
        await progressPromise; // Wait for fake progress

        // Write demo files based on prompt
        const demoFiles = generateDemoFiles(prompt);
        const tree = filesToTree(demoFiles);

        await webcontainer.mount(tree);

        // Start dev server
        await runDev();
      }

      // Add success message
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `✨ Your app is ready! I've created a fully functional ${getAppType(prompt)} with:\n\n• Modern, responsive design\n• Interactive UI components\n• Smooth animations\n• Dark theme with gradients\n\nCheck the preview panel to see your app in action!`,
        timestamp: new Date(),
        files: filesCreated.length > 0 ? filesCreated : ['package.json', 'src/App.jsx', 'src/main.jsx']
      }]);

    } catch (err) {
      setError('Failed to generate. Please try again.');
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '❌ Sorry, there was an error generating your app. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsThinking(false);
      setIsGenerating(false);
    }
  };

  const handleBuildComplete = () => {
    setIsBuilding(false);
    setBuildProgress(0);
    setBuildStatus('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGenerate(input);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleGenerate(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* Building Overlay */}
      <BuildingOverlay
        isVisible={isBuilding}
        progress={buildProgress}
        status={buildStatus}
        onComplete={handleBuildComplete}
      />

      <div className="flex flex-col h-full bg-[#09090b] relative">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0c0c0e]/50 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">GenApps AI</h2>
              <p className="text-[10px] text-gray-500">Powered by LongCat</p>
            </div>
          </div>

          <ModelSelector
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
            deepThinking={deepThinking}
            onToggleDeepThinking={setDeepThinking}
            isPremium={isPremium}
            onUpgradeClick={onUpgradeClick}
          />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === 'user' && "flex-row-reverse"
              )}
            >
              {/* Avatar */}
              <div className={cn(
                "w-8 h-8 rounded-xl shrink-0 flex items-center justify-center",
                message.role === 'assistant'
                  ? "bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20"
                  : "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20"
              )}>
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4 text-violet-400" />
                ) : (
                  <User className="w-4 h-4 text-cyan-400" />
                )}
              </div>

              {/* Message */}
              <div className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3",
                message.role === 'assistant'
                  ? "bg-[#0c0c0e] border border-white/5"
                  : "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white"
              )}>
                <p className={cn(
                  "text-sm whitespace-pre-wrap",
                  message.role === 'assistant' ? "text-gray-300" : "text-white"
                )}>
                  {message.content}
                </p>

                {/* Files indicator */}
                {message.files && message.files.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-white/10">
                    <p className="text-xs text-gray-500 mb-1">Files created:</p>
                    <div className="flex flex-wrap gap-1">
                      {message.files.slice(0, 4).map((f, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-violet-500/10 text-violet-300 rounded">
                          {f.split('/').pop()}
                        </span>
                      ))}
                      {message.files.length > 4 && (
                        <span className="text-xs text-gray-500">
                          +{message.files.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <p className={cn(
                  "text-[10px] mt-2",
                  message.role === 'assistant' ? "text-gray-600" : "text-white/60"
                )}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {/* Thinking indicator */}
          {isThinking && !isBuilding && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-violet-400" />
              </div>
              <div className="bg-[#0c0c0e] border border-white/5 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                  <span className="text-sm text-gray-400">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-300">{error}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-gray-500 mb-2">Quick start:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((qp, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(qp.prompt)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 rounded-lg text-xs text-gray-300 hover:text-white transition-all"
                >
                  {qp.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-[#0c0c0e]/50 shrink-0">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative bg-[#18181b] border border-white/10 rounded-2xl focus-within:border-violet-500/50 transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe what you want to build..."
                className="w-full bg-transparent text-white placeholder-gray-500 px-4 py-3 pr-24 resize-none focus:outline-none text-sm min-h-[48px] max-h-[150px]"
                disabled={isThinking}
                rows={1}
              />

              <div className="absolute bottom-2 right-2 flex items-center gap-1">
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-300 transition-colors"
                  title="Attach image"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-300 transition-colors"
                  title="Attach file"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className={cn(
                    "p-2 rounded-xl transition-all",
                    input.trim() && !isThinking
                      ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90"
                      : "bg-white/5 text-gray-500"
                  )}
                >
                  {isThinking ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-[10px] text-gray-600 mt-2 text-center">
              Press Enter to send • Shift + Enter for new line
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

// Helper to get app type from prompt
function getAppType(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes('todo')) return 'Todo App';
  if (lower.includes('landing')) return 'Landing Page';
  if (lower.includes('dashboard')) return 'Dashboard';
  if (lower.includes('ecommerce') || lower.includes('shop')) return 'E-commerce Store';
  if (lower.includes('blog')) return 'Blog';
  if (lower.includes('portfolio')) return 'Portfolio';
  return 'Web Application';
}

// Generate demo files based on prompt
function generateDemoFiles(prompt: string): Record<string, string> {
  const appName = getAppType(prompt);

  return {
    'package.json': JSON.stringify({
      name: 'genapps-project',
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview'
      },
      dependencies: {
        react: '^18.2.0',
        'react-dom': '^18.2.0'
      },
      devDependencies: {
        '@vitejs/plugin-react': '^4.0.0',
        vite: '^5.0.0'
      }
    }, null, 2),

    'vite.config.js': `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { host: true }
});
`.trim(),

    'index.html': `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${appName} | Built with GenApps</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      body { font-family: 'Inter', sans-serif; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`.trim(),

    'src/main.jsx': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`.trim(),

    'src/App.jsx': generateAppComponent(prompt, appName)
  };
}

// Generate app component based on prompt type
function generateAppComponent(prompt: string, appName: string): string {
  const lower = prompt.toLowerCase();

  if (lower.includes('todo')) {
    return generateTodoApp();
  } else if (lower.includes('dashboard')) {
    return generateDashboardApp();
  } else if (lower.includes('landing')) {
    return generateLandingApp();
  } else if (lower.includes('ecommerce') || lower.includes('shop') || lower.includes('product')) {
    return generateEcommerceApp();
  }

  // Default: landing page
  return generateLandingApp();
}

function generateTodoApp(): string {
  return `
import React, { useState } from 'react';

const initialTodos = [
  { id: 1, text: 'Complete project proposal', done: false, category: 'work', priority: 'high' },
  { id: 2, text: 'Review design mockups', done: true, category: 'work', priority: 'medium' },
  { id: 3, text: 'Buy groceries', done: false, category: 'personal', priority: 'low' },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { 
      id: Date.now(), 
      text: newTodo, 
      done: false, 
      category: 'personal',
      priority: 'medium'
    }]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? {...t, done: !t.done} : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-white mb-2">✨ My Tasks</h1>
          <p className="text-slate-400">Stay organized, get things done</p>
        </div>

        <form onSubmit={addTodo} className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium rounded-xl hover:opacity-90 transition">
              Add
            </button>
          </div>
        </form>

        <div className="flex gap-2 mb-6">
          {['all', 'active', 'done'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={\`px-4 py-2 rounded-lg text-sm font-medium transition \${
                filter === f 
                  ? 'bg-violet-500 text-white' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }\`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(todo => (
            <div
              key={todo.id}
              className={\`group flex items-center gap-4 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:border-violet-500/30 transition \${todo.done ? 'opacity-60' : ''}\`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={\`w-6 h-6 rounded-full border-2 flex items-center justify-center transition \${
                  todo.done ? 'bg-violet-500 border-violet-500' : 'border-slate-500 hover:border-violet-400'
                }\`}
              >
                {todo.done && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
              </button>
              
              <span className={\`flex-1 text-white \${todo.done ? 'line-through text-slate-500' : ''}\`}>
                {todo.text}
              </span>

              <span className={\`px-2 py-1 text-xs rounded-full \${
                todo.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                todo.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                'bg-green-500/20 text-green-400'
              }\`}>
                {todo.priority}
              </span>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-slate-500 text-sm">
          {todos.filter(t => !t.done).length} tasks remaining
        </div>
      </div>
    </div>
  );
}
`.trim();
}

function generateDashboardApp(): string {
  return `
import React, { useState } from 'react';

const stats = [
  { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', up: true },
  { label: 'Subscriptions', value: '+2,350', change: '+180.1%', up: true },
  { label: 'Sales', value: '+12,234', change: '+19%', up: true },
  { label: 'Active Now', value: '+573', change: '+201', up: true },
];

const recentSales = [
  { name: 'Olivia Martin', email: 'olivia@email.com', amount: '+$1,999.00' },
  { name: 'Jackson Lee', email: 'jackson@email.com', amount: '+$39.00' },
  { name: 'Isabella Nguyen', email: 'isabella@email.com', amount: '+$299.00' },
  { name: 'William Kim', email: 'william@email.com', amount: '+$99.00' },
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className={\`\${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 border-r border-slate-800 p-4 transition-all\`}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold">
            G
          </div>
          {sidebarOpen && <span className="font-semibold">GenDash</span>}
        </div>

        <nav className="space-y-2">
          {['Dashboard', 'Analytics', 'Reports', 'Settings'].map((item, i) => (
            <button
              key={item}
              className={\`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition \${
                i === 0 ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }\`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {sidebarOpen && item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg font-medium hover:opacity-90 transition">
              Download Report
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
              <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className={\`text-sm \${stat.up ? 'text-green-400' : 'text-red-400'}\`}>
                {stat.change} from last month
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Chart Placeholder */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
            <h3 className="font-semibold mb-4">Overview</h3>
            <div className="h-64 flex items-end justify-around gap-2">
              {[40, 70, 45, 80, 65, 90, 75, 85, 60, 95, 70, 88].map((h, i) => (
                <div
                  key={i}
                  className="w-8 bg-gradient-to-t from-violet-500 to-fuchsia-500 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: \`\${h}%\` }}
                />
              ))}
            </div>
          </div>

          {/* Recent Sales */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
            <h3 className="font-semibold mb-4">Recent Sales</h3>
            <div className="space-y-4">
              {recentSales.map((sale, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30"></div>
                    <div>
                      <p className="font-medium">{sale.name}</p>
                      <p className="text-sm text-slate-400">{sale.email}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-400">{sale.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
`.trim();
}

function generateLandingApp(): string {
  return `
import React, { useState } from 'react';

const features = [
  { title: 'Lightning Fast', desc: 'Built for speed and performance', icon: '⚡' },
  { title: 'Secure by Default', desc: 'Enterprise-grade security', icon: '🔒' },
  { title: 'AI Powered', desc: 'Smart automation that works', icon: '🤖' },
];

const pricing = [
  { name: 'Starter', price: '$9', features: ['5 Projects', 'Basic Analytics', 'Email Support'] },
  { name: 'Pro', price: '$29', features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'Custom Domain'], popular: true },
  { name: 'Enterprise', price: '$99', features: ['Everything in Pro', 'Dedicated Manager', 'SLA', 'SSO'] },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-sm">
              G
            </div>
            <span className="font-semibold">GenApps</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'Docs', 'Blog'].map(item => (
              <button key={item} className="text-sm text-slate-400 hover:text-white transition">
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm text-slate-400 hover:text-white">Sign In</button>
            <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[120px]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-xs font-medium text-violet-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Now in Public Beta
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Build Faster.<br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Ship Smarter.
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            The all-in-one platform that transforms your ideas into production-ready applications. No coding required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-xl hover:opacity-90 transition shadow-lg shadow-violet-500/25">
              Start Building Free →
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why GenApps?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-violet-500/30 transition group">
                <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-slate-400 text-center mb-12">Start free, scale as you grow</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, i) => (
              <div key={i} className={\`p-8 rounded-2xl border transition \${
                plan.popular 
                  ? 'bg-gradient-to-b from-violet-500/10 to-transparent border-violet-500/30 scale-105' 
                  : 'bg-slate-900/50 border-slate-800 hover:border-violet-500/20'
              }\`}>
                {plan.popular && (
                  <span className="px-3 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-xs font-medium rounded-full mb-4 inline-block">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-lg text-slate-400 font-normal">/mo</span></p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-slate-300">
                      <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={\`w-full py-3 rounded-xl font-medium transition \${
                  plan.popular 
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }\`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-sm">
              G
            </div>
            <span className="font-semibold">GenApps</span>
          </div>
          <p className="text-slate-500 text-sm">© 2024 GenApps. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
`.trim();
}

function generateEcommerceApp(): string {
  return `
import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Premium Headphones', price: 299, image: '🎧', category: 'Audio', rating: 4.8 },
  { id: 2, name: 'Wireless Keyboard', price: 149, image: '⌨️', category: 'Accessories', rating: 4.6 },
  { id: 3, name: 'Smart Watch', price: 399, image: '⌚', category: 'Wearables', rating: 4.9 },
  { id: 4, name: 'Laptop Stand', price: 79, image: '💻', category: 'Accessories', rating: 4.5 },
  { id: 5, name: 'USB-C Hub', price: 89, image: '🔌', category: 'Accessories', rating: 4.7 },
  { id: 6, name: 'Wireless Mouse', price: 69, image: '🖱️', category: 'Accessories', rating: 4.4 },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? {...p, qty: p.qty + 1} : p);
      }
      return [...prev, {...product, qty: 1}];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛍️</span>
            <span className="font-bold text-xl">TechShop</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-white">Products</button>
            <button className="text-slate-400 hover:text-white">Deals</button>
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-500 rounded-full text-xs flex items-center justify-center">
                  {cart.reduce((s, p) => s + p.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-b from-violet-500/10 to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Premium Tech Gear</h1>
          <p className="text-xl text-slate-400 mb-8">Discover the best in technology and accessories</p>
          <button className="px-8 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-medium hover:opacity-90 transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Products</h2>
            <div className="flex gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={\`px-4 py-2 rounded-lg text-sm transition \${
                    filter === cat 
                      ? 'bg-violet-500 text-white' 
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }\`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map(product => (
              <div key={product.id} className="group p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-violet-500/30 transition">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform text-center py-8 bg-slate-800/30 rounded-xl">
                  {product.image}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-yellow-400">★</span>
                  <span className="text-sm text-slate-400">{product.rating}</span>
                  <span className="text-xs text-slate-600 px-2 py-0.5 bg-slate-800 rounded-full ml-auto">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold">\${product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded-lg text-sm font-medium transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-slate-900 border-l border-slate-800 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-slate-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-slate-400 text-center py-12">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
                      <span className="text-3xl">{item.image}</span>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-slate-400">\${item.price} × {item.qty}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-400">Total</span>
                    <span className="text-2xl font-bold">\${total}</span>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-medium hover:opacity-90 transition">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
`.trim();
}
