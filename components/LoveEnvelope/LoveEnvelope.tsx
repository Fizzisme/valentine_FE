"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Định nghĩa kiểu cho props để TypeScript không báo lỗi
interface LoveEnvelopeProps {
    onZoomComplete: () => void;
}

export default function LoveEnvelope({ onZoomComplete }: LoveEnvelopeProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-pink-100 overflow-hidden relative">

            <motion.div
                onClick={() => setOpen(true)}
                className="cursor-pointer z-10 relative"

                // Trạng thái Animation
                animate={open ? {
                    scale: 30,
                    opacity: 0,
                } : {
                    scale: 1,
                    opacity: 1,
                }}

                // Cấu hình thời gian chạy
                transition={{
                    duration: 1.2,
                    ease: [0.42, 0, 0.58, 1]
                }}

                // QUAN TRỌNG: Hàm này chạy khi Animation kết thúc
                onAnimationComplete={() => {
                    // Chỉ gọi khi trạng thái là 'open' (đã mở thư)
                    if (open) {
                        onZoomComplete();
                    }
                }}
            >
                <Image
                    src={'/envelope.png'}
                    alt={'envelope'}
                    height={350}
                    width={350}
                    className="drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                    priority
                />
            </motion.div>

        </div>
    );
}