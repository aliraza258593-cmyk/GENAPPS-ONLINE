import React, { useState } from "react";
import { Github, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "../global/Button";
import { Logo } from "../global/Logo";

interface AuthPageProps {
    initialView?: "login" | "signup";
    redirectTo?: string;
}

export const AuthPage = ({ initialView = "login", redirectTo = "/templates" }: AuthPageProps) => {
    const [isLogin, setIsLogin] = useState(initialView === "login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulate auth (replace with real auth later)
        try {
            await new Promise(r => setTimeout(r, 1000));

            // Store auth state
            localStorage.setItem('genapps_auth', 'true');
            localStorage.setItem('genapps_user_email', email);

            // Redirect to templates page
            window.location.href = redirectTo;
        } catch (err) {
            setError("Authentication failed. Please try again.");
            setIsLoading(false);
        }
    };

    const handleSocialAuth = (provider: string) => {
        setIsLoading(true);
        // Simulate OAuth
        setTimeout(() => {
            localStorage.setItem('genapps_auth', 'true');
            localStorage.setItem('genapps_provider', provider);
            window.location.href = redirectTo;
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#09090b] flex">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#0c0c0e] items-center justify-center p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(124,58,237,0.15),transparent_70%)]" />
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                    <div className="absolute top-20 left-20 w-40 h-40 bg-violet-500/20 rounded-full blur-[80px] animate-pulse" />
                    <div className="absolute bottom-40 right-20 w-60 h-60 bg-fuchsia-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
                </div>

                <div className="relative z-10 max-w-lg">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-violet-500/20">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                        Build apps with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
                            just your words
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        Join thousands of creators using GenApps to build production-ready software in seconds. No coding required.
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm text-center">
                            <div className="text-2xl font-bold text-white mb-1">50K+</div>
                            <div className="text-xs text-gray-500">Apps Built</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm text-center">
                            <div className="text-2xl font-bold text-white mb-1">15K+</div>
                            <div className="text-xs text-gray-500">Creators</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm text-center">
                            <div className="text-2xl font-bold text-white mb-1">4.9★</div>
                            <div className="text-xs text-gray-500">Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
                <div className="absolute top-8 left-8 md:left-auto md:right-8">
                    <a href="/" className="text-gray-500 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                        ← Back to Home
                    </a>
                </div>

                <div className="w-full max-w-md space-y-8">
                    <div className="text-center md:text-left">
                        <div className="inline-block md:hidden mb-6">
                            <Logo className="scale-75" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            {isLogin ? "Welcome back" : "Create an account"}
                        </h1>
                        <p className="text-gray-400 mt-2">
                            {isLogin ? "Sign in to continue building" : "Start building amazing apps today"}
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <Button
                            variant="secondary"
                            className="w-full justify-center gap-2 h-11 text-white bg-[#18181b] hover:bg-[#27272a] border-white/10"
                            onClick={() => handleSocialAuth('github')}
                            disabled={isLoading}
                        >
                            <Github className="w-4 h-4" />
                            Continue with GitHub
                        </Button>
                        <Button
                            variant="secondary"
                            className="w-full justify-center gap-2 h-11 text-white bg-[#18181b] hover:bg-[#27272a] border-white/10"
                            onClick={() => handleSocialAuth('google')}
                            disabled={isLoading}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#09090b] px-2 text-gray-500">Or continue with email</span>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#18181b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 placeholder-gray-600 transition-all font-sans"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#18181b] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/20 placeholder-gray-600 transition-all font-sans"
                                required
                            />
                        </div>
                        <Button
                            variant="glow"
                            className="w-full h-11 text-base group"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? "Sign In" : "Create Account"}
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="text-center text-sm">
                        <p className="text-gray-400">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-violet-400 hover:text-violet-300 font-medium underline-offset-4 hover:underline transition-colors"
                            >
                                {isLogin ? "Sign up" : "Sign in"}
                            </button>
                        </p>
                    </div>

                    <p className="text-center text-xs text-gray-600 max-w-xs mx-auto">
                        By clicking continue, you agree to our <a href="/terms" className="underline hover:text-gray-400">Terms</a> and <a href="/privacy" className="underline hover:text-gray-400">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};
