'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
  alert(data.message || 'Giriş başarısız');
  return;
}

alert('Giriş başarılı, yönlendiriliyorsunuz...');
setTimeout(() => {
  window.location.href = '/dashboard';
}, 100);

    // Yönlendirmeyi alert'ten sonra 100ms bekleterek yap
    setTimeout(() => {
      router.push('/dashboard');
    }, 100);
  } catch (err) {
    alert('Sunucu hatası');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="E-posta"
          type="email"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Şifre"
          type="password"
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
}
