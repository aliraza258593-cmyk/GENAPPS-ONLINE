import React from "react";
import { Button } from "../global/Button";

export const AboutContent = () => {
    return (
        <div className="bg-[#09090b] min-h-screen pt-24 pb-20">
            {/* Hero */}
            <section className="container mx-auto px-6 mb-24 text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Democratizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Software Creation</span></h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">We believe that everyone should be able to build software, regardless of their technical background. GenApps is the bridge between your idea and reality.</p>
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent max-w-lg mx-auto" />
            </section>

            {/* Story */}
            <section className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                <div className="relative">
                    <div className="absolute inset-0 bg-violet-600/10 blur-[80px] rounded-full" />
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                        alt="Team working"
                        className="relative rounded-3xl border border-white/10 shadow-2xl"
                    />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white">Our Story</h2>
                    <p className="text-gray-400 leading-relaxed">
                        GenApps started with a simple question: "Why is building software still so hard?"
                        We watched brilliant entrepreneurs struggle to find technical co-founders or pay expensive agencies, only to fail before launching.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                        We built GenApps to empower the non-technical founders, the dreamers, and the creators.
                        By leveraging advanced AI, we turn natural language into production-ready full-stack applications in seconds.
                    </p>
                </div>
            </section>

            {/* Founder Footer */}
            <section className="border-t border-white/5 py-16 bg-[#0c0c0e]">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm text-violet-400 mb-2 uppercase tracking-widest font-semibold">Leadership</p>
                    <h3 className="text-2xl text-white font-medium mb-1">Founded by MUNEEB UR REHMAN</h3>
                    <p className="text-gray-500 text-sm">Visionary & Lead Architect</p>
                </div>
            </section>
        </div>
    );
};
