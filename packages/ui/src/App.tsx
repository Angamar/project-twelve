import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserList from "./components/UserList";
import styles from "./App.module.css";

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date | string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("/api/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await response.json();
  return data.data;
};

function App() {
  const [count, setCount] = useState(0);

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <div className={styles.appSection}>
      <div>
        <h1>TypeScript Fullstack Template</h1>
        <div className={styles.card}>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR!
          </p>
        </div>

        <div className={styles.userSection}>
          <h2>Users from API</h2>
          {isLoading && <p>Loading users...</p>}
          {error && <p>Error loading users: {error.message}</p>}
          {users && <UserList users={users} />}
        </div>
      </div>
    </div>
  );
}

export default App;
