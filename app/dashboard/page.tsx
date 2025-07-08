// app/dashboard/page.tsx
import { getAuthUserId } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const userId = getAuthUserId();

  if (!userId) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      surname: true,
      email: true,
      age: true,
      city: true,
      gender: true,
    },
  });

  if (!user) {
    redirect('/login'); // Kullanıcı bulunamazsa yine login'e at
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white shadow p-4 rounded space-y-2">
        <p><strong>Ad:</strong> {user.name}</p>
        <p><strong>Soyad:</strong> {user.surname}</p>
        <p><strong>E-posta:</strong> {user.email}</p>
        <p><strong>Yaş:</strong> {user.age}</p>
        <p><strong>Şehir:</strong> {user.city}</p>
        <p><strong>Cinsiyet:</strong> {user.gender}</p>
      </div>
    </div>
  );
}
