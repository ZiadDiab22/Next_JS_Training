import jwt from "jsonwebtoken";
import { serialize } from "cookie";

type JWTPayload = {
  id: number;
  isAdmin: boolean;
  username: string;
}

export function generateJWT(payload: JWTPayload): string {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '15d' });
  return token;
}

export function setCookie(payload: JWTPayload): string {
  const token = generateJWT(payload)

  const cookie = serialize("jwtToken", token, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict',
    path: '/', maxAge: 60 * 60 * 24 * 30,
  })

  return cookie;
}