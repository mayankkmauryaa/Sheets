import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FiArrowUpRight, FiZap, FiTarget, FiAward, FiBookOpen, FiShield, FiMoon } from "react-icons/fi";

const MysticSection = ({ title, subtitle, description, icon: Icon, color, children, reversed = false }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.8, 1]);

    return (
        <section ref={containerRef} className="min-h-screen py-32 px-8 flex flex-col justify-center items-center relative overflow-hidden">
            {/* Dynamic Background Element */}
            <motion.div
                style={{ y, opacity }}
                className={`absolute -z-10 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${color}`}
            />

            <motion.div
                style={{ opacity, scale }}
                className={`max-w-7xl mx-auto flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}
            >
                <div className="flex-1 space-y-8">
                    <div className="space-y-2">
                        <motion.p className="text-yellow-500 font-magical uppercase tracking-[0.4em] text-sm md:text-base">
                            {subtitle}
                        </motion.p>
                        <h2 className="text-5xl md:text-8xl font-black text-yellow-100 font-magical uppercase leading-tight tracking-tighter">
                            {title}
                        </h2>
                    </div>

                    <p className="text-xl md:text-2xl text-yellow-100/60 spectral italic leading-relaxed">
                        {description}
                    </p>

                    <div className="pt-8">
                        <button className="group px-8 py-4 bg-yellow-950/20 border border-yellow-700/30 rounded-2xl text-yellow-500 font-magical uppercase tracking-widest text-sm hover:bg-yellow-900/40 transition-all flex items-center gap-3">
                            Explore the Manuscript <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 relative">
                    {/* Layered Parallax Visuals */}
                    <div className="relative w-full aspect-square max-w-[500px]">
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 2, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 glass-card rounded-[3rem] border-[#ffd70033] flex items-center justify-center p-12 shadow-2xl"
                        >
                            <div className="text-yellow-500/10 absolute inset-0 flex items-center justify-center">
                                <Icon size={300} strokeWidth={0.5} />
                            </div>
                            <div className="relative z-10 text-center">
                                <Icon size={120} className="mx-auto text-yellow-500 mb-8 sparkle-animation" />
                            </div>
                        </motion.div>

                        {/* Smaller Floating Elements */}
                        <motion.div
                            style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
                            className="absolute -top-8 -right-8 w-32 h-32 glass-card rounded-2xl p-6 border-red-900/30 text-red-500 flex items-center justify-center shadow-xl"
                        >
                            <FiZap size={40} />
                        </motion.div>

                        <motion.div
                            style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
                            className="absolute -bottom-12 -left-4 w-40 h-40 glass-card rounded-[2rem] p-8 border-yellow-500/20 text-yellow-500 flex items-center justify-center shadow-xl"
                        >
                            <FiBookOpen size={50} />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export const ParallaxSection = () => {
    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const scale = useTransform(smoothProgress, [0, 0.1], [1, 0.95]);

    return (
        <motion.div style={{ scale }} className="bg-[#050a14] relative z-10 rounded-t-[5rem] -mt-20">
            {/* Scroll Indicator */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
                <span className="text-yellow-900/50 uppercase font-magical tracking-[0.5em] text-[10px]">Descend</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-px h-12 bg-gradient-to-b from-yellow-700 to-transparent"
                />
            </div>

            <MysticSection
                title="The Initiation"
                subtitle="Arcane Patterns"
                description="Begin your journey through the sacred library. Every manuscript you solve is a glyph added to your permanent consciousness."
                icon={FiBookOpen}
                color="bg-yellow-900/5"
            />

            <MysticSection
                reversed
                title="Tribulation"
                subtitle="Daily Rituals"
                description="True mastery is carved in the stone of consistency. Face the daily trials and keep your inner flame burning bright."
                icon={FiMoon}
                color="bg-red-900/5"
            />

            <MysticSection
                title="Ascension"
                subtitle="Grand Enlightenment"
                description="Reach the zenith of your craft. Emerge from the archives prepared to challenge the gods of the digital realm."
                icon={FiShield}
                color="bg-blue-900/5"
            />
        </motion.div>
    );
};
