import { LoginUserDto } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import { generateJWT } from "@/utils/generateToken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LoginUserDto;

    const loginSchema = z.object({
      email: z.string().min(3).max(200).email(),
      password: z.string().min(6),
    })

    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return NextResponse.json({ message: "Invalid cardential" }, { status: 400 })
    }

    const match = await bcrypt.compare(body.password, user.password);
    if (!match) {
      return NextResponse.json({ message: "Invalid cardential" }, { status: 400 })
    }

    const payload = { id: user.id, isAdmin: user.isAdmin, username: user.username }
    const token = generateJWT(payload)

    return NextResponse.json({ message: "Login succeeded", token: token }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}