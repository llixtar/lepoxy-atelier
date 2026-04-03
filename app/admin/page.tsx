'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bags');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ================= СТАНИ ДЛЯ СУМОК =================
  const [bagData, setBagData] = useState({
    name: '', price: '', model: '', dimensions: '', collection: '', color: '', description: '',
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [editingBagId, setEditingBagId] = useState<string | null>(null);
  const [bags, setBags] = useState<any[]>([]);
  const [isLoadingBags, setIsLoadingBags] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const bagsPerPage = 4;

  // ================= СТАНИ ДЛЯ ВІДГУКІВ =================
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState({ authorName: '', text: '' });
  const [reviewImageFile, setReviewImageFile] = useState<File | null>(null);
  const [reviewImagePreview, setReviewImagePreview] = useState<string | null>(null);

  // ================= FETCH ДАНИХ =================
  const fetchBags = async () => {
    setIsLoadingBags(true);
    try {
      const res = await fetch('/api/bags');
      if (res.ok) setBags(await res.json());
    } catch (error) {
      console.error('Помилка завантаження сумок:', error);
    } finally {
      setIsLoadingBags(false);
    }
  };

  const fetchReviews = async () => {
    setIsLoadingReviews(true);
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) setReviews(await res.json());
    } catch (error) {
      console.error('Помилка завантаження відгуків:', error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchBags();
    fetchReviews();
  }, []);

  // ================= ЛОГІКА СУМОК (залишена без змін) =================
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles((prev) => [...prev, ...files]);
      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const resetBagForm = () => {
    setBagData({ name: '', price: '', model: '', dimensions: '', collection: '', color: '', description: '' });
    setImageFiles([]);
    setImagePreviews([]);
    setEditingBagId(null);
  };

  const handleAddBag = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const existingUrls = imagePreviews.filter(url => !url.startsWith('blob:'));
      const newUrls: string[] = [];

      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append('file', file);
        const uploadResponse = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!uploadResponse.ok) throw new Error('Помилка при завантаженні нового фото');
        const { url } = await uploadResponse.json();
        newUrls.push(url);
      }

      const allImageUrls = [...existingUrls, ...newUrls];
      const method = editingBagId ? 'PUT' : 'POST';
      const bodyData = editingBagId
        ? { ...bagData, id: editingBagId, images: allImageUrls }
        : { ...bagData, images: allImageUrls };

      const response = await fetch('/api/bags', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) throw new Error(editingBagId ? 'Помилка оновлення' : 'Помилка створення');
      alert(editingBagId ? 'Сумку успішно оновлено!' : 'Сумку успішно додано!');
      resetBagForm();
      fetchBags();
    } catch (error: any) {
      alert(`Сталася помилка: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBag = async (id: string) => {
    if (!window.confirm('Ти впевнений? Сумка та всі її фото будуть видалені назавжди!')) return;
    try {
      const res = await fetch(`/api/bags?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Помилка при видаленні');
      fetchBags();
      if (editingBagId === id) resetBagForm();
    } catch (error: any) {
      alert(`Помилка: ${error.message}`);
    }
  };

  const handleEditBagClick = (bag: any) => {
    setEditingBagId(bag.id);
    setBagData({
      name: bag.name, price: bag.price.toString(), model: bag.model,
      dimensions: bag.dimensions, collection: bag.collection,
      color: bag.color, description: bag.description,
    });
    setImageFiles([]);
    setImagePreviews(bag.images || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ================= ЛОГІКА ВІДГУКІВ =================
  const handleReviewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReviewImageFile(file);
      setReviewImagePreview(URL.createObjectURL(file));
    }
  };

  const removeReviewImage = () => {
    setReviewImageFile(null);
    setReviewImagePreview(null);
  };

  const resetReviewForm = () => {
    setReviewData({ authorName: '', text: '' });
    setReviewImageFile(null);
    setReviewImagePreview(null);
    setEditingReviewId(null);
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let imageUrl = reviewImagePreview && !reviewImagePreview.startsWith('blob:') ? reviewImagePreview : null;

      // Завантажуємо нове фото, якщо воно вибране
      if (reviewImageFile) {
        const formData = new FormData();
        formData.append('file', reviewImageFile);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!uploadRes.ok) throw new Error('Помилка при завантаженні фото відгуку');
        const { url } = await uploadRes.json();
        imageUrl = url;
      }

      const method = editingReviewId ? 'PUT' : 'POST';
      const bodyData = editingReviewId
        ? { ...reviewData, id: editingReviewId, image: imageUrl }
        : { ...reviewData, image: imageUrl };

      const res = await fetch('/api/reviews', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) throw new Error('Помилка збереження відгуку');
      alert(editingReviewId ? 'Відгук оновлено!' : 'Відгук додано!');
      resetReviewForm();
      fetchReviews();
    } catch (error: any) {
      alert(`Сталася помилка: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!window.confirm('Видалити цей відгук назавжди?')) return;
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Помилка при видаленні відгуку');
      fetchReviews();
      if (editingReviewId === id) resetReviewForm();
    } catch (error: any) {
      alert(`Помилка: ${error.message}`);
    }
  };

  const handleEditReviewClick = (review: any) => {
    setEditingReviewId(review.id);
    setReviewData({ authorName: review.authorName, text: review.text });
    setReviewImageFile(null);
    setReviewImagePreview(review.image || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // ПАГІНАЦІЯ СУМОК
  const indexOfLastBag = currentPage * bagsPerPage;
  const indexOfFirstBag = indexOfLastBag - bagsPerPage;
  const currentBags = bags.slice(indexOfFirstBag, indexOfLastBag);
  const totalPages = Math.ceil(bags.length / bagsPerPage);

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-[#0a0a0a] text-neutral-200 font-sans">
      {/* ВЕРХНЄ МЕНЮ */}
      <header className="bg-[#141414] border-b border-neutral-800 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-yellow-500 font-bold text-xl uppercase tracking-wider">
            Lepoxy Admin
          </div>

          <nav className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button onClick={() => setActiveTab('bags')} className={`px-5 py-2 rounded-md text-sm font-semibold transition-all flex-1 sm:flex-none ${activeTab === 'bags' ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'bg-transparent text-neutral-400 hover:text-yellow-500 hover:bg-[#1f1f1f]'}`}>
              Сумки
            </button>
            <button onClick={() => setActiveTab('reviews')} className={`px-5 py-2 rounded-md text-sm font-semibold transition-all flex-1 sm:flex-none ${activeTab === 'reviews' ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'bg-transparent text-neutral-400 hover:text-yellow-500 hover:bg-[#1f1f1f]'}`}>
              Відгуки
            </button>
            <button onClick={() => setActiveTab('contacts')} className={`px-5 py-2 rounded-md text-sm font-semibold transition-all flex-1 sm:flex-none ${activeTab === 'contacts' ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'bg-transparent text-neutral-400 hover:text-yellow-500 hover:bg-[#1f1f1f]'}`}>
              Контакти
            </button>
          </nav>

          <div className="flex gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <Link href="/" className="flex-1 sm:flex-none text-center bg-[#1f1f1f] border border-neutral-700 text-neutral-300 hover:text-white font-medium text-sm px-5 py-2 rounded-md transition-colors">
              На сайт
            </Link>
            <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="flex-1 sm:flex-none text-center bg-red-900/20 border border-red-900/50 text-red-500 hover:bg-red-900/40 font-medium text-sm px-5 py-2 rounded-md transition-colors">
              Вийти
            </button>
          </div>
        </div>
      </header>

      {/* ОСНОВНИЙ КОНТЕНТ */}
      <main className="max-w-5xl mx-auto p-4 sm:p-8 mt-4 pb-20">
        
        {/* ================= ВКЛАДКА: СУМКИ ================= */}
        {activeTab === 'bags' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-white tracking-wide">
              {editingBagId ? 'Редагувати сумку' : 'Додати нову сумку'}
            </h1>

            <form onSubmit={handleAddBag} className="bg-[#141414] border border-neutral-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-8">
              {/* Поля форми сумок (залишив без змін, код згорнутий для зручності) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Назва</label>
                  <input type="text" required className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-md p-3 text-white outline-none focus:border-yellow-500" value={bagData.name} onChange={(e) => setBagData({ ...bagData, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Ціна</label>
                  <input type="text" required className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-md p-3 text-white outline-none focus:border-yellow-500" value={bagData.price} onChange={(e) => setBagData({ ...bagData, price: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Модель</label>
                  <input type="text" required className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-md p-3 text-white outline-none focus:border-yellow-500" value={bagData.model} onChange={(e) => setBagData({ ...bagData, model: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Колекція</label>
                  <input type="text" required className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-md p-3 text-white outline-none focus:border-yellow-500" value={bagData.collection} onChange={(e) => setBagData({ ...bagData, collection: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Колір</label>
                  <input type="text" required className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-md p-3 text-white outline-none focus:border-yellow-500" value={bagData.color} onChange={(e) => setBagData({ ...bagData, color: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Розміри</label>
                  <input type="text" required className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-md p-3 text-white outline-none focus:border-yellow-500" value={bagData.dimensions} onChange={(e) => setBagData({ ...bagData, dimensions: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Опис</label>
                <textarea required rows={5} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-md p-3 text-white outline-none focus:border-yellow-500 resize-none" value={bagData.description} onChange={(e) => setBagData({ ...bagData, description: e.target.value })} />
              </div>

              <div className="pt-6 border-t border-neutral-800">
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">Фотографії</label>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-md file:border-0 file:bg-[#1f1f1f] file:text-neutral-300 cursor-pointer" />

                {imagePreviews.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-4">
                    {imagePreviews.map((src, index) => (
                      <div key={index} className="relative w-28 h-28 border border-neutral-700 rounded-md overflow-hidden group bg-[#0a0a0a]">
                        <img src={src} alt="Preview" className="w-full h-full object-cover opacity-80" />
                        <button type="button" onClick={() => removeImage(index)} className="absolute top-1.5 right-1.5 bg-black/70 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 flex gap-4">
                <button type="submit" disabled={isSubmitting} className="bg-yellow-500 text-black px-10 py-3.5 rounded-md hover:bg-yellow-400 font-bold uppercase text-sm disabled:opacity-50">
                  {isSubmitting ? 'Завантаження...' : editingBagId ? 'Зберегти зміни' : 'Зберегти в базу'}
                </button>
                {editingBagId && (
                  <button type="button" onClick={resetBagForm} className="bg-[#1f1f1f] text-white px-10 py-3.5 rounded-md hover:bg-neutral-800 font-bold uppercase text-sm border border-neutral-700">
                    Скасувати
                  </button>
                )}
              </div>
            </form>

            {/* СПИСОК СУМОК */}
            <div className="mt-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white tracking-wide border-b border-neutral-800 pb-4">Додані сумки ({bags.length})</h2>
              {isLoadingBags ? (
                <div className="text-neutral-400">Завантаження...</div>
              ) : (
                <div className="space-y-4">
                  {currentBags.map((bag) => (
                    <div key={bag.id} className="bg-[#141414] border border-neutral-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-neutral-900 shrink-0">
                          {bag.images && bag.images[0] && <img src={bag.images[0]} alt={bag.name} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{bag.name}</h3>
                          <p className="text-sm text-neutral-400">{bag.model} • {bag.price} грн</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <button onClick={() => handleEditBagClick(bag)} className="px-4 py-2 bg-[#1f1f1f] text-yellow-500 border border-neutral-800 rounded-md text-sm">Редагувати</button>
                        <button onClick={() => handleDeleteBag(bag.id)} className="px-4 py-2 bg-red-900/20 text-red-500 border border-red-900/30 rounded-md text-sm">Видалити</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= ВКЛАДКА: ВІДГУКИ ================= */}
        {activeTab === 'reviews' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-white tracking-wide">
              {editingReviewId ? 'Редагувати відгук' : 'Додати новий відгук'}
            </h1>

            <form onSubmit={handleAddReview} className="bg-[#141414] border border-neutral-800 p-6 sm:p-8 rounded-xl shadow-2xl space-y-8">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Ім'я клієнта</label>
                <input type="text" required className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-md p-3 text-white outline-none focus:border-yellow-500" value={reviewData.authorName} onChange={(e) => setReviewData({ ...reviewData, authorName: e.target.value })} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Текст відгуку</label>
                <textarea required rows={4} className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-md p-3 text-white outline-none focus:border-yellow-500 resize-none" value={reviewData.text} onChange={(e) => setReviewData({ ...reviewData, text: e.target.value })} />
              </div>

              <div className="pt-6 border-t border-neutral-800">
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">Фото (скріншот)</label>
                <input type="file" accept="image/*" onChange={handleReviewImageChange} className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-md file:border-0 file:bg-[#1f1f1f] file:text-neutral-300 cursor-pointer" />

                {reviewImagePreview && (
                  <div className="mt-6 relative w-32 h-32 border border-neutral-700 rounded-md overflow-hidden bg-[#0a0a0a]">
                    <img src={reviewImagePreview} alt="Review Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={removeReviewImage} className="absolute top-1.5 right-1.5 bg-black/70 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">✕</button>
                  </div>
                )}
              </div>

              <div className="pt-6 flex gap-4">
                <button type="submit" disabled={isSubmitting} className="bg-yellow-500 text-black px-10 py-3.5 rounded-md hover:bg-yellow-400 font-bold uppercase text-sm disabled:opacity-50">
                  {isSubmitting ? 'Завантаження...' : editingReviewId ? 'Зберегти зміни' : 'Додати відгук'}
                </button>
                {editingReviewId && (
                  <button type="button" onClick={resetReviewForm} className="bg-[#1f1f1f] text-white px-10 py-3.5 rounded-md hover:bg-neutral-800 font-bold uppercase text-sm border border-neutral-700">
                    Скасувати
                  </button>
                )}
              </div>
            </form>

            {/* СПИСОК ВІДГУКІВ */}
            <div className="mt-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white tracking-wide border-b border-neutral-800 pb-4">Опубліковані відгуки ({reviews.length})</h2>
              {isLoadingReviews ? (
                <div className="text-neutral-400">Завантаження...</div>
              ) : reviews.length === 0 ? (
                <div className="text-neutral-500">Ще немає відгуків.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-[#141414] border border-neutral-800 p-5 rounded-xl flex flex-col justify-between">
                      <div className="flex gap-4 items-start mb-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-neutral-900 shrink-0 border border-neutral-800">
                          {review.image ? (
                            <img src={review.image} alt="Review" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">Немає фото</div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-white font-bold">{review.authorName}</h3>
                          <p className="text-sm text-neutral-400 mt-1 line-clamp-3">{review.text}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-auto border-t border-neutral-800 pt-4">
                        <button onClick={() => handleEditReviewClick(review)} className="px-4 py-1.5 bg-[#1f1f1f] text-yellow-500 border border-neutral-800 rounded-md text-sm hover:bg-yellow-500 hover:text-black transition-colors">Редагувати</button>
                        <button onClick={() => handleDeleteReview(review.id)} className="px-4 py-1.5 bg-red-900/20 text-red-500 border border-red-900/30 rounded-md text-sm hover:bg-red-900/40 transition-colors">Видалити</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ВКЛАДКА: КОНТАКТИ */}
        {activeTab === 'contacts' && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white tracking-wide">Контакти</h1>
            <div className="bg-[#141414] border border-neutral-800 p-8 rounded-xl">
              <p className="text-neutral-400">Налаштування контактної інформації.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}