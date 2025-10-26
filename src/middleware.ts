import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("jwtToken")
  const authToken = jwtToken?.value as string;
  if (!authToken) return NextResponse.json({ message: "authToken is required" }, { status: 401 })
}

export const config = {
  matcher: ["/api/users/profile/:path*"]
}