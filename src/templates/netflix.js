export function netflixTemplate(title = 'StreamVault') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Stream Movies & Shows</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script>tailwind.config={theme:{extend:{fontFamily:{sans:['Inter','system-ui','sans-serif'],display:['Outfit','Inter','sans-serif']}}}}<\/script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        html{scroll-behavior:smooth}*{font-family:'Inter',sans-serif}h1,h2,h3,h4{font-family:'Outfit','Inter',sans-serif}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes fade-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slide-in-right{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes slide-out-right{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}
        @keyframes gradient-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes progress{from{width:100%}to{width:0}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .reveal{opacity:0;transform:translateY(30px);transition:all .8s cubic-bezier(.16,1,.3,1)}.reveal.visible{opacity:1;transform:translateY(0)}
        .toast-enter{animation:slide-in-right .4s ease forwards}.toast-exit{animation:slide-out-right .4s ease forwards}
        .nav-scrolled{background:rgba(0,0,0,.95)!important;backdrop-filter:blur(24px);box-shadow:0 4px 30px rgba(0,0,0,.3)}
        .scroll-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#e50914,#ff6b6b,#e50914);z-index:9999;transition:width .1s}
        .content-card{transition:all .3s ease}.content-card:hover{transform:scale(1.08);z-index:10;box-shadow:0 12px 40px rgba(0,0,0,.6)}
        .row-container{overflow-x:auto;scroll-behavior:smooth;scrollbar-width:none}.row-container::-webkit-scrollbar{display:none}
        .mobile-menu{transform:translateX(100%);transition:transform .35s cubic-bezier(.16,1,.3,1)}.mobile-menu.open{transform:translateX(0)}
    </style>
</head>
<body class="bg-[#0a0a0a] text-white overflow-x-hidden">
    <div class="scroll-bar" id="scrollBar"></div>
    <div id="toast-container" class="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none"></div>
    <button id="backToTop" onclick="window.scrollTo({top:0})" class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl hover:-translate-y-1 transition-all opacity-0 pointer-events-none"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M5 15l7-7 7 7"/></svg></button>

    <!-- Nav -->
    <nav id="navbar" class="fixed top-0 w-full z-50 transition-all duration-500" style="background:linear-gradient(180deg,rgba(0,0,0,.8) 0%,transparent 100%)">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div class="text-2xl font-black font-display text-red-600">${title}</div>
            <div class="hidden md:flex items-center gap-6">
                <a href="#" onclick="scrollToSection('trending');return false" class="text-sm text-slate-300 hover:text-white transition">Trending</a>
                <a href="#" onclick="scrollToSection('movies');return false" class="text-sm text-slate-300 hover:text-white transition">Movies</a>
                <a href="#" onclick="scrollToSection('series');return false" class="text-sm text-slate-300 hover:text-white transition">TV Shows</a>
                <a href="#" onclick="scrollToSection('mylist');return false" class="text-sm text-slate-300 hover:text-white transition">My List</a>
                <div class="relative"><input id="searchInput" type="text" placeholder="Search titles..." class="w-0 bg-transparent border border-transparent rounded px-0 py-1.5 text-sm text-white focus:w-48 focus:bg-black/50 focus:border-white/20 focus:px-3 transition-all" oninput="handleSearch()"><button onclick="document.getElementById('searchInput').focus()" class="text-slate-400 hover:text-white"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg></button></div>
                <button onclick="showToast('Notifications: No new updates','info')" class="text-slate-400 hover:text-white transition">🔔</button>
                <button onclick="showToast('Profile settings','info')" class="w-8 h-8 rounded bg-gradient-to-br from-red-600 to-orange-600 text-xs font-bold flex items-center justify-center">U</button>
            </div>
            <button onclick="toggleMobile()" class="md:hidden p-2"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg></button>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobileMenu" class="mobile-menu fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
        <button onclick="toggleMobile()" class="absolute top-6 right-6 p-2"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
        <a href="#" onclick="toggleMobile();scrollToSection('trending');return false" class="text-2xl font-display font-bold">Trending</a>
        <a href="#" onclick="toggleMobile();scrollToSection('movies');return false" class="text-2xl font-display font-bold">Movies</a>
        <a href="#" onclick="toggleMobile();scrollToSection('series');return false" class="text-2xl font-display font-bold">TV Shows</a>
        <a href="#" onclick="toggleMobile();scrollToSection('mylist');return false" class="text-2xl font-display font-bold">My List</a>
    </div>

    <!-- Hero Billboard -->
    <section id="heroBillboard" class="relative h-[85vh] min-h-[600px] flex items-end">
        <div id="heroBg" class="absolute inset-0 transition-all duration-1000"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 to-transparent"></div>
        <div class="relative z-10 max-w-3xl px-8 pb-20">
            <div id="heroTag" class="inline-flex items-center px-3 py-1 bg-red-600/80 text-xs font-bold rounded mb-4"></div>
            <h1 id="heroTitle" class="text-4xl md:text-6xl font-black font-display mb-4"></h1>
            <p id="heroDesc" class="text-lg text-slate-300 mb-6 max-w-xl"></p>
            <div id="heroMeta" class="flex items-center gap-4 text-sm text-slate-400 mb-6"></div>
            <div class="flex gap-3">
                <button onclick="showToast('Now playing: ' + DB.featured[STATE.heroIndex].title,'success')" class="px-8 py-3 bg-white text-black rounded-lg font-bold flex items-center gap-2 hover:bg-white/90 transition">▶ Play</button>
                <button onclick="toggleMyList(DB.featured[STATE.heroIndex].id)" id="heroListBtn" class="px-8 py-3 bg-white/20 backdrop-blur rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 transition">+ My List</button>
                <button onclick="openDetail(DB.featured[STATE.heroIndex].id)" class="px-6 py-3 bg-white/10 backdrop-blur rounded-lg font-semibold hover:bg-white/20 transition">ℹ More Info</button>
            </div>
        </div>
        <div class="absolute bottom-6 right-8 flex gap-2 z-10">
            <button onclick="prevHero()" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center transition">‹</button>
            <button onclick="nextHero()" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center transition">›</button>
        </div>
    </section>

    <!-- Content Rows -->
    <section id="trending" class="py-6 reveal"><div class="px-6"><h2 class="text-xl font-bold font-display mb-4">🔥 Trending Now</h2></div><div class="relative group"><div id="trendingRow" class="row-container flex gap-3 px-6"></div><button onclick="scrollRow('trendingRow',-1)" class="hidden group-hover:flex absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0a] items-center justify-center text-2xl z-10">‹</button><button onclick="scrollRow('trendingRow',1)" class="hidden group-hover:flex absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0a] items-center justify-center text-2xl z-10">›</button></div></section>

    <section id="movies" class="py-6 reveal"><div class="px-6"><h2 class="text-xl font-bold font-display mb-4">🎬 Popular Movies</h2></div><div class="relative group"><div id="moviesRow" class="row-container flex gap-3 px-6"></div><button onclick="scrollRow('moviesRow',-1)" class="hidden group-hover:flex absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0a] items-center justify-center text-2xl z-10">‹</button><button onclick="scrollRow('moviesRow',1)" class="hidden group-hover:flex absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0a] items-center justify-center text-2xl z-10">›</button></div></section>

    <section id="series" class="py-6 reveal"><div class="px-6"><h2 class="text-xl font-bold font-display mb-4">📺 Popular TV Shows</h2></div><div class="relative group"><div id="seriesRow" class="row-container flex gap-3 px-6"></div><button onclick="scrollRow('seriesRow',-1)" class="hidden group-hover:flex absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0a] items-center justify-center text-2xl z-10">‹</button><button onclick="scrollRow('seriesRow',1)" class="hidden group-hover:flex absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0a] items-center justify-center text-2xl z-10">›</button></div></section>

    <section class="py-6 reveal"><div class="px-6"><h2 class="text-xl font-bold font-display mb-4">🏆 Award Winners</h2></div><div class="relative group"><div id="awardRow" class="row-container flex gap-3 px-6"></div><button onclick="scrollRow('awardRow',-1)" class="hidden group-hover:flex absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0a0a0a] items-center justify-center text-2xl z-10">‹</button><button onclick="scrollRow('awardRow',1)" class="hidden group-hover:flex absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0a0a0a] items-center justify-center text-2xl z-10">›</button></div></section>

    <!-- My List -->
    <section id="mylist" class="py-8 px-6 reveal">
        <h2 class="text-xl font-bold font-display mb-4">📌 My List</h2>
        <div id="myListRow" class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3"></div>
        <div id="myListEmpty" class="text-center py-12 text-slate-600 hidden"><p class="text-lg">Your list is empty</p><p class="text-sm">Click "+ My List" on any title to save it here</p></div>
    </section>

    <!-- Search Results -->
    <div id="searchOverlay" class="fixed inset-0 z-[55] bg-black/95 backdrop-blur-xl hidden overflow-y-auto">
        <div class="max-w-5xl mx-auto px-6 pt-24 pb-12">
            <div class="flex justify-between items-center mb-8"><h2 class="text-2xl font-bold font-display">Search Results</h2><button onclick="closeSearch()" class="text-slate-400 hover:text-white text-xl">✕</button></div>
            <div id="searchResults" class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3"></div>
            <div id="searchEmpty" class="text-center py-16 text-slate-600 hidden"><p class="text-lg">No results found</p></div>
        </div>
    </div>

    <!-- Detail Modal -->
    <div id="detailModal" class="fixed inset-0 z-[80] hidden overflow-y-auto">
        <div onclick="closeDetail()" class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div class="relative max-w-3xl mx-auto mt-16 mb-8 bg-[#141414] rounded-2xl overflow-hidden" style="animation:fade-up .3s ease">
            <button onclick="closeDetail()" class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#141414] flex items-center justify-center text-slate-400 hover:text-white">✕</button>
            <div id="detailContent"></div>
        </div>
    </div>

    <!-- Plans -->
    <section class="py-20 px-6 reveal">
        <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-black font-display mb-3">Choose Your Plan</h2>
            <p class="text-slate-400 mb-10">Unlimited movies, shows, and more. Cancel anytime.</p>
            <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/10 transition-all hover:-translate-y-1">
                    <h3 class="text-lg font-bold font-display mb-2">Basic</h3><div class="text-3xl font-black mb-1">$9.99<span class="text-sm text-slate-500 font-normal">/mo</span></div><p class="text-sm text-slate-500 mb-6">720p • 1 screen • Mobile only</p>
                    <button onclick="showToast('Basic plan selected! Redirecting...','success')" class="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition">Choose Plan</button>
                </div>
                <div class="bg-gradient-to-b from-red-600/10 to-transparent border border-red-600/30 rounded-2xl p-8 relative hover:-translate-y-1 transition-all">
                    <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-red-600 text-xs font-bold rounded-full">Most Popular</div>
                    <h3 class="text-lg font-bold font-display mb-2">Standard</h3><div class="text-3xl font-black mb-1">$15.99<span class="text-sm text-slate-500 font-normal">/mo</span></div><p class="text-sm text-slate-500 mb-6">1080p • 2 screens • Downloads</p>
                    <button onclick="showToast('Standard plan selected! Best value!','success')" class="w-full py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold transition shadow-lg shadow-red-600/25">Choose Plan</button>
                </div>
                <div class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/10 transition-all hover:-translate-y-1">
                    <h3 class="text-lg font-bold font-display mb-2">Premium</h3><div class="text-3xl font-black mb-1">$22.99<span class="text-sm text-slate-500 font-normal">/mo</span></div><p class="text-sm text-slate-500 mb-6">4K HDR • 4 screens • Dolby Atmos</p>
                    <button onclick="showToast('Premium plan selected!','success')" class="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition">Choose Plan</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-12 px-6">
        <div class="max-w-4xl mx-auto text-center text-sm text-slate-600">
            <div class="flex flex-wrap justify-center gap-4 mb-6"><a href="#" onclick="showToast('FAQ page','info');return false" class="hover:text-slate-400 transition">FAQ</a><a href="#" onclick="showToast('Help Center','info');return false" class="hover:text-slate-400 transition">Help</a><a href="#" onclick="showToast('Privacy Policy','info');return false" class="hover:text-slate-400 transition">Privacy</a><a href="#" onclick="showToast('Terms page','info');return false" class="hover:text-slate-400 transition">Terms</a><a href="#" onclick="showToast('Contact support','info');return false" class="hover:text-slate-400 transition">Contact</a></div>
            <p class="mb-2">© 2025 ${title}. All rights reserved.</p>
            <span class="text-xs text-slate-700">⚡ Built with Genapps AI</span>
        </div>
    </footer>

    <!-- Cookie Banner -->
    <div id="cookieBanner" class="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#141414]/90 backdrop-blur-xl border-t border-white/5" style="display:none">
        <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-sm text-slate-400">We use cookies to improve your experience and personalize recommendations.</p>
            <div class="flex gap-2">
                <button onclick="document.getElementById('cookieBanner').style.display='none';localStorage.setItem('cookieConsent','true');showToast('Preferences saved','success')" class="px-5 py-2 bg-red-600 rounded-lg text-sm font-bold hover:bg-red-500 transition">Accept</button>
                <button onclick="document.getElementById('cookieBanner').style.display='none';localStorage.setItem('cookieConsent','declined');showToast('Cookies declined','info')" class="px-5 py-2 bg-white/5 rounded-lg text-sm text-slate-400 hover:bg-white/10 transition">Decline</button>
            </div>
        </div>
    </div>

<script>
const DB = {
    featured: [
        {id:100,title:'The Last Frontier',year:2025,rating:'TV-MA',duration:'2h 18m',match:97,desc:'A gripping sci-fi epic following humanity\\'s last expedition to the edges of the known universe. When their ship encounters an anomaly, the crew must confront the very nature of reality.',gradient:'from-red-900 via-purple-900 to-indigo-900',genre:'Sci-Fi',tag:'New Release'},
        {id:101,title:'Midnight Protocol',year:2024,rating:'PG-13',duration:'1h 52m',match:94,desc:'A brilliant cybersecurity analyst exposes a global conspiracy when she intercepts a classified transmission. Now hunted by the most powerful agencies in the world, she must stay one step ahead.',gradient:'from-blue-900 via-cyan-900 to-teal-900',genre:'Thriller',tag:'Trending #1'},
        {id:102,title:'Crown of Shadows',year:2025,rating:'TV-14',duration:'Season 3',match:91,desc:'The final season of the beloved fantasy epic. As ancient powers awaken and alliances crumble, three kingdoms must unite against a threat that could unmake the world.',gradient:'from-amber-900 via-orange-900 to-red-900',genre:'Fantasy',tag:'Top 10'}
    ],
    trending: [
        {id:1,title:'Signal Lost',year:'2025',genre:'Thriller',gradient:'from-emerald-700 to-teal-900'},
        {id:2,title:'Echoes of Mars',year:'2024',genre:'Sci-Fi',gradient:'from-red-700 to-rose-900'},
        {id:3,title:'The Arrangement',year:'2025',genre:'Drama',gradient:'from-amber-700 to-orange-900'},
        {id:4,title:'Ghost Line',year:'2024',genre:'Horror',gradient:'from-slate-700 to-zinc-900'},
        {id:5,title:'Velocity',year:'2025',genre:'Action',gradient:'from-blue-700 to-indigo-900'},
        {id:6,title:'Paper Hearts',year:'2024',genre:'Romance',gradient:'from-pink-700 to-rose-900'},
        {id:7,title:'The Recursion',year:'2025',genre:'Sci-Fi',gradient:'from-violet-700 to-purple-900'},
        {id:8,title:'Borderlands',year:'2024',genre:'Western',gradient:'from-yellow-700 to-amber-900'}
    ],
    movies: [
        {id:10,title:'Quantum Break',year:'2025',genre:'Action',gradient:'from-cyan-700 to-blue-900'},
        {id:11,title:'Still Waters',year:'2024',genre:'Drama',gradient:'from-teal-700 to-emerald-900'},
        {id:12,title:'The Inheritance',year:'2025',genre:'Mystery',gradient:'from-purple-700 to-indigo-900'},
        {id:13,title:'Neon Nights',year:'2024',genre:'Noir',gradient:'from-fuchsia-700 to-pink-900'},
        {id:14,title:'Summit',year:'2025',genre:'Adventure',gradient:'from-sky-700 to-blue-900'},
        {id:15,title:'Parallel',year:'2024',genre:'Sci-Fi',gradient:'from-violet-700 to-slate-900'},
        {id:16,title:'The Garden',year:'2025',genre:'Drama',gradient:'from-green-700 to-emerald-900'},
        {id:17,title:'Catalyst',year:'2024',genre:'Thriller',gradient:'from-orange-700 to-red-900'}
    ],
    series: [
        {id:20,title:'The Algorithm',year:'2025',genre:'Tech Thriller',gradient:'from-indigo-700 to-violet-900',seasons:'S3'},
        {id:21,title:'Dynasty Falls',year:'2024',genre:'Drama',gradient:'from-rose-700 to-pink-900',seasons:'S2'},
        {id:22,title:'Whisper Network',year:'2025',genre:'Mystery',gradient:'from-slate-700 to-gray-900',seasons:'S1'},
        {id:23,title:'The Colony',year:'2024',genre:'Sci-Fi',gradient:'from-emerald-700 to-cyan-900',seasons:'S4'},
        {id:24,title:'Firewall',year:'2025',genre:'Action',gradient:'from-red-700 to-orange-900',seasons:'S2'},
        {id:25,title:'Glass Houses',year:'2024',genre:'Drama',gradient:'from-sky-700 to-indigo-900',seasons:'S1'},
        {id:26,title:'Apex',year:'2025',genre:'Survival',gradient:'from-amber-700 to-yellow-900',seasons:'S3'},
        {id:27,title:'Reverie',year:'2024',genre:'Fantasy',gradient:'from-purple-700 to-fuchsia-900',seasons:'S2'}
    ],
    awards: [
        {id:30,title:'The Quiet Hour',year:'2024',genre:'Drama',gradient:'from-amber-600 to-yellow-900'},
        {id:31,title:'Resonance',year:'2025',genre:'Musical',gradient:'from-rose-600 to-red-900'},
        {id:32,title:'Atlas Point',year:'2024',genre:'Drama',gradient:'from-teal-600 to-cyan-900'},
        {id:33,title:'The Architect',year:'2025',genre:'Biopic',gradient:'from-indigo-600 to-blue-900'},
        {id:34,title:'Unspoken',year:'2024',genre:'Foreign',gradient:'from-violet-600 to-purple-900'},
        {id:35,title:'December',year:'2025',genre:'Drama',gradient:'from-slate-600 to-zinc-900'}
    ]
};

const STATE={myList:JSON.parse(localStorage.getItem('myList')||'[]'),heroIndex:0};
const allContent=[...DB.featured,...DB.trending,...DB.movies,...DB.series,...DB.awards];

function showToast(msg,type='success'){
    const c=document.getElementById('toast-container');
    const cols={success:'border-emerald-500 bg-emerald-500/10',error:'border-red-500 bg-red-500/10',info:'border-blue-500 bg-blue-500/10'};
    const icons={success:'✓',error:'✗',info:'ℹ'};
    const ic={success:'text-emerald-400',error:'text-red-400',info:'text-blue-400'};
    const t=document.createElement('div');
    t.className='toast-enter pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-xl border backdrop-blur-xl '+(cols[type]||cols.info);
    t.innerHTML='<span class="text-lg '+(ic[type]||ic.info)+'">'+icons[type]+'</span><span class="text-sm font-medium">'+msg+'</span><div class="absolute bottom-0 left-0 h-0.5 bg-white/20 rounded" style="animation:progress 3s linear forwards;width:100%"></div>';
    c.appendChild(t);
    setTimeout(()=>{t.classList.remove('toast-enter');t.classList.add('toast-exit');setTimeout(()=>t.remove(),400)},3000);
}

function renderHero(){
    const f=DB.featured[STATE.heroIndex];
    document.getElementById('heroBg').className='absolute inset-0 transition-all duration-1000 bg-gradient-to-br '+f.gradient;
    document.getElementById('heroTag').textContent=f.tag;
    document.getElementById('heroTitle').textContent=f.title;
    document.getElementById('heroDesc').textContent=f.desc;
    document.getElementById('heroMeta').innerHTML='<span class="text-green-400 font-bold">'+f.match+'% Match</span><span>'+f.year+'</span><span class="px-1.5 py-0.5 border border-white/20 text-xs">'+f.rating+'</span><span>'+f.duration+'</span><span>'+f.genre+'</span>';
    const inList=STATE.myList.includes(f.id);
    document.getElementById('heroListBtn').innerHTML=(inList?'✓ In List':'+ My List');
}

function nextHero(){STATE.heroIndex=(STATE.heroIndex+1)%DB.featured.length;renderHero()}
function prevHero(){STATE.heroIndex=(STATE.heroIndex-1+DB.featured.length)%DB.featured.length;renderHero()}

function renderCard(item){
    const inList=STATE.myList.includes(item.id);
    return '<div class="content-card flex-shrink-0 w-[180px] relative rounded-lg overflow-hidden cursor-pointer group">'
        +'<div onclick="openDetail('+item.id+')" class="aspect-[2/3] bg-gradient-to-br '+item.gradient+' relative"><div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>'+(item.seasons?'<div class="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-[10px] font-bold rounded">'+item.seasons+'</div>':'')+'</div>'
        +'<div class="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">'
        +'<div class="flex gap-1 mb-1"><button onclick="event.stopPropagation();showToast(\\'Playing: '+item.title.replace(/'/g,"\\\\'")+'\\',\\'success\\')" class="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-xs hover:scale-110 transition">▶</button><button onclick="event.stopPropagation();toggleMyList('+item.id+')" class="w-7 h-7 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-xs hover:bg-white/30 transition">'+(inList?'✓':'+')+'</button><button onclick="event.stopPropagation();showToast(\\'👍 Liked!\\',\\'success\\')" class="w-7 h-7 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-xs hover:bg-white/30 transition">👍</button></div>'
        +'<div class="text-xs font-bold truncate">'+item.title+'</div><div class="text-[10px] text-slate-400">'+item.year+' • '+item.genre+'</div></div></div>';
}

function renderRows(){
    document.getElementById('trendingRow').innerHTML=DB.trending.map(renderCard).join('');
    document.getElementById('moviesRow').innerHTML=DB.movies.map(renderCard).join('');
    document.getElementById('seriesRow').innerHTML=DB.series.map(renderCard).join('');
    document.getElementById('awardRow').innerHTML=DB.awards.map(renderCard).join('');
    renderMyList();
}

function renderMyList(){
    const items=allContent.filter(c=>STATE.myList.includes(c.id));
    const row=document.getElementById('myListRow'),empty=document.getElementById('myListEmpty');
    if(!items.length){row.innerHTML='';empty.classList.remove('hidden');return}
    empty.classList.add('hidden');
    row.innerHTML=items.map(i=>'<div class="content-card rounded-lg overflow-hidden cursor-pointer group relative"><div onclick="openDetail('+i.id+')" class="aspect-[2/3] bg-gradient-to-br '+i.gradient+'"><div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition"></div></div><div class="absolute bottom-0 left-0 right-0 p-2"><div class="text-xs font-bold truncate">'+i.title+'</div></div><button onclick="event.stopPropagation();toggleMyList('+i.id+')" class="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition">✕</button></div>').join('');
}

function toggleMyList(id){
    const idx=STATE.myList.indexOf(id);
    const item=allContent.find(c=>c.id===id);
    if(idx>-1){STATE.myList.splice(idx,1);showToast('Removed from My List','info')}
    else{STATE.myList.push(id);showToast((item?item.title:'Title')+' added to My List','success')}
    localStorage.setItem('myList',JSON.stringify(STATE.myList));
    renderHero();renderRows();
}

function openDetail(id){
    const item=allContent.find(c=>c.id===id);if(!item)return;
    const inList=STATE.myList.includes(id);
    document.getElementById('detailContent').innerHTML=
        '<div class="aspect-video bg-gradient-to-br '+item.gradient+' relative"><div class="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div><div class="absolute bottom-6 left-6 right-6"><h2 class="text-3xl font-black font-display mb-3">'+item.title+'</h2><div class="flex gap-2"><button onclick="showToast(\\'Playing: '+item.title.replace(/'/g,"\\\\'")+'\\',\\'success\\')" class="px-6 py-2.5 bg-white text-black rounded-lg font-bold flex items-center gap-2 hover:bg-white/90 transition">▶ Play</button><button onclick="toggleMyList('+id+')" class="px-6 py-2.5 bg-white/20 backdrop-blur rounded-lg font-semibold hover:bg-white/30 transition">'+(inList?'✓ In List':'+ My List')+'</button></div></div></div>'
        +'<div class="p-6"><div class="flex items-center gap-3 text-sm text-slate-400 mb-4">'+(item.match?'<span class="text-green-400 font-bold">'+item.match+'% Match</span>':'')+'<span>'+item.year+'</span>'+(item.rating?'<span class="px-1.5 py-0.5 border border-white/20 text-xs">'+item.rating+'</span>':'')+'<span>'+(item.duration||item.seasons||item.genre)+'</span></div>'
        +'<p class="text-slate-300 mb-6">'+(item.desc||'An incredible '+item.genre+' experience that will keep you on the edge of your seat. Featuring stunning visuals, powerful performances, and a story that lingers long after the credits roll.')+'</p>'
        +'<div class="text-sm"><span class="text-slate-500">Genre: </span><span>'+item.genre+'</span></div></div>';
    document.getElementById('detailModal').classList.remove('hidden');document.body.style.overflow='hidden';
}

function closeDetail(){document.getElementById('detailModal').classList.add('hidden');document.body.style.overflow=''}

function scrollRow(id,dir){const el=document.getElementById(id);el.scrollBy({left:dir*600,behavior:'smooth'})}
function scrollToSection(id){const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})}
function toggleMobile(){const m=document.getElementById('mobileMenu');m.classList.toggle('open');document.body.style.overflow=m.classList.contains('open')?'hidden':''}

function handleSearch(){
    const q=document.getElementById('searchInput').value.toLowerCase().trim();
    const overlay=document.getElementById('searchOverlay');
    if(!q){overlay.classList.add('hidden');return}
    overlay.classList.remove('hidden');
    const results=allContent.filter(c=>c.title.toLowerCase().includes(q));
    const grid=document.getElementById('searchResults'),empty=document.getElementById('searchEmpty');
    if(!results.length){grid.innerHTML='';empty.classList.remove('hidden');return}
    empty.classList.add('hidden');
    grid.innerHTML=results.map(i=>'<div class="content-card rounded-lg overflow-hidden cursor-pointer group" onclick="closeSearch();openDetail('+i.id+')"><div class="aspect-[2/3] bg-gradient-to-br '+i.gradient+'"></div><div class="p-2"><div class="text-xs font-bold truncate">'+i.title+'</div><div class="text-[10px] text-slate-500">'+i.year+'</div></div></div>').join('');
}

function closeSearch(){document.getElementById('searchOverlay').classList.add('hidden');document.getElementById('searchInput').value=''}

// Scroll handlers
window.addEventListener('scroll',()=>{
    const nav=document.getElementById('navbar'),btt=document.getElementById('backToTop');
    if(window.scrollY>100)nav.classList.add('nav-scrolled');else nav.classList.remove('nav-scrolled');
    if(window.scrollY>300){btt.style.opacity='1';btt.style.pointerEvents='auto'}else{btt.style.opacity='0';btt.style.pointerEvents='none'}
    document.getElementById('scrollBar').style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%';
});

document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDetail();closeSearch();if(document.getElementById('mobileMenu').classList.contains('open'))toggleMobile()}});

// Init
document.addEventListener('DOMContentLoaded',()=>{
    renderHero();renderRows();
    setInterval(nextHero,8000);
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:.1});
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
    if(!localStorage.getItem('cookieConsent'))setTimeout(()=>document.getElementById('cookieBanner').style.display='block',2000);
});
<\/script>
</body>
</html>`;
}
