import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import CookieConsent from './components/CookieConsent';
import ProtectedRoute from './components/ProtectedRoute';
import SEOHead from './components/SEOHead';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { initLemonSqueezy, loadLemonSqueezy } from './lib/lemonsqueezy';

// Pages
import Home from './pages/Home';
import Builder from './pages/Builder';
import PricingPage from './pages/PricingPage';
import FeaturesPage from './pages/FeaturesPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Documentation from './pages/Documentation';
import Changelog from './pages/Changelog';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import Dashboard from './pages/Dashboard';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCancel from './pages/CheckoutCancel';
import NotFound from './pages/NotFound';

function ScrollToTop() {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const pageVariants = {
    initial: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
};

function AnimatedPage({ children }) {
    return (
        <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
            {children}
        </motion.div>
    );
}

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
                <Route path="/builder" element={<AnimatedPage><Builder /></AnimatedPage>} />
                <Route path="/pricing" element={<AnimatedPage><PricingPage /></AnimatedPage>} />
                <Route path="/features" element={<AnimatedPage><FeaturesPage /></AnimatedPage>} />
                <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
                <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
                <Route path="/blog" element={<AnimatedPage><Blog /></AnimatedPage>} />
                <Route path="/docs" element={<AnimatedPage><Documentation /></AnimatedPage>} />
                <Route path="/changelog" element={<AnimatedPage><Changelog /></AnimatedPage>} />
                <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
                <Route path="/signup" element={<AnimatedPage><Signup /></AnimatedPage>} />
                <Route path="/privacy" element={<AnimatedPage><Privacy /></AnimatedPage>} />
                <Route path="/terms" element={<AnimatedPage><Terms /></AnimatedPage>} />
                <Route path="/refund" element={<AnimatedPage><Refund /></AnimatedPage>} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <AnimatedPage><Dashboard /></AnimatedPage>
                    </ProtectedRoute>
                } />
                <Route path="/checkout/success" element={<AnimatedPage><CheckoutSuccess /></AnimatedPage>} />
                <Route path="/checkout/cancel" element={<AnimatedPage><CheckoutCancel /></AnimatedPage>} />
                <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
            </Routes>
        </AnimatePresence>
    );
}

function AppLayout() {
    const location = useLocation();
    const isAuthPage = ['/login', '/signup'].includes(location.pathname);

    useEffect(() => {
        // Pre-load Lemon Squeezy JS and listen for checkout events
        loadLemonSqueezy();
        initLemonSqueezy((data) => {
            // Auto-redirect to success page on checkout completion
            window.location.href = '/checkout/success';
        });
    }, []);

    return (
        <div className="min-h-screen text-slate-700 overflow-x-hidden">
            <SEOHead />
            <ScrollProgressBar />
            {!isAuthPage && <Navbar />}
            <ScrollToTop />
            <main>
                <AnimatedRoutes />
            </main>
            {!isAuthPage && <Footer />}
            <CookieConsent />
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <ToastProvider>
                    <AppLayout />
                </ToastProvider>
            </Router>
        </AuthProvider>
    );
}
