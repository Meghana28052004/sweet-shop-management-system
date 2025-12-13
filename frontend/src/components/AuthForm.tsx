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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center capitalize">{type}</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                    required
                />
                <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600">
                    {type === 'login' ? 'Login' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
