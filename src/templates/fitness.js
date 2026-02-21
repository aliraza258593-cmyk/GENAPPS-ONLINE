export function fitnessTemplate(title = 'IronPulse Fitness') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Premium Gym & Fitness</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script>tailwind.config={theme:{extend:{fontFamily:{sans:['Inter','system-ui','sans-serif'],display:['Outfit','Inter','sans-serif']}}}}<\/script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        html{scroll-behavior:smooth}*{font-family:'Inter',sans-serif}h1,h2,h3,h4{font-family:'Outfit','Inter',sans-serif}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes gradient-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes slide-in-right{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes slide-out-right{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}
        @keyframes progress{from{width:100%}to{width:0}}
        @keyframes fade-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        .reveal{opacity:0;transform:translateY(30px);transition:all .8s cubic-bezier(.16,1,.3,1)}.reveal.visible{opacity:1;transform:translateY(0)}
        .toast-enter{animation:slide-in-right .4s ease forwards}.toast-exit{animation:slide-out-right .4s ease forwards}
        .scroll-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#f97316,#ef4444,#f97316);z-index:9999;transition:width .1s}
        .nav-scrolled{background:rgba(10,10,15,.95)!important;backdrop-filter:blur(24px);box-shadow:0 4px 30px rgba(0,0,0,.3)}
        .mobile-menu{transform:translateX(100%);transition:transform .35s cubic-bezier(.16,1,.3,1)}.mobile-menu.open{transform:translateX(0)}
    </style>
</head>
<body class="bg-[#0a0a0f] text-white overflow-x-hidden">
    <div class="scroll-bar" id="scrollBar"></div>
    <div id="toast-container" class="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none"></div>
    <button id="backToTop" onclick="window.scrollTo({top:0})" class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-xl hover:-translate-y-1 transition-all opacity-0 pointer-events-none"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M5 15l7-7 7 7"/></svg></button>

    <!-- Nav -->
    <nav id="navbar" class="fixed top-0 w-full z-50 transition-all duration-500" style="background:rgba(10,10,15,.4);backdrop-filter:blur(12px)">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#" class="text-xl font-black font-display bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">${title}</a>
            <div class="hidden md:flex items-center gap-8">
                <a href="#classes" class="nav-link text-sm text-slate-400 hover:text-white transition">Classes</a>
                <a href="#trainers" class="nav-link text-sm text-slate-400 hover:text-white transition">Trainers</a>
                <a href="#pricing" class="nav-link text-sm text-slate-400 hover:text-white transition">Pricing</a>
                <a href="#calculator" class="nav-link text-sm text-slate-400 hover:text-white transition">BMI Calculator</a>
                <a href="#contact" class="nav-link text-sm text-slate-400 hover:text-white transition">Contact</a>
                <a href="#contact" class="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-bold text-sm hover:-translate-y-0.5 transition-all shadow-lg shadow-orange-500/25">Join Now</a>
            </div>
            <button onclick="toggleMobile()" class="md:hidden p-2"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg></button>
        </div>
    </nav>
    <div id="mobileMenu" class="mobile-menu fixed inset-0 z-[60] bg-[#0a0a0f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
        <button onclick="toggleMobile()" class="absolute top-6 right-6 p-2"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
        <a href="#classes" onclick="toggleMobile()" class="text-2xl font-display font-bold">Classes</a>
        <a href="#trainers" onclick="toggleMobile()" class="text-2xl font-display font-bold">Trainers</a>
        <a href="#pricing" onclick="toggleMobile()" class="text-2xl font-display font-bold">Pricing</a>
        <a href="#contact" onclick="toggleMobile()" class="text-2xl font-display font-bold">Contact</a>
    </div>

    <!-- Hero -->
    <section class="pt-28 pb-20 px-6 relative overflow-hidden">
        <div class="absolute top-20 left-1/4 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[140px]" style="animation:float 20s ease infinite"></div>
        <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[140px]" style="animation:float 25s ease infinite 5s"></div>
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-6 reveal">🔥 Limited Offer — First Month Free</div>
            <h1 class="text-5xl md:text-7xl font-black tracking-tight mb-6 font-display reveal">Transform Your <br><span class="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent" style="background-size:200%;animation:gradient-shift 4s ease infinite">Body & Mind</span></h1>
            <p class="text-lg text-slate-400 max-w-2xl mx-auto mb-10 reveal">World-class equipment, expert trainers, and 50+ weekly classes. Your transformation starts here.</p>
            <div class="flex flex-col sm:flex-row justify-center gap-4 reveal">
                <a href="#pricing" class="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl font-bold shadow-xl shadow-orange-500/25 hover:-translate-y-0.5 transition-all">Start Free Trial →</a>
                <a href="#classes" class="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-medium transition-all hover:-translate-y-0.5">View Schedule</a>
            </div>
        </div>
    </section>

    <!-- Stats -->
    <section class="py-16 px-6 border-y border-white/5 reveal">
        <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div class="text-4xl font-black font-display counter" data-target="15000">0</div><div class="text-sm text-slate-500 mt-1">Active Members</div></div>
            <div><div class="text-4xl font-black font-display counter" data-target="50">0</div><div class="text-sm text-slate-500 mt-1">Weekly Classes</div></div>
            <div><div class="text-4xl font-black font-display counter" data-target="25">0</div><div class="text-sm text-slate-500 mt-1">Expert Trainers</div></div>
            <div><div class="text-4xl font-black font-display counter" data-target="4.9">0</div><div class="text-sm text-slate-500 mt-1">Avg Rating</div></div>
        </div>
    </section>

    <!-- Classes with Day Tabs -->
    <section id="classes" class="py-20 px-6">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-10 reveal"><span class="text-orange-400 text-sm font-semibold uppercase tracking-wider">Our Schedule</span><h2 class="text-4xl font-black mt-2 font-display">Weekly Classes</h2></div>
            <div class="flex flex-wrap justify-center gap-2 mb-8 reveal" id="dayTabs"></div>
            <div id="classesGrid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        </div>
    </section>

    <!-- Trainers -->
    <section id="trainers" class="py-20 px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-orange-600/5 to-transparent"></div>
        <div class="max-w-6xl mx-auto relative z-10">
            <div class="text-center mb-12 reveal"><span class="text-orange-400 text-sm font-semibold uppercase tracking-wider">Expert Team</span><h2 class="text-4xl font-black mt-2 font-display">Meet Our Trainers</h2></div>
            <div id="trainersGrid" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"></div>
        </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="py-20 px-6">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-10 reveal"><span class="text-orange-400 text-sm font-semibold uppercase tracking-wider">Membership</span><h2 class="text-4xl font-black mt-2 font-display">Choose Your Plan</h2></div>
            <div class="flex justify-center mb-8 reveal"><div class="bg-white/5 rounded-full p-1 flex"><button onclick="setPricing('monthly')" id="monthlyBtn" class="px-6 py-2 rounded-full text-sm font-semibold transition">Monthly</button><button onclick="setPricing('annual')" id="annualBtn" class="px-6 py-2 rounded-full text-sm font-semibold transition">Annual <span class="text-xs text-emerald-400 ml-1">Save 20%</span></button></div></div>
            <div id="pricingGrid" class="grid md:grid-cols-3 gap-6"></div>
        </div>
    </section>

    <!-- BMI Calculator -->
    <section id="calculator" class="py-20 px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-red-600/5 to-transparent"></div>
        <div class="max-w-lg mx-auto relative z-10 reveal">
            <div class="text-center mb-8"><span class="text-orange-400 text-sm font-semibold uppercase tracking-wider">Free Tool</span><h2 class="text-3xl font-black mt-2 font-display">BMI Calculator</h2></div>
            <div class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8">
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div><label class="text-xs text-slate-500 mb-1 block">Height (cm)</label><input type="number" id="bmiHeight" placeholder="175" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"></div>
                    <div><label class="text-xs text-slate-500 mb-1 block">Weight (kg)</label><input type="number" id="bmiWeight" placeholder="70" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition"></div>
                </div>
                <button onclick="calculateBMI()" class="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-orange-500/25">Calculate BMI</button>
                <div id="bmiResult" class="mt-6 text-center hidden"></div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 px-6">
        <div class="max-w-2xl mx-auto">
            <h2 class="text-3xl font-black text-center mb-10 font-display reveal">Frequently Asked Questions</h2>
            <div id="faqContainer" class="space-y-3"></div>
        </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="py-20 px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-orange-600/5 to-transparent"></div>
        <div class="max-w-xl mx-auto relative z-10 reveal">
            <div class="text-center mb-8"><span class="text-orange-400 text-sm font-semibold uppercase tracking-wider">Get in Touch</span><h2 class="text-3xl font-black mt-2 font-display">Join ${title}</h2></div>
            <form id="contactForm" onsubmit="handleContact(event)" class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 space-y-4">
                <div><input type="text" id="cName" required placeholder="Full Name" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition" onblur="validateField(this,'name')"></div>
                <div><input type="email" id="cEmail" required placeholder="Email" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition" onblur="validateField(this,'email')"></div>
                <div><input type="tel" id="cPhone" placeholder="Phone" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition" onblur="validateField(this,'phone')"></div>
                <div><select id="cGoal" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:border-orange-500 transition"><option value="">Select your goal</option><option>Weight Loss</option><option>Muscle Building</option><option>General Fitness</option><option>Flexibility</option></select></div>
                <button type="submit" id="contactBtn" class="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-orange-500/25">Get Started Free</button>
            </form>
            <div id="contactSuccess" class="hidden text-center py-12"><div class="text-5xl mb-3">💪</div><h3 class="text-xl font-bold font-display mb-2">Welcome to ${title}!</h3><p class="text-slate-400 text-sm">We'll contact you shortly with your trial details.</p></div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-12 px-6">
        <div class="max-w-6xl mx-auto text-center text-sm text-slate-600">
            <div class="flex flex-wrap justify-center gap-6 mb-6"><a href="#classes" class="hover:text-slate-400 transition">Classes</a><a href="#trainers" class="hover:text-slate-400 transition">Trainers</a><a href="#pricing" class="hover:text-slate-400 transition">Pricing</a><a href="#contact" class="hover:text-slate-400 transition">Contact</a></div>
            <p>© 2025 ${title}. All rights reserved.</p>
            <span class="text-xs text-slate-700 mt-2 inline-block">⚡ Built with Genapps AI</span>
        </div>
    </footer>

    <!-- Cookie Banner -->
    <div id="cookieBanner" class="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#12121a]/90 backdrop-blur-xl border-t border-white/5" style="display:none">
        <div class="max-w-4xl mx-auto flex items-center justify-between gap-4"><p class="text-sm text-slate-400">We use cookies for a better experience.</p><div class="flex gap-2"><button onclick="document.getElementById('cookieBanner').style.display='none';localStorage.setItem('cc','1');showToast('Accepted','success')" class="px-5 py-2 bg-orange-600 rounded-lg text-sm font-bold">Accept</button><button onclick="document.getElementById('cookieBanner').style.display='none';localStorage.setItem('cc','0')" class="px-5 py-2 bg-white/5 rounded-lg text-sm text-slate-400">Decline</button></div></div>
    </div>

<script>
const DB={
    classes:{
        Monday:[{time:'06:00',name:'HIIT Blast',trainer:'Marcus Cole',duration:'45 min',spots:8,gradient:'from-red-600 to-orange-700'},{time:'08:00',name:'Power Yoga',trainer:'Nina Patel',duration:'60 min',spots:12,gradient:'from-violet-600 to-purple-700'},{time:'17:30',name:'CrossFit WOD',trainer:'Jake Torres',duration:'50 min',spots:4,gradient:'from-emerald-600 to-teal-700'}],
        Tuesday:[{time:'07:00',name:'Spin Cycle',trainer:'Lisa Chen',duration:'45 min',spots:10,gradient:'from-cyan-600 to-blue-700'},{time:'12:00',name:'Pilates Core',trainer:'Nina Patel',duration:'50 min',spots:15,gradient:'from-pink-600 to-rose-700'},{time:'18:00',name:'Boxing Basics',trainer:'Marcus Cole',duration:'60 min',spots:6,gradient:'from-amber-600 to-orange-700'}],
        Wednesday:[{time:'06:00',name:'Strength Training',trainer:'Jake Torres',duration:'55 min',spots:8,gradient:'from-blue-600 to-indigo-700'},{time:'09:00',name:'Yoga Flow',trainer:'Nina Patel',duration:'60 min',spots:18,gradient:'from-green-600 to-emerald-700'},{time:'17:00',name:'Kickboxing',trainer:'Marcus Cole',duration:'50 min',spots:5,gradient:'from-red-600 to-pink-700'}],
        Thursday:[{time:'07:00',name:'Functional Fit',trainer:'Jake Torres',duration:'45 min',spots:10,gradient:'from-teal-600 to-cyan-700'},{time:'12:00',name:'Zumba',trainer:'Lisa Chen',duration:'50 min',spots:20,gradient:'from-fuchsia-600 to-pink-700'},{time:'18:30',name:'MMA Conditioning',trainer:'Marcus Cole',duration:'60 min',spots:3,gradient:'from-slate-600 to-zinc-700'}],
        Friday:[{time:'06:00',name:'HIIT Express',trainer:'Marcus Cole',duration:'30 min',spots:12,gradient:'from-orange-600 to-red-700'},{time:'10:00',name:'Stretch & Relax',trainer:'Nina Patel',duration:'45 min',spots:16,gradient:'from-indigo-600 to-violet-700'},{time:'17:00',name:'Power Lifting',trainer:'Jake Torres',duration:'60 min',spots:6,gradient:'from-amber-600 to-yellow-700'}]
    },
    trainers:[
        {name:'Marcus Cole',role:'Head Coach — HIIT & Boxing',exp:'12 years',gradient:'from-red-600 to-orange-700',initials:'MC'},
        {name:'Nina Patel',role:'Yoga & Pilates Specialist',exp:'8 years',gradient:'from-violet-600 to-purple-700',initials:'NP'},
        {name:'Jake Torres',role:'Strength & CrossFit Coach',exp:'10 years',gradient:'from-emerald-600 to-teal-700',initials:'JT'},
        {name:'Lisa Chen',role:'Spin & Cardio Instructor',exp:'6 years',gradient:'from-pink-600 to-rose-700',initials:'LC'}
    ],
    plans:[
        {name:'Basic',monthly:29.99,annual:23.99,features:['Gym access (6am-10pm)','Locker room','2 classes/week','Basic equipment'],gradient:'from-slate-800 to-slate-900'},
        {name:'Pro',monthly:59.99,annual:47.99,features:['24/7 gym access','All classes included','Personal locker','Sauna & steam room','1 PT session/month','Nutrition guide'],popular:true,gradient:'from-orange-800 to-red-900'},
        {name:'Elite',monthly:99.99,annual:79.99,features:['Everything in Pro','Unlimited PT sessions','Recovery lounge','Guest passes','Priority booking','Custom meal plans'],gradient:'from-slate-800 to-slate-900'}
    ],
    faqs:[
        {q:'What are your opening hours?',a:'We are open 24/7 for Pro and Elite members. Basic members have access from 6am to 10pm, seven days a week.'},
        {q:'Can I freeze my membership?',a:'Yes! You can freeze your membership for up to 3 months per year at no extra cost. Just speak to our front desk or use the app.'},
        {q:'Do you offer personal training?',a:'Absolutely! We have 25 certified personal trainers available for 1-on-1 sessions. Pro members get 1 free session per month, and Elite members get unlimited sessions.'},
        {q:'Is there a joining fee?',a:'No joining fees, no hidden costs. You only pay your monthly or annual membership fee. Cancel anytime with 30 days notice.'},
        {q:'What classes do you offer?',a:'We offer 50+ classes per week including HIIT, yoga, Pilates, boxing, spin, CrossFit, Zumba, martial arts, and more. All taught by certified instructors.'},
        {q:'Do you have parking?',a:'Yes, we have a large free car park with 200+ spaces, plus dedicated EV charging stations for members.'}
    ]
};

let pricingMode='monthly',activeDay='Monday';

function showToast(m,t='success'){const c=document.getElementById('toast-container');const cols={success:'border-emerald-500 bg-emerald-500/10',error:'border-red-500 bg-red-500/10',info:'border-blue-500 bg-blue-500/10'};const el=document.createElement('div');el.className='toast-enter pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-xl '+(cols[t]||cols.info);el.innerHTML='<span class="text-sm font-medium">'+m+'</span><div class="absolute bottom-0 left-0 h-0.5 bg-white/20 rounded" style="animation:progress 3s linear forwards;width:100%"></div>';c.appendChild(el);setTimeout(()=>{el.classList.remove('toast-enter');el.classList.add('toast-exit');setTimeout(()=>el.remove(),400)},3000)}

function renderDayTabs(){document.getElementById('dayTabs').innerHTML=Object.keys(DB.classes).map(d=>'<button onclick="setDay(\\''+d+'\\')" class="px-5 py-2 rounded-xl text-sm font-semibold transition '+(activeDay===d?'bg-orange-600 text-white':'bg-white/5 text-slate-400 hover:bg-white/10')+'">'+d+'</button>').join('')}

function setDay(d){activeDay=d;renderDayTabs();renderClasses()}

function renderClasses(){
    const classes=DB.classes[activeDay]||[];
    document.getElementById('classesGrid').innerHTML=classes.map((c,i)=>'<div class="reveal bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-orange-500/20 hover:-translate-y-1 transition-all" style="transition-delay:'+i*80+'ms"><div class="flex justify-between items-start mb-3"><span class="text-orange-400 text-xs font-bold">'+c.time+'</span><span class="text-xs text-slate-500">'+c.duration+'</span></div><div class="w-full h-24 rounded-xl bg-gradient-to-br '+c.gradient+' mb-3 flex items-center justify-center text-2xl opacity-80">🏋️</div><h3 class="font-bold font-display mb-1">'+c.name+'</h3><p class="text-sm text-slate-500 mb-3">with '+c.trainer+'</p><div class="flex justify-between items-center"><span class="text-xs text-emerald-400 font-semibold">'+c.spots+' spots left</span><button onclick="showToast(\\'Booked: '+c.name+'!\\',\\'success\\')" class="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 rounded-lg text-xs font-bold transition">Book</button></div></div>').join('');
    initReveal();
}

function renderTrainers(){document.getElementById('trainersGrid').innerHTML=DB.trainers.map((t,i)=>'<div class="reveal bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center hover:border-white/10 hover:-translate-y-1 transition-all" style="transition-delay:'+i*100+'ms"><div class="w-20 h-20 rounded-full bg-gradient-to-br '+t.gradient+' mx-auto mb-4 flex items-center justify-center text-lg font-bold">'+t.initials+'</div><h3 class="font-bold font-display">'+t.name+'</h3><p class="text-sm text-orange-400 mb-1">'+t.role+'</p><p class="text-xs text-slate-500 mb-4">'+t.exp+' experience</p><button onclick="showToast(\\'Book session with '+t.name+'\\',\\'success\\')" class="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold transition">Book Session</button></div>').join('')}

function setPricing(mode){pricingMode=mode;document.getElementById('monthlyBtn').className='px-6 py-2 rounded-full text-sm font-semibold transition '+(mode==='monthly'?'bg-orange-600 text-white':'text-slate-400 hover:text-white');document.getElementById('annualBtn').className='px-6 py-2 rounded-full text-sm font-semibold transition '+(mode==='annual'?'bg-orange-600 text-white':'text-slate-400 hover:text-white');renderPricing()}

function renderPricing(){document.getElementById('pricingGrid').innerHTML=DB.plans.map((p,i)=>'<div class="reveal bg-white/[0.03] border '+(p.popular?'border-orange-500/30':'border-white/[0.06]')+' rounded-2xl p-8 relative hover:-translate-y-1 transition-all" style="transition-delay:'+i*100+'ms">'+(p.popular?'<div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-600 text-xs font-bold rounded-full">Most Popular</div>':'')+'<h3 class="text-lg font-bold font-display mb-2">'+p.name+'</h3><div class="text-4xl font-black mb-1">$'+(pricingMode==='monthly'?p.monthly:p.annual).toFixed(2)+'<span class="text-sm text-slate-500 font-normal">/mo</span></div>'+(pricingMode==='annual'?'<p class="text-xs text-emerald-400 mb-6">Billed annually</p>':'<p class="text-xs text-slate-600 mb-6">Billed monthly</p>')+'<ul class="space-y-2 mb-8">'+p.features.map(f=>'<li class="text-sm text-slate-400 flex items-center gap-2"><span class="text-emerald-400 text-xs">✓</span>'+f+'</li>').join('')+'</ul><button onclick="showToast(\\''+p.name+' plan selected!\\',\\'success\\')" class="w-full py-3 '+(p.popular?'bg-gradient-to-r from-orange-600 to-red-600 shadow-lg shadow-orange-500/25':'bg-white/5 hover:bg-white/10 border border-white/10')+' rounded-xl font-bold text-sm transition">Get Started</button></div>').join('')}

function calculateBMI(){
    const h=parseFloat(document.getElementById('bmiHeight').value),w=parseFloat(document.getElementById('bmiWeight').value);
    if(!h||!w||h<50||h>300||w<20||w>500){showToast('Please enter valid height and weight','error');return}
    const bmi=(w/((h/100)**2)).toFixed(1);let cat='Normal',col='text-emerald-400';
    if(bmi<18.5){cat='Underweight';col='text-amber-400'}else if(bmi>=25&&bmi<30){cat='Overweight';col='text-amber-400'}else if(bmi>=30){cat='Obese';col='text-red-400'}
    document.getElementById('bmiResult').innerHTML='<div class="text-5xl font-black font-display '+col+' mb-2">'+bmi+'</div><div class="text-sm text-slate-400">Category: <span class="font-semibold '+col+'">'+cat+'</span></div>';
    document.getElementById('bmiResult').classList.remove('hidden');
    showToast('BMI: '+bmi+' ('+cat+')','info');
}

function renderFAQs(){document.getElementById('faqContainer').innerHTML=DB.faqs.map((f,i)=>'<div class="reveal bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden" style="transition-delay:'+i*80+'ms"><button onclick="toggleFaq('+i+')" class="faq-btn w-full flex justify-between items-center p-5 text-left text-sm font-semibold hover:text-orange-400 transition"><span>'+f.q+'</span><span class="faq-icon text-lg transition-transform duration-300">+</span></button><div class="faq-answer max-h-0 overflow-hidden transition-all duration-300"><div class="px-5 pb-5 text-sm text-slate-400 leading-relaxed">'+f.a+'</div></div></div>').join('')}

function toggleFaq(idx){document.querySelectorAll('.faq-answer').forEach((a,i)=>{if(i===idx){const open=a.style.maxHeight&&a.style.maxHeight!=='0px';a.style.maxHeight=open?'0':'200px';a.parentElement.querySelectorAll('.faq-icon')[0].style.transform=open?'':'rotate(45deg)'}else{a.style.maxHeight='0';a.parentElement.querySelectorAll('.faq-icon')[0].style.transform=''}})}

function validateField(el,type){
    let valid=true,msg='';
    if(type==='name'&&el.value.length<2){valid=false;msg='Name must be at least 2 characters'}
    if(type==='email'&&!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(el.value)){valid=false;msg='Please enter a valid email'}
    if(type==='phone'&&el.value&&el.value.length<10){valid=false;msg='Phone must be at least 10 digits'}
    el.style.borderColor=valid?'#22c55e':'#ef4444';
    if(!valid)showToast(msg,'error');return valid;
}

function handleContact(e){
    e.preventDefault();
    const n=document.getElementById('cName'),em=document.getElementById('cEmail');
    if(!validateField(n,'name')||!validateField(em,'email'))return;
    const btn=document.getElementById('contactBtn');btn.innerHTML='<span class="flex items-center justify-center gap-2"><svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity=".3"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path></svg>Submitting...</span>';btn.disabled=true;
    setTimeout(()=>{document.getElementById('contactForm').classList.add('hidden');document.getElementById('contactSuccess').classList.remove('hidden');showToast('Welcome to ${title}!','success');setTimeout(()=>{document.getElementById('contactForm').classList.remove('hidden');document.getElementById('contactSuccess').classList.add('hidden');document.getElementById('contactForm').reset();btn.innerHTML='Get Started Free';btn.disabled=false;['cName','cEmail','cPhone'].forEach(id=>document.getElementById(id).style.borderColor='')},4000)},1200);
}

function toggleMobile(){const m=document.getElementById('mobileMenu');m.classList.toggle('open');document.body.style.overflow=m.classList.contains('open')?'hidden':''}

function initReveal(){const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:.1});document.querySelectorAll('.reveal:not(.visible)').forEach(el=>obs.observe(el))}

function initCounters(){const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const el=e.target,target=parseFloat(el.dataset.target),isDec=target%1!==0;let start=performance.now();function tick(now){const p=Math.min((now-start)/2000,1),v=(1-Math.pow(1-p,3))*target;if(isDec)el.textContent=v.toFixed(1);else if(target>=1000)el.textContent=Math.floor(v).toLocaleString()+'+';else el.textContent=Math.floor(v)+'+';if(p<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);obs.unobserve(el)}})},{threshold:.5});document.querySelectorAll('.counter').forEach(el=>obs.observe(el))}

window.addEventListener('scroll',()=>{const n=document.getElementById('navbar'),b=document.getElementById('backToTop');if(window.scrollY>50)n.classList.add('nav-scrolled');else n.classList.remove('nav-scrolled');if(window.scrollY>300){b.style.opacity='1';b.style.pointerEvents='auto'}else{b.style.opacity='0';b.style.pointerEvents='none'};document.getElementById('scrollBar').style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%'});

document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('mobileMenu').classList.contains('open'))toggleMobile()});

document.addEventListener('DOMContentLoaded',()=>{renderDayTabs();renderClasses();renderTrainers();setPricing('monthly');renderFAQs();initReveal();initCounters();if(!localStorage.getItem('cc'))setTimeout(()=>document.getElementById('cookieBanner').style.display='block',2000)});
<\/script>
</body>
</html>`;
}
