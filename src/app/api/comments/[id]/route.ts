import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateCommentDto } from "@/utils/types";
import { z } from 'zod';


interface Props {
  params: { id: string }
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({ where: { id: parseInt(params.id) } });

    if (!comment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
    }

    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json({ message: "access denied, only user who write the comment can edit it" }, { status: 403 })
    }

    const body = await request.json() as UpdateCommentDto;

    const updateCommentSchema = z.object({
      text: z.string().min(1).max(500)
    })

    const validation = updateCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 })
    }

    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: {
        text: body.text
      }
    })

    return NextResponse.json({ message: "comment updated successfully", comment: updatedComment }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({ where: { id: parseInt(params.id) } });
    if (!comment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
    }

    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json({ message: "access denied" }, { status: 403 })
    }

    if (user.isAdmin || user.id === comment.userId) {
      await prisma.comment.delete({ where: { id: parseInt(params.id) } });
      return NextResponse.json({ message: "comment deleted successfully" }, { status: 200 });
    }

    return NextResponse.json({ message: "access denied , you are not allowed" }, { status: 403 })

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}