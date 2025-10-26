import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "@/utils/verifyToken";

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