import React, { useState, useEffect } from 'react';

export default function ScrollProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                setProgress((scrollTop / docHeight) * 100);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none">
            <div
                className="h-full transition-[width] duration-150 ease-out"
                style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #0ea5e9, #7c3aed, #ec4899)',
                }}
            />
        </div>
    );
}
