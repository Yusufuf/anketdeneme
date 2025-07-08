'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const contentType = res.headers.get('content-type');

    // Yanıt başarısızsa hata fırlat
    if (!res.ok) {
      const errorMessage = contentType?.includes('application/json')
        ? (await res.json()).message
        : 'Sunucudan geçersiz yanıt alındı.';
      throw new Error(errorMessage);
    }

    // JSON kontrolü
    if (!contentType?.includes('application/json')) {
      throw new Error('Sunucu JSON formatında yanıt döndürmedi.');
    }

    // Artık güvenle json parse edebiliriz
    const data = await res.json();
    console.log('Giriş başarılı:', data);

    // Burada token cookie olarak backend tarafından ayarlandığı için
    // yönlendirme yapabilirsin:
    // router.push('/dashboard');

  } catch (error: any) {
    alert(`Giriş başarısız: ${error.message}`);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">Giriş Yap</h1>

        <div className="mb-4">
          <label className="block mb-1 font-medium">E-posta</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Şifre</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button
  onClick={handleLogin}  // ← BU ŞEKİLDE OLMALI
  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
>
  Giriş Yap
</button>

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        {message && <p className="mt-4 text-green-600 text-sm">{message}</p>}

        <p className="mt-6 text-sm text-center text-gray-600">
          Hesabınız yok mu?{' '}
          <span
            onClick={() => router.push('/register')}
            className="text-indigo-600 hover:underline cursor-pointer font-medium"
          >
            Kayıt olun
          </span>
        </p>
      </div>
    </div>
  );
}
