import { io } from "socket.io-client";

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("https://collaborative-whiteboard-main-1.onrender.com", {
      transports: ["websocket"],
      autoConnect: true,
    });
  }

  return socket;
};