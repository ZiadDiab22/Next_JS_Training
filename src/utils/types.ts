export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export type CreatePostDto = { //DTO : Data Transfer Object
  title: string;
  body: string;
}