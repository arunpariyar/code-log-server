export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface fullUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}