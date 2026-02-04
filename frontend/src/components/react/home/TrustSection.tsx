import React from "react";

export const TrustSection = () => {
    const companies = ["Acme Corp", "TechFlow", "GlobalSystems", "Nebula", "StarDust", "Vertex"];

    return (
        <section className="py-20 border-y border-white/5 bg-[#09090b]">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-10">
                    Trusted by developers worldwide
                </p>
                <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Placeholder Logos - In a real app these would be SVGs */}
                    {companies.map((company) => (
                        <div key={company} className="flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-violet-500/20 transition-colors" />
                            <span className="text-xl font-bold text-gray-400 group-hover:text-white transition-colors">{company}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
