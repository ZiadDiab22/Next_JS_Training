import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";

interface Props {
  params: { id: string }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 })
    }

    const authToken = request.headers.get('authToken') as string;
    if (!authToken) return NextResponse.json({ message: "authToken is required" }, { status: 401 })
    const payload = jwt.verify(authToken, process.env.JWT_SECRET as string) as JwtPayload

    if (payload.id === user.id) {
      await prisma.user.delete({ where: { id: parseInt(params.id) } })
      return NextResponse.json({ message: "Deleted Successfully" }, { status: 200 })
    }

    return NextResponse.json({ message: "unauthorized" }, { status: 403 })

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}