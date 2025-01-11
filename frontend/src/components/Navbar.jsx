import { LogOut, Menu, Search } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContentStore } from '../store/content.js';
import { userAuthStore } from '../store/authUser.js';
import { ThemeContext } from '../../Context/ThemeContext.jsx';

const Navbar = () => {
    const { user, logout } = userAuthStore();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { contentType, setContentType } = useContentStore();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
            <div className='flex items-center gap-10 z-50'>
                <Link to='/'>
                    <img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 sm:w-40' />
                </Link>

                {/* desktop navbar items */}
                <div className='hidden sm:flex gap-5 items-center'>
                    <Link to='/' className='hover:underline' onClick={() => setContentType('movie')}>
                        Movies
                    </Link>
                    <Link to='/' className='hover:underline' onClick={() => setContentType('tv')}>
                        Tv Shows
                    </Link>
                    <Link to='/history' className='hover:underline'>
                        Search History
                    </Link>
                </div>
            </div>

            <div className='flex gap-5 items-center z-50'>
                <Link to={'/search'}>
                    <Search className='size-6 cursor-pointer' />
                </Link>
                <Link to={'/user'}>
                    <img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer' />
                </Link>
                <LogOut className='size-6 cursor-pointer' onClick={logout} />
                <div className='sm:hidden'>
                    <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
                </div>
                {/* Theme Toggle Button */}
                <button
                    className='w-10 h-5 rounded-full bg-white flex items-center transition duration-300 focus:outline-none shadow dark:bg-gray-800'
                    onClick={toggleTheme}
                >
                    <div
                        className={`w-6 h-6 relative rounded-full transition duration-500 transform p-1 text-white ${theme === 'dark'
                            ? 'bg-gray-700 translate-x-full'
                            : 'bg-yellow-500 -translate-x-2'
                            }`}
                    >
                        {theme === 'dark' ? (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                                />
                            </svg>
                        )}
                    </div>
                </button>
            </div>

            {/* mobile navbar items */}
            {isMobileMenuOpen && (
                <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
                    <Link
                        to={'/'}
                        className='block hover:underline p-2'
                        onClick={toggleMobileMenu}
                    >
                        Movies
                    </Link>
                    <Link
                        to={'/'}
                        className='block hover:underline p-2'
                        onClick={toggleMobileMenu}
                    >
                        Tv Shows
                    </Link>
                    <Link
                        to={'/history'}
                        className='block hover:underline p-2'
                        onClick={toggleMobileMenu}
                    >
                        Search History
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;
