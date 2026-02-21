import React, { useState } from 'react';
import { ArrowUp, Mail, ArrowRight, Heart, ExternalLink, Lock, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
    Product: [
        { label: 'Builder', to: '/builder' },
        { label: 'Features', to: '/features' },
        { label: 'Pricing', to: '/pricing' },
        { label: 'Changelog', to: '/changelog' },
    ],
    Resources: [
        { label: 'Documentation', to: '/docs' },
        { label: 'Blog', to: '/blog' },
        { label: 'Tutorials', to: '/docs' },
        { label: 'API Reference', to: '/docs' },
    ],
    Company: [
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
        { label: 'Careers', to: '/about' },
    ],
    Legal: [
        { label: 'Privacy Policy', to: '/privacy' },
        { label: 'Terms of Service', to: '/terms' },
        { label: 'Refund Policy', to: '/refund' },
        { label: 'Cookie Policy', to: '/privacy#cookies' },
    ],
};

const socialLinks = [
    {
        name: 'Twitter', href: '#', icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        )
    },
    {
        name: 'GitHub', href: '#', icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
        )
    },
    {
        name: 'LinkedIn', href: '#', icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
        )
    },
];

export default function Footer() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <footer className="relative border-t border-slate-200/50 bg-white/50 backdrop-blur-xl">
            {/* Gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{
                background: 'linear-gradient(90deg, transparent, #0ea5e9, #6366f1, #a855f7, transparent)'
            }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
                    {/* Brand + Newsletter */}
                    <div className="lg:col-span-4">
                        <Link to="/" className="flex items-center space-x-2 mb-4 group">
                            <img src="/logo.svg" alt="Genapps" className="w-8 h-8 rounded-xl object-contain" />
                            <div className="flex flex-col">
                                <span className="font-display font-bold text-lg text-slate-900 leading-tight">
                                    Gen<span className="gradient-text">apps</span>
                                </span>
                                <span className="text-[8px] font-semibold tracking-[0.2em] text-slate-400 uppercase leading-none">Prompt to Platform</span>
                            </div>
                        </Link>
                        <p className="text-sm text-slate-500 mb-6 max-w-xs leading-relaxed">
                            AI-powered website builder. Describe your idea, get a production-ready website in seconds. No coding required.
                        </p>

                        {/* Newsletter */}
                        <form onSubmit={handleSubscribe} className="flex gap-2">
                            <div className="relative flex-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-3 py-2.5 bg-white/70 border border-slate-200/50 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-300/50 focus:border-brand-300 transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2.5 text-white text-sm font-medium rounded-xl transition-all hover:scale-105 hover:-translate-y-0.5"
                                style={{ background: 'linear-gradient(135deg, #0ea5e9, #7c3aed)' }}
                            >
                                {subscribed ? '✓' : <ArrowRight className="h-4 w-4" />}
                            </button>
                        </form>
                        {subscribed && (
                            <p className="text-xs text-emerald-500 mt-2 font-medium">Thanks for subscribing!</p>
                        )}

                        {/* Social Links */}
                        <div className="mt-6 flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="w-9 h-9 rounded-xl bg-white/60 border border-slate-200/50 flex items-center justify-center text-slate-400 hover:text-brand-500 hover:border-brand-200 hover:bg-brand-50/50 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        {/* Contact email */}
                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                            <Mail className="h-4 w-4" />
                            <a href="mailto:hello@genapps.online" className="hover:text-brand-500 transition-colors">
                                hello@genapps.online
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">{category}</h4>
                                <ul className="space-y-2.5">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <Link to={link.to} className="text-sm text-slate-500 hover:text-brand-500 transition-colors inline-flex items-center gap-1 group">
                                                {link.label}
                                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity -translate-y-px" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-400">
                        © {new Date().getFullYear()} Genapps. All rights reserved.
                    </p>
                    <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/40 border border-white/40">
                        <Lock className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-xs text-slate-400">Payments by</span>
                        <a href="https://www.lemonsqueezy.com" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-slate-500 hover:text-brand-500 transition-colors">🍋 Lemon Squeezy</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                            Built with <Heart className="h-3 w-3 text-red-400 fill-red-400 animate-pulse" /> by <span className="text-brand-500 font-medium">Genapps</span>
                        </span>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="p-2 rounded-xl bg-white/70 border border-slate-200/50 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all hover:shadow-sm hover:-translate-y-0.5"
                        >
                            <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
