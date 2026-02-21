export function portfolioTemplate(title = 'Alex Morgan') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Creative Portfolio</title>
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
        @keyframes typewriter{from{width:0}to{width:100%}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        .reveal{opacity:0;transform:translateY(30px);transition:all .8s cubic-bezier(.16,1,.3,1)}.reveal.visible{opacity:1;transform:translateY(0)}
        .toast-enter{animation:slide-in-right .4s ease forwards}.toast-exit{animation:slide-out-right .4s ease forwards}
        .scroll-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#8b5cf6,#06b6d4,#8b5cf6);z-index:9999;transition:width .1s}
        .nav-scrolled{background:rgba(10,10,15,.95)!important;backdrop-filter:blur(24px);box-shadow:0 4px 30px rgba(0,0,0,.3)}
        .project-card{transition:all .4s cubic-bezier(.16,1,.3,1)}.project-card:hover{transform:translateY(-8px) scale(1.02)}
        .mobile-menu{transform:translateX(100%);transition:transform .35s cubic-bezier(.16,1,.3,1)}.mobile-menu.open{transform:translateX(0)}
        .cursor-glow{position:fixed;width:400px;height:400px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(139,92,246,.06) 0%,transparent 70%);transform:translate(-50%,-50%);transition:left .3s ease,top .3s ease}
    </style>
</head>
<body class="bg-[#08080c] text-white overflow-x-hidden">
    <div class="scroll-bar" id="scrollBar"></div>
    <div class="cursor-glow" id="cursorGlow"></div>
    <div id="toast-container" class="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none"></div>
    <button id="backToTop" onclick="window.scrollTo({top:0})" class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-xl hover:-translate-y-1 transition-all opacity-0 pointer-events-none"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M5 15l7-7 7 7"/></svg></button>

    <nav id="navbar" class="fixed top-0 w-full z-50 transition-all duration-500" style="background:rgba(8,8,12,.4);backdrop-filter:blur(12px)">
        <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#" onclick="window.scrollTo({top:0});return false" class="text-xl font-black font-display bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">${title}</a>
            <div class="hidden md:flex items-center gap-8">
                <a href="#about" class="text-sm text-slate-400 hover:text-white transition">About</a>
                <a href="#projects" class="text-sm text-slate-400 hover:text-white transition">Projects</a>
                <a href="#skills" class="text-sm text-slate-400 hover:text-white transition">Skills</a>
                <a href="#experience" class="text-sm text-slate-400 hover:text-white transition">Experience</a>
                <a href="#contact" class="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl font-bold text-sm hover:-translate-y-0.5 transition-all shadow-lg shadow-violet-500/25">Let's Talk</a>
            </div>
            <button onclick="toggleMobile()" class="md:hidden p-2"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg></button>
        </div>
    </nav>
    <div id="mobileMenu" class="mobile-menu fixed inset-0 z-[60] bg-[#08080c]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
        <button onclick="toggleMobile()" class="absolute top-6 right-6 p-2"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
        <a href="#about" onclick="toggleMobile()" class="text-2xl font-display font-bold">About</a>
        <a href="#projects" onclick="toggleMobile()" class="text-2xl font-display font-bold">Projects</a>
        <a href="#skills" onclick="toggleMobile()" class="text-2xl font-display font-bold">Skills</a>
        <a href="#contact" onclick="toggleMobile()" class="text-2xl font-display font-bold">Contact</a>
    </div>

    <!-- Hero -->
    <section class="min-h-screen flex items-center px-6 pt-20 relative">
        <div class="absolute top-40 left-1/4 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[160px]" style="animation:float 20s ease infinite"></div>
        <div class="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-[140px]" style="animation:float 25s ease infinite 5s"></div>
        <div class="max-w-4xl mx-auto relative z-10">
            <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold mb-6 reveal">✨ Available for freelance work</div>
            <h1 class="text-5xl md:text-7xl font-black tracking-tight mb-6 font-display reveal">Hi, I'm <span class="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent" style="background-size:200%;animation:gradient-shift 4s ease infinite">${title}</span></h1>
            <div class="flex items-center text-lg md:text-2xl text-slate-400 mb-8 reveal"><span>I build&nbsp;</span><span id="typewriter" class="text-white font-semibold border-r-2 border-violet-400" style="animation:blink 1s step-end infinite"></span></div>
            <p class="text-lg text-slate-400 max-w-2xl mb-10 reveal">A passionate full-stack developer and designer crafting beautiful digital experiences that make an impact. I turn complex problems into simple, elegant solutions.</p>
            <div class="flex flex-col sm:flex-row gap-4 reveal">
                <a href="#projects" class="px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl font-bold shadow-xl shadow-violet-500/25 hover:-translate-y-0.5 transition-all text-center">View My Work →</a>
                <a href="#contact" class="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-medium transition-all hover:-translate-y-0.5 text-center">Get in Touch</a>
            </div>
            <div class="flex gap-4 mt-8 reveal">
                <a href="#" onclick="showToast('GitHub profile','info');return false" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm transition">🐙</a>
                <a href="#" onclick="showToast('LinkedIn profile','info');return false" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm transition">💼</a>
                <a href="#" onclick="showToast('Twitter profile','info');return false" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm transition">🐦</a>
                <a href="#" onclick="showToast('Dribbble profile','info');return false" class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm transition">🏀</a>
            </div>
        </div>
    </section>

    <!-- About -->
    <section id="about" class="py-20 px-6">
        <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div class="reveal"><div class="w-full aspect-square max-w-md bg-gradient-to-br from-violet-600/20 to-cyan-600/20 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-cyan-600/30 mix-blend-overlay"></div><span class="text-8xl relative z-10">👨‍💻</span></div></div>
            <div class="reveal">
                <span class="text-violet-400 text-sm font-semibold uppercase tracking-wider">About Me</span>
                <h2 class="text-3xl font-black mt-2 mb-6 font-display">Crafting Digital Excellence</h2>
                <p class="text-slate-400 leading-relaxed mb-4">With over 6 years of experience in web development and design, I specialize in building performant, accessible, and visually stunning applications. My approach combines clean code with thoughtful design.</p>
                <p class="text-slate-400 leading-relaxed mb-6">I've had the privilege of working with startups and Fortune 500 companies alike, helping them bring their digital visions to life.</p>
                <div class="grid grid-cols-3 gap-4">
                    <div class="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center"><div class="text-2xl font-black font-display text-violet-400">6+</div><div class="text-xs text-slate-500 mt-1">Years Exp.</div></div>
                    <div class="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center"><div class="text-2xl font-black font-display text-cyan-400">80+</div><div class="text-xs text-slate-500 mt-1">Projects</div></div>
                    <div class="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center"><div class="text-2xl font-black font-display text-emerald-400">50+</div><div class="text-xs text-slate-500 mt-1">Clients</div></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects -->
    <section id="projects" class="py-20 px-6 relative">
        <div class="absolute inset-0 bg-gradient-to-b from-violet-600/3 to-transparent"></div>
        <div class="max-w-6xl mx-auto relative z-10">
            <div class="text-center mb-6 reveal"><span class="text-violet-400 text-sm font-semibold uppercase tracking-wider">Portfolio</span><h2 class="text-4xl font-black mt-2 font-display">Featured Projects</h2></div>
            <div class="flex flex-wrap justify-center gap-2 mb-10 reveal" id="projectFilters"></div>
            <div id="projectsGrid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
        </div>
    </section>

    <!-- Skills -->
    <section id="skills" class="py-20 px-6">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-12 reveal"><span class="text-violet-400 text-sm font-semibold uppercase tracking-wider">Expertise</span><h2 class="text-4xl font-black mt-2 font-display">Skills & Technologies</h2></div>
            <div id="skillsGrid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        </div>
    </section>

    <!-- Experience -->
    <section id="experience" class="py-20 px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-cyan-600/3 to-transparent"></div>
        <div class="max-w-3xl mx-auto relative z-10">
            <div class="text-center mb-12 reveal"><span class="text-violet-400 text-sm font-semibold uppercase tracking-wider">Journey</span><h2 class="text-4xl font-black mt-2 font-display">Experience</h2></div>
            <div id="timeline" class="space-y-0"></div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 px-6">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-12 reveal"><span class="text-violet-400 text-sm font-semibold uppercase tracking-wider">Testimonials</span><h2 class="text-4xl font-black mt-2 font-display">What Clients Say</h2></div>
            <div id="testimonialsGrid" class="grid md:grid-cols-3 gap-6"></div>
        </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="py-20 px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-violet-600/5 to-transparent"></div>
        <div class="max-w-xl mx-auto relative z-10 reveal">
            <div class="text-center mb-8"><span class="text-violet-400 text-sm font-semibold uppercase tracking-wider">Get in Touch</span><h2 class="text-3xl font-black mt-2 font-display">Let's Work Together</h2></div>
            <form id="contactForm" onsubmit="handleContact(event)" class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 space-y-4">
                <div class="grid sm:grid-cols-2 gap-4"><input type="text" id="cName" required placeholder="Name" minlength="2" class="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition" onblur="validate(this,'name')"><input type="email" id="cEmail" required placeholder="Email" class="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition" onblur="validate(this,'email')"></div>
                <input type="text" id="cSubject" placeholder="Subject" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition">
                <textarea id="cMsg" required placeholder="Your message..." rows="5" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 transition resize-none" onblur="validate(this,'msg')"></textarea>
                <button type="submit" id="contactBtn" class="w-full py-3 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-violet-500/25">Send Message →</button>
            </form>
            <div id="contactSuccess" class="hidden text-center py-12"><div class="text-5xl mb-3">🎉</div><h3 class="text-xl font-bold font-display mb-2">Message Sent!</h3><p class="text-slate-400 text-sm">I'll get back to you within 24 hours.</p></div>
        </div>
    </section>

    <footer class="border-t border-white/5 py-12 px-6"><div class="max-w-6xl mx-auto text-center text-sm text-slate-600"><p>© 2025 ${title}. All rights reserved.</p><span class="text-xs text-slate-700 mt-2 inline-block">⚡ Built with Genapps AI</span></div></footer>

<script>
const DB={
    projects:[
        {id:1,title:'Nova Dashboard',desc:'A real-time analytics dashboard with dynamic charts, dark mode, and responsive design for SaaS platforms.',tags:['React','TypeScript','D3.js'],category:'Web App',gradient:'from-violet-600 to-indigo-800',link:'#'},
        {id:2,title:'Pulse E-Commerce',desc:'Full-stack online store with cart, payments, inventory management, and admin panel.',tags:['Next.js','Stripe','PostgreSQL'],category:'Web App',gradient:'from-emerald-600 to-teal-800',link:'#'},
        {id:3,title:'Aether Mobile',desc:'Cross-platform fitness tracking app with social features and real-time sync.',tags:['React Native','Firebase','Node.js'],category:'Mobile',gradient:'from-orange-600 to-red-800',link:'#'},
        {id:4,title:'Vertex UI Kit',desc:'Premium design system with 200+ components, tokens, and Figma integration.',tags:['Figma','Storybook','CSS'],category:'Design',gradient:'from-pink-600 to-rose-800',link:'#'},
        {id:5,title:'CloudSync API',desc:'Enterprise-grade REST API handling 50K+ requests/sec with zero downtime.',tags:['Go','Redis','Docker'],category:'Backend',gradient:'from-cyan-600 to-blue-800',link:'#'},
        {id:6,title:'TerraVerse',desc:'Interactive 3D portfolio experience with WebGL, particle systems, and spatial audio.',tags:['Three.js','GSAP','WebGL'],category:'Creative',gradient:'from-amber-600 to-orange-800',link:'#'}
    ],
    skills:[
        {name:'Frontend',items:['React / Next.js','TypeScript','HTML / CSS','Tailwind CSS','Three.js'],icon:'⚛️',gradient:'from-cyan-600 to-blue-700'},
        {name:'Backend',items:['Node.js','Python','Go','REST APIs','GraphQL'],icon:'⚙️',gradient:'from-emerald-600 to-teal-700'},
        {name:'Mobile',items:['React Native','Flutter','iOS (Swift)','Android (Kotlin)'],icon:'📱',gradient:'from-violet-600 to-purple-700'},
        {name:'Design',items:['Figma','Adobe XD','UI/UX','Design Systems','Prototyping'],icon:'🎨',gradient:'from-pink-600 to-rose-700'},
        {name:'DevOps',items:['Docker','AWS','CI/CD','Kubernetes','Terraform'],icon:'☁️',gradient:'from-orange-600 to-red-700'},
        {name:'Database',items:['PostgreSQL','MongoDB','Redis','Prisma','Supabase'],icon:'🗄️',gradient:'from-amber-600 to-yellow-700'}
    ],
    timeline:[
        {period:'2023 — Present',role:'Senior Full-Stack Developer',company:'TechNova Inc.',desc:'Leading a team of 8 engineers building the next-gen analytics platform. Shipped features used by 100K+ users.'},
        {period:'2021 — 2023',role:'Frontend Engineer',company:'DesignLab Studio',desc:'Built pixel-perfect UIs for premium clients including Fortune 500 companies. Led the design system initiative.'},
        {period:'2019 — 2021',role:'Junior Developer',company:'StartupForge',desc:'Full-stack development for early-stage startups. Shipped 5 MVPs from concept to launch in 2 years.'},
        {period:'2019',role:'B.S. in Computer Science',company:'State University',desc:'Graduated with honors. Focused on HCI, algorithms, and software engineering.'}
    ],
    testimonials:[
        {text:'${title} transformed our digital presence completely. The attention to detail and design quality was beyond our expectations.','name':'Sarah M.','role:'CEO, TechVentures',avatar:'from-rose-500 to-pink-600'},
        {text:'Working with ${title} was a game-changer. Our conversion rate increased 340% after the redesign. Highly recommended!','name':'David K.','role':'CTO, GrowthLabs',avatar:'from-blue-500 to-indigo-600'},
        {text:'The most talented developer I\\'ve ever worked with. Delivers consistently exceptional results on time and on budget.','name':'Emma L.','role':'Product Lead, Nexus','avatar':'from-emerald-500 to-teal-600'}
    ],
    typewriterWords:['stunning web apps','beautiful interfaces','scalable systems','mobile experiences','design systems']
};

let projectFilter='all';

function showToast(m,t='success'){const c=document.getElementById('toast-container');const cols={success:'border-emerald-500 bg-emerald-500/10',error:'border-red-500 bg-red-500/10',info:'border-blue-500 bg-blue-500/10'};const el=document.createElement('div');el.className='toast-enter pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-xl '+(cols[t]||cols.info);el.innerHTML='<span class="text-sm font-medium">'+m+'</span><div class="absolute bottom-0 left-0 h-0.5 bg-white/20 rounded" style="animation:progress 3s linear forwards;width:100%"></div>';c.appendChild(el);setTimeout(()=>{el.classList.remove('toast-enter');el.classList.add('toast-exit');setTimeout(()=>el.remove(),400)},3000)}

function typewriter(){
    const el=document.getElementById('typewriter');const words=DB.typewriterWords;let wi=0,ci=0,del=false;
    function tick(){if(!del){el.textContent=words[wi].slice(0,ci+1);ci++;if(ci>=words[wi].length){del=true;setTimeout(tick,2000);return}}else{el.textContent=words[wi].slice(0,ci);ci--;if(ci<=0){del=false;wi=(wi+1)%words.length}}setTimeout(tick,del?50:80)}tick()
}

function renderProjects(){
    const cats=['All',...new Set(DB.projects.map(p=>p.category))];
    document.getElementById('projectFilters').innerHTML=cats.map(c=>'<button onclick="filterProjects(\\''+c.toLowerCase()+'\\');showToast(\\''+c+'\\',\\'info\\')" class="px-5 py-2 rounded-xl text-sm font-semibold transition '+(projectFilter===(c==='All'?'all':c.toLowerCase())?'bg-violet-600 text-white':'bg-white/5 text-slate-400 hover:bg-white/10')+'">'+c+'</button>').join('');
    let projects=DB.projects;if(projectFilter!=='all')projects=projects.filter(p=>p.category.toLowerCase()===projectFilter);
    document.getElementById('projectsGrid').innerHTML=projects.map((p,i)=>'<div class="project-card reveal bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden group" style="transition-delay:'+i*100+'ms"><div class="aspect-video bg-gradient-to-br '+p.gradient+' relative flex items-center justify-center"><span class="text-4xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all">🚀</span><div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><a href="'+p.link+'" onclick="showToast(\\'Opening: '+p.title+'\\',\\'info\\');return false" class="px-5 py-2 bg-white text-black rounded-xl font-bold text-sm hover:bg-white/90 transition">View Project →</a></div></div><div class="p-5"><h3 class="font-bold font-display mb-2">'+p.title+'</h3><p class="text-sm text-slate-400 mb-3 leading-relaxed">'+p.desc+'</p><div class="flex flex-wrap gap-2">'+p.tags.map(t=>'<span class="px-2 py-1 bg-white/5 rounded-lg text-xs text-slate-400">'+t+'</span>').join('')+'</div></div></div>').join('');
    initReveal();
}

function filterProjects(cat){projectFilter=cat;renderProjects()}

function renderSkills(){document.getElementById('skillsGrid').innerHTML=DB.skills.map((s,i)=>'<div class="reveal bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-violet-500/20 hover:-translate-y-1 transition-all" style="transition-delay:'+i*80+'ms"><div class="flex items-center gap-3 mb-4"><div class="w-10 h-10 rounded-xl bg-gradient-to-br '+s.gradient+' flex items-center justify-center text-lg">'+s.icon+'</div><h3 class="font-bold font-display">'+s.name+'</h3></div><ul class="space-y-2">'+s.items.map(it=>'<li class="text-sm text-slate-400 flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-violet-400"></span>'+it+'</li>').join('')+'</ul></div>').join('')}

function renderTimeline(){document.getElementById('timeline').innerHTML=DB.timeline.map((t,i)=>'<div class="reveal flex gap-6" style="transition-delay:'+i*100+'ms"><div class="flex flex-col items-center"><div class="w-4 h-4 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex-shrink-0 mt-1"></div>'+(i<DB.timeline.length-1?'<div class="w-0.5 flex-1 bg-gradient-to-b from-violet-500/30 to-transparent my-2"></div>':'')+'</div><div class="pb-10"><span class="text-xs text-violet-400 font-semibold">'+t.period+'</span><h3 class="font-bold font-display mt-1">'+t.role+'</h3><p class="text-sm text-cyan-400 mb-2">'+t.company+'</p><p class="text-sm text-slate-400 leading-relaxed">'+t.desc+'</p></div></div>').join('')}

function renderTestimonials(){document.getElementById('testimonialsGrid').innerHTML=DB.testimonials.map((t,i)=>'<div class="reveal bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 transition-all" style="transition-delay:'+i*100+'ms"><div class="text-violet-400 text-2xl mb-4">"</div><p class="text-sm text-slate-300 leading-relaxed mb-6">'+t.text+'</p><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-gradient-to-br '+t.avatar+' flex items-center justify-center text-sm font-bold">'+t.name[0]+'</div><div><div class="text-sm font-semibold">'+t.name+'</div><div class="text-xs text-slate-500">'+t.role+'</div></div></div></div>').join('')}

function validate(el,type){let ok=true;if(type==='name'&&el.value.length<2)ok=false;if(type==='email'&&!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(el.value))ok=false;if(type==='msg'&&el.value.length<10)ok=false;el.style.borderColor=ok?'#22c55e':'#ef4444';if(!ok)showToast('Please check this field','error');return ok}

function handleContact(e){e.preventDefault();if(!validate(document.getElementById('cName'),'name')||!validate(document.getElementById('cEmail'),'email')||!validate(document.getElementById('cMsg'),'msg'))return;const btn=document.getElementById('contactBtn');btn.innerHTML='Sending...';btn.disabled=true;setTimeout(()=>{document.getElementById('contactForm').classList.add('hidden');document.getElementById('contactSuccess').classList.remove('hidden');showToast('Message sent!','success');setTimeout(()=>{document.getElementById('contactForm').classList.remove('hidden');document.getElementById('contactSuccess').classList.add('hidden');document.getElementById('contactForm').reset();btn.innerHTML='Send Message →';btn.disabled=false;['cName','cEmail','cMsg'].forEach(id=>document.getElementById(id).style.borderColor='')},4000)},1200)}

function toggleMobile(){const m=document.getElementById('mobileMenu');m.classList.toggle('open');document.body.style.overflow=m.classList.contains('open')?'hidden':''}
function initReveal(){const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:.1});document.querySelectorAll('.reveal:not(.visible)').forEach(el=>obs.observe(el))}

document.addEventListener('mousemove',e=>{const g=document.getElementById('cursorGlow');g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});

window.addEventListener('scroll',()=>{const n=document.getElementById('navbar'),b=document.getElementById('backToTop');if(window.scrollY>50)n.classList.add('nav-scrolled');else n.classList.remove('nav-scrolled');if(window.scrollY>300){b.style.opacity='1';b.style.pointerEvents='auto'}else{b.style.opacity='0';b.style.pointerEvents='none'};document.getElementById('scrollBar').style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%'});

document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('mobileMenu').classList.contains('open'))toggleMobile()});

document.addEventListener('DOMContentLoaded',()=>{typewriter();renderProjects();renderSkills();renderTimeline();renderTestimonials();initReveal()});
<\/script>
</body>
</html>`;
}
