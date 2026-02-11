import React from 'react';

// Generic Badge
export const Badge = ({
    children,
    variant = 'default',
    className = '',
    ...props
}) => {
    const variants = {
        default: 'bg-yellow-900/10 text-yellow-600 border-yellow-900/20',
        outline: 'border border-yellow-900/20 text-yellow-500/80 bg-[#050a14]',
        success: 'text-green-500/80 bg-green-950/20 border-green-900/40 shadow-[0_0_10px_rgba(34,197,94,0.1)]',
        warning: 'text-yellow-500/80 bg-yellow-950/20 border-yellow-900/40 shadow-[0_0_10px_rgba(234,179,8,0.1)]',
        error: 'text-red-500/80 bg-red-950/20 border-red-900/40 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
        magical: 'bg-[#050a14] border border-yellow-900/20 text-yellow-500/80 font-black uppercase tracking-widest font-magical shadow-sm'
    };

    return (
        <span
            className={`px-2 py-0.5 rounded text-[10px] ${variants[variant] || variants.default} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};

// Difficulty Badge
export const DifficultyBadge = ({ difficulty, className = '' }) => {
    const config = {
        Easy: 'text-green-500/80 bg-green-950/20 border-green-900/40 shadow-[0_0_10px_rgba(34,197,94,0.1)]',
        Medium: 'text-yellow-500/80 bg-yellow-950/20 border-yellow-900/40 shadow-[0_0_10px_rgba(234,179,8,0.1)]',
        Hard: 'text-red-500/80 bg-red-950/20 border-red-900/40 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
    };

    return (
        <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-lg border font-magical transition-all duration-500 hover:scale-105 ${config[difficulty] || 'text-yellow-700 bg-yellow-950/20 border-yellow-900/30'} ${className}`}>
            {difficulty}
        </span>
    );
};

// Platform Badge
export const PlatformBadge = ({ platform, link }) => {
    const config = {
        leetcode: { icon: '/logos/leetcode.jpeg', label: 'LeetCode' },
        geeksforgeeks: { icon: '/logos/gfg.png', label: 'GFG' },
        gfg: { icon: '/logos/gfg.png', label: 'GFG' },
        hackerrank: { icon: '/logos/hackerrank.png', label: 'HackerRank' },
        codeforces: { icon: '/logos/codeforces.png', label: 'Codeforces' },
        tuf: { icon: '/logos/tuf.png', label: 'TUF' },
        takeuforward: { icon: '/logos/tuf.png', label: 'TUF' },
        interviewbit: { icon: '/logos/interviewbit.png', label: 'InterviewBit' },
    };

    const p = platform?.toLowerCase() || '';
    const c = Object.keys(config).find(k => p.includes(k));
    const platformInfo = c ? config[c] : null;

    if (platformInfo) {
        const content = (
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-900/5 hover:bg-yellow-900/10 transition-all group/badge" title={platformInfo.label}>
                <img src={platformInfo.icon} alt={platformInfo.label} className="w-5 h-5 object-contain opacity-70 group-hover/badge:opacity-100 transition-opacity" />
            </div>
        );

        if (link) {
            return (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="block"
                >
                    {content}
                </a>
            );
        }
        return content;
    }

    return (
        <Badge variant="magical">
            {platform?.slice(0, 3) || '?'}
        </Badge>
    );
};

// Tag Pill
export const TagPill = ({ tag, color = 'text-yellow-700', bg = 'bg-[#0c1428]', className = '' }) => (
    <span className={`px-2 py-0.5 ${bg} ${color} text-[9px] font-black uppercase tracking-widest rounded-full border border-yellow-900/20 font-magical ${className}`}>
        {tag}
    </span>
);
