'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
  const res = await fetch('/api/me', {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();
  if (res.ok) {
    setUser(data);
  }
};


  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {user ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Hoş geldin, {user.ad} {user.soyad}
          </h2>
          <p>Yaş: {user.yas}</p>
          <p>Şehir: {user.sehir}</p>
          <p>Cinsiyet: {user.cinsiyet}</p>
          <p>E-posta: {user.email}</p>
        </div>
      ) : (
        <p>Kullanıcı bilgileri yükleniyor...</p>
      )}
    </div>
  );
}
