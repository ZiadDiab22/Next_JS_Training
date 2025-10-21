export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export type CreatePostDto = { //DTO : Data Transfer Object
  title: string;
  desc: string;
}

export type UpdatePostDto = { //DTO : Data Transfer Object
  title?: string;
  desc?: string;
}

export interface RegisterUserDto {
  username:string;
  email:string;
  password:string;
}