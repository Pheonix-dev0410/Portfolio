'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                router.push('/admin');
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Login failed');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            
            {/* Gradient Blob */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-accent via-accent-light/50 to-accent-dark blur-3xl opacity-20 animate-pulse" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Login Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-8 border border-white/10">
                    {/* Logo and Title */}
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-2xl mx-auto rotate-45 relative overflow-hidden group transition-transform hover:rotate-0 duration-300">
                            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                                P
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                        <p className="text-gray-400">Sign in to access your admin panel</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/50 focus:outline-none transition-colors"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-accent focus:ring-2 focus:ring-accent/50 focus:outline-none transition-colors"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-accent to-accent-dark text-white rounded-lg font-medium relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative">
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </span>
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center mt-8 text-gray-500 text-sm">
                    Protected by industry standard encryption
                </p>
            </div>
        </div>
    );
} 