import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

export const HoverLinks = ({ onAboutOpen }) => {
    return (
        <section className="p-8 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-900/20 to-transparent" />

            <div className="mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-5xl font-black font-magical uppercase tracking-widest text-yellow-500/30 text-center mb-16">
                    Arcane Portals
                </h2>

                <Link
                    heading="The Archive"
                    subheading="Venture into the full collection"
                    imgSrc="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2690&auto=format&fit=crop"
                    href="/u/all"
                />
                <Link
                    heading="About"
                    subheading="The Story of Zeus Magic"
                    imgSrc="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onAboutOpen();
                    }}
                />
                <Link
                    heading="Sacred Code"
                    subheading="Join the open source brotherhood"
                    imgSrc="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2670&auto=format&fit=crop"
                    href="https://github.com/mayankkmauryaa"
                />
                <Link
                    heading="Visions"
                    subheading="Support our future enchantments"
                    imgSrc="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2670&auto=format&fit=crop"
                    href="#"
                />
            </div>
        </section>
    );
};

const Link = ({ heading, imgSrc, subheading, href, onClick }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
    const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    return (
        <motion.a
            href={href}
            ref={ref}
            onMouseMove={handleMouseMove}
            onClick={onClick}
            initial="initial"
            whileHover="whileHover"
            className="group relative flex items-center justify-between border-b border-yellow-900/20 py-8 transition-colors duration-500 hover:border-yellow-500/50 md:py-12"
        >
            <div className="relative z-10">
                <motion.span
                    variants={{
                        initial: { x: 0 },
                        whileHover: { x: -16 },
                    }}
                    transition={{
                        type: "spring",
                        staggerChildren: 0.075,
                        delayChildren: 0.1,
                    }}
                    className="relative block text-4xl font-black text-yellow-100/30 transition-colors duration-500 group-hover:text-yellow-500 font-magical uppercase tracking-tighter md:text-7xl"
                >
                    {heading.split("").map((l, i) => (
                        <motion.span
                            variants={{
                                initial: { x: 0 },
                                whileHover: { x: 16 },
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="inline-block"
                            key={i}
                        >
                            {l === " " ? "\u00A0" : l}
                        </motion.span>
                    ))}
                </motion.span>
                <span className="relative mt-4 block text-base text-yellow-100/40 transition-colors duration-500 group-hover:text-yellow-100/80 font-magical uppercase tracking-[0.3em] text-[10px]">
                    {subheading}
                </span>
            </div>

            <motion.img
                style={{
                    top,
                    left,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                variants={{
                    initial: { scale: 0, rotate: "-12.5deg", opacity: 0 },
                    whileHover: { scale: 1, rotate: "12.5deg", opacity: 1 },
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                src={imgSrc}
                className="absolute z-0 h-24 w-32 rounded-2xl object-cover md:h-64 md:w-80 border-2 border-yellow-500/30 shadow-2xl shadow-yellow-900/20 pointer-events-none"
                alt={`Portal to ${heading}`}
            />

            <motion.div
                variants={{
                    initial: {
                        x: "25%",
                        opacity: 0,
                    },
                    whileHover: {
                        x: "0%",
                        opacity: 1,
                    },
                }}
                transition={{ type: "spring" }}
                className="relative z-10 p-4"
            >
                <FiArrowRight className="text-4xl text-yellow-500" />
            </motion.div>
        </motion.a>
    );
};
