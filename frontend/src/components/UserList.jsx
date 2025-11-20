function UserList({ user, setChatUser }) {
  const users = ["Anu", "Ravi", "Anoop", "Sangamithra"];

  return (
    <div>
      <h3>Welcome, {user}</h3>
      <h4>Select user to chat with:</h4>

      {users
        .filter(u => u !== user)
        .map((u) => (
          <button key={u} onClick={() => setChatUser(u)}>
            {u}
          </button>
        ))}
    </div>
  );
}

export default UserList;
