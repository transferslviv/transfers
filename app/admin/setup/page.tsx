'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateFirstAdmin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/create-first', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setMessage(`✅ Адміністратор створений! Username: ${formData.username}, Password: ${formData.password}`);
        setTimeout(() => {
          router.push('/admin');
        }, 3000);
      } else {
        setError(data.error || 'Помилка створення адміністратора');
      }
    } catch {
      setError('Щось пішло не так. Перевірте підключення до MongoDB.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#DDDDDD] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-[10px] shadow-lg w-full max-w-md">
        <h1 
          className="text-3xl font-black text-center mb-4 uppercase text-[#070707]"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          Створити першого адміна
        </h1>

        <p className="text-sm text-gray-600 mb-6 text-center">
          Цей endpoint працює тільки якщо в базі ще немає адміністраторів
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-[#070707]">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FFAE00] outline-none text-[#070707] placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-[#070707]">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FFAE00] outline-none text-[#070707] placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-[#070707]">
              Password (мінімум 6 символів)
            </label>
            <input
              type="text"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FFAE00] outline-none text-[#070707] placeholder:text-gray-400"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-[10px] text-[#070707] text-xl font-bold uppercase transition-all duration-300 hover:scale-105 disabled:opacity-50"
            style={{
              fontFamily: 'var(--font-unbounded)',
              background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)',
            }}
          >
            {loading ? 'Створення...' : 'Створити адміна'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-100 rounded-[10px]">
          <p className="text-sm font-bold mb-2">За замовчуванням:</p>
          <p className="text-sm text-gray-700">Username: <code className="bg-white px-2 py-1 rounded">admin</code></p>
          <p className="text-sm text-gray-700">Password: <code className="bg-white px-2 py-1 rounded">admin123</code></p>
        </div>
      </div>
    </div>
  );
}
