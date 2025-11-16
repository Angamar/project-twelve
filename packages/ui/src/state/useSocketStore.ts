import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  messages: { sender: string; message: string }[];
  roomId: string;
  connect: (roomId: string) => void;
  disconnect: () => void;
  sendMessage: (message: string) => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  messages: [],
  roomId: "",

  connect: (roomId) => {
    if (get().socket) return;

    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      set({ isConnected: true, roomId });
      socket.emit("joinRoom", roomId);
    });

    socket.on("roomMessage", (message) => {
      set((state) => ({ messages: [...state.messages, message] }));
    });

    socket.on("disconnect", () => {
      set({ isConnected: false });
    });

    set({ socket });
  },

  disconnect: () => {
    set((state) => {
      state.socket?.disconnect();
      return { socket: null, isConnected: false };
    });
  },

  sendPing: () => {
    set((state) => {
      state.socket?.emit("pingFromClient", "ping from Zustand");
      return state;
    });
  },

  sendMessage: (message) => {
    const { socket, roomId } = get();
    if (socket && roomId) {
      socket.emit("sendMessage", { roomId, message });
    }
  },
}));
