import React from 'react';

interface HoneyDripDividerProps {
    className?: string;
}

export const HoneyDripDivider: React.FC<HoneyDripDividerProps> = ({ className = '' }) => {
    return (
        <div
            aria-hidden="true"
            className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}
        >
            <svg
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="relative block w-full h-12 sm:h-20 md:h-28 lg:h-32 drop-shadow-[0_10px_8px_rgba(0,0,0,0.12)]"
            >
                <defs>
                    <linearGradient id="honeyDripGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#d97706" />    {/* amber-600 */}
                        <stop offset="45%" stopColor="#f59e0b" />   {/* amber-500 */}
                        <stop offset="100%" stopColor="#fbbf24" />  {/* amber-400 */}
                    </linearGradient>
                </defs>
                <path
                    d="M0,0 L1440,0 L1440,32 Q1380,88 1320,32 Q1260,105 1200,40 Q1130,118 1060,45 Q990,15 920,65 Q850,115 780,35 Q710,95 640,30 Q570,122 500,48 Q430,10 360,55 Q290,110 220,38 Q150,98 80,42 L0,32 Z"
                    fill="url(#honeyDripGrad)"
                />
            </svg>
        </div>
    );
};

export default HoneyDripDivider;
