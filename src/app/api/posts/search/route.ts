import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function GET(request: NextRequest) {
  try {
    const searchText = request.nextUrl.searchParams.get("searchText");
    let posts;
    if (searchText) {
      posts = await prisma.post.findMany({
        where: {
          title: { contains: searchText, mode: "insensitive" }
        }
      })
    } else {
      posts = await prisma.post.findMany({ take: 6 })
    }
    return NextResponse.json({ posts: posts }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}