'use client';

import { useEffect, useRef, useState } from 'react';
import { socket } from '@/ultils/socket';
import { Fish, HeartPulse, Panda } from 'lucide-react';

interface Message {
    id: string;
    from: string;
    text: string;
}

interface User {
    name: string;
}

export default function ChatBox() {
    // Khởi tạo state user
    const [user, setUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement | null>(null);

    // 1. Lấy user từ localStorage khi component mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            // Set tin nhắn chào hỏi ban đầu dựa trên user
            setMessages([
                {
                    id: 'init',
                    // Nếu mình là Fizzisme thì tin nhắn mẫu là của JulieCute và ngược lại
                    from: parsedUser.name === 'Fizzisme' ? 'JulieCute' : 'Fizzisme',
                    text: parsedUser.name === 'Fizzisme'
                        ? 'Chào Fizz, em là Gấu Trúc đây 🐼'
                        : 'Chào Julie, anh là Cá đây 1 siêu AI được train để làm em hạnh phúc'
                },
            ]);
        }
    }, []);

    // Xác định tên người nhận (Người kia)
    // Nếu mình là Fizzisme -> người kia là JulieCute, và ngược lại
    const receiver = user?.name === 'Fizzisme' ? 'JulieCute' : 'Fizzisme';

    // 2. Scroll xuống dưới khi có tin nhắn mới
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // 3. Kết nối socket
    useEffect(() => {
        if (!user) return;

        socket.connect();
        socket.emit('user:online', user.name);

        // KHI NHẬN TIN NHẮN
        socket.on('chat:receive', (data: { message: string }) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    // QUAN TRỌNG: Tin nhắn nhận được CHẮC CHẮN là của người kia (receiver)
                    // Không cần quan tâm server gửi về 'from' là gì
                    from: receiver,
                    text: data.message,
                },
            ]);
        });

        return () => {
            socket.off('chat:receive');
            socket.disconnect();
        };
    }, [user, receiver]); // Thêm receiver vào dependency

    const sendMessage = () => {
        if (!input.trim() || !user) return;

        const newMessage: Message = {
            id: crypto.randomUUID(),
            from: user.name, // Tin nhắn gửi đi là của chính mình
            text: input,
        };

        setMessages((prev) => [...prev, newMessage]);

        socket.emit('chat:send', {
            from: user.name,
            to: receiver,
            message: input,
        });

        setInput('');
    };

    // Hàm render Icon dựa trên TÊN CỤ THỂ (Hardcode logic hiển thị)
    const renderAvatar = (name: string, isMyMessage: boolean) => {
        // Kiểm tra chính xác tên để quyết định Icon
        const isFish = name === 'Fizzisme';
        const isPanda = name === 'JulieCute';

        // Nếu tên không khớp cả 2 thì mặc định (phòng hờ)
        if (!isFish && !isPanda) return null;

        return (
            <div className={`flex flex-col items-center gap-1 min-w-[50px] ${isMyMessage ? 'order-last ml-2' : 'mr-2'}`}>
                {/* Tên hiển thị */}
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                    {isFish ? 'Fizz' : 'Julie'}
                </span>

                {/* Icon */}
                <div className={`p-2 rounded-full border shadow-sm ${isFish ? 'bg-blue-100 text-blue-400' : 'bg-pink-100 text-pink-600'}`}>
                    {isFish ? <Fish size={20} /> : <Panda size={20} />}
                </div>
            </div>
        );
    };

    if (!user) return <div className="p-4 text-center">Loading...</div>;

    return (
        <div
            className="w-full max-w-md h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-pink-200"
            style={{zIndex: '999'}}
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white text-center py-4 font-semibold text-lg flex justify-center items-center gap-2">
                <span>Love Chat</span>
                <Fish size={18} />
                <HeartPulse size={20} className="animate-pulse"/>
                <Panda size={18} />
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-pink-50">
                {messages.map((msg) => {
                    // Kiểm tra xem tin nhắn này có phải của mình (user đang login) không
                    const isMe = msg.from === user.name;

                    return (
                        <div
                            key={msg.id}
                            className={`flex items-end ${isMe ? 'justify-end' : 'justify-start'}`}
                        >
                            {/* Render Avatar: Truyền đúng tên người gửi tin nhắn (msg.from) */}
                            {renderAvatar(msg.from, isMe)}

                            <div
                                className={`max-w-[65%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                                    isMe
                                        ? 'bg-pink-500 text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            {/* Footer */}
            <div className="flex p-3 border-t bg-white items-center gap-2">
                <input
                    className="flex-1 bg-gray-100 border-transparent rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-300 transition-all"
                    placeholder={`Nhắn cho ${receiver}...`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="bg-pink-500 text-white p-2.5 rounded-full hover:bg-pink-600 transition shadow-lg"
                >
                    <HeartPulse size={18} />
                </button>
            </div>
        </div>
    );
}