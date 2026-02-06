"use client";

import constants from "@/constant";
import { useGetAdminNotificationsQuery } from "@/redux/features/admin/nofiticationApis";
import { useGetAppNotificationsQuery } from "@/redux/features/app/notificationApis";
import { useAuth } from "@/redux/features/auth/hooks";
import { RoleUtils } from "@/types";
import { ISocketEmmitData } from "@/types/admin/socket";
import { skipToken } from "@reduxjs/toolkit/query";
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
  const { token, isAuthenticated, role } = useAuth();

  const isAdmin = RoleUtils.isAdmin(role);
  const isUser = RoleUtils.isUser(role);
  const socketRef = useRef<Socket | null>(null);

  const [hasNewNotification, setHasNewNotification] = useState(false);

  const { refetch: refetchNotifications } = useGetAdminNotificationsQuery(
    isAdmin ? undefined : skipToken,
  );
  const { refetch: refetchUserNotification } = useGetAppNotificationsQuery(
    isUser ? undefined : skipToken,
  );

  // Event handlers map
  const eventHandlers = {
    lowBalanceAlert: (data: ISocketEmmitData) => {
      // admin
      if (isAdmin) refetchNotifications();
      toast.error(`Low balance: ${data.text}`);
    },

    crossOwnerBalance: (data: ISocketEmmitData) => {
      // admin
      if (isAdmin) refetchNotifications();
    },

    clientCoinPurchase: (data: ISocketEmmitData) => {
      // admin
      if (isAdmin) refetchNotifications();
    },

    clientTicketPurchase: (data: ISocketEmmitData) => {
      // admin
      if (isAdmin) refetchNotifications();
    },

    paymentDone: (data: ISocketEmmitData) => {
      // user & admin
      if (isAdmin) refetchNotifications();
      if (isUser) refetchUserNotification();

      console.log("paymentDone:", data);
    },

    coinTransferFailed: (data: ISocketEmmitData) => {
      // user & admin
      if (isAdmin) refetchNotifications();
      if (isUser) refetchUserNotification();
    },
    coinTransferDone: (data: ISocketEmmitData) => {
      // user & admin
      if (isAdmin) refetchNotifications();
      if (isUser) refetchUserNotification();
    },
  };

  const registerAppEvents = useEffectEvent((socket: Socket) => {
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socket.on(event, (data) => {
        console.warn("Event fired", event, data);
        setHasNewNotification(true);
        handler(data);
      });
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
