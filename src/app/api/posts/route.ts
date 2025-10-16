import { CreatePostDto, Post } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'

const posts = [
  {
    id: 1,
    user_id: 101,
    title: "Type script",
    body: "type script is a powerfull programming language"
  },
  {
    id: 2,
    user_id: 102,
    title: "PHP",
    body: "PHP is a powerfull programming language"
  },
  {
    id: 3,
    user_id: 103,
    title: "Java",
    body: "Java is a powerfull programming language"
  },
]

export function GET(request: NextRequest) { //route handler
  return NextResponse.json(posts, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json() as CreatePostDto;

  const createPostschema = z.object({
    title: z.string().min(2).max(200),
    body: z.string().min(10),
  });

  const validation = createPostschema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ message: validation.error.message }, { status: 400 })
  }

  const newPost: Post = {
    title: body.title,
    body: body.body,
    id: posts.length + 1,
    user_id: 200
  }

  posts.push(newPost);
  return NextResponse.json({ message: "created successfully", post: newPost }, { status: 201 });
}