import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`glass-card rounded-2xl transition-all duration-500 overflow-hidden ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export const ManuscriptCard = ({ children, className = '', ...props }) => {
    return (
        <Card
            className={`relative group bg-[#0c1428]/80 hover:bg-[#0c1428] border-[#ffd70033] ${className}`}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/5 to-transparent pointer-events-none" />
            {children}
        </Card>
    );
};
