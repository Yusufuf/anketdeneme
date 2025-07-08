'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const cities = ['Ankara', 'İstanbul', 'İzmir', 'Bursa', 'Antalya'];
const genders = ['ERKEK', 'KADIN'];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    ad: '',
    soyad: '',
    yas: '',
    sehir: '',
    cinsiyet: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, yas: Number(form.yas) }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
      setTimeout(() => router.push('/login'), 1500);
    } else {
      setError(data.message || 'Bir hata oluştu.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-indigo-200">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">Kayıt Ol</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="ad" value={form.ad} onChange={handleChange} placeholder="Ad" className="input" />
          <input name="soyad" value={form.soyad} onChange={handleChange} placeholder="Soyad" className="input" />
          <input type="number" name="yas" value={form.yas} onChange={handleChange} placeholder="Yaş" className="input" />
          <select name="sehir" value={form.sehir} onChange={handleChange} className="input">
            <option value="">Şehir Seçin</option>
            {cities.map((city) => <option key={city}>{city}</option>)}
          </select>
          <select name="cinsiyet" value={form.cinsiyet} onChange={handleChange} className="input">
            <option value="">Cinsiyet Seçin</option>
            {genders.map((gender) => <option key={gender}>{gender}</option>)}
          </select>
          <input name="email" value={form.email} onChange={handleChange} placeholder="E-posta" className="input" />
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Şifre" className="input" />
        </div>

        <button onClick={handleSubmit} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md">
          Kayıt Ol
        </button>

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        {message && <p className="mt-4 text-green-600 text-sm">{message}</p>}

        <p className="mt-6 text-sm text-center text-gray-600">
          Zaten bir hesabınız var mı?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-indigo-600 hover:underline cursor-pointer font-medium"
          >
            Giriş yap
          </span>
        </p>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #ccc;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          outline: none;
          font-size: 0.95rem;
        }

        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px #c7d2fe;
        }
      `}</style>
    </div>
  );
}
