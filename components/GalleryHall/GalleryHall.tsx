'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const images = [
    { id: 1, src: '/Truc1.jpg', caption: 'The day you smiled at me 🌸' },
    { id: 2, src: '/Truc2.jpg', caption: 'The day you smiled at me 🌸' },
    { id: 3, src: '/FTRUC.jpg', caption: 'The day you smiled at me 🌸' },
    { id: 4, src: '/FTRUC1.jpg', caption: 'Our little happy moment 💕' },
    { id: 5, src: '/FTRUC2.jpg', caption: 'Every second with you matters ✨' },
    { id: 6, src: '/FTRUC3.jpg', caption: 'You are my favorite person 💖' },
];

export default function GalleryHall({
                                        onComplete,
                                    }: {
    onComplete: () => void;
}) {
    const [index, setIndex] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (finished) return;

        const timer = setTimeout(() => {
            if (index === images.length - 1) {
                // Khi tới ảnh cuối → kích hoạt exit
                setFinished(true);
            } else {
                setIndex((prev) => prev + 1);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [index, finished]);

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-black-0.5 overflow-hidden">
            <AnimatePresence
                mode="wait"
                onExitComplete={() => {
                    if (finished) {
                        onComplete(); // gọi parent sau khi exit xong
                    }
                }}
            >
                {!finished && (
                    <motion.div
                        key={images[index].id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.6 }}
                        transition={{ duration: 1.5 }}
                        className="absolute"
                    >
                        <Image
                            src={images[index].src}
                            alt={images[index].caption}
                            width={500}
                            height={400}
                            className="object-contain rounded-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
