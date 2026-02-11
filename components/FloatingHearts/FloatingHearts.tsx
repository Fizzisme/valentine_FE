'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

type Particle = {
    id: number;
    left: number;
    size: number;
    duration: number;
    drift: number;
};

export default function FloatingHearts() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setParticles((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    left: Math.random() * 100,
                    size: Math.random() * 16 + 16,
                    duration: Math.random() * 4 + 6,
                    drift: Math.random() * 80 - 40,
                },
            ]);
        }, 700);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{
                            opacity: 0,
                            y: 50,
                            scale: 0.6,
                        }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            y: '-110vh',
                            x: p.drift,
                            scale: [0.8, 1, 1.1, 1],
                        }}
                        transition={{
                            duration: p.duration,
                            ease: 'easeOut',
                        }}
                        onAnimationComplete={() =>
                            setParticles((prev) =>
                                prev.filter((item) => item.id !== p.id)
                            )
                        }
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: `${p.left}%`,
                        }}
                    >
                        <Heart
                            size={p.size}
                            className="text-pink-500 drop-shadow-lg"
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
