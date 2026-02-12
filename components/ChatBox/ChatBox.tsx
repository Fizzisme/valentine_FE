'use client'

import { useEffect, useRef, useState } from 'react'
import { socket } from '@/ultils/socket'
import { Heart, Image as ImageIcon, Smile, X } from 'lucide-react'
import Message from '@/components/Message/Message';
import Image from 'next/image'

interface Message {
    id: string
    from: string
    text: string
}

interface User {
    name: string
}

export default function ChatBox() {
    const styles = {
        borderColor: '#ff9bb0',
        bgColor: '#ffe8f5',
        textColor: '#bf5a7a',
    }

    const [user, setUser] = useState<User | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const bottomRef = useRef<HTMLDivElement | null>(null)

    const receiver = user?.name === 'Fizzisme' ? 'JulieCute' : 'Fizzisme'

    // load user
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) return

        const parsed = JSON.parse(storedUser)
        setUser(parsed)

        setMessages([
            {
                id: 'init',
                from: parsed.name === 'Fizzisme' ? 'JulieCute' : 'Fizzisme',
                text:
                    parsed.name === 'Fizzisme'
                        ? 'Chào Fizz, em là Gấu Trúc đây 🐼'
                        : 'Chào Julie, anh là Fizzisme đây. 1 siêu AI được train ra để làm em hạnh phúc <3 <3 <3',
            },
        ])
    }, [])

    // scroll bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // socket
    useEffect(() => {
        if (!user) return

        socket.connect()
        socket.emit('user:online', user.name)

        socket.on('chat:receive', (data: { message: string }) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    from: receiver!,
                    text: data.message,
                },
            ])
        })

        return () => {
            socket.off('chat:receive')
            socket.disconnect()
        }
    }, [user, receiver])

    const sendMessage = () => {
        if (!input.trim() || !user) return

        setMessages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), from: user.name, text: input },
        ])

        socket.emit('chat:send', {
            from: user.name,
            to: receiver,
            message: input,
        })

        setInput('')
    }

    if (!user) return null

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div
                className="relative w-[550px] p-5 rounded-[30px] bg-white"
                style={{
                    border: `3px solid #F283AF`,
                    boxShadow: '0 10px 25px rgba(255, 155, 176, 0.3)',
                }}
            >
                {/* TOP */}
                <div className="flex gap-4 h-[240px]">
                    {/* CHAT AREA */}
                    <div className="flex-1 relative rounded-2xl overflow-hidden bg-black/5">
                        <div
                            className="absolute inset-0 rounded-2xl border-[2px]"
                        />

                        <div className="absolute inset-0 p-4 overflow-y-auto flex flex-col gap-3 bg-[#FBF4EB]"
                        style={{backgroundColor: '#FBF4EB', border: '2px solid #F283AF'}}
                        >
                            {messages.map((msg) => {
                                const isMe = msg.from === user.name

                                return (
                                    <div
                                        key={msg.id}
                                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                    >

                                        <Message
                                            name={msg.from}
                                            message={msg.text}
                                            isMe={msg.from === user.name}
                                        />
                                    </div>
                                )
                            })}
                            <div ref={bottomRef} />
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <div className="flex flex-col gap-3 w-[80px]">
                        <div
                            className="h-[80px] rounded-2xl flex items-center justify-center border-[2px] overflow-hidden"
                            style={{ borderColor: '#F283AF', background: styles.bgColor }}
                        >
                            <Image src={'/FiCuTo.jpg'} alt={'FI cu to'} height={80} width={80} />
                        </div>

                        <div className="grid grid-cols-2 gap-2 flex-1">
                            {[Heart, ImageIcon, Smile, X].map((Icon, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-center rounded-xl bg-white border-[2px]"
                                    style={{ borderColor: '#F283AF' }}
                                >
                                    <Icon size={18} color="#F283AF" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* INPUT */}
                <div className="flex gap-3 mt-5 relative">
                    <div
                        className="w-[64px] h-[64px] top-[-10px] rounded-full relative cursor-pointer active:scale-95 transition"
                        style={{
                            background: `#ffddd4`,
                            border: "3px solid #F283AF",
                            boxShadow: `
      8px 8px 18px rgba(255,120,170,0.45),
      -6px -6px 14px rgba(255,255,255,0.9),
      inset 3px 3px 6px rgba(255,255,255,0.8),
      inset -4px -4px 10px rgba(255,120,170,0.35)
    `
                        }}
                    >
                        {/* lõi trong tạo cảm giác lõm */}
                        <div
                            className="absolute inset-[10px] rounded-full"
                            style={{
                                background: "#ffddd4",
                                boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.15)"
                            }}
                        />

                        {/* vạch chỉ hướng giống nút volume */}
                        <div
                            className="absolute left-1/2 top-[6px] w-[3px] h-[14px] rounded"
                            style={{
                                transform: "translateX(-50%)",
                                background: "#F283AF",
                                boxShadow: "0 0 4px rgba(255,95,162,0.6)"
                            }}
                        />
                    </div>



                    <div className="flex-1 relative">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder={`Nhắn cho ${receiver}...`}
                            className="w-full rounded-2xl border-[2px] px-5 py-3 outline-none"
                            style={{
                                borderColor: '#F283AF',
                                background: '#ffddd4',
                                color: '#ff44a3'
                            }}
                        />
                    </div>

                    <button
                        onClick={sendMessage}
                        className="absolute -bottom-2 -right-2"
                    >
                        <Image
                            src="/heartPink.png"
                            alt="send"
                            width={45}
                            height={45}
                            className="rotate-12 cursor-pointer hover:scale-110 transition"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}
