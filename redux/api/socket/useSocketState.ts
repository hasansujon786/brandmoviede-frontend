import { useContext } from "react";
import { SocketContext } from "./SocketProvider";

export function useSocketState() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
}
