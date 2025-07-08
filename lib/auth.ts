// lib/auth.ts
import { cookies } from 'next/headers';
import { verifyJwt } from './jwt';

export function getAuthUserId() {
  const token = cookies().get('token')?.value;
  if (!token) return null;

  const decoded = verifyJwt(token);
  if (!decoded || typeof decoded !== 'object') return null;

  return (decoded as any).userId as string;
}
