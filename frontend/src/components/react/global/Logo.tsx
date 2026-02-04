import React from "react";
import { motion } from "framer-motion";

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="relative w-8 h-8 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-violet-500/30 border-t-violet-400 border-r-transparent"
                />
                <motion.div
                    animate={{ rotate: -180 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-1 rounded-full border border-blue-500/30 border-b-blue-400 border-l-transparent"
                />
                <div className="relative z-10 w-4 h-4 rounded-sm bg-gradient-to-tr from-violet-600 to-blue-600 shadow-lg shadow-violet-500/50" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-display">
                Genapps<span className="text-violet-400">.online</span>
            </span>
        </div>
    );
};
