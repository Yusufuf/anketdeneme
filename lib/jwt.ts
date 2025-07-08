// lib/jwt.ts
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'super-secret-key';

export function signJwt(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
}
