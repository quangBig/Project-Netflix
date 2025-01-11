import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { ThemeContext } from '../../Context/ThemeContext';
// Import ThemeContext

const Contact = () => {
    const ContactData = [
        {
            id: 1,
            title: "Email Us",
            infor: "ledai16102004@gmail.com Interactively grow backend ideas for cross-platform models.",
            icon: MdEmail,
        },
        {
            id: 2,
            title: "Call Us",
            infor: "+84 6301 6676",
            icon: FaPhoneAlt,
        },
        {
            id: 3,
            title: "Location",
            infor: "UTT - Công Nghệ Giao Thông Vận Tải",
            icon: FaLocationDot,
        },
    ];

    const { theme } = useContext(ThemeContext); // Access the current theme

    return (
        <>
            <div className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-300 text-black"}`}>
                <Navbar />
            </div>
            <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen`}>
                <div className="container mx-auto px-4 py-3">

                    {/* Hero Section */}
                    <div className="w-full bg-deepGray lg:h-64 relative overflow-hidden rounded-md py-3">
                        <img src="/hero.png" className="w-full h-full object-cover" alt="" />
                        <div className="absolute lg:top-24 top-16 w-full flex justify-center items-center">
                            <h1 className="text-xl lg:text-4xl text-white font-bold text-center">
                                Contact Us
                            </h1>
                        </div>
                    </div>

                    {/* Contact Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:my-20 my-10">
                        {ContactData.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className={`border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} flex flex-col items-center p-6 sm:p-8 ${theme === 'dark' ? 'bg-[#0B0F29]' : 'bg-white'} rounded-lg text-center`}
                                >
                                    {/* Icon */}
                                    <span className={`flex border border-black justify-center items-center w-11 h-11 sm:w-16 sm:h-16 mb-4 rounded-full bg-[#080A1A] text-[#F20000] text-3xl sm:text-4xl ${theme === 'dark' ? 'text-white bg-gray-800' : 'text-black bg-white'}`}>
                                        <item.icon className='w-5 h-5' />
                                    </span>
                                    {/* Title */}
                                    <p className="text-lg sm:text-2xl font-semibold mb-2">
                                        {item.title}
                                    </p>
                                    {/* Info */}
                                    <div className="text-xs sm:text-sm leading-7">
                                        {item.infor}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
