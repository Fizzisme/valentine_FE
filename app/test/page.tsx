'use client';
import { socket } from '@/ultils/socket';
import { useEffect } from 'react';

export default function TestPage() {
    useEffect(() => {
        socket.connect();

        socket.emit('user:online', 'Fizzisme');

        return () => {
            socket.disconnect();
        };
    }, []);
    return <h1>Socket test</h1>;
}
