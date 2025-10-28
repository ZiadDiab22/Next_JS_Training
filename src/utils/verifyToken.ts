import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";

export function verifyToken(request: NextRequest): JwtPayload | null {
  try {
    const jwtToken = request.cookies.get("jwtToken")
    const authToken = jwtToken?.value as string;

    if (!authToken) return null

    const payload = jwt.verify(authToken, process.env.JWT_SECRET as string) as JwtPayload
    return payload

  } catch (error) {
    return null
  }
}