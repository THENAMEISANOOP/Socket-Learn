import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function makeRoom(a, b) {
  return [a.toLowerCase(), b.toLowerCase()].sort().join("_");
}

const ChatBox = ({ user, chatUser }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const roomId = makeRoom(user, chatUser);

  // Join room on mount
  useEffect(() => {
    socket.emit("joinRoom", { roomId });
  }, [roomId]);

  // Load old messages only from THIS private room
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/messages?roomId=${roomId}`)
      .then((res) => setMessages(res.data))
      .catch(console.log);
  }, [roomId]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receivePrivateMessage", (data) => {
      setMessages((prev) => [...prev, data.message]);
    });
    return () => socket.off("receivePrivateMessage");
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const newMsg = { user, text, roomId };

    await axios.post("http://localhost:5000/api/messages", newMsg);
    socket.emit("sendPrivateMessage", { roomId, message: newMsg });

    setText("");
  };

  return (
    <div>
      <h3>Chat: {user} ↔ {chatUser}</h3>

      {messages.map((m, i) => (
        <div key={i}><b>{m.user}:</b> {m.text}</div>
      ))}

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
