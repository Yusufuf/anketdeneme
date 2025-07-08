'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateSurveyPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState<string[]>(['']);

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, '']);
  };

  const removeQuestion = (index: number) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/survey/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, questions }),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('Bir hata oluştu!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Yeni Anket Oluştur</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Anket Başlığı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <div className="space-y-2">
          <label className="font-semibold">Sorular:</label>
          {questions.map((q, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={q}
                onChange={(e) => handleQuestionChange(i, e.target.value)}
                placeholder={`Soru ${i + 1}`}
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="button"
                onClick={() => removeQuestion(i)}
                className="text-red-500"
              >
                Kaldır
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="text-blue-600 underline"
          >
            + Soru Ekle
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Anketi Kaydet
        </button>
      </form>
    </div>
  );
}
