import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userAuthStore } from '../store/authUser';
// import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

const SignUpPage = () => {
    const { searchParams } = new URL(document.location);
    const emailValue = searchParams.get('email');
    const [email, setEmail] = useState(emailValue || " ");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu

    const { signup, isSigningUp } = userAuthStore();

    const handleSignUp = (e) => {
        e.preventDefault();
        signup({ email, username, password });
        // console.log(email, username, password, 'signup');
    };

    return (
        <div className='h-screen w-full hero-bg'>
            <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
                <Link to={"/"}>
                    <img src='/netflix-logo.png' alt='logo' className='w-52' />
                </Link>
            </header>

            <div className='flex justify-center items-center mt-10 mx-3'>
                <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
                    <h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>

                    <form className='space-y-4' onSubmit={handleSignUp}>
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
                            <label htmlFor='username' className='text-sm font-medium text-gray-300 block'>
                                Username
                            </label>
                            <input
                                type='text'
                                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                placeholder='johndoe'
                                id='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                            className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? "Sign Up" : "Sign Up"}
                        </button>
                    </form>
                    <div className='text-center text-gray-400'>
                        Already a member?{" "}
                        <Link to={"/login"} className='text-red-500 hover:underline'>
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
