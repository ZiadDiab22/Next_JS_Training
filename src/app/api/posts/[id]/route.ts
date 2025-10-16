import { NextRequest, NextResponse } from "next/server";
import { UpdatePostDto } from "@/utils/types";

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

interface Props {
  params: { id: string }
}

export function GET(request: NextRequest, { params }: Props) {
  const post = posts.find(a => a.id === parseInt(params.id));
  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: Props) {
  const post = posts.find(a => a.id === parseInt(params.id));
  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }

  const body = await request.json() as UpdatePostDto;
  
  return NextResponse.json({ message: "post updated successfully" }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const post = posts.find(a => a.id === parseInt(params.id));
  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }
  
  return NextResponse.json({ message: "post deleted successfully" }, { status: 200 });
}