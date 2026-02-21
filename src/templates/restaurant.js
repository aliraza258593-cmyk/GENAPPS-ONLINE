export function restaurantTemplate(title = 'Ember & Vine') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Fine Dining Restaurant</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script>tailwind.config={theme:{extend:{fontFamily:{sans:['Inter','system-ui','sans-serif'],display:['Playfair Display','Georgia','serif'],accent:['Outfit','Inter','sans-serif']}}}}<\/script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        html{scroll-behavior:smooth}*{font-family:'Inter',sans-serif}h1,h2,h3{font-family:'Playfair Display',Georgia,serif}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes gradient-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes slide-in-right{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes slide-out-right{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}
        @keyframes progress{from{width:100%}to{width:0}}
        @keyframes fade-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        .reveal{opacity:0;transform:translateY(30px);transition:all .8s cubic-bezier(.16,1,.3,1)}.reveal.visible{opacity:1;transform:translateY(0)}
        .toast-enter{animation:slide-in-right .4s ease forwards}.toast-exit{animation:slide-out-right .4s ease forwards}
        .scroll-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#d4a574,#c2956b,#d4a574);z-index:9999;transition:width .1s}
        .nav-scrolled{background:rgba(15,12,10,.97)!important;backdrop-filter:blur(24px);box-shadow:0 4px 30px rgba(0,0,0,.3)}
        .mobile-menu{transform:translateX(100%);transition:transform .35s cubic-bezier(.16,1,.3,1)}.mobile-menu.open{transform:translateX(0)}
        .menu-card{transition:all .3s ease}.menu-card:hover{transform:translateY(-4px);border-color:rgba(212,165,116,.2)}
    </style>
</head>
<body class="bg-[#0f0c0a] text-white overflow-x-hidden">
    <div class="scroll-bar" id="scrollBar"></div>
    <div id="toast-container" class="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none"></div>
    <button id="backToTop" onclick="window.scrollTo({top:0})" class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[#d4a574] text-[#0f0c0a] flex items-center justify-center shadow-xl hover:-translate-y-1 transition-all opacity-0 pointer-events-none"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M5 15l7-7 7 7"/></svg></button>

    <nav id="navbar" class="fixed top-0 w-full z-50 transition-all duration-500" style="background:rgba(15,12,10,.3);backdrop-filter:blur(8px)">
        <div class="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <a href="#" class="font-display text-2xl font-bold">${title}</a>
            <div class="hidden md:flex items-center gap-8">
                <a href="#menu" class="text-sm text-[#c2956b] hover:text-[#d4a574] transition font-accent">Menu</a>
                <a href="#about" class="text-sm text-[#c2956b] hover:text-[#d4a574] transition font-accent">Our Story</a>
                <a href="#gallery" class="text-sm text-[#c2956b] hover:text-[#d4a574] transition font-accent">Gallery</a>
                <a href="#reviews" class="text-sm text-[#c2956b] hover:text-[#d4a574] transition font-accent">Reviews</a>
                <button onclick="openReservation()" class="px-6 py-2.5 bg-[#d4a574] text-[#0f0c0a] rounded-lg font-bold text-sm font-accent hover:-translate-y-0.5 transition-all">Reserve a Table</button>
            </div>
            <button onclick="toggleMobile()" class="md:hidden p-2"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg></button>
        </div>
    </nav>
    <div id="mobileMenu" class="mobile-menu fixed inset-0 z-[60] bg-[#0f0c0a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
        <button onclick="toggleMobile()" class="absolute top-6 right-6 p-2"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
        <a href="#menu" onclick="toggleMobile()" class="text-2xl font-display">Menu</a>
        <a href="#about" onclick="toggleMobile()" class="text-2xl font-display">Our Story</a>
        <a href="#gallery" onclick="toggleMobile()" class="text-2xl font-display">Gallery</a>
        <button onclick="toggleMobile();openReservation()" class="text-2xl font-display text-[#d4a574]">Reserve</button>
    </div>

    <!-- Hero -->
    <section class="min-h-screen flex items-center px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-[#1a1510] via-[#0f0c0a] to-[#0a0806]"></div>
        <div class="absolute top-40 right-1/4 w-[500px] h-[500px] bg-[#d4a574]/5 rounded-full blur-[160px]" style="animation:float 20s ease infinite"></div>
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <span class="text-[#d4a574] text-sm tracking-[0.3em] font-accent uppercase mb-4 block reveal">Est. 2018 — Fine Dining Experience</span>
            <h1 class="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 reveal">${title}</h1>
            <div class="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d4a574] to-transparent mx-auto mb-6 reveal"></div>
            <p class="text-lg text-[#a08b77] max-w-xl mx-auto mb-10 reveal font-light">An intimate culinary journey where heritage meets innovation. Experience seasonal dishes crafted with locally-sourced ingredients and meticulous attention to detail.</p>
            <div class="flex flex-col sm:flex-row justify-center gap-4 reveal">
                <button onclick="openReservation()" class="px-8 py-4 bg-[#d4a574] text-[#0f0c0a] rounded-xl font-bold font-accent hover:-translate-y-0.5 transition-all shadow-lg shadow-[#d4a574]/20">Reserve Your Table →</button>
                <a href="#menu" class="px-8 py-4 bg-white/5 hover:bg-white/10 border border-[#d4a574]/20 rounded-xl font-medium font-accent transition-all hover:-translate-y-0.5">View Full Menu</a>
            </div>
        </div>
    </section>

    <!-- Hours & Info Strip -->
    <section class="py-8 px-6 border-y border-[#d4a574]/10 reveal">
        <div class="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-center">
            <div><span class="text-xs text-[#a08b77] font-accent uppercase tracking-wider block">Lunch</span><span class="text-sm font-semibold">Mon-Sat · 11:30-14:30</span></div>
            <div class="hidden sm:block w-px bg-[#d4a574]/10"></div>
            <div><span class="text-xs text-[#a08b77] font-accent uppercase tracking-wider block">Dinner</span><span class="text-sm font-semibold">Mon-Sun · 18:00-23:00</span></div>
            <div class="hidden sm:block w-px bg-[#d4a574]/10"></div>
            <div><span class="text-xs text-[#a08b77] font-accent uppercase tracking-wider block">Location</span><span class="text-sm font-semibold">42 Heritage Lane, Downtown</span></div>
            <div class="hidden sm:block w-px bg-[#d4a574]/10"></div>
            <div><span class="text-xs text-[#a08b77] font-accent uppercase tracking-wider block">Phone</span><a href="tel:+15551234567" class="text-sm font-semibold hover:text-[#d4a574] transition">+1 (555) 123-4567</a></div>
        </div>
    </section>

    <!-- Menu -->
    <section id="menu" class="py-20 px-6">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-10 reveal"><span class="text-[#d4a574] text-sm tracking-[0.2em] font-accent uppercase">Our Offerings</span><h2 class="text-4xl font-display font-bold mt-2">The Menu</h2></div>
            <div class="flex flex-wrap justify-center gap-2 mb-10 reveal" id="menuTabs"></div>
            <div id="menuGrid" class="grid md:grid-cols-2 gap-4"></div>
        </div>
    </section>

    <!-- About / Story -->
    <section id="about" class="py-20 px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-[#d4a574]/3 to-transparent"></div>
        <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div class="reveal"><div class="aspect-[4/5] bg-gradient-to-br from-[#2a1f16] to-[#1a1510] rounded-2xl flex items-center justify-center border border-[#d4a574]/10"><span class="text-8xl opacity-60">👨‍🍳</span></div></div>
            <div class="reveal">
                <span class="text-[#d4a574] text-sm tracking-[0.2em] font-accent uppercase">Our Story</span>
                <h2 class="text-3xl font-display font-bold mt-2 mb-6">A Passion for Perfection</h2>
                <p class="text-[#a08b77] leading-relaxed mb-4">Founded by Chef Isabella Romano, ${title} was born from a love of seasonal cooking and the art of hospitality. Every dish tells a story — from the farms that grow our ingredients to the traditions that inspire our techniques.</p>
                <p class="text-[#a08b77] leading-relaxed mb-6">Our menu changes with the seasons, ensuring every visit offers something new while staying true to the flavors that define us.</p>
                <div class="grid grid-cols-3 gap-4">
                    <div class="text-center bg-white/[0.02] border border-[#d4a574]/10 rounded-xl p-4"><div class="text-2xl font-display font-bold text-[#d4a574]">7</div><span class="text-xs text-[#a08b77] font-accent">Years</span></div>
                    <div class="text-center bg-white/[0.02] border border-[#d4a574]/10 rounded-xl p-4"><div class="text-2xl font-display font-bold text-[#d4a574]">⭐</div><span class="text-xs text-[#a08b77] font-accent">Michelin Star</span></div>
                    <div class="text-center bg-white/[0.02] border border-[#d4a574]/10 rounded-xl p-4"><div class="text-2xl font-display font-bold text-[#d4a574]">4.9</div><span class="text-xs text-[#a08b77] font-accent">Rating</span></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Gallery -->
    <section id="gallery" class="py-20 px-6">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-10 reveal"><span class="text-[#d4a574] text-sm tracking-[0.2em] font-accent uppercase">Visual Journey</span><h2 class="text-4xl font-display font-bold mt-2">Gallery</h2></div>
            <div id="galleryGrid" class="grid grid-cols-2 md:grid-cols-3 gap-3"></div>
        </div>
    </section>

    <!-- Reviews -->
    <section id="reviews" class="py-20 px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-[#d4a574]/3 to-transparent"></div>
        <div class="max-w-5xl mx-auto relative z-10">
            <div class="text-center mb-12 reveal"><span class="text-[#d4a574] text-sm tracking-[0.2em] font-accent uppercase">Guest Voices</span><h2 class="text-4xl font-display font-bold mt-2">Reviews</h2></div>
            <div id="reviewsGrid" class="grid md:grid-cols-3 gap-6"></div>
        </div>
    </section>

    <!-- Newsletter -->
    <section class="py-16 px-6 reveal">
        <div class="max-w-xl mx-auto bg-white/[0.02] border border-[#d4a574]/10 rounded-2xl p-8 text-center">
            <h3 class="text-xl font-display font-bold mb-2">Stay Updated</h3>
            <p class="text-sm text-[#a08b77] mb-6 font-accent">Subscribe for seasonal menu updates and exclusive events.</p>
            <form onsubmit="handleNewsletter(event)" class="flex gap-2">
                <input type="email" id="nlEmail" required placeholder="your@email.com" class="flex-1 bg-white/5 border border-[#d4a574]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a574] transition">
                <button type="submit" id="nlBtn" class="px-6 py-3 bg-[#d4a574] text-[#0f0c0a] rounded-xl font-bold text-sm font-accent hover:-translate-y-0.5 transition-all">Subscribe</button>
            </form>
        </div>
    </section>

    <!-- Reservation Modal -->
    <div id="reserveModal" class="fixed inset-0 z-[80] hidden overflow-y-auto">
        <div onclick="closeReservation()" class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div class="relative max-w-lg mx-auto mt-20 mb-8 bg-[#1a1510] border border-[#d4a574]/10 rounded-2xl p-8" style="animation:fade-up .3s ease">
            <button onclick="closeReservation()" class="absolute top-4 right-4 text-[#a08b77] hover:text-white transition">✕</button>
            <h3 class="text-2xl font-display font-bold mb-6">Reserve a Table</h3>
            <form id="reserveForm" onsubmit="handleReserve(event)" class="space-y-4">
                <div class="grid sm:grid-cols-2 gap-4">
                    <div><label class="text-xs text-[#a08b77] mb-1 block font-accent">Name</label><input type="text" id="rName" required minlength="2" class="w-full bg-white/5 border border-[#d4a574]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a574] transition" onblur="valField(this,'name')"></div>
                    <div><label class="text-xs text-[#a08b77] mb-1 block font-accent">Email</label><input type="email" id="rEmail" required class="w-full bg-white/5 border border-[#d4a574]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a574] transition" onblur="valField(this,'email')"></div>
                </div>
                <div class="grid sm:grid-cols-3 gap-4">
                    <div><label class="text-xs text-[#a08b77] mb-1 block font-accent">Date</label><input type="date" id="rDate" required class="w-full bg-white/5 border border-[#d4a574]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a574] transition"></div>
                    <div><label class="text-xs text-[#a08b77] mb-1 block font-accent">Time</label><select id="rTime" required class="w-full bg-white/5 border border-[#d4a574]/10 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:border-[#d4a574] transition"><option value="">Select</option><option>18:00</option><option>18:30</option><option>19:00</option><option>19:30</option><option>20:00</option><option>20:30</option><option>21:00</option><option>21:30</option></select></div>
                    <div><label class="text-xs text-[#a08b77] mb-1 block font-accent">Guests</label><select id="rGuests" class="w-full bg-white/5 border border-[#d4a574]/10 rounded-xl px-4 py-3 text-sm text-slate-400 focus:outline-none focus:border-[#d4a574] transition"><option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4 Guests</option><option>5 Guests</option><option>6+ Guests</option></select></div>
                </div>
                <div><label class="text-xs text-[#a08b77] mb-1 block font-accent">Special Requests</label><textarea id="rNotes" rows="3" placeholder="Dietary requirements, allergies, occasion..." class="w-full bg-white/5 border border-[#d4a574]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#d4a574] transition resize-none"></textarea></div>
                <button type="submit" id="reserveBtn" class="w-full py-3 bg-[#d4a574] text-[#0f0c0a] rounded-xl font-bold font-accent hover:-translate-y-0.5 transition-all">Confirm Reservation</button>
            </form>
            <div id="reserveSuccess" class="hidden text-center py-8"><div class="text-5xl mb-3">🎉</div><h3 class="font-display text-xl font-bold mb-2">Reservation Confirmed!</h3><p class="text-[#a08b77] text-sm mb-4">We've sent a confirmation to your email.</p><button onclick="closeReservation()" class="px-6 py-2 bg-[#d4a574] text-[#0f0c0a] rounded-xl font-bold text-sm font-accent">Close</button></div>
        </div>
    </div>

    <!-- Lightbox -->
    <div id="lightbox" class="fixed inset-0 z-[90] hidden bg-black/95 flex items-center justify-center" onclick="closeLightbox()">
        <button class="absolute top-6 right-6 text-white/40 hover:text-white text-xl">✕</button>
        <button onclick="event.stopPropagation();navLightbox(-1)" class="absolute left-4 text-white/40 hover:text-white text-3xl">‹</button>
        <div id="lightboxContent" class="max-w-3xl max-h-[80vh] mx-auto px-12"></div>
        <button onclick="event.stopPropagation();navLightbox(1)" class="absolute right-4 text-white/40 hover:text-white text-3xl">›</button>
    </div>

    <footer class="border-t border-[#d4a574]/10 py-12 px-6"><div class="max-w-4xl mx-auto text-center text-sm text-[#a08b77]"><div class="flex flex-wrap justify-center gap-6 mb-6"><a href="#menu" class="hover:text-[#d4a574] transition">Menu</a><a href="#about" class="hover:text-[#d4a574] transition">About</a><a href="#" onclick="openReservation();return false" class="hover:text-[#d4a574] transition">Reserve</a><a href="#" onclick="showToast('Privacy Policy','info');return false" class="hover:text-[#d4a574] transition">Privacy</a></div><p class="text-xs mb-1">© 2025 ${title}. All rights reserved.</p><span class="text-xs text-[#6b5a4d]">⚡ Built with Genapps AI</span></div></footer>

    <div id="cookieBanner" class="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#1a1510]/95 backdrop-blur-xl border-t border-[#d4a574]/10" style="display:none">
        <div class="max-w-3xl mx-auto flex items-center justify-between gap-4"><p class="text-xs text-[#a08b77]">We use cookies to enhance your dining experience.</p><div class="flex gap-2"><button onclick="document.getElementById('cookieBanner').style.display='none';localStorage.setItem('cc','1');showToast('Accepted','success')" class="px-4 py-1.5 bg-[#d4a574] text-[#0f0c0a] rounded-lg text-xs font-bold">Accept</button><button onclick="document.getElementById('cookieBanner').style.display='none'" class="px-4 py-1.5 bg-white/5 rounded-lg text-xs text-[#a08b77]">Decline</button></div></div>
    </div>

<script>
const DB={
    menu:{
        Starters:[
            {name:'Burrata & Heirloom Tomato',desc:'San Marzano reduction, basil oil, aged balsamic, focaccia',price:22,dietary:['V']},
            {name:'Seared Scallops',desc:'Cauliflower purée, crispy pancetta, brown butter, microgreens',price:28,dietary:[]},
            {name:'Tuna Tartare',desc:'Avocado, sesame, ponzu, wonton crisps, yuzu pearls',price:26,dietary:['GF']},
            {name:'Roasted Bone Marrow',desc:'Parsley gremolata, grilled sourdough, Maldon sea salt',price:24,dietary:[]}
        ],
        Mains:[
            {name:'Wagyu Ribeye 12oz',desc:'Truffle pommes purée, asparagus, red wine jus, shallot confit',price:68,dietary:['GF']},
            {name:'Pan-Seared Sea Bass',desc:'Fennel, olives, cherry tomato, saffron beurre blanc',price:44,dietary:['GF']},
            {name:'Wild Mushroom Risotto',desc:'Porcini, truffle oil, aged Parmesan, microherbs',price:36,dietary:['V','GF']},
            {name:'Duck Confit',desc:'Orange glaze, braised red cabbage, roasted potatoes, jus',price:42,dietary:['GF']},
            {name:'Lamb Rack',desc:'Herb crust, ratatouille, rosemary jus, pommes fondant',price:52,dietary:['GF']}
        ],
        Desserts:[
            {name:'Crème Brûlée',desc:'Tahitian vanilla, caramelized sugar, shortbread',price:16,dietary:['V','GF']},
            {name:'Chocolate Fondant',desc:'Warm dark chocolate, vanilla ice cream, gold leaf',price:18,dietary:['V']},
            {name:'Seasonal Fruit Tart',desc:'Pastry cream, mixed berries, apricot glaze',price:15,dietary:['V']},
            {name:'Cheese Selection',desc:'Artisan cheeses, fig jam, walnuts, honeycomb',price:22,dietary:['V','GF']}
        ],
        Cocktails:[
            {name:'Heritage Old Fashioned',desc:'Woodford Reserve, Angostura, orange, cherry',price:18,dietary:[]},
            {name:'Ember Spritz',desc:'Aperol, prosecco, blood orange, rosemary',price:16,dietary:[]},
            {name:'Smoky Margarita',desc:'Mezcal, lime, agave, chili salt rim',price:17,dietary:[]},
            {name:'Garden Gimlet',desc:'Cucumber gin, elderflower, lime, basil',price:16,dietary:[]}
        ]
    },
    gallery:[
        {gradient:'from-amber-800 to-orange-900',label:'Dining Room',icon:'🍽️'},
        {gradient:'from-red-800 to-rose-900',label:'Kitchen',icon:'👨‍🍳'},
        {gradient:'from-emerald-800 to-teal-900',label:'Garden',icon:'🌿'},
        {gradient:'from-violet-800 to-indigo-900',label:'Bar',icon:'🍸'},
        {gradient:'from-sky-800 to-blue-900',label:'Wine Cellar',icon:'🍷'},
        {gradient:'from-pink-800 to-rose-900',label:'Private Room',icon:'✨'}
    ],
    reviews:[
        {text:'An unforgettable dining experience. The wagyu was cooked to absolute perfection and the service was impeccable.',name:'James W.',rating:5,date:'2 weeks ago'},
        {text:'We celebrated our anniversary here and every detail was perfect. The tasting menu with wine pairing was exceptional.',name:'Maria & Carlos',rating:5,date:'1 month ago'},
        {text:'The best restaurant in the city, hands down. Chef Romano\\'s seasonal menu never disappoints. The chocolate fondant is divine.',name:'Sophie L.',rating:5,date:'3 weeks ago'}
    ]
};

let activeCategory='Starters',lightboxIdx=0;

function showToast(m,t='success'){const c=document.getElementById('toast-container');const cols={success:'border-[#d4a574] bg-[#d4a574]/10',error:'border-red-500 bg-red-500/10',info:'border-blue-400 bg-blue-400/10'};const el=document.createElement('div');el.className='toast-enter pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-xl '+(cols[t]||cols.info);el.innerHTML='<span class="text-sm font-medium">'+m+'</span><div class="absolute bottom-0 left-0 h-0.5 bg-white/20 rounded" style="animation:progress 3s linear forwards;width:100%"></div>';c.appendChild(el);setTimeout(()=>{el.classList.remove('toast-enter');el.classList.add('toast-exit');setTimeout(()=>el.remove(),400)},3000)}

function renderMenuTabs(){document.getElementById('menuTabs').innerHTML=Object.keys(DB.menu).map(c=>'<button onclick="setCategory(\\''+c+'\\');showToast(\\''+c+'\\',\\'info\\')" class="px-5 py-2 rounded-xl text-sm font-semibold font-accent transition '+(activeCategory===c?'bg-[#d4a574] text-[#0f0c0a]':'bg-white/5 text-[#a08b77] hover:bg-white/10')+'">'+c+'</button>').join('')}

function setCategory(c){activeCategory=c;renderMenuTabs();renderMenu()}

function renderMenu(){
    const items=DB.menu[activeCategory]||[];
    document.getElementById('menuGrid').innerHTML=items.map((item,i)=>'<div class="menu-card reveal bg-white/[0.02] border border-[#d4a574]/5 rounded-2xl p-6 group" style="transition-delay:'+i*80+'ms"><div class="flex justify-between items-start mb-2"><h3 class="font-display text-lg font-semibold group-hover:text-[#d4a574] transition">'+item.name+'</h3><span class="text-[#d4a574] font-bold font-accent text-lg">$'+item.price+'</span></div><p class="text-sm text-[#a08b77] leading-relaxed mb-3">'+item.desc+'</p><div class="flex items-center justify-between">'+(item.dietary.length?'<div class="flex gap-1">'+item.dietary.map(d=>'<span class="px-2 py-0.5 bg-white/5 rounded-full text-[10px] text-[#d4a574] font-accent font-semibold">'+d+'</span>').join('')+'</div>':'<div></div>')+'<button onclick="showToast(\\''+item.name+' added to your order!\\',\\'success\\')" class="px-4 py-1.5 bg-[#d4a574]/10 text-[#d4a574] rounded-lg text-xs font-bold font-accent hover:bg-[#d4a574]/20 transition opacity-0 group-hover:opacity-100">+ Add</button></div></div>').join('');
    initReveal();
}

function renderGallery(){document.getElementById('galleryGrid').innerHTML=DB.gallery.map((g,i)=>'<div class="reveal aspect-square bg-gradient-to-br '+g.gradient+' rounded-xl cursor-pointer hover:scale-105 transition-all relative overflow-hidden group" style="transition-delay:'+i*80+'ms" onclick="openLightbox('+i+')"><div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><span class="text-white text-sm font-accent font-semibold">'+g.label+'</span></div><span class="absolute bottom-3 left-3 text-3xl opacity-50 group-hover:opacity-100 transition">'+g.icon+'</span></div>').join('')}

function renderReviews(){document.getElementById('reviewsGrid').innerHTML=DB.reviews.map((r,i)=>'<div class="reveal bg-white/[0.02] border border-[#d4a574]/5 rounded-2xl p-6 hover:border-[#d4a574]/15 transition-all" style="transition-delay:'+i*100+'ms"><div class="flex gap-0.5 mb-4 text-[#d4a574]">'+'★'.repeat(r.rating)+'</div><p class="text-sm text-[#c2956b] leading-relaxed mb-6 italic">"'+r.text+'"</p><div class="flex justify-between items-center"><span class="text-sm font-semibold font-accent">'+r.name+'</span><span class="text-xs text-[#6b5a4d]">'+r.date+'</span></div></div>').join('')}

function openLightbox(idx){lightboxIdx=idx;const g=DB.gallery[idx];document.getElementById('lightboxContent').innerHTML='<div class="aspect-video max-w-2xl bg-gradient-to-br '+g.gradient+' rounded-2xl flex items-center justify-center"><span class="text-7xl">'+g.icon+'</span></div><p class="text-center text-sm text-white/50 mt-4">'+g.label+'</p>';document.getElementById('lightbox').classList.remove('hidden');document.body.style.overflow='hidden'}
function closeLightbox(){document.getElementById('lightbox').classList.add('hidden');document.body.style.overflow=''}
function navLightbox(dir){lightboxIdx=(lightboxIdx+dir+DB.gallery.length)%DB.gallery.length;const g=DB.gallery[lightboxIdx];document.getElementById('lightboxContent').innerHTML='<div class="aspect-video max-w-2xl bg-gradient-to-br '+g.gradient+' rounded-2xl flex items-center justify-center"><span class="text-7xl">'+g.icon+'</span></div><p class="text-center text-sm text-white/50 mt-4">'+g.label+'</p>'}

function openReservation(){document.getElementById('reserveModal').classList.remove('hidden');document.body.style.overflow='hidden';const d=document.getElementById('rDate');if(d){const t=new Date();t.setDate(t.getDate()+1);d.min=t.toISOString().split('T')[0]}}
function closeReservation(){document.getElementById('reserveModal').classList.add('hidden');document.body.style.overflow='';document.getElementById('reserveForm').classList.remove('hidden');document.getElementById('reserveSuccess').classList.add('hidden')}

function valField(el,type){let ok=true;if(type==='name'&&el.value.length<2)ok=false;if(type==='email'&&!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(el.value))ok=false;el.style.borderColor=ok?'#d4a574':'#ef4444';if(!ok)showToast('Please check this field','error');return ok}

function handleReserve(e){e.preventDefault();if(!valField(document.getElementById('rName'),'name')||!valField(document.getElementById('rEmail'),'email'))return;const btn=document.getElementById('reserveBtn');btn.textContent='Confirming...';btn.disabled=true;setTimeout(()=>{document.getElementById('reserveForm').classList.add('hidden');document.getElementById('reserveSuccess').classList.remove('hidden');showToast('Reservation confirmed!','success');btn.textContent='Confirm Reservation';btn.disabled=false;document.getElementById('reserveForm').reset()},1200)}

function handleNewsletter(e){e.preventDefault();const em=document.getElementById('nlEmail'),btn=document.getElementById('nlBtn');if(!em.value||!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(em.value)){showToast('Please enter a valid email','error');return}btn.textContent='Subscribing...';btn.disabled=true;setTimeout(()=>{showToast('Welcome! Check your inbox.','success');em.value='';btn.textContent='Subscribe';btn.disabled=false},1000)}

function toggleMobile(){const m=document.getElementById('mobileMenu');m.classList.toggle('open');document.body.style.overflow=m.classList.contains('open')?'hidden':''}
function initReveal(){const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:.1});document.querySelectorAll('.reveal:not(.visible)').forEach(el=>obs.observe(el))}

window.addEventListener('scroll',()=>{const n=document.getElementById('navbar'),b=document.getElementById('backToTop');if(window.scrollY>50)n.classList.add('nav-scrolled');else n.classList.remove('nav-scrolled');if(window.scrollY>300){b.style.opacity='1';b.style.pointerEvents='auto'}else{b.style.opacity='0';b.style.pointerEvents='none'};document.getElementById('scrollBar').style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%'});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeReservation();closeLightbox();if(document.getElementById('mobileMenu').classList.contains('open'))toggleMobile()}});
document.addEventListener('DOMContentLoaded',()=>{renderMenuTabs();renderMenu();renderGallery();renderReviews();initReveal();if(!localStorage.getItem('cc'))setTimeout(()=>document.getElementById('cookieBanner').style.display='block',2000)});
<\/script>
</body>
</html>`;
}
