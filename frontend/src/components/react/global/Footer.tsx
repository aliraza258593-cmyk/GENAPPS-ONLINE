import React from "react";
import { Logo } from "./Logo";

export const Footer = () => {
    return (
        <footer className="bg-[#09090b] pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Empowering creators to build software at the speed of thought.
                            The future of development is here.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="/builder" className="hover:text-violet-400 transition-colors">Builder</a></li>
                            <li><a href="/pricing" className="hover:text-violet-400 transition-colors">Pricing</a></li>
                            <li><a href="/showcase" className="hover:text-violet-400 transition-colors">Showcase</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="/about" className="hover:text-violet-400 transition-colors">About Us</a></li>
                            <li><a href="/blog" className="hover:text-violet-400 transition-colors">Blog</a></li>
                            <li><a href="/careers" className="hover:text-violet-400 transition-colors">Careers</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="/terms" className="hover:text-violet-400 transition-colors">Terms of Service</a></li>
                            <li><a href="/privacy" className="hover:text-violet-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="/refund" className="hover:text-violet-400 transition-colors">Refund Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4 text-center">
                    <p className="text-gray-500 text-xs text-center">
                        Genapps.online is a trading name of <span className="text-gray-300 font-medium">MUNEEB UR REHMAN</span>.
                        <br />
                        <span className="text-gray-600">Refund Policy: 30-day money-back guarantee.</span>
                    </p>
                    <p className="text-gray-600 text-[10px]">
                        © {new Date().getFullYear()} Genapps.online. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
