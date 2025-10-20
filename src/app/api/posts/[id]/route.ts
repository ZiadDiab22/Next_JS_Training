import { NextRequest, NextResponse } from "next/server";
import { UpdatePostDto } from "@/utils/types";
import prisma from "@/utils/db";

interface Props {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const post = await prisma.post.findUnique({ where: { id: parseInt(params.id) } });
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const post = await prisma.post.findUnique({ where: { id: parseInt(params.id) } });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    const body = await request.json() as UpdatePostDto;
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        desc: body.desc
      }
    })

    return NextResponse.json({ message: "post updated successfully", post: updatedPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const post = await prisma.post.findUnique({ where: { id: parseInt(params.id) } });
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    await prisma.post.delete({ where: { id: parseInt(params.id) } });

    return NextResponse.json({ message: "post deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}