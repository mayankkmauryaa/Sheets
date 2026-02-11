import { X, Github, Linkedin, Twitter, Globe, Heart, Coffee, Shield, Instagram } from 'lucide-react';
import { Button } from '../components/ui';

const AboutUsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 card-enter" onClick={onClose}>
            <div
                className="glass-card rounded-[2.5rem] p-8 md:p-12 w-full max-w-2xl shadow-2xl border-[#ffd70033] relative overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Magical Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-900/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/10 rounded-full blur-[100px] pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-3 text-yellow-800 hover:text-yellow-500 rounded-2xl hover:bg-yellow-950/30 transition-all z-20"
                >
                    <X size={24} />
                </button>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-700 to-yellow-500 p-1 mb-6 shadow-2xl shadow-yellow-900/40 relative group">
                            <div className="w-full h-full rounded-full bg-[#050a14] flex items-center justify-center overflow-hidden transition-transform duration-700 group-hover:rotate-[360deg]">
                                <Shield size={40} className="text-yellow-500 sparkle-animation" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-red-600 text-white p-2 rounded-xl shadow-lg animate-bounce">
                                <Heart size={14} fill="currentColor" />
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black text-magic-gradient font-magical tracking-[0.2em] uppercase text-center mb-2">
                            Mayank Maurya
                        </h2>
                        <p className="text-red-400 font-magical uppercase tracking-[0.3em] text-[10px] font-black italic">
                            Architect of Zeus Magic
                        </p>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 text-center">
                        <p className="text-yellow-100/80 leading-relaxed spectral italic text-lg md:text-xl font-medium">
                            "Crafting digital manuscripts that empower seekers to master the ancient arts of algorithms and data structures."
                        </p>

                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-yellow-900/30 to-transparent mx-auto" />

                        <p className="text-yellow-700/60 text-sm spectral uppercase tracking-[0.4em] font-black leading-loose">
                            Developer • Problem Solver • Tech Enthusiast<br />
                            Building tools to make learning legendary.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-6 mt-12">
                        <a href="https://github.com/mayankkmauryaa" target="_blank" rel="noopener noreferrer" className="p-4 bg-yellow-900/10 hover:bg-yellow-900/20 text-yellow-600 hover:text-yellow-400 rounded-2xl transition-all hover:-translate-y-1">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/mayankmaurya05" target="_blank" rel="noopener noreferrer" className="p-4 bg-yellow-900/10 hover:bg-yellow-900/20 text-yellow-600 hover:text-yellow-400 rounded-2xl transition-all hover:-translate-y-1">
                            <Linkedin size={24} />
                        </a>
                        <a href="https://www.instagram.com/mayankkmauryaa" target="_blank" rel="noopener noreferrer" className="p-4 bg-yellow-900/10 hover:bg-yellow-900/20 text-yellow-600 hover:text-yellow-400 rounded-2xl transition-all hover:-translate-y-1">
                            <Instagram size={24} />
                        </a>
                        <a href="https://mayankmaurya.vercel.app/" target="_blank" rel="noopener noreferrer" className="p-4 bg-yellow-900/10 hover:bg-yellow-900/20 text-yellow-600 hover:text-yellow-400 rounded-2xl transition-all hover:-translate-y-1">
                            <Globe size={24} />
                        </a>
                    </div>

                    {/* Footer inside modal */}
                    <div className="mt-12 text-center">
                        <Button variant="primary" className="mx-auto flex items-center gap-3">
                            <Coffee size={14} /> Buy me a magic potion
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsModal;
