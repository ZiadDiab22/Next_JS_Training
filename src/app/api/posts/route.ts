import { NextRequest, NextResponse } from "next/server";

const posts = [
  {
    id: 1,
    user_id: 101,
    title: "Type script",
    body: "type script is a powerfull programming language"
  },
  {
    id: 2,
    user_id: 102,
    title: "PHP",
    body: "PHP is a powerfull programming language"
  },
  {
    id: 3,
    user_id: 103,
    title: "Java",
    body: "Java is a powerfull programming language"
  },
]

export function GET(request: NextRequest) { //route handler
  return NextResponse.json(posts, { status: 200 });

}