import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { cn } from "../../../lib/utils";

export const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Pricing", href: "/pricing" },
        { name: "About", href: "/about" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isScrolled ? "py-4" : "py-6"
                )}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div
                        className={cn(
                            "relative flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500",
                            isScrolled
                                ? "bg-[#09090b]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50"
                                : "bg-transparent border border-transparent"
                        )}
                    >
                        <a href="/" className="z-10">
                            <Logo />
                        </a>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>

                        <div className="hidden md:flex items-center gap-4">
                            <a
                                href="/login"
                                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                            >
                                Login
                            </a>
                            <a href="/builder">
                                <Button variant="glow" size="sm" className="group">
                                    Get Started
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </a>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden p-2 text-gray-400 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-[#09090b] pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-2xl font-medium text-white"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="h-px bg-white/10 my-4" />
                            <a
                                href="/login"
                                className="text-xl font-medium text-gray-400"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Login
                            </a>
                            <a href="/builder" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="glow" size="lg" className="w-full">
                                    Get Started
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
