import { Comment } from './comment';

export interface Feedback {
  id: string;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: Comment[];
  authorId: string;
  createdAt: string;
  updatedAt: string;
}
