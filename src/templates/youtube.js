export function youtubeTemplate(title = 'StreamTube') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Video Platform</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script>tailwind.config={theme:{extend:{fontFamily:{sans:['Inter','system-ui','sans-serif'],display:['Outfit','Inter','sans-serif']}}}}<\/script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        html{scroll-behavior:smooth}*{font-family:'Inter',sans-serif}h1,h2,h3{font-family:'Outfit','Inter',sans-serif}
        @keyframes slide-in-right{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes slide-out-right{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}
        @keyframes progress{from{width:100%}to{width:0}}
        @keyframes fade-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .toast-enter{animation:slide-in-right .4s ease forwards}.toast-exit{animation:slide-out-right .4s ease forwards}
        .scroll-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#ff0000,#ff4444,#ff0000);z-index:9999;transition:width .1s}
        .video-card:hover .thumb{transform:scale(1.05)}.video-card:hover h3{color:#3ea6ff}
        .sidebar-link:hover,.sidebar-link.active{background:rgba(255,255,255,.06)}
    </style>
</head>
<body class="bg-[#0f0f0f] text-white">
    <div class="scroll-bar" id="scrollBar"></div>
    <div id="toast-container" class="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none"></div>

    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] border-b border-white/5">
        <div class="flex items-center justify-between px-4 h-14">
            <div class="flex items-center gap-4">
                <button onclick="toggleSidebar()" class="p-2 hover:bg-white/5 rounded-full transition">☰</button>
                <span class="text-lg font-black font-display"><span class="text-red-600">▶</span> ${title}</span>
            </div>
            <div class="hidden sm:flex items-center flex-1 max-w-xl mx-8">
                <input id="searchInput" type="text" placeholder="Search" class="flex-1 bg-[#121212] border border-white/10 rounded-l-full px-5 py-2 text-sm focus:outline-none focus:border-blue-500 transition" oninput="handleSearch()">
                <button onclick="handleSearch()" class="px-5 py-2 bg-white/5 border border-white/10 border-l-0 rounded-r-full hover:bg-white/10 transition">🔍</button>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="showToast('Upload coming soon','info')" class="hidden sm:flex p-2 hover:bg-white/5 rounded-full transition">📹</button>
                <button onclick="showToast('No new notifications','info')" class="p-2 hover:bg-white/5 rounded-full transition">🔔</button>
                <button onclick="showToast('Profile settings','info')" class="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-xs font-bold">U</button>
            </div>
        </div>
    </header>

    <div class="flex pt-14">
        <!-- Sidebar -->
        <aside id="sidebar" class="hidden lg:flex flex-col w-56 fixed top-14 bottom-0 overflow-y-auto bg-[#0f0f0f] py-3 px-2 border-r border-white/5 z-40">
            <button onclick="filterVideos('all');showToast('Home','info')" class="sidebar-link active flex items-center gap-4 px-3 py-2 rounded-lg text-sm transition" data-cat="all"><span>🏠</span>Home</button>
            <button onclick="showToast('Shorts coming soon','info')" class="sidebar-link flex items-center gap-4 px-3 py-2 rounded-lg text-sm transition"><span>⚡</span>Shorts</button>
            <button onclick="showToast('Subscriptions','info')" class="sidebar-link flex items-center gap-4 px-3 py-2 rounded-lg text-sm transition"><span>📺</span>Subscriptions</button>
            <div class="border-t border-white/5 my-3"></div>
            <button onclick="setView('watchlater');showToast('Watch Later','info')" class="sidebar-link flex items-center gap-4 px-3 py-2 rounded-lg text-sm transition"><span>⏰</span>Watch Later</button>
            <button onclick="setView('liked');showToast('Liked Videos','info')" class="sidebar-link flex items-center gap-4 px-3 py-2 rounded-lg text-sm transition"><span>👍</span>Liked Videos</button>
            <button onclick="showToast('History','info')" class="sidebar-link flex items-center gap-4 px-3 py-2 rounded-lg text-sm transition"><span>📜</span>History</button>
            <div class="border-t border-white/5 my-3"></div>
            <p class="px-3 text-xs text-slate-600 mt-auto">© 2025 ${title}<br>⚡ Built with Genapps AI</p>
        </aside>

        <!-- Main -->
        <main id="mainContent" class="flex-1 lg:ml-56 px-4 md:px-8 py-6">
            <!-- Category Pills -->
            <div id="categoryPills" class="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide"></div>

            <!-- Video Grid -->
            <div id="view-home">
                <div id="videoGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"></div>
                <div id="noResults" class="hidden text-center py-16 text-slate-600"><p class="text-lg">No videos found</p></div>
            </div>

            <!-- Watch Later View -->
            <div id="view-watchlater" class="hidden">
                <h2 class="text-2xl font-bold font-display mb-6">⏰ Watch Later</h2>
                <div id="watchLaterGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"></div>
                <div id="wlEmpty" class="hidden text-center py-16 text-slate-600"><p>No videos saved</p><p class="text-sm">Click the clock icon on any video</p></div>
            </div>

            <!-- Liked View -->
            <div id="view-liked" class="hidden">
                <h2 class="text-2xl font-bold font-display mb-6">👍 Liked Videos</h2>
                <div id="likedGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"></div>
                <div id="likedEmpty" class="hidden text-center py-16 text-slate-600"><p>No liked videos</p></div>
            </div>
        </main>
    </div>

    <!-- Video Player Modal -->
    <div id="playerModal" class="fixed inset-0 z-[80] hidden overflow-y-auto bg-[#0f0f0f]">
        <div class="max-w-5xl mx-auto">
            <div id="playerContent"></div>
        </div>
    </div>

    <!-- Cookie Banner -->
    <div id="cookieBanner" class="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-white/5" style="display:none">
        <div class="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <p class="text-xs text-slate-400">We use cookies for a better experience.</p>
            <div class="flex gap-2"><button onclick="document.getElementById('cookieBanner').style.display='none';localStorage.setItem('cc','1');showToast('Accepted','success')" class="px-4 py-1.5 bg-blue-600 rounded-full text-xs font-bold">Accept</button><button onclick="document.getElementById('cookieBanner').style.display='none';localStorage.setItem('cc','0')" class="px-4 py-1.5 bg-white/5 rounded-full text-xs text-slate-400">Decline</button></div>
        </div>
    </div>

<script>
const DB = {
    videos: [
        {id:1,title:'Building a $100M Startup in 90 Days — Full Documentary',channel:'Future Founders',views:'2.4M',time:'32:15',date:'3 days ago',category:'Business',gradient:'from-blue-700 to-indigo-900',avatar:'from-blue-500 to-indigo-500',likes:45200,comments:1823},
        {id:2,title:'Why Modern Web Design is Broken (And How to Fix It)',channel:'Design Decoded',views:'890K',time:'18:42',date:'1 week ago',category:'Design',gradient:'from-pink-700 to-rose-900',avatar:'from-pink-500 to-rose-500',likes:32100,comments:956},
        {id:3,title:'Complete React 2025 Course — Zero to Hero in 8 Hours',channel:'CodeMaster Pro',views:'5.1M',time:'8:02:33',date:'2 weeks ago',category:'Programming',gradient:'from-cyan-700 to-blue-900',avatar:'from-cyan-500 to-blue-500',likes:128000,comments:4521},
        {id:4,title:'I Lived Like a Monk for 30 Days — Here What Happened',channel:'Life Experiments',views:'1.8M',time:'24:18',date:'5 days ago',category:'Lifestyle',gradient:'from-amber-700 to-orange-900',avatar:'from-amber-500 to-orange-500',likes:67800,comments:2341},
        {id:5,title:'The Science Behind Perfect Morning Routines',channel:'Mindful Labs',views:'3.2M',time:'15:30',date:'1 month ago',category:'Science',gradient:'from-emerald-700 to-teal-900',avatar:'from-emerald-500 to-teal-500',likes:89400,comments:3012},
        {id:6,title:'Top 10 AI Tools That Will Replace Your Job in 2025',channel:'Tech Today',views:'4.7M',time:'21:45',date:'4 days ago',category:'Technology',gradient:'from-violet-700 to-purple-900',avatar:'from-violet-500 to-purple-500',likes:156000,comments:8923},
        {id:7,title:'Street Food Tour: Tokyo Hidden Gems You MUST Try',channel:'Food Atlas',views:'1.2M',time:'28:10',date:'2 weeks ago',category:'Food',gradient:'from-red-700 to-pink-900',avatar:'from-red-500 to-pink-500',likes:43200,comments:1567},
        {id:8,title:'How I Went From $0 to $10M — My Investment Strategy',channel:'Money Mindset',views:'6.8M',time:'35:22',date:'1 week ago',category:'Business',gradient:'from-green-700 to-emerald-900',avatar:'from-green-500 to-emerald-500',likes:234000,comments:12400},
        {id:9,title:'Mastering Cinematography — Advanced Camera Techniques',channel:'Film Academy',views:'780K',time:'42:15',date:'3 weeks ago',category:'Film',gradient:'from-slate-700 to-zinc-900',avatar:'from-slate-500 to-zinc-500',likes:28900,comments:876},
        {id:10,title:'The Future of Electric Cars — 2025 Complete Guide',channel:'Auto Vision',views:'2.1M',time:'26:33',date:'6 days ago',category:'Technology',gradient:'from-sky-700 to-blue-900',avatar:'from-sky-500 to-blue-500',likes:78600,comments:3456},
        {id:11,title:'Home Gym Setup Under $500 That Actually Works',channel:'FitLife',views:'950K',time:'19:08',date:'1 week ago',category:'Fitness',gradient:'from-orange-700 to-red-900',avatar:'from-orange-500 to-red-500',likes:41200,comments:1234},
        {id:12,title:'Learn Piano in 30 Days — Complete Beginner Course',channel:'Music Masters',views:'3.5M',time:'4:12:00',date:'1 month ago',category:'Music',gradient:'from-fuchsia-700 to-pink-900',avatar:'from-fuchsia-500 to-pink-500',likes:112000,comments:5678}
    ]
};

const STATE={watchLater:JSON.parse(localStorage.getItem('wl')||'[]'),liked:JSON.parse(localStorage.getItem('lv')||'[]'),filter:'all',search:'',view:'home'};

function showToast(m,t='success'){
    const c=document.getElementById('toast-container');const cols={success:'border-green-500 bg-green-500/10',error:'border-red-500 bg-red-500/10',info:'border-blue-500 bg-blue-500/10'};
    const el=document.createElement('div');el.className='toast-enter pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-xl '+(cols[t]||cols.info);el.innerHTML='<span class="text-sm font-medium">'+m+'</span><div class="absolute bottom-0 left-0 h-0.5 bg-white/20 rounded" style="animation:progress 3s linear forwards;width:100%"></div>';
    c.appendChild(el);setTimeout(()=>{el.classList.remove('toast-enter');el.classList.add('toast-exit');setTimeout(()=>el.remove(),400)},3000);
}

function renderCategories(){
    const cats=['All','Technology','Programming','Business','Design','Science','Lifestyle','Food','Film','Fitness','Music'];
    document.getElementById('categoryPills').innerHTML=cats.map(c=>'<button onclick="filterVideos(\\''+c.toLowerCase()+'\\');showToast(\\''+c+'\\',\\'info\\')" class="cat-pill flex-shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium transition '+(STATE.filter===(c==='All'?'all':c.toLowerCase())?'bg-white text-black':'bg-white/10 text-white hover:bg-white/20')+'">'+c+'</button>').join('');
}

function renderVideoCard(v){
    const inWL=STATE.watchLater.includes(v.id);
    return '<div class="video-card cursor-pointer group" onclick="openVideo('+v.id+')">'
        +'<div class="relative rounded-xl overflow-hidden mb-3"><div class="thumb aspect-video bg-gradient-to-br '+v.gradient+' transition-transform duration-300 flex items-center justify-center"><svg class="w-12 h-12 text-white/30" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>'
        +'<div class="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-medium">'+v.time+'</div>'
        +'<button onclick="event.stopPropagation();toggleWL('+v.id+')" class="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition '+(inWL?'text-blue-400':'text-white')+'">'+(inWL?'✓':'⏰')+'</button></div>'
        +'<div class="flex gap-3"><div class="w-9 h-9 rounded-full bg-gradient-to-br '+v.avatar+' flex-shrink-0 mt-0.5"></div>'
        +'<div><h3 class="text-sm font-semibold leading-tight mb-1 line-clamp-2 transition">'+v.title+'</h3>'
        +'<p class="text-xs text-slate-500">'+v.channel+'</p><p class="text-xs text-slate-500">'+v.views+' views • '+v.date+'</p></div></div></div>';
}

function renderVideos(){
    let videos=DB.videos;
    if(STATE.filter!=='all')videos=videos.filter(v=>v.category.toLowerCase()===STATE.filter);
    if(STATE.search)videos=videos.filter(v=>v.title.toLowerCase().includes(STATE.search)||v.channel.toLowerCase().includes(STATE.search));
    const g=document.getElementById('videoGrid'),nr=document.getElementById('noResults');
    if(!videos.length){g.innerHTML='';nr.classList.remove('hidden');return}
    nr.classList.add('hidden');g.innerHTML=videos.map(renderVideoCard).join('');
}

function filterVideos(cat){STATE.filter=cat;STATE.view='home';renderCategories();renderVideos();showViews()}
function handleSearch(){STATE.search=document.getElementById('searchInput').value.toLowerCase().trim();renderVideos()}

function setView(v){STATE.view=v;showViews();if(v==='watchlater')renderWL();if(v==='liked')renderLikedView()}
function showViews(){['home','watchlater','liked'].forEach(v=>{document.getElementById('view-'+v).classList.toggle('hidden',v!==STATE.view)})}

function toggleWL(id){
    const i=STATE.watchLater.indexOf(id);const v=DB.videos.find(x=>x.id===id);
    if(i>-1){STATE.watchLater.splice(i,1);showToast('Removed from Watch Later','info')}
    else{STATE.watchLater.push(id);showToast((v?v.title:'Video')+' saved','success')}
    localStorage.setItem('wl',JSON.stringify(STATE.watchLater));renderVideos();if(STATE.view==='watchlater')renderWL();
}

function toggleLikedV(id){
    const i=STATE.liked.indexOf(id);
    if(i>-1){STATE.liked.splice(i,1);showToast('Removed from liked','info')}
    else{STATE.liked.push(id);showToast('Added to liked videos','success')}
    localStorage.setItem('lv',JSON.stringify(STATE.liked));
}

function renderWL(){
    const items=DB.videos.filter(v=>STATE.watchLater.includes(v.id));
    const g=document.getElementById('watchLaterGrid'),e=document.getElementById('wlEmpty');
    if(!items.length){g.innerHTML='';e.classList.remove('hidden');return}
    e.classList.add('hidden');g.innerHTML=items.map(renderVideoCard).join('');
}

function renderLikedView(){
    const items=DB.videos.filter(v=>STATE.liked.includes(v.id));
    const g=document.getElementById('likedGrid'),e=document.getElementById('likedEmpty');
    if(!items.length){g.innerHTML='';e.classList.remove('hidden');return}
    e.classList.add('hidden');g.innerHTML=items.map(renderVideoCard).join('');
}

function openVideo(id){
    const v=DB.videos.find(x=>x.id===id);if(!v)return;
    const liked=STATE.liked.includes(id);
    document.getElementById('playerContent').innerHTML=
        '<div class="pt-14"><button onclick="closeVideo()" class="mb-4 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition px-4">← Back</button>'
        +'<div class="aspect-video bg-gradient-to-br '+v.gradient+' rounded-xl flex items-center justify-center mb-4"><svg class="w-16 h-16 text-white/40" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>'
        +'<div class="px-4 pb-8"><h1 class="text-xl font-bold font-display mb-2">'+v.title+'</h1>'
        +'<div class="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-4"><span>'+v.views+' views</span><span>'+v.date+'</span></div>'
        +'<div class="flex gap-2 mb-6"><button onclick="toggleLikedV('+id+');showToast(\\''+(liked?'Unliked':'Liked!')+'\\',\\'success\\')" class="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium transition '+(liked?'text-blue-400':'')+'">👍 '+v.likes.toLocaleString()+'</button><button onclick="showToast(\\'Shared!\\',\\'success\\')" class="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium transition">↗ Share</button><button onclick="toggleWL('+id+')" class="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium transition">⏰ Save</button></div>'
        +'<div class="flex items-center gap-3 mb-6"><div class="w-10 h-10 rounded-full bg-gradient-to-br '+v.avatar+'"></div><div><div class="font-semibold text-sm">'+v.channel+'</div><div class="text-xs text-slate-500">1.2M subscribers</div></div><button onclick="showToast(\\'Subscribed to '+v.channel+'!\\',\\'success\\')" class="ml-4 px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-white/90 transition">Subscribe</button></div>'
        +'<div class="bg-white/5 rounded-xl p-4 mb-8"><p class="text-sm text-slate-300">This is an amazing video about '+v.category.toLowerCase()+'. Watch the full video to learn more about cutting-edge techniques and insights from industry experts. Don\\'t forget to like and subscribe!</p></div>'
        +'<h3 class="font-bold mb-4">'+v.comments.toLocaleString()+' Comments</h3>'
        +'<div class="flex gap-3 mb-6"><div class="w-8 h-8 rounded-full bg-white/10 flex-shrink-0"></div><input type="text" placeholder="Add a comment..." class="flex-1 bg-transparent border-b border-white/10 pb-2 text-sm focus:outline-none focus:border-white/30" onfocus="showToast(\\'Comments are simulated\\',\\'info\\')"></div>'
        +'<div class="space-y-4">'
        +'<div class="flex gap-3"><div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex-shrink-0"></div><div><div class="text-xs font-semibold">Sarah K. <span class="text-slate-500 font-normal">• 2 days ago</span></div><p class="text-sm text-slate-300 mt-1">Great content as always! Learned so much from this.</p><div class="flex gap-3 mt-1 text-xs text-slate-500"><button onclick="showToast(\\'Liked\\',\\'success\\')" class="hover:text-white">👍 42</button><button onclick="showToast(\\'Reply\\',\\'info\\')" class="hover:text-white">Reply</button></div></div></div>'
        +'<div class="flex gap-3"><div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0"></div><div><div class="text-xs font-semibold">Mike R. <span class="text-slate-500 font-normal">• 5 days ago</span></div><p class="text-sm text-slate-300 mt-1">This channel never disappoints. Best on the platform!</p><div class="flex gap-3 mt-1 text-xs text-slate-500"><button onclick="showToast(\\'Liked\\',\\'success\\')" class="hover:text-white">👍 28</button><button onclick="showToast(\\'Reply\\',\\'info\\')" class="hover:text-white">Reply</button></div></div></div>'
        +'</div></div></div>';
    document.getElementById('playerModal').classList.remove('hidden');document.body.style.overflow='hidden';
    showToast('Now playing: '+v.title,'success');
}

function closeVideo(){document.getElementById('playerModal').classList.add('hidden');document.body.style.overflow=''}
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('hidden');document.getElementById('sidebar').classList.toggle('flex')}

window.addEventListener('scroll',()=>{
    document.getElementById('scrollBar').style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%';
});

document.addEventListener('keydown',e=>{if(e.key==='Escape')closeVideo()});

document.addEventListener('DOMContentLoaded',()=>{
    renderCategories();renderVideos();
    if(!localStorage.getItem('cc'))setTimeout(()=>document.getElementById('cookieBanner').style.display='block',2000);
});
<\/script>
</body>
</html>`;
}
