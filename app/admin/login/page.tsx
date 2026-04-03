'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Очищаємо старі помилки перед новим запитом

    // Звертаємось до нашого API NextAuth
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false, // Вимикаємо стандартний редирект, щоб керувати ним вручну
    });

    if (res?.error) {
      setError('Невірний email або пароль');
    } else {
      // Якщо логін успішний — переходимо на головну сторінку адмінки
      router.push('/admin');
      router.refresh(); // Оновлюємо стан сторінки
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Lepoxy Admin</h1>
        
        {/* Блок для виводу помилки */}
        {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-black focus:border-black outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-black focus:border-black outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
}