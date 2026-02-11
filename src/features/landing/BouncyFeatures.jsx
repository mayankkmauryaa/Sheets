import React from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiZap, FiTarget, FiGlobe, FiBookmark } from "react-icons/fi";

export const BouncyFeatures = () => {
    return (
        <section className="mx-auto max-w-7xl px-8 py-24 text-yellow-100">
            <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black font-magical uppercase tracking-tighter leading-tight">
                        Artifacts of <span className="text-magic-gradient">Power</span>
                    </h2>
                    <p className="max-w-lg text-lg text-yellow-100/60 spectral italic">
                        Empower your cognitive arsenal with our suite of integrated manuscript management tools.
                    </p>
                </div>
                <a href="https://github.com/mayankkmauryaa/Sheets#-documentation--sacred-lore" target="_blank" rel="noopener noreferrer">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="whitespace-nowrap rounded-2xl bg-yellow-950/20 border border-yellow-700/30 px-8 py-4 font-magical uppercase tracking-widest text-sm text-yellow-500 shadow-2xl backdrop-blur-md transition-all hover:bg-yellow-900/10"
                    >
                        View Documentation
                    </motion.button>
                </a>
            </div>

            <div className="mb-6 grid grid-cols-12 gap-6">
                <BounceCard className="col-span-12 md:col-span-4 border-yellow-900/20">
                    <CardTitle>Daily Rituals</CardTitle>
                    <div className="absolute bottom-0 left-6 right-6 top-32 translate-y-8 rounded-t-3xl bg-gradient-to-br from-yellow-700/40 to-yellow-600/10 p-6 border-t border-x border-yellow-500/30 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[1deg] backdrop-blur-lg shadow-2xl">
                        <div className="flex flex-col items-center gap-4 text-yellow-100/80">
                            <FiBookmark size={48} className="text-yellow-500" />
                            <span className="block text-center font-magical uppercase tracking-[0.2em] text-[10px] font-black">
                                Live Streak Tracking
                            </span>
                        </div>
                    </div>
                </BounceCard>
                <BounceCard className="col-span-12 md:col-span-8 border-red-900/20">
                    <CardTitle>Arcane Knowledge</CardTitle>
                    <div className="absolute bottom-0 left-8 right-8 top-32 translate-y-8 rounded-t-[2.5rem] bg-gradient-to-br from-red-700/40 to-red-900/10 p-8 border-t border-x border-red-500/30 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[-1deg] backdrop-blur-lg shadow-2xl">
                        <div className="flex items-center justify-center h-full gap-8">
                            <FiZap size={64} className="text-red-400 sparkle-animation" />
                            <div className="space-y-2">
                                <p className="font-magical uppercase tracking-[0.3em] text-xs text-red-200">Quick Solves</p>
                                <p className="spectral italic text-red-100/50 text-sm">Instant access to optimized solutions and algorithmic patterns.</p>
                            </div>
                        </div>
                    </div>
                </BounceCard>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <BounceCard className="col-span-12 md:col-span-8 border-blue-900/20">
                    <CardTitle>Global Ascension</CardTitle>
                    <div className="absolute bottom-0 left-8 right-8 top-32 translate-y-8 rounded-t-[2.5rem] bg-gradient-to-br from-blue-700/40 to-blue-900/10 p-8 border-t border-x border-blue-500/30 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[1deg] backdrop-blur-lg shadow-2xl">
                        <div className="flex items-center gap-8 px-4 h-full">
                            <FiGlobe size={64} className="text-blue-400" />
                            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
                            <span className="font-magical uppercase tracking-[0.4em] text-xs font-black text-blue-200">Leaderboards</span>
                        </div>
                    </div>
                </BounceCard>
                <BounceCard className="col-span-12 md:col-span-4 border-yellow-900/20">
                    <CardTitle>Claim Victory</CardTitle>
                    <div className="absolute bottom-0 left-6 right-6 top-32 translate-y-8 rounded-t-3xl bg-gradient-to-br from-yellow-500/40 to-yellow-700/10 p-6 border-t border-x border-yellow-400/30 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[-1deg] backdrop-blur-lg shadow-2xl">
                        <div className="flex flex-col items-center gap-4">
                            <FiTarget size={48} className="text-yellow-400" />
                            <div className="w-full h-1 bg-yellow-950/50 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "70%" }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-yellow-500"
                                />
                            </div>
                        </div>
                    </div>
                </BounceCard>
            </div>
        </section>
    );
};

const BounceCard = ({ className, children }) => {
    return (
        <motion.div
            whileHover={{ scale: 0.98, rotate: "-0.5deg" }}
            className={`group relative min-h-[350px] cursor-pointer overflow-hidden rounded-[2.5rem] bg-yellow-950/5 border p-10 backdrop-blur-sm transition-all hover:bg-yellow-900/10 ${className}`}
        >
            {children}
        </motion.div>
    );
};

const CardTitle = ({ children }) => {
    return (
        <h3 className="text-2xl font-black font-magical uppercase tracking-widest text-yellow-100/90 text-center mb-4">
            {children}
        </h3>
    );
};
