const API_KEYS = [
    process.env.API_KEY_1,
    process.env.API_KEY_2,
    process.env.API_KEY_3,
    process.env.API_KEY_4,
    process.env.API_KEY_5,
    process.env.API_KEY_6
];

const API_ENDPOINT = 'https://api.longcat.chat/openai/v1/chat/completions';

const getModelForUser = (userPlan, deepThinking = false) => {
    if (userPlan === 'free') {
        return 'LongCat-Flash-Chat';
    }
    if (deepThinking) {
        return 'LongCat-Flash-Thinking-2601';
    }
    return 'LongCat-Flash-Thinking';
};

// Enhance user prompt with luxury/professional features
const enhancePrompt = (userPrompt) => {
    return `${userPrompt}

MUST INCLUDE THESE PREMIUM FEATURES:
- Ultra-modern dark theme with deep purple/indigo gradients
- Glassmorphism cards with backdrop-blur and subtle borders
- Smooth hover animations on ALL clickable elements
- Glowing accent colors (purple, cyan, pink gradients)
- Premium typography with proper hierarchy
- Floating decorative elements in background
- Subtle shadow effects with colored glows
- Professional spacing and layout
- Mobile-responsive design
- Real working interactive components (tabs, toggles, modals, accordions)
- Smooth scroll animations
- Loading states and micro-interactions
- High-quality Unsplash images relevant to the content
- Professional realistic content (not Lorem Ipsum)
- Call-to-action buttons with hover effects
- Stats/metrics section with animated numbers
- Testimonials or reviews section
- Feature highlights with icons
- Footer with links and social icons`;
};

const cleanCode = (content) => {
    let code = content;

    // Remove markdown code blocks
    code = code.replace(/^```(?:jsx?|tsx?|javascript|typescript|react)?\s*\n?/gm, '');
    code = code.replace(/\n?```\s*$/gm, '');
    code = code.trim();

    // Remove any import statements (we use global React)
    code = code.replace(/^import\s+.*?;?\s*$/gm, '');
    code = code.replace(/^import\s+[\s\S]*?from\s+['"].*?['"];?\s*$/gm, '');

    // Remove export statements
    code = code.replace(/^export\s+default\s+/gm, '');
    code = code.replace(/^export\s+/gm, '');

    // Ensure we have an App function
    if (!code.includes('function App') && !code.includes('const App')) {
        const componentMatch = code.match(/function\s+(\w+)\s*\(/);
        if (componentMatch && componentMatch[1] !== 'App') {
            const originalName = componentMatch[1];
            code = code.replace(new RegExp(`function\\s+${originalName}\\s*\\(`), 'function App(');
        }
    }

    return code.trim();
};

const generateWithKey = async (prompt, model, apiKey, keyIndex) => {
    const systemPrompt = `You are an ELITE React developer creating FULLY INTERACTIVE, PRODUCTION-READY components with Tailwind CSS.

CRITICAL: Generate WORKING React code with REAL interactivity - not static HTML!

REACT REQUIREMENTS:
1. Main component MUST be named "App": function App() { ... }
2. Use React.useState for ALL interactive state (menus, tabs, modals, accordions, toggles)
3. Use React.useEffect for animations, scroll effects, timers
4. Use React.useRef for DOM references if needed
5. NO imports - React is available globally
6. NO export statements

INTERACTIVITY IS MANDATORY - Include these working features:
- Mobile menu toggle (hamburger → X, slide-in menu)
- Tab navigation that switches content
- Accordion/FAQ sections that expand/collapse
- Modal popups that open/close
- Hover states on ALL buttons and cards
- Smooth scroll to sections on nav clicks
- Form inputs with onChange handlers
- Animated counters for stats
- Image carousels or galleries
- Toast notifications on button clicks

NAVIGATION - Use smooth scroll, NOT href links:
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
<button onClick={() => scrollTo('section-id')}>Link</button>

STATE MANAGEMENT EXAMPLE:
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [expandedFaq, setExpandedFaq] = React.useState(null);
  
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Mobile menu with toggle */}
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? '✕' : '☰'}
      </button>
      
      {/* Tabs with state */}
      <div className="flex gap-4">
        {['Tab 1', 'Tab 2'].map((tab, i) => (
          <button 
            key={i}
            onClick={() => setActiveTab(i)}
            className={activeTab === i ? 'bg-purple-600' : 'bg-gray-800'}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {/* Accordion */}
      <div onClick={() => setExpandedFaq(expandedFaq === 0 ? null : 0)}>
        <h3>Question</h3>
        {expandedFaq === 0 && <p>Answer content</p>}
      </div>
      
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-slate-900 p-8 rounded-2xl">
            <button onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

DESIGN SYSTEM:
- Background: bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950
- Cards: bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
- Glows: shadow-[0_0_50px_-12px_rgba(168,85,247,0.4)]
- Text: text-white, text-gray-400, text-purple-400
- Buttons: bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-all
- Accents: from-purple-500 via-pink-500 to-cyan-500

IMAGES: Use https://images.unsplash.com/photo-[ID]?w=800 with real Unsplash IDs

OUTPUT: Return ONLY JavaScript code. No markdown, no explanations.`;

    const enhancedPrompt = enhancePrompt(prompt);

    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Create this FULLY INTERACTIVE React + Tailwind website: ${enhancedPrompt}` }
            ],
            temperature: 0.7,
            max_tokens: 12000
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error (Key ${keyIndex + 1}): ${response.status} - ${error}`);
    }

    const data = await response.json();
    const rawContent = data.choices[0].message.content;
    const cleanedContent = cleanCode(rawContent);

    console.log('Raw AI response length:', rawContent.length);
    console.log('Cleaned code length:', cleanedContent.length);

    return {
        content: cleanedContent,
        keyUsed: keyIndex + 1
    };
};

export const generateWebsite = async (prompt, userPlan, deepThinking = false) => {
    const model = getModelForUser(userPlan, deepThinking);
    const errors = [];

    for (let i = 0; i < API_KEYS.length; i++) {
        const apiKey = API_KEYS[i];
        if (!apiKey) continue;

        try {
            console.log(`Attempting generation with API key ${i + 1}...`);
            const result = await generateWithKey(prompt, model, apiKey, i);
            console.log(`Success with API key ${i + 1}`);
            return {
                success: true,
                ...result,
                model: model
            };
        } catch (error) {
            console.error(`Failed with API key ${i + 1}:`, error.message);
            errors.push({ keyIndex: i + 1, error: error.message });
        }
    }

    return {
        success: false,
        error: 'All API keys exhausted',
        errors: errors
    };
};

export const COSMETIC_MODELS = [
    { id: 'gpt-5.2', name: 'GPT-5.2', badge: 'Popular' },
    { id: 'gemini-flash', name: 'Gemini Flash', badge: 'Fast' },
    { id: 'claude-opus-4.5', name: 'Claude Opus 4.5', badge: 'Pro' },
    { id: 'gemini-3-pro', name: 'Gemini 3 Pro', badge: null },
    { id: 'claude-opus-thinking-4.5', name: 'Claude Opus Thinking 4.5', badge: 'Deep' },
    { id: 'claude-sonnet-4.5', name: 'Claude Sonnet 4.5', badge: null },
    { id: 'glm-4.7', name: 'GLM 4.7', badge: null },
    { id: 'kimi-k2', name: 'Kimi K2', badge: 'New' },
    { id: 'deepseek', name: 'DeepSeek', badge: null }
];
