'use client'

import { useEffect, useRef, useState } from 'react'
import { socket } from '@/ultils/socket'
import { Heart, Image as ImageIcon, Smile, X } from 'lucide-react'
import Message from '@/components/Message/Message';
import Image from 'next/image'
import ChatBox from '@/components/ChatBox/ChatBox';

interface Message {
    id: string
    from: string
    text: string
}

interface User {
    name: string
}

export default function TestChatBox() {
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
       <><ChatBox/></>
    )
}
