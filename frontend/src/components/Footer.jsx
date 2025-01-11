import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";

const Footer = () => {
    const { theme } = useContext(ThemeContext); // Access the current theme

    return (
        <footer
            className={`py-4 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                }`}
        >
            <div className="bg-gray-800 h-[2px] mx-auto w-[90%]">
                <br className="p-4" />
            </div>
            <div className="container mx-auto px-4 mt-5">
                {/* Logo và mô tả */}
                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                        <Link to="/">
                            <h1
                                className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"
                                    }`}
                            >
                                Netflix
                            </h1>
                        </Link>
                        <p
                            className={`text-sm mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                }`}
                        >
                            Watch movies in high quality, quickly and for free.
                        </p>
                    </div>

                    {/* Các liên kết */}
                    <div className="flex space-x-6">
                        <a
                            href="/about"
                            className={`transition ${theme === "dark"
                                ? "text-gray-400 hover:text-white"
                                : "text-gray-600 hover:text-gray-800"
                                }`}
                        >
                            About Us
                        </a>
                        <a
                            href="/contact"
                            className={`transition ${theme === "dark"
                                ? "text-gray-400 hover:text-white"
                                : "text-gray-600 hover:text-gray-800"
                                }`}
                        >
                            Contact
                        </a>
                        <a
                            href="/privacy"
                            className={`transition ${theme === "dark"
                                ? "text-gray-400 hover:text-white"
                                : "text-gray-600 hover:text-gray-800"
                                }`}
                        >
                            Privacy Policy
                        </a>
                    </div>
                </div>

                {/* Dòng bản quyền */}
                <div
                    className={`border-t mt-6 pt-4 text-center ${theme === "dark" ? "border-gray-700 text-gray-500" : "border-gray-300 text-gray-600"
                        }`}
                >
                    <p className="text-sm">
                        © {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
