'use client'
import DoorScene from '@/components/DoorScene/DoorScene';
import { useState } from 'react';
import ChatBox from '@/components/ChatBox/ChatBox';
import Message from '@/components/Message/Message';
import TestChatBox from '@/components/TestChatBox/TestChatBox';
type Scene = 'date' | 'intro' | 'login' | 'door' | 'gallery' | 'chat'
export default function TestPage() {
    const [isDoorOpen, setIsDoorOpen] = useState(false);
    const [scene, setScene] = useState<
        Scene
    >('date');
  return (
    <div>
        <TestChatBox/>
    </div>
  );
};