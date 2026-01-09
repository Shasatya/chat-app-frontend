import { io } from "socket.io-client";

const baseURL = import.meta.env.VITE_BASE_URL;

let socket;

export const connectSocket = (token) => {
  if (socket?.connected) return socket;

  socket = io(baseURL, {
    auth: { token },
  });

  socket.on("connect", () => {
    console.log("Connected to Socket Server:", socket.id);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
