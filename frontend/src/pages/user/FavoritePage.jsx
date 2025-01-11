import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaTrashAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../../../Context/ThemeContext";
import Navbar from "../../components/Navbar";
import useFavoriteStore from "../../store/favorite";
import { useContentStore } from "../../store/content";
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../../utils/constans";

const FavoritePage = ({ category }) => {
    const { favorites, fetchFavorites, removeFavorite } = useFavoriteStore();
    const { theme } = useContext(ThemeContext);
    const { contentType } = useContentStore();
    const [content, setContent] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    useEffect(() => {
        const getContent = async () => {
            const res = await axios.get(`/api/v1/${contentType}/${category}`);
            setContent(res.data.content);
        };
        getContent();
    }, [contentType, category]);

    const SideLinks = [
        {
            name: "Profile",
            link: "/user",
            icon: FaRegUserCircle,
        },
        {
            name: "Favorites Movies",
            link: "/favorites",
            icon: FaHeart,
        },
        {
            name: "Change Password",
            link: "/password",
            icon: RiLockPasswordLine,
        },
    ];

    const active = "bg-dryGray text-subMain";
    const hover = "hover:text-white hover:bg-main";
    const inActive =
        "rounded font-medium text-sm transitions flex gap-3 items-center p-4 hover:text-white hover:bg-main";
    const Hover = ({ isActive }) => {
        return isActive ? `${active} : ${inActive}` : `${inActive} : ${hover}`
    }

    return (
        <>
            <div
                className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-300 text-black"
                    }`}
            >
                <Navbar />
            </div>
            <div className="min-h-screen container mx-auto">
                <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
                    {/* Sidebar */}
                    <div
                        className={`col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5 ${theme === "dark" ? "text-white bg-gray-900" : "text-black bg-white"
                            }`}
                    >
                        {SideLinks.map((link, index) => (
                            <NavLink
                                to={link.link}
                                key={index}
                                className={Hover}
                            >
                                <link.icon />
                                <p>{link.name}</p>
                            </NavLink>
                        ))}
                    </div>

                    {/* Content */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="10"
                        data-aos-offset="100"
                        className={`col-span-6 rounded-md bg-dry border border-gray-800 p-6 aos-init aos-animate ${theme === "dark" ? "text-white bg-gray-900" : "text-black bg-white"
                            }`}
                    >
                        <h2 className="text-3xl font-bold mb-6">List of favorite movies</h2>
                        {favorites.length > 0 ? (
                            <div className="overflow-x-auto border border-gray-800 rounded-lg">
                                <table className="min-w-full table-auto text-left">
                                    <thead>
                                        <tr
                                            className={`${theme === "dark"
                                                ? "text-white bg-black"
                                                : "text-black bg-gray-300"
                                                }`}
                                        >
                                            {/* <th className="px-4 py-2">Poster</th> */}
                                            <th className="px-4 py-2">Title</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {favorites.map((movie) => (
                                            <tr
                                                key={movie.itemId}
                                                className={`border-t border-gray-700 ${theme === "dark"
                                                    ? "text-white bg-gray-900"
                                                    : "text-black bg-white"
                                                    }`}
                                            >
                                                {/* Poster */}
                                                {/* <td className="px-4 py-2 cursor-pointer">
                                                    <Link to={`/watch/${movie.itemId}`}>
                                                        <img
                                                            src={movie.poster_path || '/default-image.png'} // Đường dẫn ảnh
                                                            alt={movie.title}
                                                            className="w-16 h-24 object-cover rounded-md"
                                                        />
                                                    </Link>
                                                </td> */}

                                                {/* Title */}
                                                <td className="px-4 py-2">
                                                    <Link className="text-lg font-semibold" to={`/watch/${movie.itemId}`}> {movie.title} </Link>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-4 py-2">
                                                    <button
                                                        onClick={() => removeFavorite(movie.itemId)}
                                                        className="flex items-center justify-center mt-2 text-red-500 hover:text-red-700"
                                                    >
                                                        <FaTrashAlt className="mr-2" />
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-lg text-center text-gray-500">
                                Bạn chưa có bộ phim yêu thích nào.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FavoritePage;
