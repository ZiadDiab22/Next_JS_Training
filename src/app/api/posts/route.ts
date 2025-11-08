import { CreatePostDto } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import { verifyToken } from "@/utils/verifyToken";
import prisma from "@/utils/db";

export async function GET(request: NextRequest) { //route handler
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1"
    const postsPerPage = 6

    const posts = await prisma.post.findMany({
      skip: postsPerPage * (parseInt(pageNumber) - 1), take: postsPerPage
    });
    return NextResponse.json({ posts: posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if (user === null || user.isAdmin === false) {
      return NextResponse.json({ message: "You are not allowed" }, { status: 403 })
    }

    const body = await request.json() as CreatePostDto;

    const createPostschema = z.object({
      title: z.string().min(2, 'title must be more than 2 characters').max(200),
      desc: z.string().min(4),
    });

    const validation = createPostschema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 })
    }

    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        desc: body.desc
      }
    });

    return NextResponse.json({ message: "created successfully", post: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })

  }
}