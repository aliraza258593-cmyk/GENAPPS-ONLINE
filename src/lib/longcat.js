// LongCat API Service — Website Generation via AI
// Uses OpenAI-compatible endpoint at https://api.longcat.chat/openai

// ─── Error Classification ─────────────────────────────────────
export class GenerationError extends Error {
    constructor(message, type = 'unknown', retryable = false) {
        super(message);
        this.name = 'GenerationError';
        this.type = type;
        this.retryable = retryable;
    }
}

function classifyError(status, body) {
    if (status === 429) return new GenerationError('Rate limited — please wait a moment and try again.', 'rate_limit', true);
    if (status === 401 || status === 403) return new GenerationError('API authentication failed. Please check your API keys.', 'auth', false);
    if (status === 500 || status === 502 || status === 503) return new GenerationError('AI service is temporarily unavailable. Retrying...', 'server', true);
    if (status === 0 || !status) return new GenerationError('Network error — check your internet connection.', 'network', true);
    return new GenerationError(`Unexpected error (${status}): ${body?.slice(0, 100) || 'Unknown'}`, 'unknown', false);
}

import { saasTemplate } from '../templates/saas';
import { portfolioTemplate } from '../templates/portfolio';
import { restaurantTemplate } from '../templates/restaurant';
import { ecommerceTemplate } from '../templates/ecommerce';
import { agencyTemplate } from '../templates/agency';
import { fitnessTemplate } from '../templates/fitness';
import { youtubeTemplate } from '../templates/youtube';
import { netflixTemplate } from '../templates/netflix';
import { spotifyTemplate } from '../templates/spotify';

const API_URL = 'https://api.longcat.chat/openai/v1/chat/completions';

// Model mapping: Branded display names → actual LongCat models
const MODELS = {
    FLASH: 'LongCat-Flash-Chat',
    THINKING: 'LongCat-Thinking',
    DEEP_THINKING: 'LongCat-DeepThinking',
};

// Map UI model names to backend models
const MODEL_MAP = {
    'gemini-3-flash': MODELS.FLASH,
    'claude-opus-4.5': MODELS.THINKING,
    'gpt-5.3': MODELS.THINKING,
    'glm-5': MODELS.THINKING,
    'amd': MODELS.THINKING,
};

function resolveModel(selectedModel, deepThinking) {
    if (deepThinking) return MODELS.DEEP_THINKING;
    return MODEL_MAP[selectedModel] || MODELS.FLASH;
}

// Collect all available API keys
const API_KEYS = [
    import.meta.env.VITE_API_KEY_1,
    import.meta.env.VITE_API_KEY_2,
    import.meta.env.VITE_API_KEY_3,
    import.meta.env.VITE_API_KEY_4,
    import.meta.env.VITE_API_KEY_5,
    import.meta.env.VITE_API_KEY_6,
].filter(Boolean);

let currentKeyIndex = 0;

function getNextApiKey() {
    const key = API_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
    return key;
}

// Template fallback map
const templateFallbacks = {
    saas: saasTemplate,
    portfolio: portfolioTemplate,
    restaurant: restaurantTemplate,
    ecommerce: ecommerceTemplate,
    agency: agencyTemplate,
    fitness: fitnessTemplate,
    youtube: youtubeTemplate,
    netflix: netflixTemplate,
    spotify: spotifyTemplate,
};

/**
 * Enhance a user's raw prompt using AI (with retry)
 */
export async function enhancePrompt(rawPrompt, buildType = 'website') {
    const typeLabel = buildType === 'uidesign' ? 'UI design' : buildType === 'mobile' ? 'mobile app' : 'website';

    for (let attempt = 0; attempt < Math.min(API_KEYS.length, 3); attempt++) {
        const apiKey = getNextApiKey();
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: MODELS.FLASH,
                    messages: [
                        {
                            role: 'system',
                            content: `You are a UX/UI prompt architect. The user will give you a short, rough idea for a ${typeLabel}. Your job is to expand it into a detailed, professional prompt that will produce a world-class ${typeLabel}. Include specific sections, features, interactivity, design direction, accessibility requirements, and SEO considerations. Specify realistic brand names, color palettes, and content. Output ONLY the enhanced prompt text — no explanations, no markdown fences.`
                        },
                        { role: 'user', content: rawPrompt }
                    ],
                    max_tokens: 2000,
                    temperature: 0.7,
                }),
            });

            if (!response.ok) {
                if (response.status === 429 || response.status >= 500) {
                    await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
                    continue;
                }
                throw new Error('Enhance failed');
            }

            const data = await response.json();
            const enhanced = data.choices?.[0]?.message?.content?.trim();
            if (enhanced && enhanced.length > rawPrompt.length) return enhanced;
            return rawPrompt;
        } catch (err) {
            console.warn(`Prompt enhancement attempt ${attempt + 1} failed:`, err);
            if (attempt < 2) {
                await new Promise(r => setTimeout(r, 800 * (attempt + 1)));
                continue;
            }
        }
    }
    return rawPrompt;
}

function buildSystemPrompt(template, colorStyle, buildType = 'website') {
    const colorGuide = {
        dark: `DARK THEME: Background #0a0a0f/#0f172a. Cards: rgba(15,15,35,0.6) + backdrop-blur + border rgba(255,255,255,0.08). Text: white headings, #94a3b8 body. Accent: #818cf8/#6366f1. Ambient glow orbs in indigo/purple. Inspired by Linear.app, Vercel.com.`,
        light: `LIGHT THEME: Background #ffffff/#f8fafc alternating. Cards: white + shadow(0 4px 24px rgba(0,0,0,0.06)). Text: #0f172a headings, #475569 body. Accent: #4f46e5. Subtle pastel blobs behind hero. Inspired by Stripe.com, Notion.`,
        gradient: `GRADIENT THEME: Hero: from-indigo-600 via-purple-600 to-cyan-500 with animated shift. Gradient text on headings. Sections alternate dark (#0a0a1a) and light with gradient accents. Bold SaaS feel like Stripe Atlas.`,
        minimal: `MINIMAL THEME: Extreme whitespace. #ffffff/#fafafa. Text: #1a1a1a headings, #555 body. Single accent: #5b5bd6. No gradients/glassmorphism. Sharp 1px borders. Typography-driven with oversized headlines. Inspired by Notion.so, Cal.com.`,
    };

    const templateGuide = {
        saas: `SAAS LANDING: 10+ sections — Sticky nav (logo, links, CTA, mobile hamburger), Hero (announcement badge, massive gradient headline, 2 CTAs, trust line, floating mockup), Logo cloud (6 names, marquee), Features grid (6 cards, icons, hover lift), Bento grid (asymmetric layout), How it works (3 steps with connecting line), Stats bar (4 counters with count-up animation), Pricing (3 tiers, monthly/annual toggle with live recalculation, popular highlighted), Testimonials (3 cards with avatars, ratings), FAQ accordion (6 items, JS toggle, one open at a time), CTA banner (email input + submit with success state), Footer (4-col links, social icons). Include dark/light toggle, back-to-top button, cookie consent banner.`,

        portfolio: `DEV PORTFOLIO: 10+ sections — Sticky nav (name logo, Hire Me CTA), Hero (large name, typing effect cycling roles, 2 CTAs, floating orbs), About (split layout, bio, stats row, photo placeholder), Projects (filter buttons All/Web/Mobile/Design, 6 project cards with tech tags, Live Demo opens modal), Skills (grouped by category with animated progress bars), Experience (vertical timeline, 3+ jobs), Testimonials (3 client quotes), Blog (3 article cards), Contact (form with validation + success state, social links), Footer. Include scroll-spy active nav highlighting.`,

        restaurant: `RESTAURANT: 10+ sections — Sticky nav (elegant, Book a Table CTA), Hero (warm amber/orange gradient, tagline, 2 CTAs), About (split layout, story, 3 feature badges), Menu with tabs (Appetizers/Mains/Pasta/Desserts/Wines, 5+ items each, JS switching), Chef's Specials (3 featured dishes), Gallery (6 cards, lightbox modal with nav), Reservations form (date/time/size/name/phone/email, validation, success state), Reviews (4 with ratings), Location & Hours (map placeholder, hours table), Newsletter, Footer.`,

        ecommerce: `E-COMMERCE STORE: 10+ sections — Header (logo, search bar filtering products, wishlist/cart icons with counters), Announcement bar (marquee, dismissible), Hero banner (auto-fading carousel), Category grid (6 categories), Products grid (8+ products with wishlist toggle, Add to Cart, category filters, sort dropdown, quick-view modal), Deal of the Day (countdown timer), Features bar (4 trust badges), Trending (horizontal scroll row), Reviews, Newsletter, Cart drawer (slide-in panel with qty controls, totals, checkout). All data in JS objects, cart/wishlist persist in localStorage.`,

        agency: `DIGITAL AGENCY: 10+ sections — Sticky nav (Start a Project CTA), Hero (bold headline, floating geometric shapes), Services (6 cards with Learn More expanding), Portfolio (category filter tabs, 6 case studies, masonry), Process (4 steps with connecting line), Stats (4 counters), Team (4 members with social links), Client logos (marquee), Testimonials (auto-rotating carousel), Contact form (name/email/company/type/budget/description, validation), Blog preview, Footer.`,

        fitness: `FITNESS/GYM: 10+ sections — Sticky nav (Free Trial CTA, energetic gradient), Hero (motivational headline, dark overlay), About (gym story, 6 facility badges), Classes (6 class cards with Book Class button + toast), Trainers (4 cards), Membership (3 tiers, monthly/annual toggle), Schedule (day tabs Mon-Sat, class timetable), Transformations (3 stories with stats), Facilities (6 cards), Free Trial form, Footer. Include BMI calculator widget.`,

        youtube: `VIDEO PLATFORM: Fixed header (search filtering videos, notifications), Collapsible sidebar (Home/Trending/Subscriptions/Library/History/Watch Later, toggles with hamburger), Category pills (filter grid), Video grid (12+ cards with thumbnails, views, dates, click opens player view with like/dislike/comments), Trending sidebar, Shorts row, Create Playlist modal. All video data in JS array, search filters by title, Watch Later persists in localStorage. Dark theme.`,

        netflix: `STREAMING PLATFORM: Fixed nav (search, profile dropdown), Hero billboard (auto-rotate 3 items every 5s with fade), Content rows (6 per row, horizontal scroll with ← → buttons: Trending, Popular, New Releases, Top 10, Action, Documentaries), Card hover (scale 1.3, info overlay with match %, genre tags), My List (+ icon, localStorage), Detail modal (banner, cast, episodes, close with Escape/backdrop), Footer. Dark #141414 background.`,

        spotify: `MUSIC PLAYER: Fixed left sidebar (Home/Search/Library, playlists, Create Playlist), Top bar (search, profile), Featured playlist banner (large cover, Play All), Song list (10+ songs, click updates player), Browse sections (Made for You, Recently Played, Popular Artists, New Releases), Fixed bottom player bar (song info, play/pause/prev/next/shuffle/repeat, progress bar, volume slider). Player state: play/pause toggles, progress animates, next/prev changes song. Dark #121212, accent #1DB954.`,
    };

    return `You are an ELITE frontend developer creating premium, production-grade websites indistinguishable from $200K agency work (Stripe.com, Linear.app, Vercel.com quality).

OUTPUT RULES:
- Return ONLY raw HTML starting with <!DOCTYPE html>, ending with </html>
- ALL CSS in <style> in <head>, ALL JS in <script> before </body>
- Single self-contained HTML file
- Write COMPLETE code — NEVER truncate, NEVER use "// repeat" or "<!-- similar -->"
- EVERY button/link must have a working handler (scroll, modal, toast, state change)
- Use Tailwind CDN + Google Fonts (Inter body, Outfit headings)

DESIGN QUALITY:
- Glassmorphism cards, multi-layered shadows, gradient accents
- CSS gradient placeholders instead of <img> tags (varied, never repeat)
- Floating gradient orbs with CSS float animation behind hero/CTA
- Editorial typography: Outfit font-black for headings, Inter for body
- Each section MUST have a DIFFERENT layout (alternate: full-width, split, bento, grid, centered)
- Hover effects on ALL interactive elements (cards lift, buttons scale, links animate)

INTERACTIVITY (ALL mandatory with JavaScript):
- Mobile hamburger menu (slide-in overlay, backdrop blur, body scroll lock, close on link/×/backdrop)
- Sticky nav with glassmorphism on scroll
- Smooth scroll for all anchor links with nav offset
- FAQ accordion (smooth max-height animation, one open at a time)
- Pricing toggle (monthly/annual with live price recalculation) where relevant
- Contact/signup forms: real-time validation on blur (red/green borders + error messages), loading spinner on submit, animated success state, auto-reset after 3s
- Toast notifications for ALL user actions (slide-in top-right, auto-dismiss 3s, progress bar)
- Dark/light mode toggle persisting to localStorage
- Cookie consent banner (dismissible, remembered in localStorage)
- Modals: scale-in animation, close with ×/Escape/backdrop click
- Search/filter functionality where relevant

ANIMATIONS (ALL mandatory):
- IntersectionObserver scroll-reveal with stagger on EVERY section (fade-up, 80-120ms delay)
- Stats counter count-up animation (requestAnimationFrame + ease-out)
- Loading skeleton shimmer on page load (~1s) before revealing content
- Scroll progress bar at top (3px gradient, z-index 9999)
- Back-to-top button after 300px scroll
- Hero elements stagger-animate on load with CSS animation-delay

MOCKED BACKEND:
- ALL content in structured const DB = {...} at top of script (5-8 items per category)
- Render EVERYTHING dynamically from DB — nothing hardcoded in HTML
- Global STATE object managing cart/wishlist/theme/preferences
- Helper functions: showToast(), simulateApiCall(), validateForm(), formatPrice()
- localStorage persistence for cart/wishlist/theme/bookmarks

DATA QUALITY:
- Real-sounding brand/company names, specific benefit-focused descriptions
- Realistic prices ($29.99, $149.00), named testimonial authors with titles
- Professional copywriting — concise, benefit-focused, varied
- NEVER use "Lorem ipsum", "Company A", "Product 1", or generic text

DO NOT:
- Generate a "website builder" or reference "Genapps"/"Ghost Code"
- Use <img> with external URLs — use CSS gradients
- Create buttons that do nothing — every element must be interactive
- Write "placeholder", "Coming soon", "TBD", or leave sections empty
- Use fewer than 5 items in any data array

${templateGuide[template] || templateGuide.saas}

COLOR THEME: ${colorGuide[colorStyle] || colorGuide.dark}

${buildType === 'uidesign' ? `
UI DESIGN-ONLY MODE: Generate a VISUAL MOCKUP only — like a Figma export to HTML/CSS.
- ZERO JavaScript, no <script> tags
- All buttons/forms are visual-only (styled but non-functional)
- Everything is STATIC — pure HTML + CSS
- Focus 100% on stunning visual design: perfect typography, exquisite spacing, premium gradients
- Use @keyframes for visual CSS animations only (floating orbs, gradient shifts)
- Must look like a DRIBBBLE SHOT — the kind of design that gets 1000+ likes
- At least 8-10 visually distinct sections
- Responsive with sm:/md:/lg: breakpoints
` : buildType === 'mobile' ? `
MOBILE APP UI MODE: Generate a MOBILE APP, not a website.
- Wrap in phone container (max-width: 390px, margin: auto, min-height: 100vh)
- Bottom tab bar navigation (Home, Search, Favorites, Profile), NO desktop navbar
- iOS/Android patterns: rounded-2xl cards, list views, bottom sheet modals
- Status bar mockup, large touch targets (min 44px), FAB where appropriate
- All interactivity rules still apply
` : ''}

Generate the complete ${buildType === 'mobile' ? 'mobile app UI' : buildType === 'uidesign' ? 'UI design' : 'website'} now. Output ONLY raw HTML starting with <!DOCTYPE html>.`;
}

/**
     * Generate a website using the LongCat AI API (streaming mode)
     * @param {string} prompt
     * @param {string} template
     * @param {string} colorStyle
     * @param {Function} onProgress - called with step number
     * @param {Object} options
     * @param {Function} options.onCodeChunk - called with each chunk of streamed code text
     */
export async function generateWebsite(prompt, template = 'saas', colorStyle = 'dark', onProgress = () => { }, options = {}) {
    const { selectedModel = 'gemini-3-flash', deepThinking = false, buildType = 'website', onCodeChunk } = options;
    const model = resolveModel(selectedModel, deepThinking);
    const systemPrompt = buildSystemPrompt(template, colorStyle, buildType);

    const userMessage = prompt
        ? buildType === 'uidesign'
            ? `Create a stunning UI DESIGN (visual only, no JavaScript) for: "${prompt}". Follow all system prompt design rules. Output ONLY raw HTML.`
            : `Build the premium website for: "${prompt}". Follow ALL system prompt rules for interactivity, design, animations, and mocked backend. Write every section completely. Output ONLY raw HTML.`
        : `Build a premium ${template} website following ALL system prompt rules. Write every section completely. Output ONLY raw HTML.`;

    // Try with key rotation + retry logic
    let lastError = null;
    const maxRetries = Math.max(API_KEYS.length, 3);

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        const apiKey = getNextApiKey();

        try {
            onProgress(1); // Analyzing

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 300000); // 5-min timeout

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userMessage },
                    ],
                    max_tokens: 16000,
                    temperature: deepThinking ? 0.4 : 0.7,
                    stream: true,
                }),
                signal: controller.signal,
            });

            clearTimeout(timeout);
            onProgress(2); // Designing layout

            if (!response.ok) {
                const errData = await response.text();
                console.warn(`API key ${attempt + 1} failed (${response.status}):`, errData);
                lastError = classifyError(response.status, errData);

                // Retry on transient errors with backoff
                if (lastError.retryable && attempt < maxRetries - 1) {
                    await new Promise(r => setTimeout(r, 1500 * (attempt + 1)));
                }
                continue;
            }

            onProgress(3); // Writing production code

            // Read streaming SSE response
            let fullContent = '';
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || ''; // keep incomplete line in buffer

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed || !trimmed.startsWith('data:')) continue;
                    const data = trimmed.slice(5).trim();
                    if (data === '[DONE]') break;

                    try {
                        const parsed = JSON.parse(data);
                        const delta = parsed.choices?.[0]?.delta?.content;
                        if (delta) {
                            fullContent += delta;
                            if (onCodeChunk) onCodeChunk(delta);
                        }
                    } catch {
                        // skip malformed JSON chunks
                    }
                }
            }

            const generatedContent = fullContent;

            if (!generatedContent || generatedContent.trim().length === 0) {
                lastError = new GenerationError('AI returned an empty response. Retrying with a different model...', 'empty_response', true);
                continue;
            }

            // Clean the response
            onProgress(4); // Adding interactivity
            let html = generatedContent.trim();
            if (html.startsWith('```html')) {
                html = html.slice(7);
            } else if (html.startsWith('```')) {
                html = html.slice(3);
            }
            if (html.endsWith('```')) {
                html = html.slice(0, -3);
            }
            html = html.trim();

            // Find actual HTML content
            const doctypeIndex = html.indexOf('<!DOCTYPE');
            const htmlTagIndex = html.indexOf('<html');
            const startIndex = doctypeIndex !== -1 ? doctypeIndex : htmlTagIndex;

            if (startIndex > 0) {
                html = html.slice(startIndex);
            }

            // Trim after </html>
            const htmlEndIndex = html.lastIndexOf('</html>');
            if (htmlEndIndex !== -1) {
                html = html.slice(0, htmlEndIndex + 7);
            }

            // Wrap if needed
            if (!html.includes('<!DOCTYPE') && !html.includes('<html') && !html.includes('<body')) {
                html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${(prompt || 'Generated Website').replace(/"/g, '&quot;').slice(0, 155)}">
    <meta name="theme-color" content="#6366f1">
    <title>${prompt || 'Generated Website'}</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>* { font-family: 'Inter', sans-serif; } html { scroll-behavior: smooth; }</style>
</head>
<body>
${html}
</body>
</html>`;
            }

            // Ensure meta tags exist in head
            if (!html.includes('meta name="viewport"')) {
                html = html.replace('<head>', '<head>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">');
            }
            if (!html.includes('scroll-behavior')) {
                html = html.replace('</head>', '    <style>html { scroll-behavior: smooth; }</style>\n</head>');
            }

            // Check for accidentally generated builder UI
            const lowerHtml = html.toLowerCase();
            if (lowerHtml.includes('genapps') || lowerHtml.includes('ghost code') ||
                (lowerHtml.includes('website builder') && lowerHtml.includes('generate') && lowerHtml.includes('template'))) {
                console.warn('AI generated a website builder UI instead. Retrying...');
                lastError = new GenerationError('AI generated a website builder instead of your requested site. Retrying...', 'wrong_content', true);
                continue;
            }

            // Validate output has reasonable content
            if (html.length < 500) {
                lastError = new GenerationError('Generated output was too short. Retrying for better quality...', 'low_quality', true);
                continue;
            }

            onProgress(5); // Final polish & optimization

            // Add attribution
            if (!html.includes('Built with')) {
                html = html.replace('</body>', `
    <div style="text-align:center;padding:12px;font-size:11px;color:#64748b;border-top:1px solid #1e293b;background:#0f172a;">
        ⚡ Built with <span style="color:#818cf8;font-weight:600;">Genapps AI</span>
    </div>
</body>`);
            }

            onProgress(6); // Done — triggers confetti
            return html;

        } catch (err) {
            if (err.name === 'AbortError') {
                lastError = new GenerationError('Request timed out. The AI is taking too long — try a simpler prompt or different model.', 'timeout', true);
            } else {
                console.warn(`API attempt ${attempt + 1} error:`, err);
                lastError = err instanceof GenerationError ? err : new GenerationError(
                    `Network error: ${err.message}. Check your internet connection.`, 'network', true
                );
            }

            if (attempt < maxRetries - 1) {
                await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
            }
            continue;
        }
    }

    // All API keys failed — use template fallback
    console.warn('All API keys failed, using template fallback');
    const fallbackFn = templateFallbacks[template];
    if (fallbackFn) {
        onProgress(2);
        const title = prompt || template.charAt(0).toUpperCase() + template.slice(1) + ' Website';
        const fallbackHtml = fallbackFn(title);
        onProgress(3);
        return fallbackHtml;
    }

    throw lastError || new GenerationError(
        'All AI models are currently busy. Please try again in a few moments.',
        'exhausted',
        true
    );
}
