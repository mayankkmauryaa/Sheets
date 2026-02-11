import React from 'react';

export const Progress = ({ value = 0, max = 100, className = '' }) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

    return (
        <div className={`h-1 bg-[#050a14] rounded-full overflow-hidden ${className}`}>
            <div
                className="h-full bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 rounded-full transition-all duration-1000 progress-bar-animated"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
};

export const ProgressInfo = ({ completed, total, className = '' }) => (
    <span className={`text-[10px] font-black text-yellow-600 uppercase tracking-widest font-magical ${className}`}>
        {completed} / {total} Completed
    </span>
);
