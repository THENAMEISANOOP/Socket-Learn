import { useState } from "react";
import UserLogin from "./components/UserLogin";
import ChatBox from "./components/ChatBox";
import UserList from "./components/UserList";



function App() {
  const [user, setUser] = useState("");
  const [chatUser, setChatUser] = useState("");

  if (!user) return <UserLogin setUser={setUser} />;
  if (!chatUser) return <UserList user={user} setChatUser={setChatUser} />;

  return <ChatBox user={user} chatUser={chatUser} />;
}

export default App;
