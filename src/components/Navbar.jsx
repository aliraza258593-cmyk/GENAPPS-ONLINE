import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, ChevronDown, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Builder', path: '/builder' },
    { name: 'Docs', path: '/docs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const location = useLocation();
    const { user, isAuthenticated, signOut } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setShowUserMenu(false);
    }, [location]);

    // Close user menu on click outside
    useEffect(() => {
        if (!showUserMenu) return;
        const handleClick = () => setShowUserMenu(false);
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [showUserMenu]);

    const handleSignOut = async () => {
        await signOut();
        setShowUserMenu(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-white/75 backdrop-blur-2xl border-b border-white/40 shadow-glass-sm'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2.5 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-slate-400/10 rounded-xl blur-lg group-hover:bg-slate-400/20 transition-all" />
                            <img src="/logo.svg" alt="Genapps" className="relative w-9 h-9 rounded-xl object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold font-display text-slate-900 leading-tight">
                                Gen<span className="gradient-text">apps</span>
                            </span>
                            <span className="text-[9px] font-semibold tracking-[0.2em] text-slate-400 uppercase hidden sm:block leading-none">Prompt to Platform</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${location.pathname === link.path
                                    ? 'text-brand-600 bg-brand-50/60'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center space-x-3">
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowUserMenu(!showUserMenu);
                                    }}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-white/60 transition-all border border-transparent hover:border-white/50"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-400 to-lavender-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                        {(user?.email?.[0] || 'U').toUpperCase()}
                                    </div>
                                    <span className="max-w-[120px] truncate">
                                        {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                                    </span>
                                    <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown */}
                                {showUserMenu && (
                                    <div className="absolute right-0 top-full mt-2 w-52 bg-white/90 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-glass-lg p-2 animate-scale-in">
                                        <Link
                                            to="/dashboard"
                                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-700 rounded-xl hover:bg-brand-50 transition-colors"
                                        >
                                            <LayoutDashboard className="h-4 w-4 text-brand-500" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/builder"
                                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-700 rounded-xl hover:bg-brand-50 transition-colors"
                                        >
                                            <Rocket className="h-4 w-4 text-brand-500" />
                                            Builder
                                        </Link>
                                        <div className="border-t border-slate-200/50 my-1.5" />
                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-600 rounded-xl hover:bg-red-50 transition-colors w-full text-left"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/builder"
                                    className="btn-primary px-5 py-2.5 rounded-xl text-sm sparkle-btn"
                                >
                                    Start Building
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-white/50 transition-all"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pb-4 pt-2 bg-white/85 backdrop-blur-2xl border-t border-white/30 space-y-1">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === link.path
                                ? 'text-brand-600 bg-brand-50/50'
                                : 'text-slate-600 hover:bg-white/60'
                                }`}
                            style={{
                                animation: isOpen ? `mobileNavIn 0.3s ease-out ${i * 0.05}s both` : 'none',
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="border-t border-slate-200/30 my-2 pt-2 space-y-1">
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-white/60">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-white/60">
                                    Log in
                                </Link>
                                <Link to="/builder" className="block btn-primary text-center px-4 py-2.5 rounded-xl text-sm mt-2 sparkle-btn">
                                    Start Building
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
