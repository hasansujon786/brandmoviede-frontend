"use client";

import constants from "@/constant";
import { useGetAdminNotificationsQuery } from "@/redux/features/admin/nofiticationApis";
import { useAuth } from "@/redux/features/auth/hooks";
import { ISocketEmmitData } from "@/types/admin/socket";
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
  const { refetch: refetchNotifications } = useGetAdminNotificationsQuery();

  // Event handlers map
  const eventHandlers = {
    lowBalanceAlert: (data: ISocketEmmitData) => {
      refetchNotifications();
      toast.error(`Low balance: ${data.text}`);
      setHasNewNotification(true);
    },

    crossOwnerBalance: (data: ISocketEmmitData) => {
      console.log("crossOwnerBalance:", data);
    },

    clientCoinPurchase: (data: ISocketEmmitData) => {
      console.log("clientCoinPurchase:", data);
      setHasNewNotification(true);
    },

    paymentDone: (data: ISocketEmmitData) => {
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

    const socket = io(constants.socketURL, {
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
