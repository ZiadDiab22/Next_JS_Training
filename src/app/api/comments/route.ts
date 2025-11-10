import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { CreateCommentDto } from "@/utils/types";
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json({ message: "access denied, only logged in users can comment" }, { status: 401 })
    }

    const body = await request.json() as CreateCommentDto;

    const createCommentSchema = z.object({
      text: z.string().min(1).max(500),
      postId: z.number(),
    })

    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 })
    }

    const post = await prisma.post.findUnique({ where: { id: body.postId } });
    if (!post) {
      return NextResponse.json({ message: "Wrong postId , this post dosent exist!" }, { status: 404 })
    }

    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        postId: body.postId,
        userId: user.id
      }
    })

    return NextResponse.json({ message: "Commented Successfully!", comment: newComment }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (user === null || user.isAdmin === false) {
      return NextResponse.json({ message: "access denied, only admin can see comments" }, { status: 403 })
    }

    const comments = await prisma.comment.findMany();
    return NextResponse.json({ comments }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
