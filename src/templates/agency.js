export function agencyTemplate(title = 'Axiom Studio') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Creative Digital Agency</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script>tailwind.config={theme:{extend:{fontFamily:{sans:['Inter','system-ui','sans-serif'],display:['Outfit','Inter','sans-serif']}}}}<\/script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        html{scroll-behavior:smooth}*{font-family:'Inter',sans-serif}h1,h2,h3,h4{font-family:'Outfit','Inter',sans-serif}
        @keyframes gradient-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes slide-in-right{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes slide-out-right{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}
        @keyframes progress{from{width:100%}to{width:0}}
        @keyframes fade-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        .reveal{opacity:0;transform:translateY(30px);transition:all .8s cubic-bezier(.16,1,.3,1)}.reveal.visible{opacity:1;transform:translateY(0)}
        .toast-enter{animation:slide-in-right .4s ease forwards}.toast-exit{animation:slide-out-right .4s ease forwards}
        .scroll-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#6366f1,#ec4899,#6366f1);z-index:9999;transition:width .1s}
        .nav-scrolled{background:rgba(8,8,15,.97)!important;backdrop-filter:blur(24px);box-shadow:0 4px 30px rgba(0,0,0,.3)}
        .mobile-menu{transform:translateX(100%);transition:transform .35s cubic-bezier(.16,1,.3,1)}.mobile-menu.open{transform:translateX(0)}
        .cursor-glow{position:fixed;width:400px;height:400px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(99,102,241,.04) 0%,transparent 70%);transform:translate(-50%,-50%);transition:left .3s ease,top .3s ease}
    </style>
</head>
<body class="bg-[#08080f] text-white overflow-x-hidden">
    <div class="scroll-bar" id="scrollBar"></div>
    <div class="cursor-glow" id="cursorGlow"></div>
    <div id="toast-container" class="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none"></div>
    <button id="backToTop" onclick="window.scrollTo({top:0})" class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl hover:-translate-y-1 transition-all opacity-0 pointer-events-none"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M5 15l7-7 7 7"/></svg></button>

    <nav id="navbar" class="fixed top-0 w-full z-50 transition-all duration-500" style="background:rgba(8,8,15,.3);backdrop-filter:blur(12px)">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#" class="text-xl font-black font-display bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">${title}</a>
            <div class="hidden md:flex items-center gap-8">
                <a href="#work" class="text-sm text-slate-400 hover:text-white transition">Work</a>
                <a href="#services" class="text-sm text-slate-400 hover:text-white transition">Services</a>
                <a href="#process" class="text-sm text-slate-400 hover:text-white transition">Process</a>
                <a href="#team" class="text-sm text-slate-400 hover:text-white transition">Team</a>
                <a href="#contact" class="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-xl font-bold text-sm hover:-translate-y-0.5 transition-all shadow-lg shadow-indigo-500/25">Start a Project</a>
            </div>
            <button onclick="toggleMobile()" class="md:hidden p-2"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg></button>
        </div>
    </nav>
    <div id="mobileMenu" class="mobile-menu fixed inset-0 z-[60] bg-[#08080f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
        <button onclick="toggleMobile()" class="absolute top-6 right-6 p-2"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
        <a href="#work" onclick="toggleMobile()" class="text-2xl font-display font-bold">Work</a>
        <a href="#services" onclick="toggleMobile()" class="text-2xl font-display font-bold">Services</a>
        <a href="#process" onclick="toggleMobile()" class="text-2xl font-display font-bold">Process</a>
        <a href="#team" onclick="toggleMobile()" class="text-2xl font-display font-bold">Team</a>
        <a href="#contact" onclick="toggleMobile()" class="text-2xl font-display font-bold text-indigo-400">Contact</a>
    </div>

    <!-- Hero -->
    <section class="min-h-screen flex items-center px-6 pt-20 relative overflow-hidden">
        <div class="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-indigo-600/6 rounded-full blur-[180px]" style="animation:float 20s ease infinite"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/6 rounded-full blur-[140px]" style="animation:float 25s ease infinite 5s"></div>
        <div class="max-w-5xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6 reveal">🏆 Award-Winning Digital Agency — 120+ Projects Delivered</div>
            <h1 class="text-5xl md:text-7xl font-black tracking-tight mb-6 font-display leading-tight reveal">We Build <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style="background-size:200%;animation:gradient-shift 4s ease infinite">Digital Products</span><br>That Win Markets</h1>
            <p class="text-lg text-slate-400 max-w-2xl mx-auto mb-10 reveal">A full-service creative studio specializing in brand strategy, web design, and digital marketing. We help ambitious brands stand out, scale up, and make an impact.</p>
            <div class="flex flex-col sm:flex-row justify-center gap-4 reveal">
                <a href="#contact" class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-2xl font-bold shadow-xl shadow-indigo-500/25 hover:-translate-y-0.5 transition-all">Start Your Project →</a>
                <a href="#work" class="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-medium transition-all hover:-translate-y-0.5">See Our Work</a>
            </div>
        </div>
    </section>

    <!-- Clients -->
    <section class="py-12 px-6 border-y border-white/5 reveal">
        <div class="max-w-5xl mx-auto text-center"><p class="text-xs text-slate-600 mb-6 font-semibold uppercase tracking-wider">Trusted by industry leaders</p><div class="flex flex-wrap justify-center gap-8 items-center opacity-40">
            <span class="text-lg font-black font-display">TechCorp</span><span class="text-lg font-black font-display">FinanceX</span><span class="text-lg font-black font-display">MediaFlow</span><span class="text-lg font-black font-display">StartupIO</span><span class="text-lg font-black font-display">CloudNet</span>
        </div></div>
    </section>

    <!-- Stats -->
    <section class="py-16 px-6 reveal">
        <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div class="text-4xl font-black font-display counter" data-target="120">0</div><div class="text-sm text-slate-500 mt-1">Projects Delivered</div></div>
            <div><div class="text-4xl font-black font-display counter" data-target="45">0</div><div class="text-sm text-slate-500 mt-1">Happy Clients</div></div>
            <div><div class="text-4xl font-black font-display counter" data-target="12">0</div><div class="text-sm text-slate-500 mt-1">Industry Awards</div></div>
            <div><div class="text-4xl font-black font-display counter" data-target="8">0</div><div class="text-sm text-slate-500 mt-1">Years Experience</div></div>
        </div>
    </section>

    <!-- Work / Portfolio -->
    <section id="work" class="py-20 px-6 relative">
        <div class="absolute inset-0 bg-gradient-to-b from-indigo-600/3 to-transparent"></div>
        <div class="max-w-6xl mx-auto relative z-10">
            <div class="text-center mb-6 reveal"><span class="text-indigo-400 text-sm font-semibold uppercase tracking-wider">Portfolio</span><h2 class="text-4xl font-black mt-2 font-display">Featured Work</h2></div>
            <div class="flex flex-wrap justify-center gap-2 mb-10 reveal" id="workFilters"></div>
            <div id="workGrid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </div>
    </section>

    <!-- Services -->
    <section id="services" class="py-20 px-6">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-12 reveal"><span class="text-indigo-400 text-sm font-semibold uppercase tracking-wider">What We Do</span><h2 class="text-4xl font-black mt-2 font-display">Our Services</h2></div>
            <div id="servicesGrid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </div>
    </section>

    <!-- Process -->
    <section id="process" class="py-20 px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-pink-600/3 to-transparent"></div>
        <div class="max-w-4xl mx-auto relative z-10">
            <div class="text-center mb-12 reveal"><span class="text-indigo-400 text-sm font-semibold uppercase tracking-wider">How We Work</span><h2 class="text-4xl font-black mt-2 font-display">Our Process</h2></div>
            <div id="processSteps" class="space-y-6"></div>
        </div>
    </section>

    <!-- Team -->
    <section id="team" class="py-20 px-6">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-12 reveal"><span class="text-indigo-400 text-sm font-semibold uppercase tracking-wider">Our People</span><h2 class="text-4xl font-black mt-2 font-display">Meet the Team</h2></div>
            <div id="teamGrid" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"></div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-indigo-600/3 to-transparent"></div>
        <div class="max-w-5xl mx-auto relative z-10">
            <div class="text-center mb-12 reveal"><span class="text-indigo-400 text-sm font-semibold uppercase tracking-wider">Testimonials</span><h2 class="text-4xl font-black mt-2 font-display">Client Feedback</h2></div>
            <div id="testimonialGrid" class="grid md:grid-cols-3 gap-6"></div>
        </div>
    </section>

    <!-- CTA -->
    <section class="py-20 px-6 reveal">
        <div class="max-w-3xl mx-auto text-center bg-gradient-to-br from-indigo-600/10 to-pink-600/10 border border-indigo-500/10 rounded-3xl p-12">
            <h2 class="text-3xl font-black font-display mb-4">Ready to Start Your Next Project?</h2>
            <p class="text-slate-400 mb-8">Let's build something extraordinary together. Free consultation for new clients.</p>
            <a href="#contact" class="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-2xl font-bold shadow-xl shadow-indigo-500/25 hover:-translate-y-0.5 transition-all">Get a Free Quote →</a>
        </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="py-20 px-6">
        <div class="max-w-xl mx-auto reveal">
            <div class="text-center mb-8"><span class="text-indigo-400 text-sm font-semibold uppercase tracking-wider">Let's Talk</span><h2 class="text-3xl font-black mt-2 font-display">Start a Project</h2></div>
            <form id="contactForm" onsubmit="handleContact(event)" class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 space-y-4">
                <div class="grid sm:grid-cols-2 gap-4"><input type="text" id="cName" required placeholder="Name" minlength="2" class="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition" onblur="val(this,'name')"><input type="email" id="cEmail" required placeholder="Email" class="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition" onblur="val(this,'email')"></div>
                <input type="text" id="cCompany" placeholder="Company" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition">
                <select id="cService" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:border-indigo-500 transition"><option value="">Select a service</option><option>Brand Strategy</option><option>Web Design & Development</option><option>Mobile App</option><option>Digital Marketing</option><option>UI/UX Design</option><option>Other</option></select>
                <select id="cBudget" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:border-indigo-500 transition"><option value="">Budget range</option><option>$5K - $15K</option><option>$15K - $50K</option><option>$50K - $100K</option><option>$100K+</option></select>
                <textarea id="cMsg" required placeholder="Tell us about your project..." rows="4" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition resize-none" onblur="val(this,'msg')"></textarea>
                <button type="submit" id="contactBtn" class="w-full py-3 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-xl font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-indigo-500/25">Send Message →</button>
            </form>
            <div id="contactSuccess" class="hidden text-center py-12"><div class="text-5xl mb-3">🚀</div><h3 class="text-xl font-bold font-display mb-2">Message Sent!</h3><p class="text-slate-400 text-sm">We'll get back to you within 24 hours.</p></div>
        </div>
    </section>

    <footer class="border-t border-white/5 py-12 px-6"><div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6"><div><span class="font-display font-bold text-lg bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">${title}</span><p class="text-xs text-slate-600 mt-1">Crafting digital experiences since 2017</p></div><div class="flex gap-6 text-sm text-slate-600"><a href="#work" class="hover:text-slate-400 transition">Work</a><a href="#services" class="hover:text-slate-400 transition">Services</a><a href="#" onclick="showToast('Careers page','info');return false" class="hover:text-slate-400 transition">Careers</a><a href="#" onclick="showToast('Blog','info');return false" class="hover:text-slate-400 transition">Blog</a></div><div class="text-xs text-slate-700">© 2025 ${title} · ⚡ Built with Genapps AI</div></div></footer>

    <div id="cookieBanner" class="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#12121f]/90 backdrop-blur-xl border-t border-white/5" style="display:none"><div class="max-w-3xl mx-auto flex items-center justify-between gap-4"><p class="text-xs text-slate-400">We use cookies for a better experience.</p><div class="flex gap-2"><button onclick="document.getElementById('cookieBanner').style.display='none';localStorage.setItem('cc','1');showToast('Accepted','success')" class="px-4 py-1.5 bg-indigo-600 rounded-lg text-xs font-bold">Accept</button><button onclick="document.getElementById('cookieBanner').style.display='none'" class="px-4 py-1.5 bg-white/5 rounded-lg text-xs text-slate-400">Decline</button></div></div></div>

    <!-- Case Study Modal -->
    <div id="caseModal" class="fixed inset-0 z-[80] hidden overflow-y-auto">
        <div onclick="closeCase()" class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div class="relative max-w-2xl mx-auto mt-16 mb-8 bg-[#12121f] border border-white/5 rounded-2xl overflow-hidden" style="animation:fade-up .3s ease">
            <button onclick="closeCase()" class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#12121f] flex items-center justify-center text-slate-400 hover:text-white">✕</button>
            <div id="caseContent"></div>
        </div>
    </div>

<script>
const DB={
    work:[
        {id:1,title:'Nova Finance App',desc:'Complete fintech platform redesign resulting in 340% increase in user engagement.',category:'Web Design',gradient:'from-indigo-600 to-violet-800',client:'FinanceX',result:'+340% engagement'},
        {id:2,title:'Pulse Brand Identity',desc:'Full brand strategy and visual identity for a health-tech startup from zero to Series A.',category:'Branding',gradient:'from-pink-600 to-rose-800',client:'Pulse Health',result:'$12M Series A'},
        {id:3,title:'CloudNet Dashboard',desc:'Enterprise SaaS dashboard serving 50K+ daily active users with real-time analytics.',category:'Web Design',gradient:'from-cyan-600 to-blue-800',client:'CloudNet',result:'50K+ DAU'},
        {id:4,title:'Meridian Mobile',desc:'iOS and Android app for luxury travel booking with AR preview features.',category:'Mobile',gradient:'from-amber-600 to-orange-800',client:'Meridian Travel',result:'4.9★ rating'},
        {id:5,title:'Vertex Marketing',desc:'Multi-channel digital marketing campaign across 12 markets achieving record ROAS.',category:'Marketing',gradient:'from-emerald-600 to-teal-800',client:'Vertex Global',result:'580% ROAS'},
        {id:6,title:'Aether E-Commerce',desc:'Premium fashion e-commerce platform with 3D product visualization.',category:'Web Design',gradient:'from-purple-600 to-indigo-800',client:'Aether Fashion',result:'+420% conv.'}
    ],
    services:[
        {icon:'🎨',name:'Brand Strategy',desc:'Brand identity, positioning, visual systems, and guidelines that make your brand unforgettable.',gradient:'from-pink-600 to-rose-700'},
        {icon:'💻',name:'Web Design & Dev',desc:'Custom websites and web applications built with cutting-edge technology and stunning design.',gradient:'from-indigo-600 to-violet-700'},
        {icon:'📱',name:'Mobile Apps',desc:'Native and cross-platform mobile apps with seamless UX and enterprise-grade performance.',gradient:'from-cyan-600 to-blue-700'},
        {icon:'📈',name:'Digital Marketing',desc:'Data-driven campaigns across paid social, SEO, and content marketing for measurable growth.',gradient:'from-emerald-600 to-teal-700'},
        {icon:'🖌️',name:'UI/UX Design',desc:'User-centered design with research, wireframing, prototyping, and testing.',gradient:'from-amber-600 to-orange-700'},
        {icon:'🔧',name:'Consulting',desc:'Strategic technology consulting, digital transformation, and product roadmap planning.',gradient:'from-slate-600 to-zinc-700'}
    ],
    process:[
        {step:1,name:'Discovery',desc:'Deep-dive into your business, goals, target audience, and competitive landscape. We conduct stakeholder interviews and market research to build a strategic foundation.',icon:'🔍'},
        {step:2,name:'Strategy',desc:'Define the product vision, user personas, information architecture, and project roadmap. Clear deliverables and milestones are established.',icon:'📋'},
        {step:3,name:'Design',desc:'Create wireframes, visual mockups, prototypes, and design systems. Iterative design with client feedback at every stage.',icon:'🎨'},
        {step:4,name:'Development',desc:'Build pixel-perfect, performant code using modern frameworks. Agile sprints with regular demos and QA testing throughout.',icon:'⚡'},
        {step:5,name:'Launch & Scale',desc:'Comprehensive testing, deployment, analytics setup, and post-launch optimization to ensure continued growth.',icon:'🚀'}
    ],
    team:[
        {name:'Sarah Chen',role:'Founder & Creative Director',gradient:'from-indigo-600 to-violet-700',initials:'SC'},
        {name:'Marcus Wright',role:'Head of Development',gradient:'from-cyan-600 to-blue-700',initials:'MW'},
        {name:'Priya Sharma',role:'Lead UX Designer',gradient:'from-pink-600 to-rose-700',initials:'PS'},
        {name:'James Park',role:'Marketing Director',gradient:'from-emerald-600 to-teal-700',initials:'JP'}
    ],
    testimonials:[
        {text:'${title} transformed our digital presence. Their strategic approach and design excellence drove a 340% increase in engagement.',name:'Michael R.',role:'CEO, FinanceX',avatar:'from-indigo-500 to-violet-600'},
        {text:'The team at ${title} is exceptional. They delivered our mobile app on time and it exceeded every expectation we had.',name:'Lisa T.',role:'COO, Meridian Travel',avatar:'from-amber-500 to-orange-600'},
        {text:'Best agency we\\'ve worked with, period. Their marketing campaigns generated a 580% ROAS — unprecedented in our industry.',name:'David W.',role:'VP Marketing, Vertex',avatar:'from-emerald-500 to-teal-600'}
    ]
};

let workFilter='all';

function showToast(m,t='success'){const c=document.getElementById('toast-container');const cols={success:'border-emerald-500 bg-emerald-500/10',error:'border-red-500 bg-red-500/10',info:'border-indigo-500 bg-indigo-500/10'};const el=document.createElement('div');el.className='toast-enter pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-xl '+(cols[t]||cols.info);el.innerHTML='<span class="text-sm font-medium">'+m+'</span><div class="absolute bottom-0 left-0 h-0.5 bg-white/20 rounded" style="animation:progress 3s linear forwards;width:100%"></div>';c.appendChild(el);setTimeout(()=>{el.classList.remove('toast-enter');el.classList.add('toast-exit');setTimeout(()=>el.remove(),400)},3000)}

function renderWork(){
    const cats=['All',...new Set(DB.work.map(w=>w.category))];
    document.getElementById('workFilters').innerHTML=cats.map(c=>'<button onclick="filterWork(\\''+c.toLowerCase()+'\\');showToast(\\''+c+'\\',\\'info\\')" class="px-5 py-2 rounded-xl text-sm font-semibold transition '+(workFilter===(c==='All'?'all':c.toLowerCase())?'bg-indigo-600 text-white':'bg-white/5 text-slate-400 hover:bg-white/10')+'">'+c+'</button>').join('');
    let work=DB.work;if(workFilter!=='all')work=work.filter(w=>w.category.toLowerCase()===workFilter);
    document.getElementById('workGrid').innerHTML=work.map((w,i)=>'<div class="reveal bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all" style="transition-delay:'+i*100+'ms" onclick="openCase('+w.id+')"><div class="aspect-video bg-gradient-to-br '+w.gradient+' relative flex items-center justify-center"><span class="text-4xl opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all">🖥️</span><div class="absolute top-3 right-3 px-2 py-1 bg-black/40 backdrop-blur rounded-lg text-[10px] font-semibold">'+w.result+'</div></div><div class="p-5"><span class="text-xs text-indigo-400 font-semibold">'+w.category+'</span><h3 class="font-bold font-display mt-1 mb-2 group-hover:text-indigo-400 transition">'+w.title+'</h3><p class="text-sm text-slate-400 leading-relaxed">'+w.desc+'</p></div></div>').join('');
    initReveal();
}

function filterWork(cat){workFilter=cat;renderWork()}

function openCase(id){
    const w=DB.work.find(x=>x.id===id);if(!w)return;
    document.getElementById('caseContent').innerHTML='<div class="aspect-video bg-gradient-to-br '+w.gradient+' flex items-center justify-center"><span class="text-6xl opacity-50">🖥️</span></div><div class="p-8"><span class="text-xs text-indigo-400 font-semibold uppercase tracking-wider">'+w.category+'</span><h2 class="text-2xl font-black font-display mt-2 mb-4">'+w.title+'</h2><div class="grid grid-cols-2 gap-4 mb-6 text-sm"><div class="bg-white/[0.03] rounded-xl p-4"><span class="text-slate-500 text-xs block">Client</span><span class="font-semibold">'+w.client+'</span></div><div class="bg-white/[0.03] rounded-xl p-4"><span class="text-slate-500 text-xs block">Result</span><span class="font-semibold text-emerald-400">'+w.result+'</span></div></div><p class="text-slate-400 leading-relaxed mb-6">'+w.desc+' This project involved extensive research, strategy, prototyping, and iterative development to deliver exceptional results for the client.</p><button onclick="closeCase();document.getElementById(\\'contact\\').scrollIntoView({behavior:\\'smooth\\'})" class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-xl font-bold text-sm hover:-translate-y-0.5 transition-all">Start a Similar Project →</button></div>';
    document.getElementById('caseModal').classList.remove('hidden');document.body.style.overflow='hidden';
}

function closeCase(){document.getElementById('caseModal').classList.add('hidden');document.body.style.overflow=''}

function renderServices(){document.getElementById('servicesGrid').innerHTML=DB.services.map((s,i)=>'<div class="reveal bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-indigo-500/20 hover:-translate-y-1 transition-all group" style="transition-delay:'+i*80+'ms"><div class="w-12 h-12 rounded-xl bg-gradient-to-br '+s.gradient+' flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition">'+s.icon+'</div><h3 class="font-bold font-display mb-2">'+s.name+'</h3><p class="text-sm text-slate-400 leading-relaxed">'+s.desc+'</p></div>').join('')}

function renderProcess(){document.getElementById('processSteps').innerHTML=DB.process.map((p,i)=>'<div class="reveal flex gap-6 items-start" style="transition-delay:'+i*100+'ms"><div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-pink-600/20 border border-indigo-500/10 flex flex-col items-center justify-center flex-shrink-0"><span class="text-xl">'+p.icon+'</span><span class="text-[10px] text-indigo-400 font-bold mt-0.5">0'+p.step+'</span></div><div class="pt-1"><h3 class="font-bold font-display text-lg mb-1">'+p.name+'</h3><p class="text-sm text-slate-400 leading-relaxed">'+p.desc+'</p></div></div>').join('')}

function renderTeam(){document.getElementById('teamGrid').innerHTML=DB.team.map((t,i)=>'<div class="reveal bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center hover:border-white/10 hover:-translate-y-1 transition-all group" style="transition-delay:'+i*100+'ms"><div class="w-20 h-20 rounded-full bg-gradient-to-br '+t.gradient+' mx-auto mb-4 flex items-center justify-center text-lg font-bold group-hover:scale-110 transition">'+t.initials+'</div><h3 class="font-bold font-display">'+t.name+'</h3><p class="text-sm text-indigo-400 mb-3">'+t.role+'</p><div class="flex justify-center gap-2"><button onclick="showToast(\\'LinkedIn: '+t.name+'\\',\\'info\\')" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs transition">💼</button><button onclick="showToast(\\'Twitter: '+t.name+'\\',\\'info\\')" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs transition">🐦</button></div></div>').join('')}

function renderTestimonials(){document.getElementById('testimonialGrid').innerHTML=DB.testimonials.map((t,i)=>'<div class="reveal bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 transition-all" style="transition-delay:'+i*100+'ms"><div class="text-indigo-400 text-2xl mb-4">"</div><p class="text-sm text-slate-300 leading-relaxed mb-6">'+t.text+'</p><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-gradient-to-br '+t.avatar+' flex items-center justify-center text-sm font-bold">'+t.name[0]+'</div><div><div class="text-sm font-semibold">'+t.name+'</div><div class="text-xs text-slate-500">'+t.role+'</div></div></div></div>').join('')}

function val(el,type){let ok=true;if(type==='name'&&el.value.length<2)ok=false;if(type==='email'&&!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(el.value))ok=false;if(type==='msg'&&el.value.length<10)ok=false;el.style.borderColor=ok?'#22c55e':'#ef4444';if(!ok)showToast('Please check this field','error');return ok}

function handleContact(e){e.preventDefault();if(!val(document.getElementById('cName'),'name')||!val(document.getElementById('cEmail'),'email')||!val(document.getElementById('cMsg'),'msg'))return;const btn=document.getElementById('contactBtn');btn.innerHTML='Sending...';btn.disabled=true;setTimeout(()=>{document.getElementById('contactForm').classList.add('hidden');document.getElementById('contactSuccess').classList.remove('hidden');showToast('Message sent!','success');setTimeout(()=>{document.getElementById('contactForm').classList.remove('hidden');document.getElementById('contactSuccess').classList.add('hidden');document.getElementById('contactForm').reset();btn.innerHTML='Send Message →';btn.disabled=false;['cName','cEmail','cMsg'].forEach(id=>document.getElementById(id).style.borderColor='')},4000)},1200)}

function toggleMobile(){const m=document.getElementById('mobileMenu');m.classList.toggle('open');document.body.style.overflow=m.classList.contains('open')?'hidden':''}
function initReveal(){const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:.1});document.querySelectorAll('.reveal:not(.visible)').forEach(el=>obs.observe(el))}

function initCounters(){const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const el=e.target,target=parseFloat(el.dataset.target);let start=performance.now();function tick(now){const p=Math.min((now-start)/2000,1),v=(1-Math.pow(1-p,3))*target;el.textContent=Math.floor(v)+'+';if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);obs.unobserve(el)}})},{threshold:.5});document.querySelectorAll('.counter').forEach(el=>obs.observe(el))}

document.addEventListener('mousemove',e=>{const g=document.getElementById('cursorGlow');g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});

window.addEventListener('scroll',()=>{const n=document.getElementById('navbar'),b=document.getElementById('backToTop');if(window.scrollY>50)n.classList.add('nav-scrolled');else n.classList.remove('nav-scrolled');if(window.scrollY>300){b.style.opacity='1';b.style.pointerEvents='auto'}else{b.style.opacity='0';b.style.pointerEvents='none'};document.getElementById('scrollBar').style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%'});

document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeCase();if(document.getElementById('mobileMenu').classList.contains('open'))toggleMobile()}});

document.addEventListener('DOMContentLoaded',()=>{renderWork();renderServices();renderProcess();renderTeam();renderTestimonials();initReveal();initCounters();if(!localStorage.getItem('cc'))setTimeout(()=>document.getElementById('cookieBanner').style.display='block',2000)});
<\/script>
</body>
</html>`;
}
