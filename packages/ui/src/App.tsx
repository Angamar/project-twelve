import { useEffect, useState } from "react";
import { useSocketStore } from "./state/useSocketStore";

export default function App() {
  const { isConnected, messages, connect, disconnect, sendMessage } =
    useSocketStore();
  const [input, setInput] = useState("");
  const roomId = "game-123";

  useEffect(() => {
    connect(roomId);
    return () => disconnect();
  }, [connect, disconnect]);

  const handleSend = () => {
    if (input.trim() === "") return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div
      style={{ maxWidth: 400, margin: "auto", fontFamily: "Arial, sans-serif" }}
    >
      <h2>Socket.IO Two-Player Chat (Room: {roomId})</h2>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>

      <div
        style={{
          border: "1px solid #ccc",
          height: 200,
          overflowY: "auto",
          padding: 10,
          marginBottom: 10,
          // background: "#f9f9f9",
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.sender === "Server" ? "Server" : m.sender.slice(0, 6)}</b>:{" "}
            {m.message}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={!isConnected}
        style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
        placeholder={isConnected ? "Type message..." : "Connecting..."}
      />

      <button
        onClick={handleSend}
        disabled={!isConnected || input.trim() === ""}
        style={{ marginTop: 8 }}
      >
        Send
      </button>
    </div>
  );
}
