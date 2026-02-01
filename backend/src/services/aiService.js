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
    const systemPrompt = `You are a WORLD-CLASS full-stack developer creating STUNNING, PRODUCTION-READY React applications with Tailwind CSS.

CRITICAL REQUIREMENTS - EVERY WEBSITE MUST HAVE:

═══════════════════════════════════════════════════════════════
🎨 VISUAL EXCELLENCE (MANDATORY)
═══════════════════════════════════════════════════════════════
1. STUNNING HERO SECTION with:
   - Large, captivating headline with gradient text
   - Compelling subheadline explaining value proposition
   - Primary CTA button with glow effect
   - Background: animated gradient or particle effects
   - Hero image or 3D illustration from Unsplash

2. PROFESSIONAL NAVIGATION:
   - Fixed/sticky header with blur backdrop
   - Logo on left, navigation links center/right
   - Mobile hamburger menu with smooth slide animation
   - Active states and hover effects on all links
   - CTA button in navigation

3. FEATURE SECTIONS with:
   - Icon cards with hover lift effects
   - Gradient backgrounds on icons
   - Clear value propositions
   - Animated on scroll appearance

4. SOCIAL PROOF SECTION:
   - Customer testimonials with photos
   - Star ratings (★★★★★)
   - Company logos carousel
   - Stats section (Users: 10,000+, Revenue: $1M+, etc.)

5. PRICING SECTION (if applicable):
   - 3 tier pricing cards
   - Popular/Recommended badge on middle tier
   - Features list with checkmarks
   - CTA buttons

6. FAQ SECTION:
   - Accordion style expand/collapse
   - Smooth animations
   - At least 4-5 questions

7. FOOTER:
   - Multi-column layout
   - Navigation links
   - Social media icons
   - Newsletter signup
   - Copyright text

═══════════════════════════════════════════════════════════════
⚙️ FUNCTIONALITY (ALL MUST WORK)
═══════════════════════════════════════════════════════════════
1. MOBILE MENU: Hamburger toggle, slide-in animation, closes on link click
2. SMOOTH SCROLL: All navigation links scroll to sections
3. TABS: Clickable tabs that switch content
4. ACCORDION: FAQ items that expand/collapse
5. MODALS: Contact forms, popups with overlay
6. FORMS: Input validation, submit handlers, success states
7. COUNTERS: Animated number counting
8. HOVER EFFECTS: Scale, glow, color transitions on ALL interactive elements
9. LOADING STATES: Skeleton loaders, spinners where appropriate

═══════════════════════════════════════════════════════════════
💻 CODE STRUCTURE
═══════════════════════════════════════════════════════════════
- Main component MUST be named "function App()"
- Use React.useState for all state management
- Use React.useEffect for animations and scroll effects
- NO import statements - React is globally available
- NO export statements

STATE PATTERN:
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [expandedFaq, setExpandedFaq] = React.useState(null);
  const [formData, setFormData] = React.useState({ name: '', email: '' });
  
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };
  
  return (/* ... */);
}

═══════════════════════════════════════════════════════════════
🎭 DESIGN SYSTEM
═══════════════════════════════════════════════════════════════
BACKGROUNDS:
- Main: bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950
- Cards: bg-white/5 backdrop-blur-xl border border-white/10
- Sections: Alternating subtle bg-white/[0.02] for visual separation

COLORS:
- Primary: from-purple-600 to-pink-600 (gradients)
- Text: text-white, text-gray-300, text-gray-500
- Accents: purple-500, pink-500, cyan-400

EFFECTS:
- Glow: shadow-[0_0_60px_-15px_rgba(168,85,247,0.5)]
- Hover: hover:scale-105 hover:shadow-2xl transition-all duration-300
- Cards: rounded-2xl or rounded-3xl

TYPOGRAPHY:
- Headlines: text-5xl sm:text-6xl lg:text-7xl font-bold
- Subheadlines: text-xl text-gray-400
- Body: text-base text-gray-300

IMAGES:
Use real Unsplash images: https://images.unsplash.com/photo-[ID]?w=800&h=600&fit=crop
Example IDs: 1551434678-e076c223a692, 1460925895917-afdab827c52f, 1519389950473-47ba0277781c

═══════════════════════════════════════════════════════════════
📝 CONTENT REQUIREMENTS
═══════════════════════════════════════════════════════════════
- Use REAL, PROFESSIONAL content - NO Lorem ipsum
- Write compelling headlines that sell
- Include specific numbers and stats
- Professional tone matching the business type
- At least 6-8 distinct sections
- Minimum 500 lines of quality code

OUTPUT: Return ONLY JavaScript code. No markdown, no explanations, no backticks.`;

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
                { role: 'user', content: `Create a COMPLETE, STUNNING, FULLY FUNCTIONAL website for: ${prompt}

REMEMBER: This must be a COMPLETE, PROFESSIONAL website with:
- ALL sections (Hero, Features, Testimonials, Pricing if relevant, FAQ, Footer)
- ALL interactivity working (mobile menu, tabs, accordions, forms)
- BEAUTIFUL design with gradients, glows, and animations
- REAL content, not placeholders
- At minimum 6 major sections

Make it look like a $50,000000 professionally designed website!` }
            ],
            temperature: 0.7,
            max_tokens: 16000
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
