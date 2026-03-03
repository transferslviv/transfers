'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { ukraineTransfers, europeTransfers, lvivTransfers } from '@/data/transfers';

const allTransfers = [...ukraineTransfers, ...europeTransfers, ...lvivTransfers];
const staticIds = new Set(allTransfers.map(t => t.id));

interface DirectionData {
  directionId: string;
  heroTitle: string;
  heroTitleEn: string;
  isActive: boolean;
  isCustom: boolean;
  category: string;
  cardTitle: string;
  cardTitleEn: string;
  updatedAt: string;
}

export default function AdminDirectionsPage() {
  const router = useRouter();
  const [directions, setDirections] = useState<DirectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newId, setNewId] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newCategory, setNewCategory] = useState<'ukraine' | 'europe' | 'lviv'>('ukraine');
  const [creating, setCreating] = useState(false);

  const fetchDirections = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/directions');
      const data = await res.json();
      if (data.success) {
        setDirections(data.pages);
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDirections();
  }, [fetchDirections]);

  const editedIds = new Set(directions.map(d => d.directionId));
  const customDirections = directions.filter(d => d.isCustom || !staticIds.has(d.directionId));

  const handleDelete = async (directionId: string) => {
    if (!confirm(`Видалити контент для "${directionId}"?`)) return;
    try {
      const res = await fetch(`/api/admin/directions/${directionId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchDirections();
      } else {
        alert('Помилка: ' + data.error);
      }
    } catch {
      alert('Помилка видалення');
    }
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[а-яіїєґ]/g, (c) => {
        const map: Record<string, string> = {
          'а':'a','б':'b','в':'v','г':'h','ґ':'g','д':'d','е':'e','є':'ye',
          'ж':'zh','з':'z','и':'y','і':'i','ї':'yi','й':'y','к':'k','л':'l',
          'м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u',
          'ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ь':'',
          'ю':'yu','я':'ya'
        };
        return map[c] || c;
      })
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleCreate = async () => {
    const id = newId || slugify(newTitle);
    if (!id) { alert('Введіть ID або назву'); return; }
    if (staticIds.has(id) || editedIds.has(id)) { alert('Напрямок з таким ID вже існує'); return; }
    
    setCreating(true);
    try {
      const res = await fetch('/api/admin/directions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          directionId: id,
          isCustom: true,
          category: newCategory,
          heroTitle: newTitle || 'Новий напрямок',
          heroTitleEn: newTitleEn || 'New direction',
          cardTitle: newTitle || 'Новий напрямок',
          cardTitleEn: newTitleEn || 'New direction',
          isActive: true,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowCreateModal(false);
        setNewId(''); setNewTitle(''); setNewTitleEn(''); setNewCategory('ukraine');
        router.push(`/admin/directions/${id}`);
      } else {
        alert('Помилка: ' + data.error);
      }
    } catch {
      alert('Помилка створення');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="bg-[#111] border-b border-[#333]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-black uppercase text-white tracking-wider" style={{ fontFamily: 'var(--font-unbounded)' }}>
            Сторінки напрямків
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-[8px] text-sm font-bold transition-all hover:scale-105"
              style={{
                fontFamily: 'var(--font-unbounded)',
                background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)',
                color: '#070707',
              }}
            >
              + Новий напрямок
            </button>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-4 py-2 border border-white/20 rounded-[8px] text-white/70 hover:text-white hover:border-white/50 transition-all text-sm font-bold"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              ← Назад
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Custom (user-created) directions */}
        {customDirections.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-black text-white mb-4" style={{ fontFamily: 'var(--font-unbounded)' }}>
              Користувацькі напрямки
            </h2>
            <div className="grid gap-3">
              {customDirections.map((dir) => (
                <div
                  key={dir.directionId}
                  className="bg-[#222] border border-[#333] rounded-[12px] p-5 flex items-center justify-between hover:border-[#FFAE00]/50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-3 h-3 rounded-full ${dir.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <p className="text-white font-bold text-base" style={{ fontFamily: 'var(--font-unbounded)' }}>
                        {dir.heroTitle || dir.cardTitle}
                      </p>
                      <p className="text-white/40 text-sm mt-1">
                        /{dir.directionId}
                        <span className="ml-3 text-[#FFAE00]/60">
                          {dir.category === 'ukraine' ? '🇺🇦 Україна' : dir.category === 'europe' ? '🇪🇺 Європа' : '🏙️ Львів'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => router.push(`/admin/directions/${dir.directionId}`)}
                      className="px-4 py-2 rounded-[8px] text-sm font-bold transition-all hover:scale-105"
                      style={{
                        fontFamily: 'var(--font-unbounded)',
                        background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)',
                        color: '#070707',
                      }}
                    >
                      Редагувати
                    </button>
                    <button
                      onClick={() => handleDelete(dir.directionId)}
                      className="px-4 py-2 rounded-[8px] text-sm font-bold text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-all"
                      style={{ fontFamily: 'var(--font-unbounded)' }}
                    >
                      Видалити
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edited existing directions */}
        {directions.filter(d => !d.isCustom && staticIds.has(d.directionId)).length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-black text-white mb-4" style={{ fontFamily: 'var(--font-unbounded)' }}>
              Редаговані напрямки
            </h2>
            <div className="grid gap-3">
              {directions.filter(d => !d.isCustom && staticIds.has(d.directionId)).map((dir) => (
                <div
                  key={dir.directionId}
                  className="bg-[#222] border border-[#333] rounded-[12px] p-5 flex items-center justify-between hover:border-[#FFAE00]/50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-3 h-3 rounded-full ${dir.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <p className="text-white font-bold text-base" style={{ fontFamily: 'var(--font-unbounded)' }}>
                        {dir.heroTitle}
                      </p>
                      <p className="text-white/40 text-sm mt-1">/{dir.directionId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => router.push(`/admin/directions/${dir.directionId}`)}
                      className="px-4 py-2 rounded-[8px] text-sm font-bold transition-all hover:scale-105"
                      style={{
                        fontFamily: 'var(--font-unbounded)',
                        background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)',
                        color: '#070707',
                      }}
                    >
                      Редагувати
                    </button>
                    <button
                      onClick={() => handleDelete(dir.directionId)}
                      className="px-4 py-2 rounded-[8px] text-sm font-bold text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-all"
                      style={{ fontFamily: 'var(--font-unbounded)' }}
                    >
                      Видалити
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All static directions */}
        <div>
          <h2 className="text-lg font-black text-white mb-4" style={{ fontFamily: 'var(--font-unbounded)' }}>
            Всі напрямки
          </h2>
          <p className="text-white/40 text-sm mb-6">
            Натисніть на напрямок щоб редагувати його сторінку. Напрямки без контенту використовують шаблонний текст.
          </p>

          {loading ? (
            <div className="text-center py-20">
              <div className="text-white/50 text-lg">Завантаження...</div>
            </div>
          ) : (
            <>
              {/* Ukraine */}
              <h3 className="text-white/60 text-sm font-bold uppercase mb-3 mt-6" style={{ fontFamily: 'var(--font-unbounded)' }}>
                🇺🇦 Україна
              </h3>
              <div className="grid gap-2 mb-6">
                {ukraineTransfers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => router.push(`/admin/directions/${t.id}`)}
                    className="bg-[#222] border border-[#333] rounded-[10px] p-4 flex items-center justify-between hover:border-[#FFAE00]/50 hover:bg-[#282828] transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      {editedIds.has(t.id) && (
                        <span className="w-2 h-2 rounded-full bg-[#FFAE00]" title="Має контент" />
                      )}
                      <span className="text-white font-bold" style={{ fontFamily: 'var(--font-unbounded)' }}>
                        {t.title.replace('\n', ' ')}
                      </span>
                    </div>
                    <span className="text-white/30 group-hover:text-[#FFAE00] transition-colors text-lg">→</span>
                  </button>
                ))}
              </div>

              {/* Europe */}
              <h3 className="text-white/60 text-sm font-bold uppercase mb-3" style={{ fontFamily: 'var(--font-unbounded)' }}>
                🇪🇺 Європа
              </h3>
              <div className="grid gap-2 mb-6">
                {europeTransfers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => router.push(`/admin/directions/${t.id}`)}
                    className="bg-[#222] border border-[#333] rounded-[10px] p-4 flex items-center justify-between hover:border-[#FFAE00]/50 hover:bg-[#282828] transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      {editedIds.has(t.id) && (
                        <span className="w-2 h-2 rounded-full bg-[#FFAE00]" title="Має контент" />
                      )}
                      <span className="text-white font-bold" style={{ fontFamily: 'var(--font-unbounded)' }}>
                        {t.title.replace('\n', ' ')}
                      </span>
                    </div>
                    <span className="text-white/30 group-hover:text-[#FFAE00] transition-colors text-lg">→</span>
                  </button>
                ))}
              </div>

              {/* Lviv */}
              <h3 className="text-white/60 text-sm font-bold uppercase mb-3" style={{ fontFamily: 'var(--font-unbounded)' }}>
                🏙️ Львів
              </h3>
              <div className="grid gap-2">
                {lvivTransfers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => router.push(`/admin/directions/${t.id}`)}
                    className="bg-[#222] border border-[#333] rounded-[10px] p-4 flex items-center justify-between hover:border-[#FFAE00]/50 hover:bg-[#282828] transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      {editedIds.has(t.id) && (
                        <span className="w-2 h-2 rounded-full bg-[#FFAE00]" title="Має контент" />
                      )}
                      <span className="text-white font-bold" style={{ fontFamily: 'var(--font-unbounded)' }}>
                        {t.title.replace('\n', ' ')}
                      </span>
                    </div>
                    <span className="text-white/30 group-hover:text-[#FFAE00] transition-colors text-lg">→</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#222] border border-[#333] rounded-[16px] w-full max-w-[500px] p-8">
            <h2 className="text-xl font-black text-white mb-6" style={{ fontFamily: 'var(--font-unbounded)' }}>
              Новий напрямок
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-white/60 text-sm mb-1 block">Назва (УКР) *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Львів → Прага"
                  className="w-full bg-[#333] border border-[#444] rounded-[8px] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FFAE00]"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1 block">Назва (EN)</label>
                <input
                  type="text"
                  value={newTitleEn}
                  onChange={(e) => setNewTitleEn(e.target.value)}
                  placeholder="Lviv → Prague"
                  className="w-full bg-[#333] border border-[#444] rounded-[8px] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FFAE00]"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1 block">ID (slug, авто з назви)</label>
                <input
                  type="text"
                  value={newId}
                  onChange={(e) => setNewId(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder={slugify(newTitle) || 'prague'}
                  className="w-full bg-[#333] border border-[#444] rounded-[8px] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FFAE00] font-mono"
                />
                <p className="text-white/30 text-xs mt-1">URL: /direction/{newId || slugify(newTitle) || '...'}</p>
              </div>

              <div>
                <label className="text-white/60 text-sm mb-1 block">Категорія</label>
                <div className="flex gap-2">
                  {(['ukraine', 'europe', 'lviv'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setNewCategory(cat)}
                      className={`flex-1 py-2 rounded-[8px] text-sm font-bold transition-all border ${
                        newCategory === cat
                          ? 'bg-[#FFAE00] text-[#070707] border-[#FFAE00]'
                          : 'bg-[#333] text-white/60 border-[#444] hover:border-[#FFAE00]/50'
                      }`}
                      style={{ fontFamily: 'var(--font-unbounded)' }}
                    >
                      {cat === 'ukraine' ? '🇺🇦 Україна' : cat === 'europe' ? '🇪🇺 Європа' : '🏙️ Львів'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => { setShowCreateModal(false); setNewId(''); setNewTitle(''); setNewTitleEn(''); }}
                className="flex-1 py-3 rounded-[8px] text-sm font-bold text-white/60 border border-[#444] hover:border-white/30 transition-all"
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                Скасувати
              </button>
              <button
                onClick={handleCreate}
                disabled={creating || !newTitle}
                className="flex-1 py-3 rounded-[8px] text-sm font-bold transition-all hover:scale-105 disabled:opacity-50"
                style={{
                  fontFamily: 'var(--font-unbounded)',
                  background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)',
                  color: '#070707',
                }}
              >
                {creating ? 'Створення...' : 'Створити'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
