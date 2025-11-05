import { Post, User, Comment } from "@/generated/prisma";

export type CommentWithUser = Comment & { user: User };

export type SinglePost = Post & { comments: CommentWithUser[] }

export type CreatePostDto = { //DTO : Data Transfer Object
  title: string;
  desc: string;
}

export type UpdatePostDto = {
  title?: string;
  desc?: string;
}

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
}

export interface CreateCommentDto {
  text: string;
  postId: number
}

export interface UpdateCommentDto {
  text: string
}