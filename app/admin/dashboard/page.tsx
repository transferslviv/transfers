'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  const menuItems = [
    { label: 'Автопарк', icon: '🚗', href: '/admin/cars' },
    { label: 'Напрямки', icon: '🗺️', href: '/admin/directions' },
    { label: 'Налаштування', icon: '⚙️', href: '/admin/settings' },
    { label: 'Адміни', icon: '👥', href: '/admin/admins' },
    { label: 'Логи', icon: '📊', href: '/admin/logs' },
  ];

  const cards = [
    { label: 'Автопарк', icon: '🚗', href: '/admin/cars', desc: 'Додавання, редагування та видалення автомобілів' },
    { label: 'Напрямки', icon: '🗺️', href: '/admin/directions', desc: 'Редагування контенту сторінок напрямків' },
    { label: 'Налаштування', icon: '⚙️', href: '/admin/settings', desc: 'Телефон, соціальні мережі, месенджери, адреса' },
    { label: 'Адміністратори', icon: '👥', href: '/admin/admins', desc: 'Управління адміністраторами системи' },
    { label: 'Логи', icon: '📊', href: '/admin/logs', desc: 'Журнал дій адміністраторів' },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="bg-[#111111] border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 
              className="text-xl font-black uppercase text-white tracking-wider"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              Адмін-панель
            </h1>
            <div className="hidden md:flex items-center gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className="px-4 py-2 rounded-[8px] text-sm font-bold text-white/70 hover:text-white hover:bg-white/10 transition-all"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-[8px] text-sm font-bold transition-all hover:scale-105"
              style={{
                fontFamily: 'var(--font-unbounded)',
                background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)',
                color: '#070707',
              }}
            >
              🌐 На сайт
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-white/20 rounded-[8px] text-white/70 hover:text-white hover:border-white/50 transition-all text-sm font-bold"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              Вийти
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <h2 
            className="text-3xl font-black text-white mb-2"
            style={{ fontFamily: 'var(--font-unbounded)' }}
          >
            Transfer Lviv
          </h2>
          <p className="text-white/50 text-sm">Панель управління сайтом</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {cards.map((card) => (
            <button
              key={card.href}
              onClick={() => router.push(card.href)}
              className="bg-[#222222] border border-[#333] rounded-[12px] p-6 text-left hover:border-[#FFAE00]/50 hover:bg-[#282828] transition-all group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">
                {card.icon}
              </div>
              <h3 
                className="text-lg font-black text-white mb-1"
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                {card.label}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {card.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
