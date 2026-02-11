'use client';
import { useEffect, useState } from 'react';
import { socket } from '@/ultils/socket';

export default function chatTestPage() {
    const [msg, setMsg] = useState('');
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        socket.connect();
        socket.emit('user:online', 'Fizzisme');

        socket.on('chat:receive', (data) => {
            setLogs((prev) => [...prev, `💬 ${data.message}`]);
        });

        return () => socket.disconnect();
    }, []);

    const send = () => {
        socket.emit('chat:send', {
            to: 'JulieCute',
            message: msg,
        });
        setMsg('');
    };

    return (
        <div>
            <h2>Chat test</h2>
            <input value={msg} onChange={(e) => setMsg(e.target.value)} />
            <button onClick={send}>Send</button>

            <div>
                {logs.map((l, i) => (
                    <div key={i}>{l}</div>
                ))}
            </div>
        </div>
    );
}
