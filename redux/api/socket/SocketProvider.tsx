"use client";

import { useAuth } from "@/redux/features/auth/hooks";
import {
  createContext,
  ReactNode,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

// const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;
const SOCKET_URL = "http://192.168.7.42:4008"; // or env var

type SocketContextType = {
  socket: Socket | null;
  hasNewNotification: boolean;
  clearNotification: () => void;
};

export const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
  const { token, isAuthenticated } = useAuth();

  const socketRef = useRef<Socket | null>(null);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  // Event handlers map
  const eventHandlers = {
    crossOwnerBalance: (data: any) => {
      console.log("crossOwnerBalance:", data);
    },

    lowBalanceAlert: (data: any) => {
      console.log("lowBalanceAlert from provider:", data);
      toast.message(`Low balance: ${JSON.stringify(data, null, 2)}`);
      setHasNewNotification(true);
    },

    clientCoinPurchase: (data: any) => {
      console.log("clientCoinPurchase:", data);
      setHasNewNotification(true);
    },

    paymentDone: (data: any) => {
      console.log("paymentDone:", data);
      setHasNewNotification(true);
    },
  };

  const registerAppEvents = useEffectEvent((socket: Socket) => {
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });
  });

  const removeAppEvents = useEffectEvent((socket: Socket) => {
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.off(event, handler);
    });
  });

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    // Prevent duplicate connections
    if (socketRef.current) return;

    const socket = io(SOCKET_URL, {
      extraHeaders: {
        authorization: `Bearer ${token}`,
      },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket error:", err.message);
    });

    // Register all events
    registerAppEvents(socket);

    return () => {
      removeAppEvents(socket);

      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAuthenticated, token]);

  return (
    <SocketContext.Provider
      value={{
        socket: null,
        hasNewNotification,
        clearNotification: () => setHasNewNotification(false),
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
