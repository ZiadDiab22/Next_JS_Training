import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/types";
import { z } from 'zod';
import bcrypt from "bcryptjs";

interface Props {
  params: { id: string }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) }, include: { comments: true } });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 })
    }

    const payload = verifyToken(request);

    if (payload !== null && payload.id === user.id) {
      await prisma.user.delete({ where: { id: parseInt(params.id) } })
      return NextResponse.json({ message: "Deleted Successfully" }, { status: 200 })
    }

    // deleting relatable comments
    const commentIds: number[] = user?.comments.map(comment => comment.id);
    await prisma.post.deleteMany({ where: { id: { in: commentIds } } });

    return NextResponse.json({ message: "unauthorized" }, { status: 403 })

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: { id: true, email: true, username: true, createdAt: true, isAdmin: true }
    });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 })
    }

    const userFromToken = verifyToken(request)
    if (userFromToken === null || userFromToken.id != user.id) {
      return NextResponse.json({ message: "You are not allowed" }, { status: 403 })
    }

    return NextResponse.json({ message: user }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 })
    }

    const userFromToken = verifyToken(request)
    if (userFromToken === null || userFromToken.id != user.id) {
      return NextResponse.json({ message: "You are not allowed" }, { status: 403 })
    }

    const body = await request.json() as UpdateUserDto

    const updateProfileSchema = z.object({
      username: z.string().min(2).max(100).optional(),
      email: z.string().min(3).max(200).email().optional(),
      password: z.string().min(6).optional(),
    })

    const validation = updateProfileSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 })
    }

    if (body.password) {
      if (body.password.length < 6)
        return NextResponse.json({ message: "password should contains 6 characters at least!" }, { status: 400 })

      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }


    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: { username: body.username, email: body.email, password: body.password }
    })

    const { password, ...other } = updatedUser;
    return NextResponse.json({ message: other }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}