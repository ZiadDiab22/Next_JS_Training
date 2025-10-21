import { RegisterUserDto } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as RegisterUserDto;

    const registerSchema = z.object({
      username: z.string().min(2).max(100),
      email: z.string().min(3).max(200).email(),
      password: z.string().min(6),
    })

    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      return NextResponse.json({ message: "This user already registered" }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        username: true, email: true, isAdmin: true
      }
    })

    return NextResponse.json({ message: "User Registerd Successfully", user: newUser }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}