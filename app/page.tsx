'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from '@/components/LoginForm/LoginForm';
import { AnimatedDate } from '@/components/AnimatedDate/AnimatedDate';
import { IntroText } from '@/components/IntroText/IntroText';
import FloatingHearts from '@/components/FloatingHearts/FloatingHearts';
import GalleryHall from '@/components/GalleryHall/GalleryHall';
import ChatBox from '@/components/ChatBox/ChatBox';
import LoveEnvelope from '@/components/LoveEnvelope/LoveEnvelope';
type Scene = 'date' | 'intro' | 'login' | 'envelope' | 'gallery' | 'chat'

export default function Home() {

    const [scene, setScene] = useState<
        Scene
    >('date');

    return (
        <main
            className="min-h-screen flex items-center justify-center
      bg-[#FAC1B5]"
        >
            <AnimatePresence mode="wait">
                {/* 🗓 STEP 1: DATE */}
                {scene === 'date' && (
                    <motion.div
                        key="date"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <AnimatedDate onDone={() => setScene('intro')} />
                    </motion.div>
                )}

                {/* 💬 STEP 2: INTRO TEXT */}
                {scene === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <IntroText onDone={() => setScene('login')} />
                    </motion.div>
                )}

                {/* 🔐 STEP 3: LOGIN */}
                {scene === 'login' && (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <LoginForm onSuccess ={()=> setScene('envelope')} />
                    </motion.div>
                )}

                {scene === 'envelope' && (
                    <motion.div
                        key="envelope"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <FloatingHearts/>
                        <LoveEnvelope onZoomComplete={() => setScene('gallery')}/>
                    </motion.div>
                )}

                {scene === 'gallery' && (
                    <motion.div
                        key="gallery"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <FloatingHearts />
                        <GalleryHall onComplete={() => setScene('chat')} />
                    </motion.div>
                )}
                {scene === 'chat' && (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <FloatingHearts />
                        <ChatBox />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
