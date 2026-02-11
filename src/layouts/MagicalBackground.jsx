import React, { useEffect } from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
    useMotionTemplate,
    useMotionValue,
    animate,
    motion,
} from "framer-motion";

const COLORS_TOP = ["#ffd700", "#7e0001", "#1e67c6", "#ff4500"];

const MagicalBackground = () => {
    const color = useMotionValue(COLORS_TOP[0]);

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, []);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #050a14 50%, ${color})`;

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
                style={{
                    backgroundImage,
                }}
                className="absolute inset-0"
            />
            <div className="absolute inset-0">
                <Canvas>
                    <Stars radius={100} count={3500} factor={6} fade speed={1.5} />
                </Canvas>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050a14] to-transparent" />
        </div>
    );
};

export default MagicalBackground;
