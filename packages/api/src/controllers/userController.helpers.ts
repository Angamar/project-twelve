import { User } from '@your-app/shared';

// Mock data - replace with actual database operations
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    createdAt: new Date('2024-01-02'),
  },
];

export async function getUsers(): Promise<User[]> {
  // TODO: Replace with actual database query
  return mockUsers;
}

export async function getUserById(id: string): Promise<User | null> {
  // TODO: Replace with actual database query
  return mockUsers.find(user => user.id === id) || null;
}

export async function createUser(userData: { email: string; name: string }): Promise<User> {
  // TODO: Replace with actual database insert
  const newUser: User = {
    id: Math.random().toString(36).substring(7),
    email: userData.email,
    name: userData.name,
    createdAt: new Date(),
  };
  
  mockUsers.push(newUser);
  return newUser;
}