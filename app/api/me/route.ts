import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = 'gizli_anahtar';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Token bulunamadı' }, { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
      select: {
        ad: true,
        soyad: true,
        yas: true,
        sehir: true,
        cinsiyet: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: 'Geçersiz token' }, { status: 403 });
  }
}
