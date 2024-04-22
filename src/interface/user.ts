import { Feedback } from './feedback';
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface FullUser {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  feedbacks: Feedback[];
}
