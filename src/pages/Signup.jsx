import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, Lock, User, Eye, EyeOff, ArrowRight, Github, Check, Sparkles, Zap, Code2, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

const benefits = [
    'Generate unlimited websites with AI',
    'Access 50+ professional templates',
    'Deploy to Vercel in one click',
    'Export clean React + Tailwind code',
];

const features = [
    { icon: Sparkles, text: 'AI-powered website generation' },
    { icon: Code2, text: 'Clean React + Tailwind code' },
    { icon: Globe, text: 'One-click deploy to Vercel' },
    { icon: Zap, text: 'Built in under 2 minutes' },
];

function PasswordStrength({ password }) {
    const strength = useMemo(() => {
        if (!password) return { level: 0, text: '', color: '' };
        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 1) return { level: 1, text: 'Weak', color: 'bg-red-400' };
        if (score <= 2) return { level: 2, text: 'Fair', color: 'bg-orange-400' };
        if (score <= 3) return { level: 3, text: 'Good', color: 'bg-yellow-400' };
        if (score <= 4) return { level: 4, text: 'Strong', color: 'bg-emerald-400' };
        return { level: 5, text: 'Excellent', color: 'bg-emerald-500' };
    }, [password]);

    if (!password) return null;

    return (
        <div className="mt-2">
            <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.level ? strength.color : 'bg-slate-200'}`} />
                ))}
            </div>
            <span className={`text-[11px] font-medium ${strength.level <= 2 ? 'text-orange-500' : 'text-emerald-500'}`}>
                {strength.text}
            </span>
        </div>
    );
}

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { full_name: name } }
            });
            if (error) throw error;
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGithubSignup = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
            if (error) throw error;
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
            if (error) throw error;
        } catch (err) {
            setError(err.message);
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
                        <div className="bg-gradient-to-r from-brand-400 to-lavender-400 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                            <Rocket className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-display font-bold text-2xl text-white">
                            Gen<span className="text-brand-300">apps</span>
                        </span>
                    </Link>

                    <h2 className="text-3xl font-extrabold text-white mb-4 font-display leading-tight">
                        Start building for free<br />
                        <span className="text-brand-300">in under 2 minutes</span>
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-10">
                        Create your account and start generating professional websites with AI. No credit card required.
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

                    {/* Stats */}
                    <div className="mt-12 grid grid-cols-3 gap-4">
                        <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-xl font-extrabold text-white font-display">50K+</div>
                            <div className="text-[11px] text-slate-400">Sites Built</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-xl font-extrabold text-white font-display">2min</div>
                            <div className="text-[11px] text-slate-400">Avg Time</div>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-xl font-extrabold text-white font-display">4.9★</div>
                            <div className="text-[11px] text-slate-400">Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="flex-1 flex items-center justify-center relative px-4 py-12 sky-bg overflow-y-auto">
                {/* Mobile logo */}
                <div className="absolute top-6 left-4 lg:hidden">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-gradient-to-r from-brand-500 to-lavender-500 p-2 rounded-xl shadow-md">
                            <Rocket className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-display font-bold text-xl text-slate-900">
                            Gen<span className="text-brand-500">apps</span>
                        </span>
                    </Link>
                </div>

                {/* Background elements */}
                <div className="absolute inset-0 pointer-events-none lg:hidden">
                    <div className="cloud-shape cloud-shape-2 top-[15%] left-[5%] animate-cloud-drift opacity-40" />
                    <div className="cloud-shape cloud-shape-1 bottom-[10%] right-[10%] animate-cloud-drift-reverse opacity-30" />
                </div>

                <motion.div
                    className="w-full max-w-md relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Card */}
                    <div className="premium-card p-8 sm:p-10">
                        {success ? (
                            <div className="text-center py-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                >
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                                        <Check className="h-8 w-8 text-white" />
                                    </div>
                                </motion.div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-3 font-display">Check Your Email</h2>
                                <p className="text-slate-500 text-sm mb-6">
                                    We've sent a confirmation link to <span className="text-slate-900 font-medium">{email}</span>. Click it to activate your account.
                                </p>
                                <Link to="/login" className="btn-glow rounded-xl px-8 py-3">
                                    Go to Login
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="text-center mb-8">
                                    <h1 className="text-2xl font-bold text-slate-900 font-display">Create Your Account</h1>
                                    <p className="text-slate-500 text-sm mt-2">Start building websites with AI — free</p>
                                </div>

                                {error && (
                                    <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200/50 text-red-600 text-sm flex items-center gap-2">
                                        <span>⚠️</span> {error}
                                    </div>
                                )}

                                <div className="space-y-3 mb-6">
                                    <button
                                        onClick={handleGithubSignup}
                                        className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-all duration-200 hover:shadow-lg"
                                    >
                                        <Github className="h-5 w-5" />
                                        <span>Continue with GitHub</span>
                                    </button>
                                    <button
                                        onClick={handleGoogleSignup}
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

                                <form onSubmit={handleSignup} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="premium-input pl-11"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>
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
                                                minLength={6}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="premium-input pl-11 pr-11"
                                                placeholder="Minimum 6 characters"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        <PasswordStrength password={password} />
                                    </div>

                                    {/* Benefits */}
                                    <div className="p-4 rounded-xl bg-brand-50/40 border border-brand-200/30">
                                        <div className="space-y-2">
                                            {benefits.map((b, i) => (
                                                <div key={i} className="flex items-center space-x-2 text-sm text-slate-600">
                                                    <Check className="h-4 w-4 text-brand-500 flex-shrink-0" />
                                                    <span>{b}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full btn-glow sparkle-btn rounded-xl py-3.5"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <span className="flex items-center justify-center space-x-2">
                                                <span>Create Account</span>
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        )}
                                    </button>

                                    <p className="text-xs text-slate-500 text-center">
                                        By signing up, you agree to our{' '}
                                        <Link to="/terms" className="text-brand-500 hover:text-brand-600">Terms of Service</Link>
                                        {' '}and{' '}
                                        <Link to="/privacy" className="text-brand-500 hover:text-brand-600">Privacy Policy</Link>.
                                    </p>
                                </form>

                                <p className="mt-6 text-center text-sm text-slate-500">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-brand-500 hover:text-brand-600 font-semibold transition-colors">
                                        Sign in
                                    </Link>
                                </p>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
