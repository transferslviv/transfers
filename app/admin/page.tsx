'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Помилка входу');
      }
    } catch {
      setError('Щось пішло не так');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#DDDDDD] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-[10px] shadow-lg w-full max-w-md">
        <h1 
          className="text-4xl font-black text-center mb-8 uppercase text-[#070707]"
          style={{ fontFamily: 'var(--font-unbounded)' }}
        >
          Адмін-панель
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-[#070707]">Користувач</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FFAE00] outline-none text-[#070707] placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-[#070707]">Пароль</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FFAE00] outline-none text-[#070707] placeholder:text-gray-400"
              required
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
            {loading ? 'Завантаження...' : 'Увійти'}
          </button>
        </form>
      </div>
    </div>
  );
}
