'use client';

import { RotatingText, RotatingTextContainer } from '@/components/animate-ui/primitives/texts/rotating';
import { useEffect } from 'react';



export function IntroText({ onDone }: { onDone: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onDone, 8000);
        return () => clearTimeout(timer);
    }, [onDone]);
    return (
        <div className="flex items-center justify-center min-h-screen">
            <RotatingTextContainer
                className="text-4xl font-semibold text-pink-600 text-center"
                style={{ width: "1200px", height: '100px' }}
                text={[
                    '',
                    'Hi babyboo',
                    'This website is made just for you',
                    'A place filled with love and warmth',
                    'Every little thing here is for you',
                ]}
            >
                <RotatingText />
            </RotatingTextContainer>
        </div>
    );
}
