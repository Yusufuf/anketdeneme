import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = 'gizli_anahtar'; // bunu .env dosyasına alabilirsin

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'E-posta veya şifre hatalı' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: '1h',
    });

    const response = NextResponse.json({ message: 'Giriş başarılı' });
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
  }
}
