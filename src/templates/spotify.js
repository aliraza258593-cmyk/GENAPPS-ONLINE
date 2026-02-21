export function spotifyTemplate(title = 'WaveSound') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Music Streaming</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script>tailwind.config={theme:{extend:{fontFamily:{sans:['Inter','system-ui','sans-serif'],display:['Outfit','Inter','sans-serif']}}}}<\/script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        html{scroll-behavior:smooth}*{font-family:'Inter',sans-serif}h1,h2,h3,h4{font-family:'Outfit','Inter',sans-serif}
        @keyframes slide-in-right{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes slide-out-right{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:0}}
        @keyframes progress{from{width:100%}to{width:0}}
        @keyframes pulse-bar{0%,100%{transform:scaleY(0.4)}50%{transform:scaleY(1)}}
        .toast-enter{animation:slide-in-right .4s ease forwards}.toast-exit{animation:slide-out-right .4s ease forwards}
        .sidebar{transition:width .3s ease,transform .3s ease}
        .track-row:hover{background:rgba(255,255,255,.05)}.track-row:hover .play-idx{display:none}.track-row:hover .play-btn{display:flex}
        .eq-bar{width:3px;background:#1db954;margin:0 1px;animation:pulse-bar 0.8s ease infinite;border-radius:2px}
        input[type="range"]{-webkit-appearance:none;height:4px;background:rgba(255,255,255,.2);border-radius:4px;outline:none}
        input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;background:white;border-radius:50%;cursor:pointer}
        .scroll-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#1db954,#1ed760,#1db954);z-index:9999;transition:width .1s}
    </style>
</head>
<body class="bg-[#0a0a0f] text-white h-screen flex flex-col overflow-hidden">
    <div class="scroll-bar" id="scrollBar"></div>
    <div id="toast-container" class="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none"></div>

    <div class="flex flex-1 overflow-hidden">
        <!-- Sidebar -->
        <aside id="sidebar" class="sidebar hidden md:flex flex-col w-64 bg-black p-4 flex-shrink-0">
            <div class="text-xl font-black font-display text-green-500 mb-8 px-2">${title}</div>
            <nav class="space-y-1 mb-6">
                <button onclick="setView('home');showToast('Home','info')" class="sidebar-link flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/5 transition" data-view="home"><span>🏠</span>Home</button>
                <button onclick="setView('search');showToast('Search','info')" class="sidebar-link flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/5 transition" data-view="search"><span>🔍</span>Search</button>
                <button onclick="setView('library');showToast('Your Library','info')" class="sidebar-link flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/5 transition" data-view="library"><span>📚</span>Your Library</button>
            </nav>
            <div class="border-t border-white/5 pt-4 mb-4">
                <button onclick="openCreatePlaylist()" class="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition"><span class="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-xs">+</span>Create Playlist</button>
                <button onclick="setView('liked');showToast('Liked Songs','info')" class="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition"><span class="w-6 h-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded flex items-center justify-center text-xs">♥</span>Liked Songs</button>
            </div>
            <div class="flex-1 overflow-y-auto space-y-0.5" id="playlistList"></div>
        </aside>

        <!-- Main Content -->
        <main id="mainContent" class="flex-1 overflow-y-auto bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f] pb-28">
            <!-- Mobile Header -->
            <div class="md:hidden flex items-center justify-between p-4 sticky top-0 z-10 bg-[#1a1a2e]/90 backdrop-blur-lg">
                <div class="text-lg font-black font-display text-green-500">${title}</div>
                <div class="flex gap-2">
                    <button onclick="setView('search')" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-sm">🔍</button>
                    <button onclick="showToast('Settings','info')" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-sm">⚙️</button>
                </div>
            </div>

            <!-- Home View -->
            <div id="view-home" class="p-6">
                <h1 class="text-3xl font-black font-display mb-6">Good <span id="greeting"></span></h1>
                <div id="quickPlayGrid" class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10"></div>
                <h2 class="text-xl font-bold font-display mb-4">Made For You</h2>
                <div id="madeForYou" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10"></div>
                <h2 class="text-xl font-bold font-display mb-4">Popular Albums</h2>
                <div id="albumsGrid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10"></div>
                <h2 class="text-xl font-bold font-display mb-4">Top Tracks</h2>
                <div id="topTracksTable" class="bg-white/[0.02] rounded-xl overflow-hidden"></div>
            </div>

            <!-- Search View -->
            <div id="view-search" class="p-6 hidden">
                <h1 class="text-3xl font-black font-display mb-6">Search</h1>
                <input id="searchInput" type="text" placeholder="What do you want to listen to?" class="w-full max-w-lg bg-white/10 border border-white/10 rounded-full px-6 py-3 text-sm placeholder-slate-500 focus:outline-none focus:border-green-500 mb-8 transition" oninput="handleSearch()">
                <div id="searchResults"></div>
                <h2 class="text-xl font-bold font-display mb-4">Browse All</h2>
                <div id="genreGrid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"></div>
            </div>

            <!-- Library View -->
            <div id="view-library" class="p-6 hidden">
                <h1 class="text-3xl font-black font-display mb-6">Your Library</h1>
                <div id="libraryContent"></div>
            </div>

            <!-- Liked Songs View -->
            <div id="view-liked" class="p-6 hidden">
                <div class="flex items-end gap-6 mb-8 p-6 bg-gradient-to-b from-indigo-600/20 to-transparent rounded-2xl">
                    <div class="w-48 h-48 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-5xl shadow-2xl">♥</div>
                    <div><p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Playlist</p><h1 class="text-4xl font-black font-display mb-2">Liked Songs</h1><p class="text-sm text-slate-400"><span id="likedCount">0</span> songs</p></div>
                </div>
                <div id="likedTracksTable"></div>
            </div>
        </main>
    </div>

    <!-- Player Bar -->
    <div class="fixed bottom-0 left-0 right-0 z-40 bg-[#181818] border-t border-white/5 px-4 py-3">
        <div class="flex items-center justify-between max-w-full">
            <!-- Now Playing -->
            <div class="flex items-center gap-3 w-1/4 min-w-0">
                <div id="nowArt" class="w-14 h-14 rounded-lg bg-gradient-to-br from-green-600 to-emerald-800 flex-shrink-0 flex items-center justify-center text-lg shadow-lg">🎵</div>
                <div class="min-w-0"><div id="nowTitle" class="text-sm font-semibold truncate">Select a song</div><div id="nowArtist" class="text-xs text-slate-500 truncate">-</div></div>
                <button id="likeBtn" onclick="toggleLikeCurrent()" class="text-slate-400 hover:text-green-500 transition ml-1 flex-shrink-0">♡</button>
            </div>
            <!-- Controls -->
            <div class="flex flex-col items-center w-2/4 max-w-md">
                <div class="flex items-center gap-4 mb-1">
                    <button onclick="toggleShuffle()" id="shuffleBtn" class="text-slate-500 hover:text-white text-sm transition">🔀</button>
                    <button onclick="prevTrack()" class="text-slate-300 hover:text-white transition text-lg">⏮</button>
                    <button onclick="togglePlay()" id="playPauseBtn" class="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition text-sm font-bold">▶</button>
                    <button onclick="nextTrack()" class="text-slate-300 hover:text-white transition text-lg">⏭</button>
                    <button onclick="toggleRepeat()" id="repeatBtn" class="text-slate-500 hover:text-white text-sm transition">🔁</button>
                </div>
                <div class="flex items-center gap-2 w-full">
                    <span id="currentTime" class="text-[10px] text-slate-500 w-8 text-right">0:00</span>
                    <input type="range" id="progressBar" min="0" max="100" value="0" oninput="seekTo(this.value)" class="flex-1">
                    <span id="totalTime" class="text-[10px] text-slate-500 w-8">0:00</span>
                </div>
            </div>
            <!-- Volume -->
            <div class="hidden md:flex items-center gap-2 w-1/4 justify-end">
                <button onclick="showToast('Queue feature coming soon','info')" class="text-slate-500 hover:text-white text-sm transition">📋</button>
                <button onclick="toggleMute()" id="volIcon" class="text-slate-500 hover:text-white text-sm transition">🔊</button>
                <input type="range" id="volumeBar" min="0" max="100" value="70" oninput="setVolume(this.value)" class="w-24">
            </div>
        </div>
    </div>

    <!-- Create Playlist Modal -->
    <div id="createPlaylistModal" class="fixed inset-0 z-[80] hidden">
        <div onclick="closeCreatePlaylist()" class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-[#1e1e2e] rounded-2xl p-6" style="animation:slide-in-right .3s ease">
            <h3 class="text-lg font-bold font-display mb-4">Create Playlist</h3>
            <form onsubmit="createPlaylist(event)">
                <input type="text" id="playlistNameInput" placeholder="Playlist name" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:border-green-500 transition" minlength="2">
                <textarea id="playlistDescInput" placeholder="Add a description (optional)" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm mb-4 h-20 resize-none focus:outline-none focus:border-green-500 transition"></textarea>
                <div class="flex gap-2"><button type="button" onclick="closeCreatePlaylist()" class="flex-1 py-3 bg-white/5 rounded-xl font-semibold text-sm hover:bg-white/10 transition">Cancel</button><button type="submit" id="createPlBtn" class="flex-1 py-3 bg-green-600 rounded-xl font-bold text-sm hover:bg-green-500 transition">Create</button></div>
            </form>
        </div>
    </div>

    <!-- Cookie Banner -->
    <div id="cookieBanner" class="fixed bottom-20 left-0 right-0 z-30 p-4 bg-[#1e1e2e]/90 backdrop-blur-xl border-t border-white/5" style="display:none">
        <div class="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <p class="text-xs text-slate-400">We use cookies to personalize your experience and improve ${title}.</p>
            <div class="flex gap-2">
                <button onclick="document.getElementById('cookieBanner').style.display='none';localStorage.setItem('cookieConsent','true');showToast('Preferences saved','success')" class="px-4 py-1.5 bg-green-600 rounded-full text-xs font-bold hover:bg-green-500 transition">Accept</button>
                <button onclick="document.getElementById('cookieBanner').style.display='none';localStorage.setItem('cookieConsent','declined')" class="px-4 py-1.5 bg-white/5 rounded-full text-xs text-slate-400 hover:bg-white/10 transition">Decline</button>
            </div>
        </div>
    </div>

<script>
const DB = {
    tracks: [
        {id:1,title:'Midnight Drive',artist:'Luna Fox',album:'Neon Horizons',duration:'3:42',gradient:'from-violet-600 to-indigo-800'},
        {id:2,title:'Electric Pulse',artist:'The Voltage',album:'Current State',duration:'4:15',gradient:'from-cyan-600 to-blue-800'},
        {id:3,title:'Golden Hour',artist:'Solaris',album:'Daybreak',duration:'3:28',gradient:'from-amber-600 to-orange-800'},
        {id:4,title:'Velvet Sky',artist:'Aurora Keys',album:'Ethereal',duration:'5:01',gradient:'from-pink-600 to-rose-800'},
        {id:5,title:'Run Away',artist:'Echo Chamber',album:'Distance',duration:'3:55',gradient:'from-emerald-600 to-teal-800'},
        {id:6,title:'Fading Stars',artist:'Nebula',album:'Cosmic Dust',duration:'4:33',gradient:'from-purple-600 to-violet-800'},
        {id:7,title:'City Lights',artist:'Metro Sound',album:'Urban Tales',duration:'3:18',gradient:'from-red-600 to-pink-800'},
        {id:8,title:'Ocean Waves',artist:'Drift',album:'Tidal',duration:'6:12',gradient:'from-sky-600 to-blue-800'},
        {id:9,title:'Wildfire',artist:'Blaze',album:'Ignite',duration:'3:47',gradient:'from-orange-600 to-red-800'},
        {id:10,title:'Crystal Rain',artist:'Prism',album:'Refraction',duration:'4:22',gradient:'from-teal-600 to-emerald-800'}
    ],
    playlists: [
        {id:1,name:'Daily Mix 1',desc:'Luna Fox, Solaris, Drift and more',gradient:'from-indigo-600 to-purple-700',type:'mix'},
        {id:2,name:'Chill Vibes',desc:'Sit back and relax',gradient:'from-green-600 to-teal-700',type:'mood'},
        {id:3,name:'Energy Boost',desc:'Power up your day',gradient:'from-orange-600 to-red-700',type:'mood'},
        {id:4,name:'Focus Flow',desc:'Enhance your concentration',gradient:'from-blue-600 to-indigo-700',type:'mood'},
        {id:5,name:'Late Night',desc:'Midnight listening sessions',gradient:'from-slate-600 to-zinc-800',type:'mood'}
    ],
    albums: [
        {id:1,name:'Neon Horizons',artist:'Luna Fox',gradient:'from-violet-600 to-indigo-800'},
        {id:2,name:'Current State',artist:'The Voltage',gradient:'from-cyan-600 to-blue-800'},
        {id:3,name:'Daybreak',artist:'Solaris',gradient:'from-amber-600 to-orange-800'},
        {id:4,name:'Ethereal',artist:'Aurora Keys',gradient:'from-pink-600 to-rose-800'},
        {id:5,name:'Cosmic Dust',artist:'Nebula',gradient:'from-purple-600 to-violet-800'}
    ],
    genres: [
        {name:'Pop',gradient:'from-pink-600 to-purple-700'},{name:'Hip Hop',gradient:'from-orange-700 to-red-800'},
        {name:'Rock',gradient:'from-red-600 to-rose-800'},{name:'Electronic',gradient:'from-cyan-600 to-blue-700'},
        {name:'R&B',gradient:'from-teal-600 to-emerald-700'},{name:'Jazz',gradient:'from-amber-600 to-yellow-700'},
        {name:'Classical',gradient:'from-slate-600 to-zinc-700'},{name:'Indie',gradient:'from-green-600 to-lime-700'}
    ]
};

const STATE = {
    currentTrack: null, isPlaying: false, progress: 0, volume: 70,
    liked: JSON.parse(localStorage.getItem('likedSongs')||'[]'),
    userPlaylists: JSON.parse(localStorage.getItem('userPlaylists')||'[]'),
    shuffle: false, repeat: false, muted: false, currentView: 'home'
};

function showToast(msg,type='success'){
    const c=document.getElementById('toast-container');
    const cols={success:'border-green-500 bg-green-500/10',error:'border-red-500 bg-red-500/10',info:'border-blue-500 bg-blue-500/10'};
    const t=document.createElement('div');
    t.className='toast-enter pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-xl '+(cols[type]||cols.info);
    t.innerHTML='<span class="text-sm font-medium">'+msg+'</span><div class="absolute bottom-0 left-0 h-0.5 bg-white/20 rounded" style="animation:progress 3s linear forwards;width:100%"></div>';
    c.appendChild(t);
    setTimeout(()=>{t.classList.remove('toast-enter');t.classList.add('toast-exit');setTimeout(()=>t.remove(),400)},3000);
}

function setView(view){
    STATE.currentView=view;
    ['home','search','library','liked'].forEach(v=>{
        const el=document.getElementById('view-'+v);
        if(el)el.classList.toggle('hidden',v!==view);
    });
    document.querySelectorAll('.sidebar-link').forEach(l=>l.classList.toggle('bg-white/10',l.dataset.view===view));
    if(view==='liked')renderLiked();
    if(view==='library')renderLibrary();
}

function renderHome(){
    const hour=new Date().getHours();
    document.getElementById('greeting').textContent=hour<12?'Morning':hour<18?'Afternoon':'Evening';

    document.getElementById('quickPlayGrid').innerHTML=DB.playlists.slice(0,6).map(p=>
        '<button onclick="playPlaylist('+p.id+');showToast(\\'Playing: '+p.name+'\\',\\'success\\')" class="flex items-center gap-3 bg-white/[0.06] hover:bg-white/[0.1] rounded-lg overflow-hidden transition group">'
        +'<div class="w-12 h-12 bg-gradient-to-br '+p.gradient+' flex items-center justify-center text-lg flex-shrink-0">♫</div>'
        +'<span class="text-sm font-bold truncate pr-3">'+p.name+'</span></button>'
    ).join('');

    document.getElementById('madeForYou').innerHTML=DB.playlists.map(p=>
        '<div class="bg-white/[0.03] rounded-xl p-4 hover:bg-white/[0.06] transition cursor-pointer group" onclick="playPlaylist('+p.id+');showToast(\\'Playing: '+p.name+'\\',\\'success\\')">'
        +'<div class="aspect-square rounded-lg bg-gradient-to-br '+p.gradient+' mb-3 flex items-center justify-center text-3xl shadow-xl group-hover:shadow-lg transition relative"><div class="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl">▶</div></div>'
        +'<div class="text-sm font-bold truncate">'+p.name+'</div><div class="text-xs text-slate-500 truncate">'+p.desc+'</div></div>'
    ).join('');

    document.getElementById('albumsGrid').innerHTML=DB.albums.map(a=>
        '<div class="bg-white/[0.03] rounded-xl p-4 hover:bg-white/[0.06] transition cursor-pointer group" onclick="showToast(\\'Playing album: '+a.name+'\\',\\'success\\')">'
        +'<div class="aspect-square rounded-lg bg-gradient-to-br '+a.gradient+' mb-3 shadow-xl relative"><div class="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl">▶</div></div>'
        +'<div class="text-sm font-bold truncate">'+a.name+'</div><div class="text-xs text-slate-500 truncate">'+a.artist+'</div></div>'
    ).join('');

    renderTrackTable('topTracksTable', DB.tracks);
}

function renderTrackTable(containerId, tracks){
    const c=document.getElementById(containerId);
    c.innerHTML='<table class="w-full text-sm"><tbody>'+tracks.map((t,i)=>{
        const liked=STATE.liked.includes(t.id);
        const playing=STATE.currentTrack&&STATE.currentTrack.id===t.id;
        return '<tr class="track-row cursor-pointer border-b border-white/[0.03] '+(playing?'bg-white/[0.05]':'')+'" onclick="playSong('+t.id+')">'
            +'<td class="py-3 px-4 w-10"><span class="play-idx text-slate-500 text-xs">'+(playing?'<span class="flex gap-0.5 items-end h-3"><span class="eq-bar h-2" style="animation-delay:0s"></span><span class="eq-bar h-3" style="animation-delay:0.2s"></span><span class="eq-bar h-1.5" style="animation-delay:0.4s"></span></span>':(i+1))+'</span><span class="play-btn hidden items-center justify-center text-white text-xs">▶</span></td>'
            +'<td class="py-3"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded bg-gradient-to-br '+t.gradient+' flex-shrink-0 flex items-center justify-center text-xs">♫</div><div><div class="font-semibold '+(playing?'text-green-500':'')+'">'+t.title+'</div><div class="text-xs text-slate-500">'+t.artist+'</div></div></div></td>'
            +'<td class="py-3 text-slate-500 hidden md:table-cell">'+t.album+'</td>'
            +'<td class="py-3 w-20 text-right"><button onclick="event.stopPropagation();toggleLike('+t.id+')" class="mr-3 '+(liked?'text-green-500':'text-slate-600 hover:text-white')+' transition">'+(liked?'♥':'♡')+'</button><span class="text-slate-500 text-xs">'+t.duration+'</span></td>'
            +'</tr>';
    }).join('')+'</tbody></table>';
}

function playSong(id){
    const track=DB.tracks.find(t=>t.id===id);if(!track)return;
    STATE.currentTrack=track;STATE.isPlaying=true;STATE.progress=0;
    document.getElementById('nowTitle').textContent=track.title;
    document.getElementById('nowArtist').textContent=track.artist;
    document.getElementById('nowArt').className='w-14 h-14 rounded-lg bg-gradient-to-br '+track.gradient+' flex-shrink-0 flex items-center justify-center text-lg shadow-lg';
    document.getElementById('playPauseBtn').textContent='⏸';
    document.getElementById('totalTime').textContent=track.duration;
    document.getElementById('likeBtn').textContent=STATE.liked.includes(id)?'♥':'♡';
    document.getElementById('likeBtn').className=STATE.liked.includes(id)?'text-green-500 ml-1 flex-shrink-0':'text-slate-400 hover:text-green-500 transition ml-1 flex-shrink-0';
    renderTrackTable('topTracksTable',DB.tracks);
    showToast('Playing: '+track.title+' — '+track.artist,'success');
}

function playPlaylist(id){const t=DB.tracks[Math.floor(Math.random()*DB.tracks.length)];playSong(t.id)}
function togglePlay(){STATE.isPlaying=!STATE.isPlaying;document.getElementById('playPauseBtn').textContent=STATE.isPlaying?'⏸':'▶'}
function nextTrack(){const tracks=DB.tracks;const idx=STATE.currentTrack?tracks.findIndex(t=>t.id===STATE.currentTrack.id):-1;playSong(tracks[(idx+1)%tracks.length].id)}
function prevTrack(){const tracks=DB.tracks;const idx=STATE.currentTrack?tracks.findIndex(t=>t.id===STATE.currentTrack.id):1;playSong(tracks[(idx-1+tracks.length)%tracks.length].id)}
function toggleShuffle(){STATE.shuffle=!STATE.shuffle;document.getElementById('shuffleBtn').classList.toggle('text-green-500');showToast(STATE.shuffle?'Shuffle on':'Shuffle off','info')}
function toggleRepeat(){STATE.repeat=!STATE.repeat;document.getElementById('repeatBtn').classList.toggle('text-green-500');showToast(STATE.repeat?'Repeat on':'Repeat off','info')}
function seekTo(v){STATE.progress=v;document.getElementById('progressBar').value=v}
function setVolume(v){STATE.volume=v;STATE.muted=false;document.getElementById('volIcon').textContent=v>50?'🔊':v>0?'🔉':'🔇'}
function toggleMute(){STATE.muted=!STATE.muted;document.getElementById('volumeBar').value=STATE.muted?0:STATE.volume;document.getElementById('volIcon').textContent=STATE.muted?'🔇':'🔊'}

function toggleLike(id){
    const idx=STATE.liked.indexOf(id);
    if(idx>-1){STATE.liked.splice(idx,1);showToast('Removed from Liked Songs','info')}
    else{STATE.liked.push(id);showToast('Added to Liked Songs','success')}
    localStorage.setItem('likedSongs',JSON.stringify(STATE.liked));
    renderTrackTable('topTracksTable',DB.tracks);
    if(STATE.currentView==='liked')renderLiked();
}

function toggleLikeCurrent(){if(STATE.currentTrack)toggleLike(STATE.currentTrack.id)}

function renderLiked(){
    const liked=DB.tracks.filter(t=>STATE.liked.includes(t.id));
    document.getElementById('likedCount').textContent=liked.length;
    const c=document.getElementById('likedTracksTable');
    if(!liked.length){c.innerHTML='<div class="text-center py-12 text-slate-600"><p>No liked songs yet</p><p class="text-sm">Tap the heart icon on any song</p></div>';return}
    renderTrackTable('likedTracksTable',liked);
}

function renderLibrary(){
    const c=document.getElementById('libraryContent');
    const allPl=[...DB.playlists,...STATE.userPlaylists];
    c.innerHTML='<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">'+allPl.map(p=>
        '<div class="bg-white/[0.03] rounded-xl p-4 hover:bg-white/[0.06] transition cursor-pointer" onclick="showToast(\\'Opening: '+p.name+'\\',\\'info\\')">'
        +'<div class="aspect-square rounded-lg bg-gradient-to-br '+(p.gradient||'from-green-600 to-emerald-800')+' mb-3 flex items-center justify-center text-3xl">♫</div>'
        +'<div class="text-sm font-bold truncate">'+p.name+'</div><div class="text-xs text-slate-500">'+(p.desc||'Playlist')+'</div></div>'
    ).join('')+'</div>';
}

function renderPlaylists(){
    const all=[...DB.playlists,...STATE.userPlaylists];
    document.getElementById('playlistList').innerHTML=all.map(p=>
        '<button onclick="showToast(\\'Opening: '+p.name+'\\',\\'info\\')" class="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5 transition truncate">'+p.name+'</button>'
    ).join('');
}

function handleSearch(){
    const q=document.getElementById('searchInput').value.toLowerCase().trim();
    const r=document.getElementById('searchResults');
    if(!q){r.innerHTML='';return}
    const results=DB.tracks.filter(t=>t.title.toLowerCase().includes(q)||t.artist.toLowerCase().includes(q));
    if(!results.length){r.innerHTML='<p class="text-slate-500 mb-6">No results for "'+q+'"</p>';return}
    r.innerHTML='<h3 class="text-lg font-bold mb-3">Songs</h3>';
    renderTrackTable('searchResults',results);
}

function renderGenres(){
    document.getElementById('genreGrid').innerHTML=DB.genres.map(g=>
        '<div class="aspect-[3/2] rounded-xl bg-gradient-to-br '+g.gradient+' p-4 cursor-pointer hover:scale-105 transition relative overflow-hidden" onclick="showToast(\\'Browsing '+g.name+'\\',\\'info\\')">'
        +'<span class="text-lg font-bold font-display relative z-10">'+g.name+'</span></div>'
    ).join('');
}

function openCreatePlaylist(){document.getElementById('createPlaylistModal').classList.remove('hidden')}
function closeCreatePlaylist(){document.getElementById('createPlaylistModal').classList.add('hidden')}

function createPlaylist(e){
    e.preventDefault();
    const name=document.getElementById('playlistNameInput').value.trim();
    if(!name||name.length<2){showToast('Name must be at least 2 characters','error');return}
    const btn=document.getElementById('createPlBtn');btn.textContent='Creating...';btn.disabled=true;
    setTimeout(()=>{
        STATE.userPlaylists.push({id:Date.now(),name:name,desc:document.getElementById('playlistDescInput').value||'Custom playlist',gradient:'from-green-600 to-emerald-800'});
        localStorage.setItem('userPlaylists',JSON.stringify(STATE.userPlaylists));
        renderPlaylists();closeCreatePlaylist();
        document.getElementById('playlistNameInput').value='';document.getElementById('playlistDescInput').value='';
        btn.textContent='Create';btn.disabled=false;
        showToast('Playlist "'+name+'" created!','success');
    },800);
}

// Simulate playback progress
setInterval(()=>{
    if(STATE.isPlaying&&STATE.currentTrack){
        STATE.progress=Math.min(100,STATE.progress+0.5);
        document.getElementById('progressBar').value=STATE.progress;
        const totalSecs=STATE.currentTrack.duration.split(':').reduce((a,b)=>a*60+parseInt(b),0);
        const cur=Math.floor(totalSecs*STATE.progress/100);
        document.getElementById('currentTime').textContent=Math.floor(cur/60)+':'+String(cur%60).padStart(2,'0');
        if(STATE.progress>=100){nextTrack()}
    }
},200);

// Scroll handler for main content
document.getElementById('mainContent').addEventListener('scroll',function(){
    document.getElementById('scrollBar').style.width=(this.scrollTop/(this.scrollHeight-this.clientHeight)*100)+'%';
});

// Keyboard shortcuts
document.addEventListener('keydown',e=>{
    if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
    if(e.key===' '){e.preventDefault();togglePlay()}
    if(e.key==='Escape')closeCreatePlaylist();
});

// Init
document.addEventListener('DOMContentLoaded',()=>{
    renderHome();renderPlaylists();renderGenres();
    if(!localStorage.getItem('cookieConsent'))setTimeout(()=>document.getElementById('cookieBanner').style.display='block',2000);
});
<\/script>
</body>
</html>`;
}
