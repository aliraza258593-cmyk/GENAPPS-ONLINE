import React from "react";

export const LegalLayout = ({ title, lastUpdated, children }: { title: string, lastUpdated: string, children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-[#09090b] pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
                    <p className="text-gray-400">Last updated: {lastUpdated}</p>
                </div>

                <div className="prose prose-invert prose-violet max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 bg-[#0c0c0e] p-8 md:p-12 rounded-3xl border border-white/5">
                    {children}

                    <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
                        <p>Genapps.online is operated by <strong>MUNEEB UR REHMAN</strong>.</p>
                        <p>All rights reserved &copy; {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
