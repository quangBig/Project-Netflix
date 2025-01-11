import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { userAuthStore } from '../store/authUser';
import { IoMdEyeOff } from 'react-icons/io';
import { IoEye } from 'react-icons/io5';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoggingIn } = userAuthStore();
    const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
    const handleLogin = (e) => {
        e.preventDefault();
        login({ email, password });
        // console.log(email, password, 'login');
    }
    return (
        <div className='h-screen w-full hero-bg'>
            <div className='max-w-6xl mx-auto flex items-center justify-between p-4'>
                <Link to={"/"}>
                    <img src='/netflix-logo.png' alt='logo' className='w-52' />
                </Link>
            </div>

            <div className='flex justify-center items-center mt-20 mx-3'>
                <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
                    <h1 className='text-center text-white text-2xl font-bold mb-4'>Login</h1>
                    <form className='space-y-4' onSubmit={handleLogin}>
                        <div>
                            <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
                                Email
                            </label>
                            <input
                                type='email'
                                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                placeholder='you@example.com'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                    placeholder='••••••••'
                                    id='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type='button'
                                    className='absolute top-[55%] right-4 transform -translate-y-1/2 text-gray-400'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <IoMdEyeOff /> : <IoEye />}
                                </button>
                            </div>
                        </div>

                        <button
                            className='w-full py-2 bg-red-600 text-white font-semibold rounded-md
							hover:bg-red-700
						'
                            disabled={isLoggingIn}
                        >

                            {isLoggingIn ? "Loading..." : "Login"}
                        </button>
                    </form>
                    <div className='text-center text-gray-400'>
                        Don't have an account?{" "}
                        <Link to={"/signup"} className='text-red-500 hover:underline'>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage
