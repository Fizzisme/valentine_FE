'use client';

import { motion } from 'framer-motion';

export default function DoorScene({
                                      isOpen,
                                      onOpen,
                                      onZoomComplete,
                                  }: {
    isOpen: boolean;
    onOpen: () => void;
    onZoomComplete: () => void;
}) {
    return (
        <motion.div
            className="flex items-center justify-center w-screen h-screen
            bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200"
            animate={{
                scale: isOpen ? 3 : 1,
                opacity: isOpen ? 0 : 1,
            }}
            transition={{
                duration: isOpen ? 2.5 : 0.8,
                ease: [0.32, 0.72, 0, 1],
            }}
            onAnimationComplete={() => {
                if (isOpen) {
                    onZoomComplete();
                }
            }}
        >
            <div className="[perspective:1500px] relative z-10">
                <div
                    className="relative w-72 h-[420px] p-4
                    bg-gradient-to-b from-pink-400 to-rose-500
                    rounded-t-[150px] shadow-2xl overflow-hidden"
                >
                    <motion.div
                        onClick={onOpen}
                        animate={{ rotateY: isOpen ? -140 : 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 60,
                            damping: 18,
                        }}
                        className="relative w-full h-full cursor-pointer
                        [transform-origin:left]
                        [transform-style:preserve-3d]"
                    >
                        {/* MẶT TRƯỚC */}
                        <div
                            className="absolute w-full h-full
                            bg-gradient-to-br from-pink-300 via-rose-300 to-pink-400
                            rounded-t-[140px]
                            [backface-visibility:hidden]
                            flex flex-col items-center p-6
                            border-4 border-white/60 shadow-inner"
                        >
                            <div className="mt-10 w-32 h-32 rotate-45 bg-pink-100 rounded-xl border-4 border-white" />

                            <p className="mt-6 text-white font-semibold text-lg drop-shadow">
                                Open my heart 💕
                            </p>
                        </div>

                        {/* MẶT SAU */}
                        <div
                            className="absolute w-full h-full
                            bg-gradient-to-br from-pink-400 to-rose-500
                            rounded-t-[140px]
                            [transform:rotateY(180deg)]
                            [backface-visibility:hidden]"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
