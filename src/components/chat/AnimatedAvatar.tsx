'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Frame Mapping
// 0-4: Idle (Breathing/Floating)
// 5-8: Talking (Hand gestures)
// 9-11: Thinking (Crossed arms/Pondering)

type AvatarState = 'idle' | 'talking' | 'thinking';

interface AnimatedAvatarProps {
    state?: AvatarState;
    className?: string;
    width?: number;
    height?: number;
}

export function AnimatedAvatar({
    state = 'idle',
    className,
    width = 350,
    height = 350
}: AnimatedAvatarProps) {
    const [frameIndex, setFrameIndex] = useState(0);

    // Define animation ranges for 3x3 grid (9 frames)
    // Row 1: Idle (0-2)
    // Row 2: Talking (3-5)
    // Row 3: Thinking (6-8)
    const getFrames = (state: AvatarState) => {
        switch (state) {
            case 'talking':
                return [3, 4, 5];
            case 'thinking':
                return [6, 7, 8];
            case 'idle':
            default:
                return [0, 1, 2];
        }
    };

    useEffect(() => {
        const frames = getFrames(state);
        let currentIndex = 0;

        setFrameIndex(frames[0]);

        // Very stable interval
        const intervalMs = state === 'talking' ? 250 : 800;

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % frames.length;
            setFrameIndex(frames[currentIndex]);
        }, intervalMs);

        return () => clearInterval(interval);
    }, [state]);

    return (
        <div
            className={cn("relative overflow-hidden flex items-center justify-center shrink-0", className)}
            style={{ width, height }}
        >
            <Image
                src={`/avatar/frame_${frameIndex}.png`}
                alt="Bot Avatar"
                fill
                className="object-contain"
                priority
            />
        </div>
    );
}
