import { io } from 'socket.io-client';

export const socket = io('https://valentine-be.onrender.com', {
    autoConnect: false,
    withCredentials: true,
});
