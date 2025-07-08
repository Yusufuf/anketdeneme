import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, surname, email, password, city, age, gender } = body;

    if (!name || !surname || !email || !password || !city || !age || !gender) {
      return NextResponse.json({ message: 'Tüm alanlar zorunludur' }, { status: 400 });
    }

    const numericAge = parseInt(age);
    if (isNaN(numericAge)) {
      return NextResponse.json({ message: 'Yaş sayısal olmalı' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
        city,
        age: numericAge,
        gender,
      },
    });

    return NextResponse.json({ message: 'Kayıt başarılı', user });
  } catch (error: any) {
    console.error('Register error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'Bu e-posta zaten kayıtlı' }, { status: 400 });
    }
    return NextResponse.json({ message: error.message || 'Sunucu hatası' }, { status: 500 });
  }
}
