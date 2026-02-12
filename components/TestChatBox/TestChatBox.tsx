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

    return (
        <>
        <ChatBox/>
            </>
    )
}
