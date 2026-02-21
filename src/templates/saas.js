export function saasTemplate(title = 'My SaaS App') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script>tailwind.config={theme:{extend:{fontFamily:{sans:['Inter','system-ui','sans-serif'],display:['Outfit','Inter','sans-serif']}}}}<\/script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        html{scroll-behavior:smooth}
        *{font-family:'Inter',sans-serif}
        h1,h2,h3,h4{font-family:'Outfit','Inter',sans-serif}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes gradient-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes fade-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slide-in-right{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes slide-out-right{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes progress{from{width:100%}to{width:0}}
        .reveal{opacity:0;transform:translateY(30px);transition:all 0.8s cubic-bezier(.16,1,.3,1)}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .toast-enter{animation:slide-in-right .4s ease forwards}
        .toast-exit{animation:slide-out-right .4s ease forwards}
        .skeleton{background:linear-gradient(90deg,rgba(255,255,255,.04) 25%,rgba(255,255,255,.08) 50%,rgba(255,255,255,.04) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite}
        .nav-scrolled{background:rgba(10,10,15,0.85)!important;backdrop-filter:blur(24px);box-shadow:0 4px 30px rgba(0,0,0,0.3)}
        .faq-answer{max-height:0;overflow:hidden;transition:max-height .4s ease,padding .4s ease;padding:0 24px}
        .faq-answer.open{max-height:300px;padding:0 24px 20px}
        .mobile-menu{transform:translateX(100%);transition:transform .35s cubic-bezier(.16,1,.3,1)}
        .mobile-menu.open{transform:translateX(0)}
    </style>
</head>
<body class="bg-[#0a0a0f] text-white overflow-x-hidden">
    <!-- Toast Container -->
    <div id="toast-container" class="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none"></div>

    <!-- Back To Top -->
    <button id="backToTop" onclick="window.scrollTo({top:0})" class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-500/25 hover:-translate-y-1 transition-all duration-300 opacity-0 pointer-events-none" style="transition:opacity .3s,transform .3s">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
    </button>

    <!-- Navigation -->
    <nav id="navbar" class="fixed w-full z-50 transition-all duration-500" style="background:transparent">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div class="text-xl font-bold font-display bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">${title}</div>
            <div class="hidden md:flex items-center space-x-8">
                <a href="#features" class="nav-link text-sm text-slate-400 hover:text-white transition">Features</a>
                <a href="#pricing" class="nav-link text-sm text-slate-400 hover:text-white transition">Pricing</a>
                <a href="#testimonials" class="nav-link text-sm text-slate-400 hover:text-white transition">Testimonials</a>
                <a href="#faq" class="nav-link text-sm text-slate-400 hover:text-white transition">FAQ</a>
                <a href="#contact" class="nav-link text-sm text-slate-400 hover:text-white transition">Contact</a>
                <button onclick="document.getElementById('contact').scrollIntoView()" class="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5">Get Started</button>
            </div>
            <button id="menuBtn" onclick="toggleMobile()" class="md:hidden p-2 text-white">
                <svg id="menuIcon" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobileMenu" class="mobile-menu fixed inset-0 z-[60] bg-[#0a0a0f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
        <button onclick="toggleMobile()" class="absolute top-6 right-6 p-2 text-white"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
        <a href="#features" onclick="toggleMobile()" class="text-2xl font-display font-bold text-white hover:text-indigo-400 transition">Features</a>
        <a href="#pricing" onclick="toggleMobile()" class="text-2xl font-display font-bold text-white hover:text-indigo-400 transition">Pricing</a>
        <a href="#testimonials" onclick="toggleMobile()" class="text-2xl font-display font-bold text-white hover:text-indigo-400 transition">Testimonials</a>
        <a href="#faq" onclick="toggleMobile()" class="text-2xl font-display font-bold text-white hover:text-indigo-400 transition">FAQ</a>
        <a href="#contact" onclick="toggleMobile()" class="text-2xl font-display font-bold text-white hover:text-indigo-400 transition">Contact</a>
        <button onclick="toggleMobile();document.getElementById('contact').scrollIntoView()" class="mt-4 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-base font-bold">Get Started Free</button>
    </div>

    <!-- Hero -->
    <section class="pt-32 pb-20 px-6 relative overflow-hidden">
        <div class="absolute top-20 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px]" style="animation:float 20s ease infinite"></div>
        <div class="absolute top-40 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px]" style="animation:float 25s ease infinite 5s"></div>
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-8 reveal">🚀 Now in Public Beta — 50% off for early adopters</div>
            <h1 class="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight font-display reveal" style="animation-delay:.1s">
                The Smarter Way to<br>
                <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style="background-size:200%;animation:gradient-shift 4s ease infinite">Build Software</span>
            </h1>
            <p class="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed reveal" style="animation-delay:.2s">${title} helps teams ship faster with AI-powered project management, real-time collaboration, and seamless one-click deployment.</p>
            <div class="flex flex-col sm:flex-row justify-center gap-4 reveal" style="animation-delay:.3s">
                <button onclick="document.getElementById('pricing').scrollIntoView()" class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-2xl text-base font-bold transition-all shadow-xl shadow-indigo-500/25 hover:-translate-y-0.5">Start Free Trial →</button>
                <button onclick="showToast('Demo video coming soon!','info')" class="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-base font-medium transition-all hover:-translate-y-0.5 backdrop-blur">▶ Watch Demo</button>
            </div>
            <p class="mt-6 text-sm text-slate-500 reveal" style="animation-delay:.4s">No credit card required • Free 14-day trial • Cancel anytime</p>
        </div>
    </section>

    <!-- Logo Cloud -->
    <section class="py-12 border-y border-white/5 overflow-hidden reveal">
        <div class="max-w-7xl mx-auto px-6 text-center mb-6"><span class="text-xs text-slate-500 uppercase tracking-widest">Trusted by innovative teams worldwide</span></div>
        <div class="flex whitespace-nowrap" style="animation:marquee 30s linear infinite">
            <div class="flex items-center gap-16 px-8 text-xl font-bold text-slate-700">
                <span>Vercel</span><span>Stripe</span><span>Notion</span><span>Linear</span><span>Figma</span><span>Shopify</span>
                <span>Vercel</span><span>Stripe</span><span>Notion</span><span>Linear</span><span>Figma</span><span>Shopify</span>
            </div>
        </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-24 px-6">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16 reveal">
                <span class="text-indigo-400 text-sm font-semibold uppercase tracking-wider">Features</span>
                <h2 class="text-4xl md:text-5xl font-black mt-3 font-display">Everything you need to ship fast</h2>
                <p class="text-slate-400 mt-4 max-w-xl mx-auto">Powerful tools to build, deploy, and scale — all in one platform.</p>
            </div>
            <div id="features-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </div>
    </section>

    <!-- Stats -->
    <section class="py-20 px-6 border-y border-white/5 reveal">
        <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div class="text-4xl md:text-5xl font-black font-display text-white counter" data-target="10000">0</div><div class="text-sm text-slate-500 mt-2">Active Users</div></div>
            <div><div class="text-4xl md:text-5xl font-black font-display text-white counter" data-target="99.9">0</div><div class="text-sm text-slate-500 mt-2">Uptime %</div></div>
            <div><div class="text-4xl md:text-5xl font-black font-display text-white counter" data-target="150">0</div><div class="text-sm text-slate-500 mt-2">Countries</div></div>
            <div><div class="text-4xl md:text-5xl font-black font-display text-white counter" data-target="4.9">0</div><div class="text-sm text-slate-500 mt-2">User Rating</div></div>
        </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="py-24 px-6">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-12 reveal">
                <span class="text-indigo-400 text-sm font-semibold uppercase tracking-wider">Pricing</span>
                <h2 class="text-4xl md:text-5xl font-black mt-3 font-display">Simple, transparent pricing</h2>
                <p class="text-slate-400 mt-4">Start free, upgrade when you're ready. No hidden fees.</p>
                <div class="flex items-center justify-center gap-3 mt-8">
                    <span id="monthLabel" class="text-sm text-white font-medium">Monthly</span>
                    <button id="pricingToggle" onclick="togglePricing()" class="relative w-14 h-7 bg-slate-700 rounded-full transition-colors"><div id="toggleDot" class="absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform"></div></button>
                    <span id="yearLabel" class="text-sm text-slate-500 font-medium">Annual <span class="text-emerald-400 text-xs ml-1">Save 20%</span></span>
                </div>
            </div>
            <div id="pricing-grid" class="grid md:grid-cols-3 gap-6"></div>
        </div>
    </section>

    <!-- Testimonials -->
    <section id="testimonials" class="py-24 px-6 border-t border-white/5">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16 reveal">
                <span class="text-indigo-400 text-sm font-semibold uppercase tracking-wider">Testimonials</span>
                <h2 class="text-4xl md:text-5xl font-black mt-3 font-display">Loved by developers worldwide</h2>
            </div>
            <div id="testimonials-grid" class="grid md:grid-cols-3 gap-6"></div>
        </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="py-24 px-6">
        <div class="max-w-3xl mx-auto">
            <div class="text-center mb-16 reveal">
                <span class="text-indigo-400 text-sm font-semibold uppercase tracking-wider">FAQ</span>
                <h2 class="text-4xl font-black mt-3 font-display">Frequently asked questions</h2>
            </div>
            <div id="faq-list" class="space-y-3"></div>
        </div>
    </section>

    <!-- Contact / CTA -->
    <section id="contact" class="py-24 px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-indigo-600/5 to-purple-600/5"></div>
        <div class="max-w-xl mx-auto relative z-10 reveal">
            <div class="text-center mb-10">
                <h2 class="text-4xl font-black font-display">Get in Touch</h2>
                <p class="text-slate-400 mt-3">Have questions? Send us a message and we'll respond within 24 hours.</p>
            </div>
            <form id="contactForm" onsubmit="handleContactSubmit(event)" class="space-y-5">
                <div>
                    <label class="block text-sm text-slate-400 mb-1.5">Full Name</label>
                    <input type="text" id="cName" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition" placeholder="John Doe">
                    <span class="text-xs text-red-400 mt-1 hidden" id="cNameErr">Please enter at least 2 characters</span>
                </div>
                <div>
                    <label class="block text-sm text-slate-400 mb-1.5">Email</label>
                    <input type="email" id="cEmail" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition" placeholder="john@company.com">
                    <span class="text-xs text-red-400 mt-1 hidden" id="cEmailErr">Please enter a valid email address</span>
                </div>
                <div>
                    <label class="block text-sm text-slate-400 mb-1.5">Message</label>
                    <textarea id="cMsg" required rows="4" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none" placeholder="Tell us about your project..."></textarea>
                    <span class="text-xs text-red-400 mt-1 hidden" id="cMsgErr">Message must be at least 10 characters</span>
                </div>
                <button type="submit" id="contactBtn" class="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl text-base font-bold transition-all shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5">Send Message →</button>
            </form>
            <div id="contactSuccess" class="hidden text-center py-10">
                <div class="text-5xl mb-4">✅</div>
                <h3 class="text-2xl font-bold font-display">Message Sent!</h3>
                <p class="text-slate-400 mt-2">We'll get back to you within 24 hours.</p>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-16 px-6">
        <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
                <div><h4 class="font-bold text-white mb-4 font-display">Product</h4><div class="space-y-2 text-sm text-slate-500"><a href="#features" class="block hover:text-white transition">Features</a><a href="#pricing" class="block hover:text-white transition">Pricing</a><a href="#" class="block hover:text-white transition">Integrations</a><a href="#" class="block hover:text-white transition">Changelog</a></div></div>
                <div><h4 class="font-bold text-white mb-4 font-display">Company</h4><div class="space-y-2 text-sm text-slate-500"><a href="#" class="block hover:text-white transition">About</a><a href="#" class="block hover:text-white transition">Blog</a><a href="#" class="block hover:text-white transition">Careers</a><a href="#contact" class="block hover:text-white transition">Contact</a></div></div>
                <div><h4 class="font-bold text-white mb-4 font-display">Resources</h4><div class="space-y-2 text-sm text-slate-500"><a href="#" class="block hover:text-white transition">Documentation</a><a href="#faq" class="block hover:text-white transition">FAQ</a><a href="#" class="block hover:text-white transition">Community</a><a href="#" class="block hover:text-white transition">Support</a></div></div>
                <div><h4 class="font-bold text-white mb-4 font-display">Legal</h4><div class="space-y-2 text-sm text-slate-500"><a href="#" class="block hover:text-white transition">Privacy Policy</a><a href="#" class="block hover:text-white transition">Terms of Service</a><a href="#" class="block hover:text-white transition">Cookie Policy</a><a href="#" class="block hover:text-white transition">GDPR</a></div></div>
            </div>
            <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="text-sm text-slate-600">© 2025 ${title}. All rights reserved.</div>
                <div class="flex gap-4">
                    <a href="#" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition text-xs">GH</a>
                    <a href="#" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition text-xs">TW</a>
                    <a href="#" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition text-xs">LI</a>
                </div>
            </div>
            <div class="text-center mt-8"><span class="text-xs text-slate-700">⚡ Built with Genapps AI • genapps.online</span></div>
        </div>
    </footer>

<script>
// ─── DATA STORE ───
const DB = {
    features: [
        {emoji:'⚡',title:'Lightning Fast',desc:'Sub-100ms response times. Build and deploy in seconds with our edge-optimized pipeline.',gradient:'from-blue-500 to-cyan-500'},
        {emoji:'🔒',title:'Secure by Default',desc:'SOC 2, GDPR, and HIPAA compliant. Enterprise-grade encryption at rest and in transit.',gradient:'from-purple-500 to-pink-500'},
        {emoji:'📊',title:'Real-time Analytics',desc:'Track every metric with live dashboards. Custom alerts, funnel analysis, and cohort reports.',gradient:'from-emerald-500 to-green-500'},
        {emoji:'🤖',title:'AI-Powered Workflows',desc:'Smart suggestions, automated code reviews, and intelligent task prioritization.',gradient:'from-orange-500 to-red-500'},
        {emoji:'🔄',title:'Auto Scaling',desc:'Handle any traffic spike. Our infrastructure scales from 0 to millions automatically.',gradient:'from-cyan-500 to-blue-500'},
        {emoji:'🌍',title:'Global Edge Network',desc:'Deploy to 150+ edge locations worldwide. Your users get instant load times everywhere.',gradient:'from-pink-500 to-rose-500'},
    ],
    pricing: [
        {name:'Starter',price:29,annual:23,desc:'For individuals and small projects.',features:['Up to 3 projects','Basic analytics','Community support','1GB storage','Email notifications'],cta:'Get Started',popular:false},
        {name:'Pro',price:79,annual:63,desc:'For growing teams and businesses.',features:['Unlimited projects','Advanced analytics','Priority support','50GB storage','Custom domains','Team collaboration','API access'],cta:'Start Free Trial',popular:true},
        {name:'Enterprise',price:199,annual:159,desc:'For large orgs with custom needs.',features:['Everything in Pro','SSO & SAML','Dedicated support','Unlimited storage','SLA guarantee','Custom integrations','Audit logs'],cta:'Contact Sales',popular:false},
    ],
    testimonials: [
        {quote:'${title} completely transformed our development workflow. We shipped 3x faster within the first month. The AI features alone saved us 20 hours per week.',name:'Sarah Chen',role:'CTO',company:'TechNova Inc.',rating:5,initials:'SC',gradient:'from-indigo-500 to-purple-500'},
        {quote:'The best tool we\\'ve ever used for project management. The real-time collaboration is seamless — it\\'s like Notion and Linear had a baby.',name:'Marcus Johnson',role:'Engineering Lead',company:'Pixel Studio',rating:5,initials:'MJ',gradient:'from-emerald-500 to-cyan-500'},
        {quote:'We evaluated 12 different platforms before choosing ${title}. The deployment pipeline is lightning fast and the analytics are incredibly detailed.',name:'Emily Rodriguez',role:'VP of Engineering',company:'CloudScale',rating:5,initials:'ER',gradient:'from-pink-500 to-rose-500'},
    ],
    faqs: [
        {q:'How does the free trial work?',a:'You get full access to all Pro features for 14 days, no credit card required. At the end of the trial you can choose a plan or continue with our free Starter tier.'},
        {q:'Can I change my plan later?',a:'Absolutely! You can upgrade, downgrade, or cancel at any time from your dashboard. Changes take effect immediately, and we\\'ll prorate the difference.'},
        {q:'Is my data secure?',a:'Yes. We use AES-256 encryption at rest and TLS 1.3 in transit. We\\'re SOC 2 Type II certified, GDPR compliant, and undergo regular third-party security audits.'},
        {q:'Do you offer team or enterprise discounts?',a:'Yes! Teams of 10+ get 15% off, and Enterprise plans include custom pricing, dedicated support, SSO, and SLA guarantees. Contact our sales team for details.'},
        {q:'What integrations do you support?',a:'We integrate with GitHub, GitLab, Slack, Jira, Figma, Notion, Linear, Vercel, AWS, and 50+ more tools. We also have a REST API and webhooks for custom integrations.'},
        {q:'Can I export my data?',a:'Of course. You own your data. Export everything at any time in JSON, CSV, or PDF format. We also support automated backups to your own S3 bucket.'},
    ],
};

let isAnnual = false;
let openFaqIndex = -1;

// ─── TOAST SYSTEM ───
function showToast(message, type='success') {
    const c = document.getElementById('toast-container');
    const colors = {success:'border-emerald-500 bg-emerald-500/10',error:'border-red-500 bg-red-500/10',info:'border-blue-500 bg-blue-500/10'};
    const icons = {success:'✓',error:'✗',info:'ℹ'};
    const iconColors = {success:'text-emerald-400',error:'text-red-400',info:'text-blue-400'};
    const t = document.createElement('div');
    t.className = 'toast-enter pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-xl border backdrop-blur-xl ' + (colors[type]||colors.info);
    t.innerHTML = '<span class="text-lg '+(iconColors[type]||iconColors.info)+'">'+icons[type]+'</span><span class="text-sm text-white font-medium">'+message+'</span>';
    c.appendChild(t);
    setTimeout(()=>{t.classList.remove('toast-enter');t.classList.add('toast-exit');setTimeout(()=>t.remove(),400)},3000);
}

// ─── RENDER FUNCTIONS ───
function renderFeatures() {
    const g = document.getElementById('features-grid');
    g.innerHTML = DB.features.map((f,i) => 
        '<div class="reveal bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 group" style="transition-delay:'+i*100+'ms">' +
        '<div class="w-12 h-12 rounded-xl bg-gradient-to-br '+f.gradient+' flex items-center justify-center text-xl mb-5">'+f.emoji+'</div>' +
        '<h3 class="text-lg font-bold font-display mb-2">'+f.title+'</h3>' +
        '<p class="text-sm text-slate-400 leading-relaxed">'+f.desc+'</p>' +
        '</div>'
    ).join('');
}

function renderPricing() {
    const g = document.getElementById('pricing-grid');
    g.innerHTML = DB.pricing.map((p,i) => {
        const price = isAnnual ? p.annual : p.price;
        const pop = p.popular;
        return '<div class="reveal '+(pop?'bg-gradient-to-b from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/50 scale-105 shadow-xl shadow-indigo-500/10':'bg-white/[0.03] border border-white/[0.06]')+' rounded-2xl p-8 relative transition-all duration-300 hover:-translate-y-1" style="transition-delay:'+i*100+'ms">' +
            (pop?'<div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>':'') +
            '<h3 class="text-lg font-bold font-display mb-1">'+p.name+'</h3>' +
            '<p class="text-sm text-slate-500 mb-4">'+p.desc+'</p>' +
            '<div class="text-4xl font-black font-display mb-6">$'+price+'<span class="text-lg text-slate-500 font-normal">/mo</span></div>' +
            '<button onclick="showToast(\\''+p.name+' plan selected! Redirecting...\\',\\'success\\')" class="w-full py-3 rounded-xl '+(pop?'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25':'bg-white/5 hover:bg-white/10 border border-white/10')+' font-semibold text-sm transition-all hover:-translate-y-0.5 mb-6">'+p.cta+'</button>' +
            '<ul class="space-y-3">' + p.features.map(f=>'<li class="flex items-center text-sm text-slate-400"><span class="text-emerald-400 mr-2.5 text-xs">✓</span>'+f+'</li>').join('') + '</ul>' +
        '</div>';
    }).join('');
}

function renderTestimonials() {
    const g = document.getElementById('testimonials-grid');
    g.innerHTML = DB.testimonials.map((t,i) =>
        '<div class="reveal bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/10 transition-all duration-300" style="transition-delay:'+i*100+'ms">' +
        '<div class="flex gap-1 mb-4">' + '★'.repeat(t.rating).split('').map(()=>'<span class="text-amber-400 text-sm">★</span>').join('') + '</div>' +
        '<p class="text-slate-300 text-sm leading-relaxed mb-6">"'+t.quote+'"</p>' +
        '<div class="flex items-center gap-3">' +
        '<div class="w-10 h-10 rounded-full bg-gradient-to-br '+t.gradient+' flex items-center justify-center text-xs font-bold text-white">'+t.initials+'</div>' +
        '<div><div class="text-sm font-semibold">'+t.name+'</div><div class="text-xs text-slate-500">'+t.role+' at '+t.company+'</div></div>' +
        '</div></div>'
    ).join('');
}

function renderFAQ() {
    const g = document.getElementById('faq-list');
    g.innerHTML = DB.faqs.map((f,i) =>
        '<div class="reveal bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden transition-all hover:border-white/10" style="transition-delay:'+i*80+'ms">' +
        '<button onclick="toggleFAQ('+i+')" class="w-full flex items-center justify-between px-6 py-4 text-left">' +
        '<span class="text-sm font-semibold pr-4">'+f.q+'</span>' +
        '<span id="faq-icon-'+i+'" class="text-slate-500 transition-transform duration-300 text-lg flex-shrink-0">+</span>' +
        '</button>' +
        '<div id="faq-answer-'+i+'" class="faq-answer text-sm text-slate-400 leading-relaxed">'+f.a+'</div>' +
        '</div>'
    ).join('');
}

// ─── INTERACTIVITY ───
function togglePricing() {
    isAnnual = !isAnnual;
    document.getElementById('toggleDot').style.transform = isAnnual ? 'translateX(28px)' : 'translateX(0)';
    document.getElementById('pricingToggle').style.background = isAnnual ? '#6366f1' : '';
    document.getElementById('monthLabel').className = 'text-sm font-medium ' + (isAnnual ? 'text-slate-500' : 'text-white');
    document.getElementById('yearLabel').className = 'text-sm font-medium ' + (isAnnual ? 'text-white' : 'text-slate-500');
    renderPricing();
    initReveal();
}

function toggleFAQ(index) {
    const prev = openFaqIndex;
    if (prev !== -1 && prev !== index) {
        document.getElementById('faq-answer-'+prev).classList.remove('open');
        document.getElementById('faq-icon-'+prev).style.transform = 'rotate(0deg)';
        document.getElementById('faq-icon-'+prev).textContent = '+';
    }
    const el = document.getElementById('faq-answer-'+index);
    const icon = document.getElementById('faq-icon-'+index);
    if (openFaqIndex === index) {
        el.classList.remove('open'); icon.style.transform='rotate(0deg)'; icon.textContent='+'; openFaqIndex=-1;
    } else {
        el.classList.add('open'); icon.style.transform='rotate(45deg)'; icon.textContent='+'; openFaqIndex=index;
    }
}

function toggleMobile() {
    const m = document.getElementById('mobileMenu');
    m.classList.toggle('open');
    document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
}

function handleContactSubmit(e) {
    e.preventDefault();
    const name=document.getElementById('cName'), email=document.getElementById('cEmail'), msg=document.getElementById('cMsg');
    let valid = true;
    if(name.value.trim().length<2){document.getElementById('cNameErr').classList.remove('hidden');name.style.borderColor='#ef4444';valid=false}else{document.getElementById('cNameErr').classList.add('hidden');name.style.borderColor='#22c55e'}
    if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value)){document.getElementById('cEmailErr').classList.remove('hidden');email.style.borderColor='#ef4444';valid=false}else{document.getElementById('cEmailErr').classList.add('hidden');email.style.borderColor='#22c55e'}
    if(msg.value.trim().length<10){document.getElementById('cMsgErr').classList.remove('hidden');msg.style.borderColor='#ef4444';valid=false}else{document.getElementById('cMsgErr').classList.add('hidden');msg.style.borderColor='#22c55e'}
    if(!valid)return;
    const btn=document.getElementById('contactBtn');
    btn.innerHTML='<span class="flex items-center justify-center gap-2"><svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity=".3"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path></svg>Sending...</span>';
    btn.disabled=true;
    setTimeout(()=>{
        document.getElementById('contactForm').classList.add('hidden');
        document.getElementById('contactSuccess').classList.remove('hidden');
        showToast('Message sent successfully!','success');
        setTimeout(()=>{
            document.getElementById('contactForm').classList.remove('hidden');
            document.getElementById('contactSuccess').classList.add('hidden');
            document.getElementById('contactForm').reset();
            [name,email,msg].forEach(el=>el.style.borderColor='');
            btn.innerHTML='Send Message →';btn.disabled=false;
        },4000);
    },1200);
}

// ─── SCROLL ANIMATIONS ───
function initReveal() {
    const obs = new IntersectionObserver((entries)=>{
        entries.forEach((entry,i)=>{
            if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target)}
        });
    },{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
    document.querySelectorAll('.reveal:not(.visible)').forEach(el=>obs.observe(el));
}

// ─── COUNTER ANIMATION ───
function initCounters() {
    const obs = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const el=entry.target, target=parseFloat(el.dataset.target), isDecimal=target%1!==0;
                let start=0;const duration=2000,startTime=performance.now();
                function tick(now){
                    const progress=Math.min((now-startTime)/duration,1);
                    const eased=1-Math.pow(1-progress,3);
                    const current=eased*target;
                    if(isDecimal){el.textContent=current.toFixed(1)}
                    else if(target>=1000){el.textContent=Math.floor(current).toLocaleString()+'+'}
                    else{el.textContent=Math.floor(current)+'+'}
                    if(progress<1)requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
                obs.unobserve(el);
            }
        });
    },{threshold:0.5});
    document.querySelectorAll('.counter').forEach(el=>obs.observe(el));
}

// ─── NAVBAR SCROLL ───
window.addEventListener('scroll',()=>{
    const nav=document.getElementById('navbar');
    const btt=document.getElementById('backToTop');
    if(window.scrollY>50){nav.classList.add('nav-scrolled')}else{nav.classList.remove('nav-scrolled')}
    if(window.scrollY>300){btt.style.opacity='1';btt.style.pointerEvents='auto'}else{btt.style.opacity='0';btt.style.pointerEvents='none'}
});

// ─── SCROLL SPY ───
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    const obs = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                links.forEach(l=>l.classList.remove('text-white','font-medium'));
                const active = document.querySelector('.nav-link[href="#'+entry.target.id+'"]');
                if(active){active.classList.add('text-white','font-medium')}
            }
        });
    },{threshold:0.3,rootMargin:'-80px 0px -50% 0px'});
    sections.forEach(s=>obs.observe(s));
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded',()=>{
    renderFeatures();
    renderPricing();
    renderTestimonials();
    renderFAQ();
    initReveal();
    initCounters();
    initScrollSpy();
});
<\/script>
</body>
</html>`;
}
