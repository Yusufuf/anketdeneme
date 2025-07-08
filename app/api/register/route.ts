import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ad, soyad, yas, sehir, cinsiyet, email, password } = body;

    if (!ad || !soyad || !yas || !sehir || !cinsiyet || !email || !password) {
      return NextResponse.json({ message: 'Tüm alanlar zorunludur.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'Bu e-posta ile kayıtlı kullanıcı zaten var.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        ad,
        soyad,
        yas: parseInt(yas),
        sehir,
        cinsiyet,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'Kayıt başarılı.' }, { status: 201 });

  } catch (error) {
  console.error('Kayıt hatası:', error);
  return NextResponse.json({ message: 'Sunucu hatası.' }, { status: 500 });
}

}
