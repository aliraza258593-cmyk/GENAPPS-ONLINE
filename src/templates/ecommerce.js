export function ecommerceTemplate(title = 'TechVault') {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Premium Electronics Store</title>
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
        @keyframes countdown{from{opacity:1}to{opacity:.6}}
        .reveal{opacity:0;transform:translateY(30px);transition:all 0.8s cubic-bezier(.16,1,.3,1)}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .toast-enter{animation:slide-in-right .4s ease forwards}
        .toast-exit{animation:slide-out-right .4s ease forwards}
        .skeleton{background:linear-gradient(90deg,rgba(255,255,255,.04) 25%,rgba(255,255,255,.08) 50%,rgba(255,255,255,.04) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite}
        .nav-scrolled{background:rgba(10,10,15,0.9)!important;backdrop-filter:blur(24px);box-shadow:0 4px 30px rgba(0,0,0,0.3)}
        .mobile-menu{transform:translateX(100%);transition:transform .35s cubic-bezier(.16,1,.3,1)}
        .mobile-menu.open{transform:translateX(0)}
        .cart-drawer{transform:translateX(100%);transition:transform .35s cubic-bezier(.16,1,.3,1)}
        .cart-drawer.open{transform:translateX(0)}
        .scroll-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#8b5cf6,#ec4899,#f59e0b);z-index:9999;transition:width .1s}
        .product-card{transition:all .3s ease}
        .product-card:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(0,0,0,0.15)}
    </style>
</head>
<body class="bg-[#0a0a0f] text-white overflow-x-hidden">
    <div class="scroll-bar" id="scrollBar"></div>
    <div id="toast-container" class="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none"></div>
    <button id="backToTop" onclick="window.scrollTo({top:0})" class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-xl hover:-translate-y-1 transition-all opacity-0 pointer-events-none"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M5 15l7-7 7 7"/></svg></button>

    <!-- Announcement Bar -->
    <div id="announcementBar" class="bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 py-2 text-center text-xs font-medium overflow-hidden">
        <div class="flex whitespace-nowrap" style="animation:marquee 25s linear infinite"><span class="mx-8">🔥 Summer Sale — Up to 50% Off Selected Items</span><span class="mx-8">🚚 Free Shipping on Orders Over $50</span><span class="mx-8">💳 Use Code: TECH50 for Extra 10% Off</span><span class="mx-8">🔥 Summer Sale — Up to 50% Off Selected Items</span><span class="mx-8">🚚 Free Shipping on Orders Over $50</span><span class="mx-8">💳 Use Code: TECH50 for Extra 10% Off</span></div>
        <button onclick="document.getElementById('announcementBar').style.display='none';showToast('Banner dismissed','info')" class="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white">✕</button>
    </div>

    <!-- Navigation -->
    <nav id="navbar" class="sticky top-0 w-full z-50 transition-all duration-500" style="background:rgba(10,10,15,0.6);backdrop-filter:blur(12px)">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div class="text-xl font-bold font-display bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">${title}</div>
            <div class="hidden md:flex items-center gap-6">
                <div class="relative"><input id="searchInput" type="text" placeholder="Search products..." class="w-56 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:w-72 transition-all" oninput="filterProducts()"><svg class="absolute right-3 top-2.5 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg></div>
                <a href="#products" class="nav-link text-sm text-slate-400 hover:text-white transition">Products</a>
                <a href="#deals" class="nav-link text-sm text-slate-400 hover:text-white transition">Deals</a>
                <a href="#reviews" class="nav-link text-sm text-slate-400 hover:text-white transition">Reviews</a>
                <button onclick="toggleWishlistView()" class="relative text-slate-400 hover:text-pink-400 transition">♥ <span id="wishlistCount" class="absolute -top-2 -right-3 bg-pink-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span></button>
                <button onclick="toggleCart()" class="relative text-slate-400 hover:text-violet-400 transition">🛒 <span id="cartCount" class="absolute -top-2 -right-3 bg-violet-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span></button>
            </div>
            <button id="menuBtn" onclick="toggleMobile()" class="md:hidden p-2 text-white"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg></button>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobileMenu" class="mobile-menu fixed inset-0 z-[60] bg-[#0a0a0f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
        <button onclick="toggleMobile()" class="absolute top-6 right-6 p-2 text-white"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
        <a href="#products" onclick="toggleMobile()" class="text-2xl font-display font-bold hover:text-violet-400 transition">Products</a>
        <a href="#deals" onclick="toggleMobile()" class="text-2xl font-display font-bold hover:text-violet-400 transition">Deals</a>
        <a href="#reviews" onclick="toggleMobile()" class="text-2xl font-display font-bold hover:text-violet-400 transition">Reviews</a>
        <button onclick="toggleMobile();toggleCart()" class="mt-4 px-8 py-3 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl text-base font-bold">View Cart</button>
    </div>

    <!-- Cart Drawer -->
    <div id="cartOverlay" onclick="toggleCart()" class="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm hidden"></div>
    <div id="cartDrawer" class="cart-drawer fixed top-0 right-0 w-full max-w-md h-full z-[80] bg-[#12121a] border-l border-white/5 flex flex-col">
        <div class="p-6 border-b border-white/5 flex justify-between items-center"><h3 class="text-lg font-bold font-display">Shopping Cart</h3><button onclick="toggleCart()" class="text-slate-400 hover:text-white text-xl">✕</button></div>
        <div id="cartItems" class="flex-1 overflow-y-auto p-6 space-y-4"></div>
        <div class="p-6 border-t border-white/5">
            <div class="flex justify-between mb-4"><span class="text-slate-400">Subtotal</span><span id="cartTotal" class="text-xl font-bold">$0.00</span></div>
            <button onclick="checkout()" class="w-full py-3 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-violet-500/25">Checkout</button>
            <button onclick="toggleCart()" class="w-full py-3 mt-2 bg-white/5 rounded-xl text-sm text-slate-400 hover:bg-white/10 transition">Continue Shopping</button>
        </div>
    </div>

    <!-- Hero -->
    <section class="pt-16 pb-24 px-6 relative overflow-hidden">
        <div class="absolute top-10 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px]" style="animation:float 20s ease infinite"></div>
        <div class="absolute top-40 right-1/4 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[140px]" style="animation:float 25s ease infinite 5s"></div>
        <div class="max-w-4xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-8 reveal">🔥 Summer Collection is Here — Up to 50% Off</div>
            <h1 class="text-5xl md:text-7xl font-black tracking-tight mb-6 font-display reveal">Discover Your <br><span class="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400 bg-clip-text text-transparent" style="background-size:200%;animation:gradient-shift 4s ease infinite">Perfect Tech</span></h1>
            <p class="text-lg text-slate-400 max-w-2xl mx-auto mb-10 reveal">Premium electronics, accessories, and lifestyle products. Curated for those who demand the best.</p>
            <div class="flex flex-col sm:flex-row justify-center gap-4 reveal">
                <a href="#products" class="px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl font-bold shadow-xl shadow-violet-500/25 hover:-translate-y-0.5 transition-all">Shop Now →</a>
                <a href="#deals" class="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-medium transition-all hover:-translate-y-0.5 backdrop-blur">Today's Deals</a>
            </div>
        </div>
    </section>

    <!-- Trust Bar -->
    <section class="py-8 border-y border-white/5 reveal">
        <div class="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div class="flex flex-col items-center"><span class="text-2xl mb-1">🚚</span><span class="text-xs text-slate-400 font-medium">Free Shipping $50+</span></div>
            <div class="flex flex-col items-center"><span class="text-2xl mb-1">🔄</span><span class="text-xs text-slate-400 font-medium">30-Day Returns</span></div>
            <div class="flex flex-col items-center"><span class="text-2xl mb-1">🔒</span><span class="text-xs text-slate-400 font-medium">Secure Payment</span></div>
            <div class="flex flex-col items-center"><span class="text-2xl mb-1">💬</span><span class="text-xs text-slate-400 font-medium">24/7 Support</span></div>
        </div>
    </section>

    <!-- Categories -->
    <section class="py-20 px-6 reveal">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold font-display text-center mb-10">Shop by Category</h2>
            <div id="categories-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"></div>
        </div>
    </section>

    <!-- Products -->
    <section id="products" class="py-20 px-6">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-10 reveal"><span class="text-violet-400 text-sm font-semibold uppercase tracking-wider">Our Store</span><h2 class="text-4xl font-black mt-2 font-display">Featured Products</h2></div>
            <div class="flex flex-wrap justify-between items-center gap-4 mb-8 reveal">
                <div id="filterBtns" class="flex flex-wrap gap-2"></div>
                <select id="sortSelect" onchange="filterProducts()" class="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-violet-500"><option value="featured">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="rating">Top Rated</option></select>
            </div>
            <div id="products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"></div>
            <div id="noResults" class="hidden text-center py-12 text-slate-500">No products found matching your search.</div>
        </div>
    </section>

    <!-- Deal of the Day -->
    <section id="deals" class="py-20 px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-pink-600/5"></div>
        <div class="max-w-5xl mx-auto relative z-10 reveal">
            <div class="text-center mb-10"><span class="text-amber-400 text-sm font-semibold uppercase tracking-wider">⚡ Limited Time</span><h2 class="text-4xl font-black mt-2 font-display">Deal of the Day</h2></div>
            <div class="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                <div class="w-full md:w-1/2 aspect-square rounded-2xl bg-gradient-to-br from-violet-600 via-purple-700 to-pink-600 flex items-center justify-center text-6xl">🎧</div>
                <div class="w-full md:w-1/2">
                    <span class="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-full mb-3">-40% OFF</span>
                    <h3 class="text-2xl font-bold font-display mb-2">Wireless Noise-Cancelling Headphones Pro</h3>
                    <p class="text-slate-400 text-sm mb-4">Premium over-ear headphones with adaptive noise cancellation, 40-hour battery, and studio-quality audio.</p>
                    <div class="flex items-center gap-3 mb-4"><span class="text-3xl font-black text-violet-400">$179.99</span><span class="text-lg text-slate-600 line-through">$299.99</span></div>
                    <div class="flex gap-4 mb-6" id="countdown"><div class="text-center"><div class="text-2xl font-bold font-display bg-white/5 rounded-xl px-4 py-2" id="cdHours">12</div><div class="text-[10px] text-slate-500 mt-1">HOURS</div></div><div class="text-center"><div class="text-2xl font-bold font-display bg-white/5 rounded-xl px-4 py-2" id="cdMins">34</div><div class="text-[10px] text-slate-500 mt-1">MINS</div></div><div class="text-center"><div class="text-2xl font-bold font-display bg-white/5 rounded-xl px-4 py-2" id="cdSecs">56</div><div class="text-[10px] text-slate-500 mt-1">SECS</div></div></div>
                    <button onclick="addToCart({id:99,name:'NC Headphones Pro',price:179.99,gradient:'from-violet-600 to-pink-600'});showToast('Deal added to cart!','success')" class="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-amber-500/25">Grab This Deal</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats -->
    <section class="py-16 px-6 border-y border-white/5 reveal">
        <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div class="text-4xl font-black font-display counter" data-target="50000">0</div><div class="text-sm text-slate-500 mt-1">Happy Customers</div></div>
            <div><div class="text-4xl font-black font-display counter" data-target="500">0</div><div class="text-sm text-slate-500 mt-1">Products</div></div>
            <div><div class="text-4xl font-black font-display counter" data-target="4.8">0</div><div class="text-sm text-slate-500 mt-1">Avg Rating</div></div>
            <div><div class="text-4xl font-black font-display counter" data-target="30">0</div><div class="text-sm text-slate-500 mt-1">Day Returns</div></div>
        </div>
    </section>

    <!-- Reviews -->
    <section id="reviews" class="py-20 px-6">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-12 reveal"><span class="text-violet-400 text-sm font-semibold uppercase tracking-wider">Testimonials</span><h2 class="text-4xl font-black mt-2 font-display">What Customers Say</h2></div>
            <div id="reviews-grid" class="grid md:grid-cols-3 gap-6"></div>
        </div>
    </section>

    <!-- Newsletter -->
    <section class="py-20 px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-violet-600/5 to-pink-600/5"></div>
        <div class="max-w-xl mx-auto relative z-10 text-center reveal">
            <h2 class="text-3xl font-black font-display mb-3">Get 10% Off Your First Order</h2>
            <p class="text-slate-400 mb-8">Subscribe to our newsletter for exclusive deals and new arrivals.</p>
            <form id="nlForm" onsubmit="handleNewsletterSubmit(event)" class="flex gap-2">
                <input type="email" id="nlEmail" required placeholder="your@email.com" class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition">
                <button type="submit" id="nlBtn" class="px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl font-bold hover:-translate-y-0.5 transition-all">Subscribe</button>
            </form>
            <div id="nlSuccess" class="hidden py-6 text-center"><div class="text-4xl mb-3">🎉</div><p class="text-lg font-bold font-display">Welcome!</p><p class="text-slate-400 text-sm">Check your email for your 10% discount code.</p></div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-16 px-6">
        <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
                <div><h4 class="font-bold mb-4 font-display">Shop</h4><div class="space-y-2 text-sm text-slate-500"><a href="#products" class="block hover:text-white transition">All Products</a><a href="#deals" class="block hover:text-white transition">Deals</a><a href="#" onclick="showToast('Coming soon!','info');return false" class="block hover:text-white transition">Gift Cards</a><a href="#" onclick="showToast('Coming soon!','info');return false" class="block hover:text-white transition">New Arrivals</a></div></div>
                <div><h4 class="font-bold mb-4 font-display">Support</h4><div class="space-y-2 text-sm text-slate-500"><a href="#" onclick="showToast('Contact us at support@${title.toLowerCase().replace(/\\s+/g, '')}.com','info');return false" class="block hover:text-white transition">Contact Us</a><a href="#" onclick="showToast('Track orders in your account','info');return false" class="block hover:text-white transition">Order Tracking</a><a href="#" onclick="showToast('Free returns within 30 days','info');return false" class="block hover:text-white transition">Returns</a><a href="#" onclick="showToast('Check our FAQ section','info');return false" class="block hover:text-white transition">FAQ</a></div></div>
                <div><h4 class="font-bold mb-4 font-display">Company</h4><div class="space-y-2 text-sm text-slate-500"><a href="#" onclick="showToast('About ${title}','info');return false" class="block hover:text-white transition">About Us</a><a href="#" onclick="showToast('We are hiring!','info');return false" class="block hover:text-white transition">Careers</a><a href="#" onclick="showToast('Read our blog','info');return false" class="block hover:text-white transition">Blog</a><a href="#" onclick="showToast('Press kit available','info');return false" class="block hover:text-white transition">Press</a></div></div>
                <div><h4 class="font-bold mb-4 font-display">Legal</h4><div class="space-y-2 text-sm text-slate-500"><a href="#" onclick="showToast('Privacy policy','info');return false" class="block hover:text-white transition">Privacy</a><a href="#" onclick="showToast('Terms of service','info');return false" class="block hover:text-white transition">Terms</a><a href="#" onclick="showToast('Cookie policy','info');return false" class="block hover:text-white transition">Cookies</a></div></div>
            </div>
            <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="text-sm text-slate-600">© 2025 ${title}. All rights reserved.</div>
                <div class="flex gap-3 text-xs text-slate-500"><span class="px-2 py-1 bg-white/5 rounded">Visa</span><span class="px-2 py-1 bg-white/5 rounded">Mastercard</span><span class="px-2 py-1 bg-white/5 rounded">PayPal</span><span class="px-2 py-1 bg-white/5 rounded">Apple Pay</span></div>
            </div>
            <div class="text-center mt-6"><span class="text-xs text-slate-700">⚡ Built with Genapps AI</span></div>
        </div>
    </footer>

    <!-- Quick View Modal -->
    <div id="quickViewModal" class="fixed inset-0 z-[90] hidden">
        <div onclick="closeQuickView()" class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#12121a] border border-white/10 rounded-3xl p-8 max-h-[90vh] overflow-y-auto" style="animation:fade-up .3s ease">
            <button onclick="closeQuickView()" class="absolute top-4 right-4 text-slate-400 hover:text-white text-xl">✕</button>
            <div id="quickViewContent"></div>
        </div>
    </div>

    <!-- Cookie Banner -->
    <div id="cookieBanner" class="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#12121a]/90 backdrop-blur-xl border-t border-white/5" style="display:none">
        <div class="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-sm text-slate-400">We use cookies to enhance your shopping experience. By continuing, you agree to our cookie policy.</p>
            <div class="flex gap-2"><button onclick="acceptCookies()" class="px-5 py-2 bg-violet-600 rounded-lg text-sm font-semibold hover:bg-violet-500 transition">Accept All</button><button onclick="declineCookies()" class="px-5 py-2 bg-white/5 rounded-lg text-sm text-slate-400 hover:bg-white/10 transition">Decline</button></div>
        </div>
    </div>

<script>
// ─── DATA STORE ───
const DB = {
    categories: [
        {name:'Electronics',emoji:'💻',count:45},{name:'Audio',emoji:'🎧',count:32},{name:'Wearables',emoji:'⌚',count:18},
        {name:'Accessories',emoji:'🔌',count:56},{name:'Gaming',emoji:'🎮',count:24},{name:'Smart Home',emoji:'🏠',count:15}
    ],
    products: [
        {id:1,name:'Wireless Earbuds Pro X1',price:129.99,oldPrice:179.99,rating:4.8,reviews:342,category:'Audio',desc:'Premium TWS earbuds with ANC, 36-hour battery, and LDAC codec support. Crystal clear calls with 6-mic array.',gradient:'from-violet-600 to-indigo-800',badge:'Best Seller'},
        {id:2,name:'Smart Watch Ultra S7',price:349.99,oldPrice:449.99,rating:4.6,reviews:218,category:'Wearables',desc:'Advanced health monitoring with ECG, SpO2, GPS. Titanium case with sapphire crystal display.',gradient:'from-pink-600 to-rose-800',badge:'New'},
        {id:3,name:'Mechanical Keyboard K90',price:89.99,oldPrice:null,rating:4.9,reviews:567,category:'Accessories',desc:'Hot-swappable switches, PBT keycaps, wireless tri-mode connectivity. RGB with per-key customization.',gradient:'from-cyan-600 to-blue-800',badge:'Top Rated'},
        {id:4,name:'USB-C Hub Pro 8-in-1',price:59.99,oldPrice:79.99,rating:4.5,reviews:189,category:'Accessories',desc:'8K HDMI, 100W PD pass-through, Gigabit Ethernet, SD card reader. Aluminum alloy body.',gradient:'from-emerald-600 to-teal-800',badge:null},
        {id:5,name:'4K Webcam Studio',price:149.99,oldPrice:199.99,rating:4.7,reviews:156,category:'Electronics',desc:'Professional 4K webcam with autofocus, dual stereo mics, privacy shutter, and ring light.',gradient:'from-amber-600 to-orange-800',badge:'Sale'},
        {id:6,name:'Portable SSD 2TB',price:119.99,oldPrice:159.99,rating:4.8,reviews:423,category:'Electronics',desc:'2TB NVMe SSD with 2000MB/s transfer speed. IP67 waterproof, drop-resistant. USB-C & A combo.',gradient:'from-slate-600 to-zinc-800',badge:null},
        {id:7,name:'Gaming Mouse Eclipse',price:69.99,oldPrice:null,rating:4.6,reviews:298,category:'Gaming',desc:'26K DPI sensor, 70-hour battery, 5 programmable buttons. Ambidextrous design, 58g ultralight.',gradient:'from-red-600 to-pink-800',badge:'Popular'},
        {id:8,name:'ANC Headphones X200',price:199.99,oldPrice:279.99,rating:4.9,reviews:512,category:'Audio',desc:'40dB active noise cancellation, 50mm drivers, Hi-Res certified. 60-hour battery life.',gradient:'from-purple-600 to-violet-800',badge:'Editor Choice'}
    ],
    reviews: [
        {quote:'Absolutely love the build quality. Every product I ordered exceeded my expectations. Fast shipping and premium packaging too!',name:'Sarah Mitchell',role:'Verified Buyer',rating:5,initials:'SM',gradient:'from-violet-500 to-purple-500'},
        {quote:'The keyboard is a game changer for my workflow. Best mechanical keyboard I have ever used — the typing experience is unreal.',name:'David Park',role:'Verified Buyer',rating:5,initials:'DP',gradient:'from-emerald-500 to-cyan-500'},
        {quote:"${title} is now my go-to tech store. Prices are fair, customer service is responsive, and the 30-day return policy gives peace of mind.",name:'Emily Torres',role:'Verified Buyer',rating:4,initials:'ET',gradient:'from-pink-500 to-rose-500'}
    ]
};

const STATE = {
    cart: JSON.parse(localStorage.getItem('cart')||'[]'),
    wishlist: JSON.parse(localStorage.getItem('wishlist')||'[]'),
    activeFilter: 'All',
    searchQuery: ''
};

// ─── HELPERS ───
function saveState(k,v){localStorage.setItem(k,JSON.stringify(v))}
function formatPrice(n){return '$'+n.toFixed(2)}

// ─── TOAST SYSTEM ───
function showToast(msg,type='success'){
    const c=document.getElementById('toast-container');
    const colors={success:'border-emerald-500 bg-emerald-500/10',error:'border-red-500 bg-red-500/10',info:'border-blue-500 bg-blue-500/10',warning:'border-amber-500 bg-amber-500/10'};
    const icons={success:'✓',error:'✗',info:'ℹ',warning:'⚠'};
    const ic={success:'text-emerald-400',error:'text-red-400',info:'text-blue-400',warning:'text-amber-400'};
    const t=document.createElement('div');
    t.className='toast-enter pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-xl border backdrop-blur-xl '+(colors[type]||colors.info);
    t.innerHTML='<span class="text-lg '+(ic[type]||ic.info)+'">'+icons[type]+'</span><span class="text-sm text-white font-medium">'+msg+'</span><div class="absolute bottom-0 left-0 h-0.5 bg-white/20 rounded-full" style="animation:progress 3s linear forwards;width:100%"></div>';
    c.appendChild(t);
    setTimeout(()=>{t.classList.remove('toast-enter');t.classList.add('toast-exit');setTimeout(()=>t.remove(),400)},3000);
}

// ─── RENDER FUNCTIONS ───
function renderCategories(){
    const g=document.getElementById('categories-grid');
    g.innerHTML=DB.categories.map((c,i)=>'<button onclick="filterByCategory(\\''+c.name+'\\');showToast(\\'Showing '+c.name+'\\',\\'info\\')" class="reveal bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center hover:border-violet-500/30 hover:-translate-y-1 transition-all group" style="transition-delay:'+i*80+'ms"><div class="text-3xl mb-2">'+c.emoji+'</div><div class="text-sm font-semibold">'+c.name+'</div><div class="text-xs text-slate-500">'+c.count+' items</div></button>').join('');
}

function renderFilterButtons(){
    const cats=['All',...new Set(DB.products.map(p=>p.category))];
    document.getElementById('filterBtns').innerHTML=cats.map(c=>'<button onclick="filterByCategory(\\''+c+'\\');showToast(\\'Filter: '+c+'\\',\\'info\\')" class="filter-btn px-4 py-2 rounded-xl text-sm font-medium transition-all '+(STATE.activeFilter===c?'bg-violet-600 text-white':'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10')+'">'+c+'</button>').join('');
}

function renderProducts(){
    const g=document.getElementById('products-grid');
    const nr=document.getElementById('noResults');
    let items=DB.products;
    if(STATE.activeFilter!=='All')items=items.filter(p=>p.category===STATE.activeFilter);
    if(STATE.searchQuery)items=items.filter(p=>p.name.toLowerCase().includes(STATE.searchQuery.toLowerCase()));
    const sort=document.getElementById('sortSelect').value;
    if(sort==='low')items=[...items].sort((a,b)=>a.price-b.price);
    if(sort==='high')items=[...items].sort((a,b)=>b.price-a.price);
    if(sort==='rating')items=[...items].sort((a,b)=>b.rating-a.rating);
    if(!items.length){g.innerHTML='';nr.classList.remove('hidden');return}
    nr.classList.add('hidden');
    const inWish=id=>STATE.wishlist.includes(id);
    g.innerHTML=items.map((p,i)=>'<div class="product-card reveal bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden group" style="transition-delay:'+i*80+'ms">'+(p.badge?'<div class="absolute top-3 left-3 z-10 px-2.5 py-1 bg-violet-600 text-white text-[10px] font-bold rounded-full">'+p.badge+'</div>':'')+
        '<div class="relative cursor-pointer" onclick="openQuickView('+p.id+')"><div class="aspect-[4/3] bg-gradient-to-br '+p.gradient+' flex items-center justify-center group-hover:scale-105 transition-transform duration-500 overflow-hidden"><div class="text-4xl opacity-60">📦</div></div>'+ '<button onclick="event.stopPropagation();toggleWishlist('+p.id+')" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-sm transition hover:scale-110 '+(inWish(p.id)?'text-pink-500':'text-white/60 hover:text-pink-400')+'">'+(inWish(p.id)?'♥':'♡')+'</button></div>'+
        '<div class="p-4"><h3 class="font-bold text-sm mb-1 group-hover:text-violet-400 transition">'+p.name+'</h3><div class="flex items-center gap-1 mb-2"><span class="text-amber-400 text-xs">'+'★'.repeat(Math.floor(p.rating))+'</span><span class="text-xs text-slate-500">('+p.reviews+')</span></div><div class="flex items-center justify-between"><div><span class="text-lg font-bold text-violet-400">'+formatPrice(p.price)+'</span>'+(p.oldPrice?'<span class="text-xs text-slate-600 line-through ml-2">'+formatPrice(p.oldPrice)+'</span>':'')+'</div><button onclick="event.stopPropagation();addToCart(DB.products.find(x=>x.id==='+p.id+'))" class="w-9 h-9 rounded-xl bg-violet-600 hover:bg-violet-500 flex items-center justify-center text-sm transition hover:scale-105">+</button></div></div></div>').join('');
    initReveal();
}

function renderReviews(){
    const g=document.getElementById('reviews-grid');
    g.innerHTML=DB.reviews.map((r,i)=>'<div class="reveal bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/10 transition-all" style="transition-delay:'+i*100+'ms"><div class="flex gap-1 mb-4">'+'★'.repeat(r.rating).split('').map(_=>'<span class="text-amber-400 text-sm">★</span>').join('')+'</div><p class="text-slate-300 text-sm leading-relaxed mb-6">"'+r.quote+'"</p><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-gradient-to-br '+r.gradient+' flex items-center justify-center text-xs font-bold">'+r.initials+'</div><div><div class="text-sm font-semibold">'+r.name+'</div><div class="text-xs text-slate-500">'+r.role+'</div></div></div></div>').join('');
}

// ─── INTERACTIONS ───
function filterByCategory(cat){STATE.activeFilter=cat;renderFilterButtons();renderProducts()}
function filterProducts(){STATE.searchQuery=document.getElementById('searchInput').value;renderProducts()}

function addToCart(product){
    const existing=STATE.cart.find(i=>i.id===product.id);
    if(existing){existing.qty++}else{STATE.cart.push({...product,qty:1})}
    saveState('cart',STATE.cart);updateCartUI();
    showToast('✓ '+product.name+' added to cart!','success');
}

function removeFromCart(id){
    STATE.cart=STATE.cart.filter(i=>i.id!==id);
    saveState('cart',STATE.cart);updateCartUI();
    showToast('Item removed from cart','info');
}

function updateQty(id,delta){
    const item=STATE.cart.find(i=>i.id===id);
    if(item){item.qty=Math.max(1,item.qty+delta);saveState('cart',STATE.cart);updateCartUI()}
}

function updateCartUI(){
    document.getElementById('cartCount').textContent=STATE.cart.reduce((s,i)=>s+i.qty,0);
    const total=STATE.cart.reduce((s,i)=>s+i.price*i.qty,0);
    document.getElementById('cartTotal').textContent=formatPrice(total);
    const g=document.getElementById('cartItems');
    if(!STATE.cart.length){g.innerHTML='<div class="text-center py-12 text-slate-500"><div class="text-4xl mb-3">🛒</div><p>Your cart is empty</p></div>';return}
    g.innerHTML=STATE.cart.map(i=>'<div class="flex gap-4 items-center bg-white/[0.03] rounded-xl p-3"><div class="w-16 h-16 rounded-lg bg-gradient-to-br '+i.gradient+' flex-shrink-0"></div><div class="flex-1 min-w-0"><div class="text-sm font-semibold truncate">'+i.name+'</div><div class="text-violet-400 font-bold text-sm">'+formatPrice(i.price)+'</div><div class="flex items-center gap-2 mt-1"><button onclick="updateQty('+i.id+',-1)" class="w-6 h-6 rounded bg-white/5 text-xs hover:bg-white/10">−</button><span class="text-sm">'+i.qty+'</span><button onclick="updateQty('+i.id+',1)" class="w-6 h-6 rounded bg-white/5 text-xs hover:bg-white/10">+</button></div></div><button onclick="removeFromCart('+i.id+')" class="text-slate-500 hover:text-red-400 text-sm">✕</button></div>').join('');
}

function toggleCart(){
    const d=document.getElementById('cartDrawer'),o=document.getElementById('cartOverlay');
    const isOpen=d.classList.contains('open');
    d.classList.toggle('open');o.classList.toggle('hidden');
    document.body.style.overflow=isOpen?'':'hidden';
}

function checkout(){showToast('Redirecting to checkout...','success');toggleCart()}

function toggleWishlist(id){
    const idx=STATE.wishlist.indexOf(id);
    if(idx>-1){STATE.wishlist.splice(idx,1);showToast('Removed from wishlist','info')}
    else{STATE.wishlist.push(id);showToast('Added to wishlist! ♥','success')}
    saveState('wishlist',STATE.wishlist);
    document.getElementById('wishlistCount').textContent=STATE.wishlist.length;
    renderProducts();
}

function toggleWishlistView(){
    if(STATE.activeFilter==='wishlist'){STATE.activeFilter='All';renderFilterButtons();renderProducts();return}
    showToast('Showing wishlist items','info');
    const wishItems=DB.products.filter(p=>STATE.wishlist.includes(p.id));
    const g=document.getElementById('products-grid');
    if(!wishItems.length){g.innerHTML='<div class="col-span-full text-center py-12 text-slate-500">Your wishlist is empty</div>';return}
    STATE.activeFilter='wishlist';renderProducts();
}

function openQuickView(id){
    const p=DB.products.find(x=>x.id===id);if(!p)return;
    const m=document.getElementById('quickViewModal');
    document.getElementById('quickViewContent').innerHTML=
        '<div class="flex flex-col md:flex-row gap-8"><div class="w-full md:w-1/2 aspect-square rounded-2xl bg-gradient-to-br '+p.gradient+' flex items-center justify-center text-6xl">📦</div><div class="w-full md:w-1/2"><h2 class="text-2xl font-bold font-display mb-2">'+p.name+'</h2><div class="flex items-center gap-2 mb-3"><span class="text-amber-400">'+'★'.repeat(Math.floor(p.rating))+'</span><span class="text-sm text-slate-500">'+p.rating+' ('+p.reviews+' reviews)</span></div><p class="text-slate-400 text-sm mb-4">'+p.desc+'</p><div class="flex items-center gap-3 mb-6"><span class="text-3xl font-black text-violet-400">'+formatPrice(p.price)+'</span>'+(p.oldPrice?'<span class="text-lg text-slate-600 line-through">'+formatPrice(p.oldPrice)+'</span><span class="text-emerald-400 text-sm font-semibold">Save '+formatPrice(p.oldPrice-p.price)+'</span>':'')+'</div><button onclick="addToCart(DB.products.find(x=>x.id==='+p.id+'));closeQuickView()" class="w-full py-3 bg-gradient-to-r from-violet-600 to-pink-600 rounded-xl font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-violet-500/25">Add to Cart</button></div></div>';
    m.classList.remove('hidden');document.body.style.overflow='hidden';
}

function closeQuickView(){document.getElementById('quickViewModal').classList.add('hidden');document.body.style.overflow=''}

function toggleMobile(){const m=document.getElementById('mobileMenu');m.classList.toggle('open');document.body.style.overflow=m.classList.contains('open')?'hidden':''}

function handleNewsletterSubmit(e){
    e.preventDefault();
    const email=document.getElementById('nlEmail');
    if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value)){showToast('Please enter a valid email','error');email.style.borderColor='#ef4444';return}
    const btn=document.getElementById('nlBtn');
    btn.innerHTML='<span class="flex items-center gap-2"><svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity=".3"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path></svg>Subscribing...</span>';btn.disabled=true;
    setTimeout(()=>{document.getElementById('nlForm').classList.add('hidden');document.getElementById('nlSuccess').classList.remove('hidden');showToast('Successfully subscribed!','success');
        setTimeout(()=>{document.getElementById('nlForm').classList.remove('hidden');document.getElementById('nlSuccess').classList.add('hidden');document.getElementById('nlForm').reset();btn.innerHTML='Subscribe';btn.disabled=false;email.style.borderColor=''},4000);
    },1200);
}

function acceptCookies(){document.getElementById('cookieBanner').style.display='none';localStorage.setItem('cookieConsent','true');showToast('Cookie preferences saved','success')}
function declineCookies(){document.getElementById('cookieBanner').style.display='none';localStorage.setItem('cookieConsent','declined');showToast('Cookies declined','info')}

// ─── COUNTDOWN TIMER ───
function startCountdown(){
    let total=12*3600+34*60+56;
    setInterval(()=>{total--;if(total<0)total=86399;
        const h=Math.floor(total/3600),m=Math.floor((total%3600)/60),s=total%60;
        document.getElementById('cdHours').textContent=String(h).padStart(2,'0');
        document.getElementById('cdMins').textContent=String(m).padStart(2,'0');
        document.getElementById('cdSecs').textContent=String(s).padStart(2,'0');
    },1000);
}

// ─── SCROLL ANIMATIONS ───
function initReveal(){
    const obs=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target)}})},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
    document.querySelectorAll('.reveal:not(.visible)').forEach(el=>obs.observe(el));
}

function initCounters(){
    const obs=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){
        const el=entry.target,target=parseFloat(el.dataset.target),isDec=target%1!==0;
        let startTime=performance.now();
        function tick(now){const p=Math.min((now-startTime)/2000,1),e=1-Math.pow(1-p,3),c=e*target;
            if(isDec)el.textContent=c.toFixed(1);else if(target>=1000)el.textContent=Math.floor(c).toLocaleString()+'+';else el.textContent=Math.floor(c)+'+';
            if(p<1)requestAnimationFrame(tick)}
        requestAnimationFrame(tick);obs.unobserve(el)}})},{threshold:0.5});
    document.querySelectorAll('.counter').forEach(el=>obs.observe(el));
}

// ─── SCROLL HANDLERS ───
window.addEventListener('scroll',()=>{
    const nav=document.getElementById('navbar'),btt=document.getElementById('backToTop');
    if(window.scrollY>50)nav.classList.add('nav-scrolled');else nav.classList.remove('nav-scrolled');
    if(window.scrollY>300){btt.style.opacity='1';btt.style.pointerEvents='auto'}else{btt.style.opacity='0';btt.style.pointerEvents='none'}
    const bar=document.getElementById('scrollBar');
    const pct=window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100;
    bar.style.width=pct+'%';
});

// ─── KEYBOARD ───
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeQuickView();if(document.getElementById('cartDrawer').classList.contains('open'))toggleCart();if(document.getElementById('mobileMenu').classList.contains('open'))toggleMobile()}});

// ─── INIT ───
document.addEventListener('DOMContentLoaded',()=>{
    renderCategories();renderFilterButtons();renderProducts();renderReviews();
    updateCartUI();startCountdown();initReveal();initCounters();
    document.getElementById('wishlistCount').textContent=STATE.wishlist.length;
    if(!localStorage.getItem('cookieConsent'))setTimeout(()=>document.getElementById('cookieBanner').style.display='block',1500);
});
<\/script>
</body>
</html>`;
}
