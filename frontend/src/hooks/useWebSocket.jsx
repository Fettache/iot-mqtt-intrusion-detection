import { useWebSocketContext } from "../context/WebSocketContext";

function useWebSocket() {
  return useWebSocketContext();
}

export default useWebSocket;
