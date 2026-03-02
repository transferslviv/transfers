'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Settings {
  phone: string;
  telegramBot: string;
  telegramProfile: string;
  whatsapp: string;
  instagram: string;
  tiktok: string;
  address: string;
  googleMapsLink: string;
}

const FIELD_LABELS: Record<keyof Settings, string> = {
  phone: '📞 Номер телефону',
  telegramBot: '🤖 Telegram бот (кнопки CTA)',
  telegramProfile: '✈️ Telegram профіль',
  whatsapp: '💬 WhatsApp',
  instagram: '📸 Instagram',
  tiktok: '🎵 TikTok',
  address: '📍 Адреса',
  googleMapsLink: '🗺️ Google Maps посилання',
};

const FIELD_PLACEHOLDERS: Record<keyof Settings, string> = {
  phone: '+380777877087',
  telegramBot: 'https://t.me/rentalviv_bot',
  telegramProfile: 'https://t.me/rentalviv1',
  whatsapp: 'https://wa.me/380777877087',
  instagram: 'https://instagram.com/rentalviv',
  tiktok: 'https://tiktok.com/@rentalviv',
  address: 'м. Львів вул. Стрийська 200а',
  googleMapsLink: 'https://maps.app.goo.gl/...',
};

export default function AdminSettings() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>({
    phone: '',
    telegramBot: '',
    telegramProfile: '',
    whatsapp: '',
    instagram: '',
    tiktok: '',
    address: '',
    googleMapsLink: '',
  });
  const [originalSettings, setOriginalSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();

      if (data.success) {
        const s = data.data;
        const loaded: Settings = {
          phone: s.phone || '',
          telegramBot: s.telegramBot || '',
          telegramProfile: s.telegramProfile || '',
          whatsapp: s.whatsapp || '',
          instagram: s.instagram || '',
          tiktok: s.tiktok || '',
          address: s.address || '',
          googleMapsLink: s.googleMapsLink || '',
        };
        setSettings(loaded);
        setOriginalSettings(loaded);
      } else if (res.status === 401) {
        router.push('/admin');
      }
    } catch (err) {
      setError('Помилка завантаження налаштувань');
    } finally {
      setLoading(false);
    }
  };

  const hasChanges = () => {
    if (!originalSettings) return false;
    return Object.keys(settings).some(
      (key) => settings[key as keyof Settings] !== originalSettings[key as keyof Settings]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();

      if (data.success) {
        setMessage('✅ Налаштування збережено!');
        setOriginalSettings({ ...settings });
        setTimeout(() => setMessage(''), 3000);
      } else {
        setError(data.error || 'Помилка збереження');
      }
    } catch {
      setError('Щось пішло не так');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (originalSettings) {
      setSettings({ ...originalSettings });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#DDDDDD] flex items-center justify-center">
        <div className="text-2xl font-bold">Завантаження...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#DDDDDD]">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <h1 
            className="text-3xl font-black uppercase"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            Налаштування сайту
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-[10px] mb-6">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-[10px] mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-[10px] shadow-lg p-8">
          {/* Phone & Address Section */}
          <h2 className="text-xl font-black mb-6 uppercase border-b-2 border-gray-200 pb-3" style={{ fontFamily: 'var(--font-unbounded)' }}>
            Контактна інформація
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {(['phone', 'address', 'googleMapsLink'] as const).map((field) => (
              <div key={field} className={field === 'googleMapsLink' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-bold mb-2">{FIELD_LABELS[field]}</label>
                <input
                  type="text"
                  value={settings[field]}
                  onChange={(e) => setSettings({ ...settings, [field]: e.target.value })}
                  placeholder={FIELD_PLACEHOLDERS[field]}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FFAE00] outline-none transition-colors"
                />
              </div>
            ))}
          </div>

          {/* Social Networks Section */}
          <h2 className="text-xl font-black mb-6 uppercase border-b-2 border-gray-200 pb-3" style={{ fontFamily: 'var(--font-unbounded)' }}>
            Соціальні мережі
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {(['instagram', 'tiktok'] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm font-bold mb-2">{FIELD_LABELS[field]}</label>
                <input
                  type="text"
                  value={settings[field]}
                  onChange={(e) => setSettings({ ...settings, [field]: e.target.value })}
                  placeholder={FIELD_PLACEHOLDERS[field]}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FFAE00] outline-none transition-colors"
                />
              </div>
            ))}
          </div>

          {/* Messengers Section */}
          <h2 className="text-xl font-black mb-6 uppercase border-b-2 border-gray-200 pb-3" style={{ fontFamily: 'var(--font-unbounded)' }}>
            Месенджери
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {(['telegramBot', 'telegramProfile', 'whatsapp'] as const).map((field) => (
              <div key={field} className={field === 'telegramBot' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-bold mb-2">{FIELD_LABELS[field]}</label>
                <input
                  type="text"
                  value={settings[field]}
                  onChange={(e) => setSettings({ ...settings, [field]: e.target.value })}
                  placeholder={FIELD_PLACEHOLDERS[field]}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FFAE00] outline-none transition-colors"
                />
                {field === 'telegramBot' && (
                  <p className="text-xs text-gray-500 mt-1">Використовується у кнопках &quot;Розрахувати вартість&quot;, &quot;Замовити&quot; тощо</p>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t-2 border-gray-200">
            <button
              onClick={handleSave}
              disabled={saving || !hasChanges()}
              className="flex-1 py-4 rounded-[10px] text-[#070707] text-lg font-bold uppercase transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              style={{
                fontFamily: 'var(--font-unbounded)',
                background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)',
              }}
            >
              {saving ? 'Збереження...' : 'Зберегти зміни'}
            </button>
            <button
              onClick={handleReset}
              disabled={!hasChanges()}
              className="px-8 py-4 border-2 border-[#070707] rounded-[10px] hover:bg-[#070707] hover:text-white transition-colors font-bold disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#070707]"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              Скасувати
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-[10px]">
          <h3 className="font-bold text-blue-800 mb-2">💡 Як це працює</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Після збереження всі посилання на сайті оновляться автоматично</li>
            <li>• <strong>Telegram бот</strong> — посилання для CTA кнопок (Розрахувати вартість, Замовити)</li>
            <li>• <strong>Telegram профіль</strong> — посилання для іконки Telegram у хедері та футері</li>
            <li>• <strong>Номер телефону</strong> — відображається у хедері, форматуйте з + (напр. +380777877087)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
