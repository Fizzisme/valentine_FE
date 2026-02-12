import Image from 'next/image'

interface MessageProps {
    name: string
    message: string
    isMe: boolean
}

export default function Message({ name, message, isMe }: MessageProps) {
    return (
        <div
            className={`relative inline-block mt-4 max-w-[250px] ${
                isMe ? 'mr-2 self-end' : 'ml-2 self-start'
            }`}
        >
            {/* NAME TAG */}
            <div
                className={`absolute -top-3 z-10 flex items-center gap-1 rounded-full border-[2px] border-[#ff9bb0] bg-white px-3 py-[2px] shadow-sm ${
                    isMe ? 'right-4' : 'left-4'
                }`}
            >
                <span className="text-xs font-bold text-[#ff9bb0] uppercase tracking-wide">
                    {name}
                </span>
            </div>

            {/* MESSAGE BOX */}
            <div className="relative rounded-2xl border-[2px] border-[#ff9bb0] bg-[#ffe8f5] px-5 py-3 pt-4 text-[#bf5a7a] shadow-sm">
                <p className="font-medium text-sm leading-relaxed break-words whitespace-pre-wrap">
                    {message}
                </p>
            </div>

            {/* HEART */}
            <div
                className={`absolute -bottom-3 z-20 drop-shadow-md ${
                    isMe ? '-left-3' : '-right-3'
                }`}
            >
                <Image
                    src="/heartPink.png"
                    alt="heart"
                    width={40}
                    height={40}
                    className={`object-contain ${isMe ? '-rotate-12' : 'rotate-12'}`}
                />
            </div>
        </div>
    )
}
