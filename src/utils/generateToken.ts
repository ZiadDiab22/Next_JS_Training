import jwt from "jsonwebtoken";

type JWTPayload = {
  id: number;
  isAdmin: boolean;
  username: string;
}

export function generateJWT(payload: JWTPayload): string {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '15d' });
  return token;
}