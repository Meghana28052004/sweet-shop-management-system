import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
    type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = type === 'login' ? '/auth/login' : '/auth/register';
            const res = await api.post(endpoint, { email, password });

            if (type === 'login') {
                localStorage.setItem('token', res.data.token);
                navigate('/');
            } else {
                navigate('/login');
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
                <h2 className="text-3xl font-extrabold mb-6 text-center capitalize bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
                    {type}
                </h2>
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm font-medium border border-red-100 text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all outline-none bg-white/50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all outline-none bg-white/50"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl text-white font-bold text-lg shadow-lg shadow-pink-500/30 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {type === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
