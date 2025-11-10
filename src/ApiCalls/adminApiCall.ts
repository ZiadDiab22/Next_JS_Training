import { Comment } from "@/generated/prisma";

export async function getAllComments(token: string): Promise<Comment[]> {
  const response = await fetch('http://localhost:3000/api/comments', {
    headers: {
      Cookie: `jwtToken=${token}`
    }
  })

  if (!response.ok) {
    throw new Error("failed to fetch comments");
  }

  const data = await response.json();
  return data.comments;
}