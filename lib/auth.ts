import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const { data: user, error } = await supabaseAdmin
                    .from('Profile')
                    .select('*')
                    .eq('email', credentials.email)
                    .single();

                // ДИВИСЬ СЮДИ В ТЕРМІНАЛІ:
                console.log('DEBUG AUTH -> Юзер з бази:', user);
                console.log('DEBUG AUTH -> Помилка Supabase:', error);

                if (error || !user) {
                    console.log('AUTH FAILED: Юзера не знайдено');
                    return null;
                }

                if (user.password === credentials.password && user.role === 'admin') {
                    return { id: user.id, email: user.email, role: user.role } as any;
                }



                console.log('--- ПЕРЕВІРКА ПАРОЛЯ ---');
                console.log('З бази:', `"${user.password}"`);
                console.log('З форми:', `"${credentials.password}"`);
                console.log('Роль:', `"${user.role}"`);
                console.log('Результат порівняння:', user.password === credentials.password && user.role === 'admin');

                if (user.password.trim() === credentials.password.trim() && user.role === 'admin') {
                    // Додав .trim(), щоб відсікти випадкові пробіли
                    return { id: user.id, email: user.email, role: user.role } as any;
                }

                console.log('AUTH FAILED: Пароль або роль не збігаються');
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = (user as any).role;
            return token;
        },
        async session({ session, token }) {
            if (session?.user) (session.user as any).role = token.role;
            return session;
        }
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: '/admin/login' }
};