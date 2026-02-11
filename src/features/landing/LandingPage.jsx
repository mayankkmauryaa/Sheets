import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MagicalBackground from '../../layouts/MagicalBackground';
import { ParallaxSection } from "./TextParallaxContent";
import { BouncyFeatures } from "./BouncyFeatures";
import { HoverLinks } from "./HoverLinks";
import AboutUsModal from "../../layouts/AboutUsModal";

export const LandingPage = () => {
    const navigate = useNavigate();
    const [isAboutUsOpen, setIsAboutUsOpen] = React.useState(false);

    return (
        <div className="relative min-h-screen">
            <MagicalBackground />

            <section
                className="relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-yellow-100"
            >
                <div className="relative z-10 flex flex-col items-center">
                    <span className="mb-3 inline-block rounded-full bg-yellow-900/40 border border-yellow-700/30 px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] font-magical text-yellow-500 sparkle-animation">
                        The Archives are Open
                    </span>
                    <h1 className="max-w-4xl bg-gradient-to-br from-white via-yellow-200 to-yellow-600 bg-clip-text text-center text-4xl font-black leading-tight text-transparent sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight font-magical tracking-tighter">
                        Master the Arcane Art of <span className="text-magic-gradient">Coding</span>
                    </h1>
                    <p className="my-8 max-w-2xl text-center text-lg leading-relaxed md:text-xl md:leading-relaxed spectral italic text-yellow-100/70">
                        Unlock your true potential with ZEUS MAGIC SHEETS. A meticulously curated library of algorithmic manuscripts designed to guide you from initiation to mastery.
                    </p>
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        onClick={() => navigate('/u/all')}
                        className="group relative flex w-fit items-center gap-3 rounded-2xl bg-yellow-950/20 px-8 py-4 text-yellow-500 transition-all hover:bg-yellow-950/50 font-black uppercase tracking-[0.2em] font-magical text-sm border-yellow-600/30 backdrop-blur-md shadow-2xl shadow-yellow-900/20"
                    >
                        Enter the Sanctuary
                        <FiArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </motion.button>
                </div>

                {/* Hero Scroll Hint */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
                    <div className="w-5 h-8 border-2 border-yellow-700/50 rounded-full flex justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-1 bg-yellow-500 rounded-full"
                        />
                    </div>
                </div>
            </section>

            <BouncyFeatures />
            <ParallaxSection />
            <HoverLinks onAboutOpen={() => setIsAboutUsOpen(true)} />
            <AboutUsModal isOpen={isAboutUsOpen} onClose={() => setIsAboutUsOpen(false)} />
        </div>
    );
};

export default LandingPage;
