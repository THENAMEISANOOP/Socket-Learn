import { useState } from "react";

function UserLogin({ setUser }) {
  const [name, setName] = useState("");

  const start = () => {
    if (!name.trim()) return;
    setUser(name.trim());
  };

  return (
    <div>
      <h3>Enter your name</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={start}>Continue</button>
    </div>
  );
}

export default UserLogin;
