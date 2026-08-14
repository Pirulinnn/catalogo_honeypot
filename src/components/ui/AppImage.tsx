'use client';

import React, { useState } from 'react';

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    fallbackSrc?: string;
    className?: string;
}

export default function AppImage({
    src,
    alt,
    fallbackSrc = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
    className = '',
    ...props
}: AppImageProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setImgSrc(fallbackSrc);
        }
    };

    return (
        // Standard img tag to work smoothly in Vite or Next.js without remote pattern configuration issues
        <img
            src={imgSrc}
            alt={alt}
            onError={handleError}
            className={className}
            loading="lazy"
            {...props}
        />
    );
}
