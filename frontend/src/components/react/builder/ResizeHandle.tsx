import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GripVertical } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface ResizeHandleProps {
    onResize: (delta: number) => void;
    direction?: 'horizontal' | 'vertical';
    className?: string;
}

export const ResizeHandle = ({
    onResize,
    direction = 'horizontal',
    className
}: ResizeHandleProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const lastPosition = useRef<number>(0);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        lastPosition.current = direction === 'horizontal' ? e.clientX : e.clientY;
    }, [direction]);

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            const currentPosition = direction === 'horizontal' ? e.clientX : e.clientY;
            const delta = currentPosition - lastPosition.current;
            lastPosition.current = currentPosition;
            onResize(delta);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, onResize, direction]);

    return (
        <div
            className={cn(
                "group flex items-center justify-center transition-colors shrink-0",
                direction === 'horizontal'
                    ? "w-1.5 cursor-col-resize hover:bg-violet-500/30"
                    : "h-1.5 cursor-row-resize hover:bg-violet-500/30",
                isDragging && "bg-violet-500/50",
                className
            )}
            onMouseDown={handleMouseDown}
        >
            {direction === 'horizontal' && (
                <div className={cn(
                    "w-1 h-8 rounded-full transition-all",
                    isDragging
                        ? "bg-violet-500"
                        : "bg-white/10 group-hover:bg-violet-500/50"
                )} />
            )}
        </div>
    );
};
