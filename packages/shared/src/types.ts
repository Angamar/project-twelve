// Example shared types - customize for your application
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date | string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export enum Status {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending",
}

// Add your domain-specific types here
