'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ukraineTransfers, europeTransfers, lvivTransfers } from '@/data/transfers';

const RichEditor = dynamic(() => import('@/components/admin/RichEditor'), { ssr: false });

const allTransfers = [...ukraineTransfers, ...europeTransfers, ...lvivTransfers];

// Helper: convert old body+list data to HTML for TipTap
function legacyToHtml(body?: string, list?: string[]): string {
  let html = '';
  if (body) {
    html += body.split('\n\n').map(p => `<p>${p}</p>`).join('');
  }
  if (list && list.length > 0) {
    html += '<ul>' + list.map(item => `<li><p>${item}</p></li>`).join('') + '</ul>';
  }
  return html;
}

interface SectionData {
  heading: string;
  headingEn: string;
  content: string;   // HTML from TipTap
  contentEn: string;  // HTML from TipTap
}

interface FormData {
  directionId: string;
  isCustom: boolean;
  category: 'ukraine' | 'europe' | 'lviv';
  cardTitle: string;
  cardTitleEn: string;
  cardImage: string;
  cardImage2: string;
  cardButtonText: string;
  cardButtonTextEn: string;
  heroTitle: string;
  heroTitleEn: string;
  heroSubtitle: string;
  heroSubtitleEn: string;
  heroCtaText: string;
  heroCtaTextEn: string;
  heroImageLeft: string;
  heroImageRight: string;
  mainTitleBefore: string;
  mainTitleBeforeEn: string;
  mainTitleHighlight: string;
  mainTitleHighlightEn: string;
  mainTitleAfter: string;
  mainTitleAfterEn: string;
  intro: string;
  introEn: string;
  sections: SectionData[];
  routesTitle: string;
  routesTitleEn: string;
  routesIds: string[];
  routesSubtitle: string;
  routesSubtitleEn: string;
  routesDesc: string;
  routesDescEn: string;
  isActive: boolean;
}

const emptySection: SectionData = {
  heading: '',
  headingEn: '',
  content: '',
  contentEn: '',
};

/* ─── Routes slider preview component ─── */
function RoutesPreview({ title, subtitle, desc, routesIds }: { title: string; subtitle: string; desc: string; routesIds: string[] }) {
  const transfers = routesIds.length > 0
    ? routesIds.map(id => allTransfers.find(t => t.id === id)).filter(Boolean)
    : europeTransfers;

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [perView, setPerView] = useState(4);
  const gap = 20;

  const updateDims = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    const vw = window.innerWidth;
    let pv = 4;
    if (vw < 768) pv = 1;
    else if (vw < 1280) pv = 2;
    else if (w < 1200) pv = 3;
    else pv = 4;
    setPerView(pv);
    setCardWidth((w - (pv - 1) * gap) / pv);
  }, []);

  useEffect(() => {
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
  }, [updateDims]);

  const maxIdx = Math.max(0, transfers.length - perView);
  useEffect(() => { if (currentIndex > maxIdx) setCurrentIndex(maxIdx); }, [maxIdx, currentIndex]);
  const tx = -(currentIndex * (cardWidth + gap));

  return (
    <div className="bg-[#1E1D1E] px-[15px] md:px-[50px] py-[60px] md:py-[80px]">
      <div className="flex flex-col gap-[40px] md:gap-[60px] w-full max-w-[1425px] mx-auto">
        <h2 className="text-[24px] md:text-[40px] text-[#F3F3F3] font-black text-center leading-[100%] uppercase" style={{ fontFamily: 'var(--font-unbounded)' }}>
          {title}
        </h2>

        {/* Slider */}
        <div className="w-full flex items-center">
          <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0}
            className="group flex items-center justify-center flex-shrink-0 mr-[10px] md:mr-[30px] transition-transform hover:scale-110 disabled:opacity-30 cursor-pointer">
            <svg width="15" height="27" viewBox="0 0 15 27" fill="none" className="w-[10px] h-[18px] md:w-[15px] md:h-[27px]">
              <path d="M15 2.08639L15 14.1008V24.9196C15 26.771 12.7233 27.6966 11.3886 26.3853L1.22179 16.3957C-0.407263 14.7951 -0.407263 12.1916 1.22179 10.591L5.08832 6.79188L11.3886 0.601456C12.7233 -0.690628 15 0.235044 15 2.08639Z" className="fill-[#F3F3F3] group-hover:fill-[#F39E00] transition-colors duration-300" />
            </svg>
          </button>

          <div ref={containerRef} className="flex-1 overflow-hidden py-[20px] -my-[20px]">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ gap: `${gap}px`, transform: `translateX(${tx}px)`, filter: 'drop-shadow(0px 0px 15px rgba(0,0,0,0.3))' }}>
              {transfers.map((t: any) => (
                <div key={t.id} className="flex-shrink-0" style={{ width: cardWidth > 0 ? `${cardWidth}px` : '100%' }}>
                  <div className="flex flex-col items-center bg-[#BCC4C7] rounded-[8px] md:rounded-[10px] p-[20px] w-full gap-[15px] md:gap-[20px] overflow-hidden">
                    {t.image2 ? (
                      <div className="w-full aspect-[200/149] md:aspect-[267/200] rounded-[6px] overflow-hidden flex gap-[5px]">
                        <div className="relative w-1/2 h-full"><Image src={t.image} alt="" fill className="object-cover" sizes="200px" /></div>
                        <div className="relative w-1/2 h-full"><Image src={t.image2} alt="" fill className="object-cover" sizes="200px" /></div>
                      </div>
                    ) : (
                      <div className="w-full aspect-[200/149] md:aspect-[267/200] rounded-[6px] overflow-hidden relative">
                        <Image src={t.image} alt="" fill className="object-cover" sizes="300px" />
                      </div>
                    )}
                    <p className="text-[16px] text-[#070707] font-black text-center leading-[120%] whitespace-pre-line uppercase" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                      {t.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setCurrentIndex(i => Math.min(maxIdx, i + 1))} disabled={currentIndex >= maxIdx}
            className="group flex items-center justify-center flex-shrink-0 ml-[10px] md:ml-[30px] transition-transform hover:scale-110 disabled:opacity-30 cursor-pointer">
            <svg width="15" height="27" viewBox="0 0 15 27" fill="none" className="w-[10px] h-[18px] md:w-[15px] md:h-[27px]">
              <path d="M0 2.08639L0 14.1008L0 24.9196C0 26.771 2.27674 27.6966 3.61138 26.3853L13.7782 16.3957C15.4073 14.7951 15.4073 12.1916 13.7782 10.591L9.91168 6.79188L3.61138 0.601456C2.27674 -0.690628 0 0.235044 0 2.08639Z" className="fill-[#F3F3F3] group-hover:fill-[#F39E00] transition-colors duration-300" />
            </svg>
          </button>
        </div>

        {/* Description */}
        {(subtitle || desc) && (
          <div className="w-full px-[25px] md:px-[65px]">
            <div className="text-[12px] md:text-[16px] text-[#F3F3F3] leading-[120%]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
              {subtitle && <p className="font-black uppercase text-[12px] md:text-[16px] mb-[12px]">{subtitle}</p>}
              {desc && desc.split('\n\n').map((p: string, i: number) => (
                <p key={i} className={i < desc.split('\n\n').length - 1 ? 'mb-[12px]' : ''}>{p}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDirectionEditPage() {
  const router = useRouter();
  const params = useParams();
  const directionId = params.id as string;
  const fileInputLeftRef = useRef<HTMLInputElement>(null);
  const fileInputRightRef = useRef<HTMLInputElement>(null);
  const fileInputCardRef = useRef<HTMLInputElement>(null);
  const fileInputCard2Ref = useRef<HTMLInputElement>(null);

  const transfer = allTransfers.find(t => t.id === directionId);

  const [formData, setFormData] = useState<FormData>({
    directionId,
    isCustom: false,
    category: 'ukraine',
    cardTitle: '',
    cardTitleEn: '',
    cardImage: '',
    cardImage2: '',
    cardButtonText: 'дізнатися більше',
    cardButtonTextEn: 'learn more',
    heroTitle: '',
    heroTitleEn: '',
    heroSubtitle: 'Бізнес та Преміум клас',
    heroSubtitleEn: 'Business & Premium class',
    heroCtaText: 'розрахувати вартість',
    heroCtaTextEn: 'calculate price',
    heroImageLeft: '',
    heroImageRight: '',
    mainTitleBefore: '',
    mainTitleBeforeEn: '',
    mainTitleHighlight: '',
    mainTitleHighlightEn: '',
    mainTitleAfter: '',
    mainTitleAfterEn: '',
    intro: '',
    introEn: '',
    sections: [],
    routesTitle: 'Популярні маршрути',
    routesTitleEn: 'Popular routes',
    routesIds: [],
    routesSubtitle: '',
    routesSubtitleEn: '',
    routesDesc: '',
    routesDescEn: '',
    isActive: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [uploading, setUploading] = useState<'left' | 'right' | null>(null);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [contentLang, setContentLang] = useState<'ua' | 'en'>('ua');

  const fetchDirection = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/directions/${directionId}`);
      const data = await res.json();
      if (data.success && data.page) {
        setIsNew(false);
        setFormData({
          directionId: data.page.directionId,
          isCustom: data.page.isCustom || false,
          category: data.page.category || 'ukraine',
          cardTitle: data.page.cardTitle || '',
          cardTitleEn: data.page.cardTitleEn || '',
          cardImage: data.page.cardImage || '',
          cardImage2: data.page.cardImage2 || '',
          cardButtonText: data.page.cardButtonText || 'дізнатися більше',
          cardButtonTextEn: data.page.cardButtonTextEn || 'learn more',
          heroTitle: data.page.heroTitle || '',
          heroTitleEn: data.page.heroTitleEn || '',
          heroSubtitle: data.page.heroSubtitle || 'Бізнес та Преміум клас',
          heroSubtitleEn: data.page.heroSubtitleEn || 'Business & Premium class',
          heroCtaText: data.page.heroCtaText || 'розрахувати вартість',
          heroCtaTextEn: data.page.heroCtaTextEn || 'calculate price',
          heroImageLeft: data.page.heroImageLeft || '',
          heroImageRight: data.page.heroImageRight || '',
          mainTitleBefore: data.page.mainTitleBefore || '',
          mainTitleBeforeEn: data.page.mainTitleBeforeEn || '',
          mainTitleHighlight: data.page.mainTitleHighlight || '',
          mainTitleHighlightEn: data.page.mainTitleHighlightEn || '',
          mainTitleAfter: data.page.mainTitleAfter || '',
          mainTitleAfterEn: data.page.mainTitleAfterEn || '',
          intro: data.page.intro || '',
          introEn: data.page.introEn || '',
          sections: (data.page.sections || []).map((s: any) => ({
            heading: s.heading || '',
            headingEn: s.headingEn || '',
            content: s.content || legacyToHtml(s.body, s.list),
            contentEn: s.contentEn || legacyToHtml(s.bodyEn, s.listEn),
          })),
          routesTitle: data.page.routesTitle || 'Популярні маршрути',
          routesTitleEn: data.page.routesTitleEn || 'Popular routes',
          routesIds: data.page.routesIds || [],
          routesSubtitle: data.page.routesSubtitle || '',
          routesSubtitleEn: data.page.routesSubtitleEn || '',
          routesDesc: data.page.routesDesc || '',
          routesDescEn: data.page.routesDescEn || '',
          isActive: data.page.isActive !== false,
        });
      } else {
        // Pre-fill from transfer data
        if (transfer) {
          setFormData(prev => ({
            ...prev,
            heroTitle: `Трансфер ${transfer.title.replace('\n', ' ')}`,
            heroTitleEn: `Transfer ${transfer.titleEn.replace('\n', ' ')}`,
          }));
        }
      }
    } catch {
      // New page
    } finally {
      setLoading(false);
    }
  }, [directionId, transfer]);

  useEffect(() => {
    fetchDirection();
  }, [fetchDirection]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, side: 'left' | 'right' | 'card' | 'card2') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(side as any);
    try {
      const fd = new window.FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        const fieldMap: Record<string, string> = {
          left: 'heroImageLeft',
          right: 'heroImageRight',
          card: 'cardImage',
          card2: 'cardImage2',
        };
        setFormData(prev => ({
          ...prev,
          [fieldMap[side]]: data.url,
        }));
      } else {
        alert('Помилка завантаження: ' + data.error);
      }
    } catch {
      alert('Помилка завантаження');
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = isNew ? '/api/admin/directions' : `/api/admin/directions/${directionId}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsNew(false);
        alert('Збережено!');
      } else {
        alert('Помилка: ' + data.error);
      }
    } catch {
      alert('Помилка збереження');
    } finally {
      setSaving(false);
    }
  };

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, { ...emptySection }],
    }));
  };

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const updateSection = (index: number, field: keyof SectionData, value: any) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((s, i) => i === index ? { ...s, [field]: value } : s),
    }));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    setFormData(prev => {
      const newSections = [...prev.sections];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= newSections.length) return prev;
      [newSections[index], newSections[target]] = [newSections[target], newSections[index]];
      return { ...prev, sections: newSections };
    });
  };

  const duplicateSection = (index: number) => {
    setFormData(prev => {
      const newSections = [...prev.sections];
      newSections.splice(index + 1, 0, {
        ...prev.sections[index],
      });
      return { ...prev, sections: newSections };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white/50 text-lg">Завантаження...</div>
      </div>
    );
  }

  const inputClass = "w-full bg-[#333] border border-[#444] rounded-[8px] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FFAE00] transition-colors";
  const textareaClass = "w-full bg-[#333] border border-[#444] rounded-[8px] px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FFAE00] transition-colors resize-y min-h-[100px]";
  const labelClass = "text-white/60 text-xs font-bold uppercase mb-1 block";
  const sectionTitleClass = "text-white font-black text-lg mb-4";

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="bg-[#111] border-b border-[#333] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/directions')}
              className="px-3 py-2 border border-white/20 rounded-[8px] text-white/70 hover:text-white hover:border-white/50 transition-all text-sm font-bold"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              ←
            </button>
            <h1 className="text-lg font-black text-white" style={{ fontFamily: 'var(--font-unbounded)' }}>
              {isNew ? 'Створити' : 'Редагувати'}: {formData.heroTitle || directionId}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Edit / Preview toggle */}
            <div className="flex bg-[#333] rounded-[8px] overflow-hidden border border-[#444]">
              <button
                onClick={() => setViewMode('edit')}
                className={`px-4 py-2 text-sm font-bold transition-all ${
                  viewMode === 'edit'
                    ? 'bg-[#FFAE00] text-[#070707]'
                    : 'text-white/60 hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                ✏️ Редагувати
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-4 py-2 text-sm font-bold transition-all ${
                  viewMode === 'preview'
                    ? 'bg-[#FFAE00] text-[#070707]'
                    : 'text-white/60 hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-unbounded)' }}
              >
                👁 Превью
              </button>
            </div>
            <a
              href={`/direction/${directionId}`}
              target="_blank"
              className="px-4 py-2 border border-white/20 rounded-[8px] text-white/70 hover:text-white hover:border-white/50 transition-all text-sm font-bold"
              style={{ fontFamily: 'var(--font-unbounded)' }}
            >
              🌐 На сайті
            </a>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 rounded-[8px] text-sm font-bold transition-all hover:scale-105 disabled:opacity-50"
              style={{
                fontFamily: 'var(--font-unbounded)',
                background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)',
                color: '#070707',
              }}
            >
              {saving ? 'Збереження...' : '💾 Зберегти'}
            </button>
          </div>
        </div>
      </div>

      {/* PREVIEW MODE */}
      {viewMode === 'preview' && (
        <div className="bg-white">
          {/* Hero Preview */}
          <div className="relative w-full h-[400px] md:h-[600px] flex flex-col justify-between items-center px-[15px] md:px-[50px] py-[40px] md:py-[80px] overflow-hidden">
            <div className="absolute inset-0 flex">
              <div className="relative w-1/2 h-full">
                {formData.heroImageLeft ? (
                  <Image src={formData.heroImageLeft} alt="" fill className="object-cover" sizes="50vw" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#333] to-[#555]" />
                )}
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="relative w-1/2 h-full">
                {formData.heroImageRight ? (
                  <Image src={formData.heroImageRight} alt="" fill className="object-cover" sizes="50vw" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-bl from-[#333] to-[#555]" />
                )}
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-[10px] md:gap-[20px]">
              <p className="text-[10px] md:text-[18px] text-white text-center uppercase tracking-[0.17em]" style={{ fontFamily: 'var(--font-unbounded)' }}>
                {formData.heroSubtitle || 'Бізнес та Преміум клас'}
              </p>
              <h1 className="text-[22px] md:text-[45px] text-white text-center font-black leading-[100%]" style={{ fontFamily: 'var(--font-unbounded)' }}>
                {formData.heroTitle || 'Заголовок'}
              </h1>
            </div>
            <div
              className="relative z-10 px-[30px] md:px-[50px] py-[12px] md:py-[16px] rounded-[10px]"
              style={{ background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)' }}
            >
              <span className="text-[11px] md:text-[18px] text-[#070707] font-bold uppercase" style={{ fontFamily: 'var(--font-unbounded)' }}>
                {formData.heroCtaText || 'розрахувати вартість'}
              </span>
            </div>
          </div>

          {/* Info Block Preview */}
          <div className="bg-[#F4F4F4] px-[15px] md:px-[60px] xl:px-[200px] py-[40px] md:py-[80px] xl:py-[100px]">
            <div className="flex flex-col gap-[25px] md:gap-[35px]">
              {/* Main title */}
              {(formData.mainTitleBefore || formData.mainTitleHighlight || formData.mainTitleAfter) && (
                <h2 className="text-[16px] md:text-[20px] xl:text-[24px] font-black leading-[100%] text-[#070707]" style={{ fontFamily: 'var(--font-unbounded)' }}>
                  {formData.mainTitleBefore}
                  <span className="text-[#FFAE00]">{formData.mainTitleHighlight}</span>
                  {formData.mainTitleAfter}
                </h2>
              )}

              {/* Intro */}
              {formData.intro && (
                <p className="text-[13px] md:text-[16px] xl:text-[18px] text-[#070707] leading-[120%]" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                  {formData.intro}
                </p>
              )}

              {/* Sections */}
              {formData.sections.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-[12px] md:gap-[18px]">
                  {section.heading && (
                    <h3 className="text-[16px] md:text-[20px] xl:text-[24px] font-black leading-[130%] text-[#070707]" style={{ fontFamily: 'var(--font-unbounded)' }}>
                      {section.heading}
                    </h3>
                  )}
                  {section.content && section.content !== '<p></p>' && (
                    <div
                      className="direction-info-content text-[13px] md:text-[16px] xl:text-[18px] text-[#070707] leading-[140%]"
                      style={{ fontFamily: 'var(--font-nunito-sans)' }}
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  )}
                </div>
              ))}

              {/* Empty state */}
              {!formData.mainTitleHighlight && !formData.intro && formData.sections.length === 0 && (
                <div className="text-center py-20 text-[#999]">
                  <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-unbounded)' }}>Контент порожній</p>
                  <p className="text-sm mt-2">Заповніть поля в режимі редагування</p>
                </div>
              )}
            </div>
          </div>

          {/* Routes Preview */}
          <RoutesPreview
            title={formData.routesTitle || 'Популярні маршрути'}
            subtitle={formData.routesSubtitle}
            desc={formData.routesDesc}
            routesIds={formData.routesIds}
          />

          {/* Preview footer note */}
          <div className="bg-[#1a1a1a] text-center py-6">
            <p className="text-white/40 text-sm">
              ↑ Попередній перегляд блоків Hero, Інфо та Маршрути · Нижче на сторінці також будуть: Автопарк, FAQ, Інші послуги, Футер
            </p>
          </div>
        </div>
      )}

      {/* EDIT MODE */}
      {viewMode === 'edit' && (
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Active toggle */}
        <div className="bg-[#222] border border-[#333] rounded-[12px] p-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="w-5 h-5 rounded accent-[#FFAE00]"
            />
            <span className="text-white font-bold" style={{ fontFamily: 'var(--font-unbounded)' }}>
              Сторінка активна
            </span>
          </label>
        </div>

        {/* CARD SETTINGS — for custom directions */}
        {formData.isCustom && (
          <div className="bg-[#222] border border-[#333] rounded-[12px] p-6 space-y-5">
            <h2 className={sectionTitleClass} style={{ fontFamily: 'var(--font-unbounded)' }}>
              🃏 Картка напрямку (на головній сторінці)
            </h2>

            <div>
              <label className={labelClass}>Категорія</label>
              <div className="flex gap-2">
                {(['ukraine', 'europe', 'lviv'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                    className={`flex-1 py-2 rounded-[8px] text-sm font-bold transition-all border ${
                      formData.category === cat
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Назва на картці (UA)</label>
                <input
                  className={inputClass}
                  value={formData.cardTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, cardTitle: e.target.value }))}
                  placeholder="Львів → Прага"
                />
              </div>
              <div>
                <label className={labelClass}>Назва на картці (EN)</label>
                <input
                  className={inputClass}
                  value={formData.cardTitleEn}
                  onChange={(e) => setFormData(prev => ({ ...prev, cardTitleEn: e.target.value }))}
                  placeholder="Lviv → Prague"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Текст кнопки (UA)</label>
                <input
                  className={inputClass}
                  value={formData.cardButtonText}
                  onChange={(e) => setFormData(prev => ({ ...prev, cardButtonText: e.target.value }))}
                  placeholder="дізнатися більше"
                />
              </div>
              <div>
                <label className={labelClass}>Текст кнопки (EN)</label>
                <input
                  className={inputClass}
                  value={formData.cardButtonTextEn}
                  onChange={(e) => setFormData(prev => ({ ...prev, cardButtonTextEn: e.target.value }))}
                  placeholder="learn more"
                />
              </div>
            </div>

            {/* Card images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Фото картки 1</label>
                <div className="flex gap-2">
                  <input
                    className={inputClass}
                    value={formData.cardImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, cardImage: e.target.value }))}
                    placeholder="URL або завантажте"
                  />
                  <input ref={fileInputCardRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'card')} />
                  <button
                    onClick={() => fileInputCardRef.current?.click()}
                    className="px-3 py-2 bg-[#444] rounded-[8px] text-white/70 hover:text-white text-sm flex-shrink-0 transition-colors"
                  >
                    📤
                  </button>
                </div>
                {formData.cardImage && (
                  <img src={formData.cardImage} alt="" className="mt-2 h-20 rounded-[6px] object-cover" />
                )}
              </div>
              <div>
                <label className={labelClass}>Фото картки 2 (необов&apos;язкове)</label>
                <div className="flex gap-2">
                  <input
                    className={inputClass}
                    value={formData.cardImage2}
                    onChange={(e) => setFormData(prev => ({ ...prev, cardImage2: e.target.value }))}
                    placeholder="URL або завантажте (якщо 2 фото)"
                  />
                  <input ref={fileInputCard2Ref} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'card2')} />
                  <button
                    onClick={() => fileInputCard2Ref.current?.click()}
                    className="px-3 py-2 bg-[#444] rounded-[8px] text-white/70 hover:text-white text-sm flex-shrink-0 transition-colors"
                  >
                    📤
                  </button>
                </div>
                {formData.cardImage2 && (
                  <img src={formData.cardImage2} alt="" className="mt-2 h-20 rounded-[6px] object-cover" />
                )}
              </div>
            </div>

            <p className="text-white/30 text-xs">
              Ці поля визначають виглях картки напрямку у слайдері на головній сторінці
            </p>
          </div>
        )}

        {/* HERO Section */}
        <div className="bg-[#222] border border-[#333] rounded-[12px] p-6 space-y-5">
          <h2 className={sectionTitleClass} style={{ fontFamily: 'var(--font-unbounded)' }}>
            🖼️ Герой (Hero)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Заголовок (UA)</label>
              <input
                className={inputClass}
                value={formData.heroTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, heroTitle: e.target.value }))}
                placeholder="Трансфер Львів - Варшава"
              />
            </div>
            <div>
              <label className={labelClass}>Заголовок (EN)</label>
              <input
                className={inputClass}
                value={formData.heroTitleEn}
                onChange={(e) => setFormData(prev => ({ ...prev, heroTitleEn: e.target.value }))}
                placeholder="Transfer Lviv - Warsaw"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Підзаголовок (UA)</label>
              <input
                className={inputClass}
                value={formData.heroSubtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, heroSubtitle: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelClass}>Підзаголовок (EN)</label>
              <input
                className={inputClass}
                value={formData.heroSubtitleEn}
                onChange={(e) => setFormData(prev => ({ ...prev, heroSubtitleEn: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Текст кнопки (UA)</label>
              <input
                className={inputClass}
                value={formData.heroCtaText}
                onChange={(e) => setFormData(prev => ({ ...prev, heroCtaText: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelClass}>Текст кнопки (EN)</label>
              <input
                className={inputClass}
                value={formData.heroCtaTextEn}
                onChange={(e) => setFormData(prev => ({ ...prev, heroCtaTextEn: e.target.value }))}
              />
            </div>
          </div>

          {/* Hero images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Фото ліва частина</label>
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  value={formData.heroImageLeft}
                  onChange={(e) => setFormData(prev => ({ ...prev, heroImageLeft: e.target.value }))}
                  placeholder="URL або завантажте"
                />
                <input ref={fileInputLeftRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'left')} />
                <button
                  onClick={() => fileInputLeftRef.current?.click()}
                  disabled={uploading === 'left'}
                  className="px-3 py-2 bg-[#444] rounded-[8px] text-white/70 hover:text-white text-sm flex-shrink-0 transition-colors"
                >
                  {uploading === 'left' ? '...' : '📤'}
                </button>
              </div>
              {formData.heroImageLeft && (
                <img src={formData.heroImageLeft} alt="" className="mt-2 h-20 rounded-[6px] object-cover" />
              )}
            </div>
            <div>
              <label className={labelClass}>Фото права частина</label>
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  value={formData.heroImageRight}
                  onChange={(e) => setFormData(prev => ({ ...prev, heroImageRight: e.target.value }))}
                  placeholder="URL або завантажте"
                />
                <input ref={fileInputRightRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'right')} />
                <button
                  onClick={() => fileInputRightRef.current?.click()}
                  disabled={uploading === 'right'}
                  className="px-3 py-2 bg-[#444] rounded-[8px] text-white/70 hover:text-white text-sm flex-shrink-0 transition-colors"
                >
                  {uploading === 'right' ? '...' : '📤'}
                </button>
              </div>
              {formData.heroImageRight && (
                <img src={formData.heroImageRight} alt="" className="mt-2 h-20 rounded-[6px] object-cover" />
              )}
            </div>
          </div>
        </div>

        {/* ═══ CONTENT EDITOR WITH TIPTAP ═══ */}
        <div className="bg-[#222] border border-[#333] rounded-[12px] overflow-hidden">
          {/* Editor toolbar */}
          <div className="bg-[#1a1a1a] border-b border-[#333] px-6 py-4 flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-white font-black text-lg" style={{ fontFamily: 'var(--font-unbounded)' }}>
              📝 Контент сторінки
            </h2>
            <div className="flex items-center gap-3">
              {/* Language toggle */}
              <div className="flex bg-[#333] rounded-[8px] overflow-hidden border border-[#444]">
                <button
                  onClick={() => setContentLang('ua')}
                  className={`px-4 py-2 text-sm font-bold transition-all ${
                    contentLang === 'ua'
                      ? 'bg-[#FFAE00] text-[#070707]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  🇺🇦 UA
                </button>
                <button
                  onClick={() => setContentLang('en')}
                  className={`px-4 py-2 text-sm font-bold transition-all ${
                    contentLang === 'en'
                      ? 'bg-[#FFAE00] text-[#070707]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  🇬🇧 EN
                </button>
              </div>
              <button
                onClick={addSection}
                className="px-4 py-2 rounded-[8px] text-sm font-bold transition-all hover:scale-105"
                style={{
                  fontFamily: 'var(--font-unbounded)',
                  background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)',
                  color: '#070707',
                }}
              >
                + Секція
              </button>
            </div>
          </div>

          {/* Content editing area */}
          <div className="p-6 space-y-6">

            {/* ── Main title (3-part) ── */}
            <div className="bg-[#1a1a1a] border border-[#333] rounded-[10px] p-5 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#FFAE00] text-base">🏷️</span>
                <h3 className="text-white/80 text-sm font-bold uppercase tracking-wider">Головний заголовок</h3>
              </div>
              <p className="text-white/30 text-xs mb-2">
                Складається з 3 частин: текст до + <span className="text-[#FFAE00]">виділений оранжевим</span> + текст після
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-white/40 text-[10px] font-bold uppercase mb-1 block">Текст до</label>
                  <input
                    className={inputClass}
                    value={contentLang === 'ua' ? formData.mainTitleBefore : formData.mainTitleBeforeEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, [contentLang === 'ua' ? 'mainTitleBefore' : 'mainTitleBeforeEn']: e.target.value }))}
                    placeholder="Пропонуємо "
                  />
                </div>
                <div>
                  <label className="text-[#FFAE00]/60 text-[10px] font-bold uppercase mb-1 block">Виділений текст</label>
                  <input
                    className="w-full bg-[#333] border border-[#FFAE00]/30 rounded-[8px] px-4 py-3 text-[#FFAE00] text-sm focus:outline-none focus:border-[#FFAE00] transition-colors"
                    value={contentLang === 'ua' ? formData.mainTitleHighlight : formData.mainTitleHighlightEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, [contentLang === 'ua' ? 'mainTitleHighlight' : 'mainTitleHighlightEn']: e.target.value }))}
                    placeholder="міжнародний трансфер Львів–Варшава"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-[10px] font-bold uppercase mb-1 block">Текст після</label>
                  <input
                    className={inputClass}
                    value={contentLang === 'ua' ? formData.mainTitleAfter : formData.mainTitleAfterEn}
                    onChange={(e) => setFormData(prev => ({ ...prev, [contentLang === 'ua' ? 'mainTitleAfter' : 'mainTitleAfterEn']: e.target.value }))}
                    placeholder=" для клієнтів, які..."
                  />
                </div>
              </div>
              {/* Mini preview */}
              {(formData.mainTitleBefore || formData.mainTitleHighlight || formData.mainTitleAfter ||
                formData.mainTitleBeforeEn || formData.mainTitleHighlightEn || formData.mainTitleAfterEn) && (
                <div className="bg-[#F4F4F4] rounded-[8px] p-4 mt-2">
                  <p className="text-[#070707] font-black text-[15px] md:text-[18px] leading-[130%]" style={{ fontFamily: 'var(--font-unbounded)' }}>
                    {contentLang === 'ua' ? formData.mainTitleBefore : formData.mainTitleBeforeEn}
                    <span className="text-[#FFAE00]">{contentLang === 'ua' ? formData.mainTitleHighlight : formData.mainTitleHighlightEn}</span>
                    {contentLang === 'ua' ? formData.mainTitleAfter : formData.mainTitleAfterEn}
                  </p>
                </div>
              )}
            </div>

            {/* ── Intro paragraph ── */}
            <div className="bg-[#1a1a1a] border border-[#333] rounded-[10px] p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[#FFAE00] text-base">📄</span>
                <h3 className="text-white/80 text-sm font-bold uppercase tracking-wider">Вступний абзац</h3>
              </div>
              <textarea
                className={textareaClass}
                value={contentLang === 'ua' ? formData.intro : formData.introEn}
                onChange={(e) => setFormData(prev => ({ ...prev, [contentLang === 'ua' ? 'intro' : 'introEn']: e.target.value }))}
                placeholder={contentLang === 'ua' ? 'Це індивідуальна поїздка без пересадок, очікувань і компромісів у комфорті...' : 'This is an individual trip without transfers, waiting and compromises in comfort...'}
              />
            </div>

            {/* ── Sections ── */}
            {formData.sections.length === 0 && (
              <div className="bg-[#1a1a1a] border-2 border-dashed border-[#444] rounded-[12px] text-center py-12">
                <p className="text-white/40 text-base font-bold" style={{ fontFamily: 'var(--font-unbounded)' }}>Немає секцій контенту</p>
                <p className="text-white/20 text-sm mt-2 mb-4">Кожна секція = заголовок + текст з форматуванням (абзаци, списки, жирний)</p>
                <button
                  onClick={addSection}
                  className="px-5 py-2 rounded-[8px] text-sm font-bold transition-all hover:scale-105"
                  style={{
                    fontFamily: 'var(--font-unbounded)',
                    background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)',
                    color: '#070707',
                  }}
                >
                  + Додати першу секцію
                </button>
              </div>
            )}

            {formData.sections.map((section, sIdx) => (
              <div key={sIdx} className="bg-[#1a1a1a] border border-[#333] rounded-[10px] overflow-hidden">
                {/* Section header */}
                <div className="bg-[#181818] border-b border-[#333] px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#FFAE00] text-[#070707] text-xs font-black flex items-center justify-center">
                      {sIdx + 1}
                    </span>
                    <span className="text-white/50 text-xs font-bold uppercase">Секція</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {sIdx > 0 && (
                      <button
                        onClick={() => moveSection(sIdx, 'up')}
                        className="w-7 h-7 rounded-[6px] text-white/40 text-xs flex items-center justify-center hover:bg-[#333] hover:text-white transition-all"
                        title="Вгору"
                      >↑</button>
                    )}
                    {sIdx < formData.sections.length - 1 && (
                      <button
                        onClick={() => moveSection(sIdx, 'down')}
                        className="w-7 h-7 rounded-[6px] text-white/40 text-xs flex items-center justify-center hover:bg-[#333] hover:text-white transition-all"
                        title="Вниз"
                      >↓</button>
                    )}
                    <button
                      onClick={() => duplicateSection(sIdx)}
                      className="w-7 h-7 rounded-[6px] text-white/40 text-xs flex items-center justify-center hover:bg-[#333] hover:text-white transition-all"
                      title="Дублювати"
                    >⎘</button>
                    <div className="w-px h-4 bg-[#444] mx-1" />
                    <button
                      onClick={() => {
                        if (confirm('Видалити секцію?')) removeSection(sIdx);
                      }}
                      className="w-7 h-7 rounded-[6px] text-red-400/60 text-xs flex items-center justify-center hover:bg-red-900/30 hover:text-red-400 transition-all"
                      title="Видалити"
                    >✕</button>
                  </div>
                </div>

                {/* Section content */}
                <div className="p-5 space-y-4">
                  {/* Heading */}
                  <div>
                    <label className="text-white/40 text-[10px] font-bold uppercase mb-1 block">Заголовок секції</label>
                    <input
                      className="w-full bg-[#333] border border-[#444] rounded-[8px] px-4 py-3 text-white text-base font-black focus:outline-none focus:border-[#FFAE00] transition-colors"
                      style={{ fontFamily: 'var(--font-unbounded)' }}
                      value={contentLang === 'ua' ? section.heading : section.headingEn}
                      onChange={(e) => updateSection(sIdx, contentLang === 'ua' ? 'heading' : 'headingEn', e.target.value)}
                      placeholder={contentLang === 'ua' ? 'Індивідуальний формат поїздки' : 'Individual trip format'}
                    />
                  </div>

                  {/* Rich text content (TipTap) */}
                  <div>
                    <label className="text-white/40 text-[10px] font-bold uppercase mb-1 block">
                      Контент секції — текст, списки, форматування
                    </label>
                    <RichEditor
                      content={contentLang === 'ua' ? section.content : section.contentEn}
                      onChange={(html) => updateSection(sIdx, contentLang === 'ua' ? 'content' : 'contentEn', html)}
                      placeholder={contentLang === 'ua'
                        ? 'Введіть текст секції. Використовуйте панель інструментів для жирного тексту, списків тощо...'
                        : 'Enter section text. Use the toolbar for bold text, lists, etc...'
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add section button at bottom */}
            {formData.sections.length > 0 && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={addSection}
                  className="flex items-center gap-2 px-6 py-3 border border-dashed border-[#444] rounded-[10px] text-white/30 hover:border-[#FFAE00] hover:text-[#FFAE00] transition-all text-sm font-bold"
                >
                  <span className="text-xl leading-none">+</span>
                  <span>Додати секцію</span>
                </button>
              </div>
            )}
          </div>

          {/* Status bar */}
          <div className="bg-[#1a1a1a] border-t border-[#333] px-6 py-2 flex items-center justify-between text-[11px] text-white/30">
            <span>
              {formData.sections.length} секц. · {contentLang === 'ua' ? '🇺🇦 Українська' : '🇬🇧 English'}
            </span>
            <span>
              {contentLang === 'ua' ? 'Перемкніть на EN щоб додати англійський переклад' : 'Switch to UA to edit Ukrainian content'}
            </span>
          </div>
        </div>

        {/* ROUTES BLOCK */}
        <div className="bg-[#222] border border-[#333] rounded-[12px] p-6 space-y-5">
          <h2 className={sectionTitleClass} style={{ fontFamily: 'var(--font-unbounded)' }}>
            🗺️ Популярні маршрути
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Заголовок блоку (UA)</label>
              <input
                className={inputClass}
                value={formData.routesTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, routesTitle: e.target.value }))}
                placeholder="Популярні маршрути"
              />
            </div>
            <div>
              <label className={labelClass}>Заголовок блоку (EN)</label>
              <input
                className={inputClass}
                value={formData.routesTitleEn}
                onChange={(e) => setFormData(prev => ({ ...prev, routesTitleEn: e.target.value }))}
                placeholder="Popular routes"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Підзаголовок (UA)</label>
              <input
                className={inputClass}
                value={formData.routesSubtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, routesSubtitle: e.target.value }))}
                placeholder="Індивідуальні трансфери між Україною та Європою"
              />
            </div>
            <div>
              <label className={labelClass}>Підзаголовок (EN)</label>
              <input
                className={inputClass}
                value={formData.routesSubtitleEn}
                onChange={(e) => setFormData(prev => ({ ...prev, routesSubtitleEn: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Опис (UA) — абзаци через порожній рядок</label>
              <textarea
                className={textareaClass}
                value={formData.routesDesc}
                onChange={(e) => setFormData(prev => ({ ...prev, routesDesc: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelClass}>Опис (EN)</label>
              <textarea
                className={textareaClass}
                value={formData.routesDescEn}
                onChange={(e) => setFormData(prev => ({ ...prev, routesDescEn: e.target.value }))}
              />
            </div>
          </div>

          {/* Route selection */}
          <div>
            <label className={labelClass}>Обрати маршрути для показу (якщо не обрано — показуються всі європейські)</label>
            <div className="mt-3 space-y-2">
              <p className="text-white/40 text-xs font-bold uppercase mb-2">🇺🇦 Україна</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {ukraineTransfers.map((t) => (
                  <label
                    key={t.id}
                    className={`flex items-center gap-3 p-3 rounded-[8px] border cursor-pointer transition-all ${
                      formData.routesIds.includes(t.id)
                        ? 'bg-[#FFAE00]/10 border-[#FFAE00]/50 text-white'
                        : 'bg-[#1a1a1a] border-[#333] text-white/60 hover:border-[#444]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.routesIds.includes(t.id)}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          routesIds: e.target.checked
                            ? [...prev.routesIds, t.id]
                            : prev.routesIds.filter(id => id !== t.id),
                        }));
                      }}
                      className="accent-[#FFAE00] w-4 h-4"
                    />
                    <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-unbounded)' }}>
                      {t.title.replace('\n', ' ')}
                    </span>
                  </label>
                ))}
              </div>

              <p className="text-white/40 text-xs font-bold uppercase mb-2 mt-4">🇪🇺 Європа</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {europeTransfers.map((t) => (
                  <label
                    key={t.id}
                    className={`flex items-center gap-3 p-3 rounded-[8px] border cursor-pointer transition-all ${
                      formData.routesIds.includes(t.id)
                        ? 'bg-[#FFAE00]/10 border-[#FFAE00]/50 text-white'
                        : 'bg-[#1a1a1a] border-[#333] text-white/60 hover:border-[#444]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.routesIds.includes(t.id)}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          routesIds: e.target.checked
                            ? [...prev.routesIds, t.id]
                            : prev.routesIds.filter(id => id !== t.id),
                        }));
                      }}
                      className="accent-[#FFAE00] w-4 h-4"
                    />
                    <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-unbounded)' }}>
                      {t.title.replace('\n', ' ')}
                    </span>
                  </label>
                ))}
              </div>

              <p className="text-white/40 text-xs font-bold uppercase mb-2 mt-4">🏙️ Львів</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {lvivTransfers.map((t) => (
                  <label
                    key={t.id}
                    className={`flex items-center gap-3 p-3 rounded-[8px] border cursor-pointer transition-all ${
                      formData.routesIds.includes(t.id)
                        ? 'bg-[#FFAE00]/10 border-[#FFAE00]/50 text-white'
                        : 'bg-[#1a1a1a] border-[#333] text-white/60 hover:border-[#444]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.routesIds.includes(t.id)}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          routesIds: e.target.checked
                            ? [...prev.routesIds, t.id]
                            : prev.routesIds.filter(id => id !== t.id),
                        }));
                      }}
                      className="accent-[#FFAE00] w-4 h-4"
                    />
                    <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-unbounded)' }}>
                      {t.title.replace('\n', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            {formData.routesIds.length > 0 && (
              <p className="text-[#FFAE00] text-xs mt-3">
                Обрано: {formData.routesIds.length} маршрут(ів)
              </p>
            )}
          </div>
        </div>

        {/* Bottom save */}
        <div className="flex justify-end pb-10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 rounded-[10px] text-base font-bold transition-all hover:scale-105 disabled:opacity-50"
            style={{
              fontFamily: 'var(--font-unbounded)',
              background: 'linear-gradient(to bottom left, #FFAE00 23%, #F39E00 100%)',
              color: '#070707',
            }}
          >
            {saving ? 'Збереження...' : '💾 Зберегти'}
          </button>
        </div>
      </div>
      )}
    </div>
  );
}
