'use client';
import { useEffect } from 'react';
import { SlidingNumber } from '@/components/animate-ui/primitives/texts/sliding-number';

export function AnimatedDate({ onDone }: { onDone: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onDone, 4000);
        return () => clearTimeout(timer);
    }, [onDone]);
    return (
        <div className="flex items-center gap-2 text-4xl font-semibold text-[#FBF4EB]"
        style={{height: '100px'}}
        >
            {/* Day */}
            <SlidingNumber fromNumber={0} number={14} />

            <span>-</span>

            {/* Month */}
            <SlidingNumber fromNumber={0} number={2} />

            <span>-</span>

            {/* Year */}
            <SlidingNumber fromNumber={2005} number={2026} />
        </div>
    );
}
