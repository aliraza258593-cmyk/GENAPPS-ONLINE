import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, Lock, Eye, EyeOff, ArrowRight, Github, Sparkles, Check, Zap, Code2, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

const features = [
    { icon: Sparkles, text: 'AI-powered website generation' },
    { icon: Code2, text: 'Clean React + Tailwind code' },
    { icon: Globe, text: 'One-click deploy to Vercel' },
    { icon: Zap, text: 'Built in under 2 minutes' },
];

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resetMode, setResetMode] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [resetError, setResetError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            window.location.href = '/';
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGithubLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
            if (error) throw error;
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
            if (error) throw error;
        } catch (err) {
            setError(err.message);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            setResetError('Please enter your email address first.');
            return;
        }
        setResetLoading(true);
        setResetError(null);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/login`,
            });
            if (error) throw error;
            setResetSuccess(true);
        } catch (err) {
            setResetError(err.message);
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex overflow-hidden">
            {/* Left Branding Panel — Desktop only */}
            <div className="hidden lg:flex lg:w-1/2 auth-split-left items-center justify-center p-12">
                <div className="relative z-10 max-w-md">
                    {/* Floating orbs */}
                    <motion.div
                        className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)', filter: 'blur(60px)' }}
                        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute -bottom-20 -right-20 w-[250px] h-[250px] rounded-full opacity-15"
                        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)', filter: 'blur(60px)' }}
                        animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
                        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                    />

                    <Link to="/" className="flex items-center space-x-3 mb-10 group">
                        <img src="/logo.svg" alt="Genapps" className="w-10 h-10 rounded-xl" />
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-2xl text-white leading-tight">
                                Gen<span className="text-brand-300">apps</span>
                            </span>
                            <span className="text-[9px] font-semibold tracking-[0.2em] text-slate-400 uppercase leading-none">Prompt to Platform</span>
                        </div>
                    </Link>

                    <h2 className="text-3xl font-extrabold text-white mb-4 font-display leading-tight">
                        Build stunning websites<br />
                        <span className="text-brand-300">with the power of AI</span>
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-10">
                        Join thousands of developers and businesses who ship faster with Genapps. From idea to deployed site in minutes.
                    </p>

                    <div className="space-y-4">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                            >
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                                    <f.icon className="h-4 w-4 text-brand-300" />
                                </div>
                                <span className="text-sm text-slate-300">{f.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Testimonial snippet */}
                    <div className="mt-12 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                        <p className="text-sm text-slate-300 italic mb-3">
                            "Genapps saved us 3 weeks of development. We launched our SaaS landing page in 10 minutes."
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold">SC</div>
                            <span className="text-xs text-slate-400">Sarah Chen, Founder at TechVenture</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="flex-1 flex items-center justify-center relative px-4 py-12 sky-bg">
                {/* Mobile logo */}
                <div className="absolute top-6 left-4 lg:hidden">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <img src="/logo.svg" alt="Genapps" className="w-9 h-9 rounded-xl" />
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-xl text-slate-900 leading-tight">
                                Gen<span className="text-brand-500">apps</span>
                            </span>
                            <span className="text-[8px] font-semibold tracking-[0.2em] text-slate-400 uppercase leading-none">Prompt to Platform</span>
                        </div>
                    </Link>
                </div>

                {/* Background elements */}
                <div className="absolute inset-0 pointer-events-none lg:hidden">
                    <div className="cloud-shape cloud-shape-1 top-[20%] left-[10%] animate-cloud-drift opacity-50" />
                    <div className="cloud-shape cloud-shape-2 bottom-[20%] right-[10%] animate-cloud-drift-reverse opacity-30" />
                </div>

                <motion.div
                    className="w-full max-w-md relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Card */}
                    <div className="premium-card p-8 sm:p-10">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-slate-900 font-display">Welcome Back</h1>
                            <p className="text-slate-500 text-sm mt-2">Sign in to continue building amazing websites</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200/50 text-red-600 text-sm flex items-center gap-2">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        {/* Social Login */}
                        <div className="space-y-3 mb-6">
                            <button
                                onClick={handleGithubLogin}
                                className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-all duration-200 hover:shadow-lg"
                            >
                                <Github className="h-5 w-5" />
                                <span>Continue with GitHub</span>
                            </button>
                            <button
                                onClick={handleGoogleLogin}
                                className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-all duration-200 hover:shadow-md"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span>Continue with Google</span>
                            </button>
                        </div>

                        <div className="flex items-center space-x-4 mb-6">
                            <div className="flex-1 h-px bg-slate-200/60" />
                            <span className="text-xs text-slate-400 font-medium uppercase">or</span>
                            <div className="flex-1 h-px bg-slate-200/60" />
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="premium-input pl-11"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="premium-input pl-11 pr-11"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center space-x-2 text-slate-500 cursor-pointer">
                                    <input type="checkbox" className="rounded bg-white border-slate-300 text-brand-500 focus:ring-brand-500" />
                                    <span>Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => { setResetMode(!resetMode); setResetSuccess(false); setResetError(null); }}
                                    className="text-brand-500 hover:text-brand-600 font-medium transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Forgot Password inline form */}
                            {resetMode && (
                                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-3">
                                    {resetSuccess ? (
                                        <div className="flex items-center gap-2 text-emerald-600 text-sm">
                                            <Check className="h-4 w-4" />
                                            <span>Password reset link sent! Check your email.</span>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-xs text-slate-500">Enter your email above, then click the button below to receive a reset link.</p>
                                            {resetError && (
                                                <p className="text-xs text-red-500">⚠️ {resetError}</p>
                                            )}
                                            <button
                                                type="button"
                                                onClick={handleForgotPassword}
                                                disabled={resetLoading}
                                                className="w-full py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors disabled:opacity-50"
                                            >
                                                {resetLoading ? 'Sending...' : 'Send Reset Link'}
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-glow sparkle-btn rounded-xl py-3.5"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <span className="flex items-center justify-center space-x-2">
                                        <span>Sign In</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </span>
                                )}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-500">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-brand-500 hover:text-brand-600 font-semibold transition-colors">
                                Sign up free
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
