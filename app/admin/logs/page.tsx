'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Log {
  _id: string;
  adminUsername: string;
  action: string;
  details: string;
  ipAddress?: string;
  status: 'success' | 'failed';
  createdAt: string;
}

const ACTION_LABELS: Record<string, string> = {
  login: '🔐 Вхід',
  logout: '🚪 Вихід',
  settings_update: '⚙️ Оновлення налаштувань',
  admin_create: '👤 Створення адміна',
  admin_update: '✏️ Редагування адміна',
  admin_delete: '🗑️ Видалення адміна',
};

export default function AdminLogs() {
  const router = useRouter();
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    fetchLogs();
  }, [filter, statusFilter]);

  const fetchLogs = async () => {
    try {
      const params = new URLSearchParams();
      if (filter) params.append('action', filter);
      if (statusFilter) params.append('status', statusFilter);

      const res = await fetch(`/api/admin/logs?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setLogs(data.data.logs);
      } else if (res.status === 401) {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Помилка завантаження логів:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-[#DDDDDD]">
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <h1 
            className="text-3xl font-black uppercase"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            Логи адміністратора
          </h1>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="px-6 py-3 border-2 border-[#070707] rounded-[10px] hover:bg-[#070707] hover:text-white transition-colors font-bold"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            ← Назад
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-white p-6 rounded-[10px] shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Фільтр по дії</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FFAE00] outline-none"
              >
                <option value="">Всі дії</option>
                <option value="login">Вхід</option>
                <option value="logout">Вихід</option>
                <option value="settings_update">Оновлення налаштувань</option>
                <option value="admin_create">Створення адміна</option>
                <option value="admin_update">Редагування адміна</option>
                <option value="admin_delete">Видалення адміна</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Статус</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FFAE00] outline-none"
              >
                <option value="">Всі статуси</option>
                <option value="success">Успішні</option>
                <option value="failed">Невдалі</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-2xl">Завантаження...</div>
        ) : (
          <div className="bg-white rounded-[10px] shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#070707] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">Дата та час</th>
                    <th className="px-6 py-4 text-left font-bold">Користувач</th>
                    <th className="px-6 py-4 text-left font-bold">Дія</th>
                    <th className="px-6 py-4 text-left font-bold">Деталі</th>
                    <th className="px-6 py-4 text-left font-bold">IP</th>
                    <th className="px-6 py-4 text-left font-bold">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-600">
                        Логів не знайдено
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatDate(log.createdAt)}
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          {log.adminUsername}
                        </td>
                        <td className="px-6 py-4">
                          {ACTION_LABELS[log.action] || log.action}
                        </td>
                        <td className="px-6 py-4">
                          {log.details || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {log.ipAddress || '-'}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-bold ${
                              log.status === 'success'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {log.status === 'success' ? '✓ Успішно' : '✗ Невдало'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
