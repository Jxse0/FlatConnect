export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: Post[];
  followers: User[];
  following: User[];
  Like: Like[];
  Comment: Comment[];
};
export type CreateUser = {
  username: string;
  email: string;
  password: string;
};
export type Post = {
  id: number;
  title: string;
  content?: string | null;
  published: boolean;
  author: User;
  authorId: number;
  likes: Like[];
  comments: Comment[];
};

export type Like = {
  id: number;
  post: Post;
  postId: number;
  user: User;
  userId: number;
};

export type Comment = {
  id: number;
  text: string;
  post: Post;
  postId: number;
  user: User;
  userId: number;
};

export interface ErrorMessage {
  message: string;
}
