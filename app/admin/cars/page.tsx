'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';

interface CarData {
  _id?: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  images: string[];
  mainImage: string;
  passengers: number;
  luggage: number;
  child: boolean;
  pet: boolean;
  showPassengers: boolean;
  showLuggage: boolean;
  isActive: boolean;
  order: number;
}

const emptyCar: CarData = {
  name: '',
  nameEn: '',
  description: '',
  descriptionEn: '',
  images: [],
  mainImage: '',
  passengers: 3,
  luggage: 2,
  child: true,
  pet: true,
  showPassengers: true,
  showLuggage: true,
  isActive: true,
  order: 0,
};

export default function AdminCarsPage() {
  const router = useRouter();
  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<CarData | null>(null);
  const [formData, setFormData] = useState<CarData>({ ...emptyCar });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCars = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/cars');
      const data = await res.json();
      if (data.success) {
        setCars(data.cars);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleAdd = () => {
    setEditingCar(null);
    setFormData({ ...emptyCar });
    setShowForm(true);
  };

  const handleEdit = (car: CarData) => {
    setEditingCar(car);
    setFormData({ ...car });
    setShowForm(true);
  };

  const handleDelete = async (car: CarData) => {
    if (!confirm(`Видалити "${car.name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/cars/${car._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchCars();
      } else {
        alert('Помилка: ' + data.error);
      }
    } catch (error) {
      alert('Помилка видалення');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append('file', file);

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (data.success) {
          newImages.push(data.url);
        } else {
          alert('Помилка завантаження: ' + data.error);
        }
      } catch (error) {
        alert('Помилка завантаження файлу');
      }
    }

    setFormData(prev => {
      const updatedImages = [...prev.images, ...newImages];
      return {
        ...prev,
        images: updatedImages,
        mainImage: prev.mainImage || updatedImages[0] || '',
      };
    });
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const updated = prev.images.filter((_, i) => i !== index);
      const removedWasMain = prev.mainImage === prev.images[index];
      return {
        ...prev,
        images: updated,
        mainImage: removedWasMain ? (updated[0] || '') : prev.mainImage,
      };
    });
  };

  const setAsMain = (url: string) => {
    setFormData(prev => ({ ...prev, mainImage: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert('Додайте хоча б одне зображення');
      return;
    }

    setSaving(true);
    try {
      const url = editingCar ? `/api/admin/cars/${editingCar._id}` : '/api/admin/cars';
      const method = editingCar ? 'PUT' : 'POST';

      const { _id, ...body } = formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        fetchCars();
      } else {
        alert('Помилка: ' + data.error);
      }
    } catch (error) {
      alert('Помилка збереження');
    } finally {
      setSaving(false);
    }
  };

  // Drag & drop reorder
  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = async (index: number) => {
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reordered = [...cars];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);

    setCars(reordered);
    setDragIndex(null);
    setDragOverIndex(null);

    try {
      await fetch('/api/admin/cars/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cars: reordered.map((car, i) => ({ id: car._id, order: i })),
        }),
      });
    } catch (error) {
      console.error('Reorder error:', error);
      fetchCars();
    }
  };

  const toggleActive = async (car: CarData) => {
    try {
      const res = await fetch(`/api/admin/cars/${car._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !car.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        fetchCars();
      }
    } catch (error) {
      console.error('Toggle active error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#DDDDDD] flex items-center justify-center">
        <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-unbounded)' }}>
          Завантаження...
        </div>
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
            Автопарк
          </h1>
          <div className="flex gap-4">
            <button
              onClick={handleAdd}
              className="px-6 py-3 rounded-[10px] text-[#070707] font-bold uppercase transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: 'var(--font-unbounded)',
                background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)',
              }}
            >
              + Додати авто
            </button>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-6 py-3 border-2 border-[#070707] rounded-[10px] hover:bg-[#070707] hover:text-white transition-colors font-bold"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              ← Назад
            </button>
          </div>
        </div>
      </div>

      {/* Car Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8">
          <div className="bg-white rounded-[10px] p-8 max-w-3xl w-full mx-4 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-black transition-colors"
            >
              ✕
            </button>
            <h2
              className="text-2xl font-black uppercase mb-6"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              {editingCar ? 'Редагувати авто' : 'Додати авто'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Назва (UA)</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FFAE00] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Назва (EN)</label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FFAE00] focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Опис (UA)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FFAE00] focus:outline-none resize-none"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Опис (EN)</label>
                  <textarea
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-[10px] focus:border-[#FFAE00] focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {/* Specs - Icons */}
              <div>
                <label className="block text-sm font-bold mb-3">Іконки на карточці</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`border-2 rounded-[10px] p-4 transition-colors ${formData.showPassengers ? 'border-[#FFAE00] bg-yellow-50' : 'border-gray-300 bg-gray-50'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="checkbox"
                        id="showPassengers"
                        checked={formData.showPassengers}
                        onChange={(e) => setFormData(prev => ({ ...prev, showPassengers: e.target.checked }))}
                        className="w-5 h-5 accent-[#FFAE00]"
                      />
                      <label htmlFor="showPassengers" className="text-sm font-bold">👥 Пасажири</label>
                    </div>
                    {formData.showPassengers && (
                      <input
                        type="number"
                        value={formData.passengers}
                        onChange={(e) => setFormData(prev => ({ ...prev, passengers: Number(e.target.value) }))}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-[8px] focus:border-[#FFAE00] focus:outline-none text-sm"
                        min={1}
                      />
                    )}
                  </div>
                  <div className={`border-2 rounded-[10px] p-4 transition-colors ${formData.showLuggage ? 'border-[#FFAE00] bg-yellow-50' : 'border-gray-300 bg-gray-50'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="checkbox"
                        id="showLuggage"
                        checked={formData.showLuggage}
                        onChange={(e) => setFormData(prev => ({ ...prev, showLuggage: e.target.checked }))}
                        className="w-5 h-5 accent-[#FFAE00]"
                      />
                      <label htmlFor="showLuggage" className="text-sm font-bold">🧳 Багаж</label>
                    </div>
                    {formData.showLuggage && (
                      <input
                        type="number"
                        value={formData.luggage}
                        onChange={(e) => setFormData(prev => ({ ...prev, luggage: Number(e.target.value) }))}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-[8px] focus:border-[#FFAE00] focus:outline-none text-sm"
                        min={0}
                      />
                    )}
                  </div>
                  <div className={`border-2 rounded-[10px] p-4 flex items-center gap-3 transition-colors ${formData.child ? 'border-[#FFAE00] bg-yellow-50' : 'border-gray-300 bg-gray-50'}`}>
                    <input
                      type="checkbox"
                      id="child"
                      checked={formData.child}
                      onChange={(e) => setFormData(prev => ({ ...prev, child: e.target.checked }))}
                      className="w-5 h-5 accent-[#FFAE00]"
                    />
                    <label htmlFor="child" className="text-sm font-bold">👶 Дитяче крісло</label>
                  </div>
                  <div className={`border-2 rounded-[10px] p-4 flex items-center gap-3 transition-colors ${formData.pet ? 'border-[#FFAE00] bg-yellow-50' : 'border-gray-300 bg-gray-50'}`}>
                    <input
                      type="checkbox"
                      id="pet"
                      checked={formData.pet}
                      onChange={(e) => setFormData(prev => ({ ...prev, pet: e.target.checked }))}
                      className="w-5 h-5 accent-[#FFAE00]"
                    />
                    <label htmlFor="pet" className="text-sm font-bold">🐾 Тварини</label>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-bold mb-2">
                  Зображення ({formData.images.length})
                </label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {formData.images.map((url, index) => (
                    <div
                      key={index}
                      className={`relative group w-[120px] h-[90px] rounded-[8px] overflow-hidden border-2 ${
                        url === formData.mainImage ? 'border-[#FFAE00]' : 'border-gray-300'
                      }`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => setAsMain(url)}
                          className="bg-[#FFAE00] text-[#070707] text-[10px] font-bold px-2 py-1 rounded"
                          title="Головне фото"
                        >
                          ★
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded"
                          title="Видалити"
                        >
                          ✕
                        </button>
                      </div>
                      {url === formData.mainImage && (
                        <div className="absolute top-1 left-1 bg-[#FFAE00] text-[#070707] text-[8px] font-bold px-1 py-0.5 rounded">
                          ГОЛОВНЕ
                        </div>
                      )}
                    </div>
                  ))}
                  <label className="w-[120px] h-[90px] border-2 border-dashed border-gray-400 rounded-[8px] flex items-center justify-center cursor-pointer hover:border-[#FFAE00] transition-colors">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {uploading ? (
                      <span className="text-sm text-gray-500">⏳</span>
                    ) : (
                      <span className="text-3xl text-gray-400">+</span>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex-1 px-6 py-3 rounded-[10px] text-[#070707] font-bold uppercase transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  style={{
                    fontFamily: 'var(--font-unbounded)',
                    background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)',
                  }}
                >
                  {saving ? 'Збереження...' : editingCar ? 'Зберегти' : 'Створити'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border-2 border-[#070707] rounded-[10px] hover:bg-[#070707] hover:text-white transition-colors font-bold"
                  style={{ fontFamily: 'var(--font-unbounded)' }}
                >
                  Скасувати
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cars List */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {cars.length === 0 ? (
          <div className="bg-white rounded-[10px] p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">🚗</div>
            <h2
              className="text-2xl font-black mb-2"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              Автопарк порожній
            </h2>
            <p className="text-gray-600 mb-6">Додайте перше авто натиснувши кнопку вище</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-2">
              🔀 Перетягніть карточки для зміни порядку
            </p>
            {cars.map((car, index) => (
              <div
                key={car._id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
                className={`bg-white rounded-[10px] p-4 shadow-lg flex items-center gap-4 cursor-grab active:cursor-grabbing transition-all ${
                  dragOverIndex === index ? 'border-2 border-[#FFAE00]' : 'border-2 border-transparent'
                } ${!car.isActive ? 'opacity-60' : ''}`}
              >
                {/* Drag Handle */}
                <div className="text-gray-400 text-xl flex-shrink-0 select-none">⋮⋮</div>

                {/* Thumbnail */}
                <div className="w-[100px] h-[75px] rounded-[8px] overflow-hidden flex-shrink-0 bg-gray-200">
                  <img
                    src={car.mainImage}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg font-black truncate"
                    style={{ fontFamily: 'var(--font-unbounded)' }}
                  >
                    {car.name}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{car.description}</p>
                  <div className="flex gap-3 mt-1 text-xs text-gray-500">
                    <span>👥 {car.passengers}</span>
                    <span>🧳 {car.luggage}</span>
                    {car.child && <span>👶</span>}
                    {car.pet && <span>🐾</span>}
                    <span>📷 {car.images.length} фото</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(car)}
                    className={`px-3 py-2 rounded-[8px] text-sm font-bold transition-colors ${
                      car.isActive
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                    title={car.isActive ? 'Активне' : 'Неактивне'}
                  >
                    {car.isActive ? '✓' : '✗'}
                  </button>
                  <button
                    onClick={() => handleEdit(car)}
                    className="px-4 py-2 rounded-[8px] text-sm font-bold transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)',
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(car)}
                    className="px-4 py-2 bg-red-500 text-white rounded-[8px] text-sm font-bold hover:bg-red-600 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
