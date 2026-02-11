import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    isLoading = false,
    ...props
}) => {
    const baseStyles = 'rounded-xl transition-all duration-300 font-magical uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        primary: 'bg-yellow-600 hover:bg-yellow-500 text-[#050a14] shadow-lg shadow-yellow-900/20',
        secondary: 'bg-yellow-950/20 border border-yellow-700/30 text-yellow-500 hover:bg-yellow-950/40',
        ghost: 'text-yellow-700 hover:text-yellow-500 hover:bg-yellow-950/30 border border-transparent hover:border-yellow-900/30',
        danger: 'bg-red-900/20 hover:bg-red-900/40 text-red-500 border border-red-900/30',
        magical: 'bg-yellow-950/20 border border-yellow-700/30 text-yellow-500 hover:bg-yellow-950/50 backdrop-blur-md shadow-2xl sparkle-animation'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-[10px]',
        md: 'px-6 py-3 text-xs',
        lg: 'px-8 py-4 text-sm'
    };

    const Component = props.href ? 'a' : motion.button;

    return (
        <Component
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {isLoading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : children}
        </Component>
    );
};
