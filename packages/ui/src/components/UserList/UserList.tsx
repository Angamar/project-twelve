import styles from "./UserList.module.css";

// Define User type locally for now
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date | string; // Can be either Date object or string from API
}

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className={styles.userlistSection}>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul className={styles.userList}>
          {users.map((user) => (
            <li key={user.id} className={styles.userItem}>
              <strong>{user.name}</strong> - {user.email}
              <span className={styles.date}>
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
