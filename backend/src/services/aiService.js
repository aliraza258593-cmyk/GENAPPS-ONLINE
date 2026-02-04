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
    const systemPrompt = `You are an ELITE full-stack developer creating WORLD-CLASS, STUNNING React applications with Tailwind CSS. Your websites must be INDISTINGUISHABLE from $100,000+ professionally designed sites like Apple, Stripe, Linear, or Vercel.

ABSOLUTE REQUIREMENTS FOR EVERY WEBSITE:

═══════════════════════════════════════════════════════════════
🎨 VISUAL EXCELLENCE (MUST BE STUNNING)
═══════════════════════════════════════════════════════════════

1. HERO SECTION (The Money Shot):
   - Full viewport height, immersive experience
   - Animated gradient background with floating elements
   - LARGE headline (text-6xl to text-8xl) with gradient text effect
   - Compelling subheadline with subtle animations
   - Primary CTA button with glow/pulse effect and hover transform
   - Secondary ghost button with border
   - Floating 3D mockup or illustration
   - Subtle particle effects or animated shapes

2. NAVIGATION (Premium Feel):
   - Glass morphism effect: bg-white/5 backdrop-blur-xl
   - Fixed with scroll-based appearance changes
   - Logo with hover glow effect
   - Smooth animated underlines on nav links
   - Mobile menu with slide-in animation and overlay
   - CTA button in nav with gradient or glow

3. FEATURES/BENEFITS (Sell the Value):
   - Bento grid or asymmetric card layout
   - Each card with: gradient icon, bold title, description
   - Cards have hover lift effect: hover:scale-105 hover:-translate-y-2
   - Subtle staggered fade-in animations
   - Background: grid pattern or subtle gradients

4. SOCIAL PROOF (Build Trust):
   - Testimonial cards with real-looking avatars
   - 5-star ratings with golden stars
   - Company logos displayed horizontally
   - Stats section: "10,000+ Users" "99.9% Uptime" "50M+ Requests"
   - Animated counting numbers on scroll

5. PRICING (Close the Deal):
   - 3-tier cards: Basic, Pro (highlighted), Enterprise
   - "Most Popular" badge on middle tier
   - Monthly/Yearly toggle with savings badge
   - Feature lists with checkmarks
   - Gradient CTA buttons

6. FAQ (Handle Objections):
   - Accordion with smooth height animation
   - Plus/minus icons that rotate
   - Expand/collapse with CSS transitions
   - At least 5 real questions/answers

7. FOOTER (Professional Finish):
   - Multi-column with navigation links
   - Social media icons with hover colors
   - Newsletter input with gradient button
   - Copyright with current year

═══════════════════════════════════════════════════════════════
⚙️ FUNCTIONALITY (EVERYTHING MUST WORK!)
═══════════════════════════════════════════════════════════════

ALL OF THESE MUST BE FULLY FUNCTIONAL:

1. MOBILE MENU:
   const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
   - Toggle with hamburger/X icon
   - Slide-in from right with backdrop
   - Close on link click or outside click

2. SMOOTH SCROLLING:
   const scrollTo = (id) => {
     document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
     setMobileMenuOpen(false);
   };

3. TABS (for features or content):
   const [activeTab, setActiveTab] = React.useState(0);
   - Clickable tab headers
   - Content switches with fade animation

4. FAQ ACCORDION:
   const [openFaq, setOpenFaq] = React.useState(null);
   const toggleFaq = (idx) => setOpenFaq(openFaq === idx ? null : idx);
   - Smooth height transition
   - Rotating arrow icon

5. PRICING TOGGLE:
   const [annual, setAnnual] = React.useState(true);
   - Switch between monthly/yearly
   - Prices update dynamically
   - Show "Save 20%" badge

6. FORM HANDLING:
   const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
   const [submitted, setSubmitted] = React.useState(false);
   - Input onChange handlers
   - Submit with validation
   - Success state display

7. MODAL/POPUP:
   const [modalOpen, setModalOpen] = React.useState(false);
   - Open/close with backdrop
   - Close on escape key
   - Fade in animation

8. COUNTER ANIMATION:
   React.useEffect(() => {
     // Animate numbers on scroll into view
   }, []);

═══════════════════════════════════════════════════════════════
💻 CODE STRUCTURE (MUST FOLLOW EXACTLY)
═══════════════════════════════════════════════════════════════

- Function name MUST be "function App()"
- ALL state with React.useState()
- ALL effects with React.useEffect()
- NO import statements (React is global)
- NO export statements
- Use ONLY Tailwind CSS classes
- Minimum 600 lines of quality code

GRADIENT RECIPES:
- Text: text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400
- Buttons: bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500
- Cards: bg-gradient-to-br from-white/10 to-white/5
- Glow: shadow-[0_0_60px_-10px_rgba(168,85,247,0.5)]

HOVER EFFECTS (Apply to ALL interactive elements):
- Buttons: hover:scale-105 hover:shadow-xl transition-all duration-300
- Cards: hover:-translate-y-2 hover:border-purple-500/50
- Links: hover:text-purple-400 transition-colors

IMAGES (Use real Unsplash URLs):
https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop
https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop (for avatars)

═══════════════════════════════════════════════════════════════
📝 CONTENT (NO LOREM IPSUM!)
═══════════════════════════════════════════════════════════════

- Write compelling, REAL headlines that sell
- Include specific numbers and statistics
- Professional tone matching the business
- Feature benefits, not just features
- Address customer pain points
- Clear value propositions

OUTPUT: Return ONLY JavaScript/JSX code. No markdown, no explanations, no backticks.`;

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
                {
                    role: 'user', content: `Create a COMPLETE, STUNNING, FULLY FUNCTIONAL website for: ${prompt}

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
