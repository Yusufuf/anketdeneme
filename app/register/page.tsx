'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    surname: '',
    city: '',
    age: '',
    gender: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Basit validasyon
    if (
      !form.name || !form.surname || !form.city || !form.age ||
      !form.gender || !form.email || !form.password
    ) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    if (isNaN(parseInt(form.age))) {
      alert('Yaş sayısal olmalıdır.');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Kayıt başarısız');
        return;
      }

      alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
      router.push('/login');
    } catch (error) {
      alert('Sunucu hatası');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h2>

        <input name="name" value={form.name} onChange={handleChange} placeholder="Ad" className="w-full mb-3 p-2 border rounded" />
        <input name="surname" value={form.surname} onChange={handleChange} placeholder="Soyad" className="w-full mb-3 p-2 border rounded" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="Şehir" className="w-full mb-3 p-2 border rounded" />
        <input name="age" value={form.age} onChange={handleChange} placeholder="Yaş" type="number" className="w-full mb-3 p-2 border rounded" />
        
        <select name="gender" value={form.gender} onChange={handleChange} className="w-full mb-3 p-2 border rounded">
          <option value="">Cinsiyet Seç</option>
          <option value="KADIN">Kadın</option>
          <option value="ERKEK">Erkek</option>
        </select>

        <input name="email" value={form.email} onChange={handleChange} placeholder="E-posta" type="email" className="w-full mb-3 p-2 border rounded" />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Şifre" type="password" className="w-full mb-4 p-2 border rounded" />

        <button onClick={handleSubmit} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
          Kayıt Ol
        </button>
      </div>
    </div>
  );
}
