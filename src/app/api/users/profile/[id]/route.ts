import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/types";
import bcrypt from "bcryptjs";

interface Props {
  params: { id: string }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 })
    }

    const payload = verifyToken(request);

    if (payload !== null && payload.id === user.id) {
      await prisma.user.delete({ where: { id: parseInt(params.id) } })
      return NextResponse.json({ message: "Deleted Successfully" }, { status: 200 })
    }

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

    if (body.password) {
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