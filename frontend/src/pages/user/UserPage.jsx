import React, { useContext, useState } from "react";
import { FaHeart, FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../../../Context/ThemeContext";
import Navbar from "../../components/Navbar";
import { userAuthStore } from "../../store/authUser.js";
import { IoIosLogOut } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import toast from "react-hot-toast";
// Import your Zustand store

const UserPage = () => {
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

    const { theme } = useContext(ThemeContext);
    const { user, logout, updateUser } = userAuthStore(); // Thêm hàm cập nhật từ Zustand store
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(formData); // Gọi hàm cập nhật từ Zustand store
            toast.success("Hồ sơ đã được cập nhật thành công!");
            setEditMode(false); // Thoát chế độ chỉnh sửa
        } catch (error) {
            toast.error("Cập nhật hồ sơ thất bại!");
        }
    };
    const handleLogout = () => {
        logout();
    };


    return (
        <>
            <div className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-300 text-black"}`}>
                <Navbar />
            </div>
            <div className={`min-h-screen container mx-auto`}>
                <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
                    <div
                        className={`col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5 ${theme === "dark" ? "text-white bg-gray-900" : " text-black bg-white"
                            } `}
                    >
                        {SideLinks.map((link, index) => (
                            <NavLink to={link.link} key={index} className={Hover}>
                                {<link.icon />}
                                <p>{link.name}</p>
                            </NavLink>
                        ))}
                    </div>

                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-deplay="10"
                        data-aos-offset="100"
                        className={`col-span-6 rounded-md bg-dry border border-gray-800 p-6 aos-init aos-animate ${theme === "dark" ? "text-white bg-gray-900" : " text-black bg-white"
                            }`}
                    >
                        {/* Display User Information */}
                        <h2 className="text-3xl font-bold mb-6">Profile</h2>
                        {user ? (
                            <div className="flex flex-col gap-6">
                                {editMode ? (
                                    // Form cập nhật
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        <div className="flex justify-center items-center">
                                            {user.image && (
                                                <img
                                                    src={user.image}
                                                    alt="User Avatar"
                                                    className="w-24 h-24 rounded mt-4"
                                                />
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold">Username:</label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                className={`w-full bg-gray-700 rounded-md px-4 py-2 border border-gray-600 focus:outline-none ${theme === "dark" ? "text-white bg-gray-900" : " text-black bg-white"
                                                    }`}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold">Email:</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full bg-gray-700 rounded-md px-4 py-2 border border-gray-600 focus:outline-none ${theme === "dark" ? "text-white bg-gray-900" : " text-black bg-white"
                                                    }`}
                                            />
                                        </div>
                                        <div className="flex justify-end gap-4 mt-4">
                                            <button
                                                type="button"
                                                onClick={() => setEditMode(false)}
                                                className="bg-gray-500 text-white py-2 px-4 rounded-md"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    // Hiển thị thông tin
                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-center items-center">
                                            {user.image && (
                                                <img
                                                    src={user.image}
                                                    alt="User Avatar"
                                                    className="w-24 h-24 rounded mt-4"
                                                />
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold">Username:</label>
                                            <input
                                                type="text"
                                                value={user.username}
                                                disabled
                                                className={`w-full bg-gray-700 rounded-md px-4 py-2 border border-gray-600 focus:outline-none ${theme === "dark" ? "text-white bg-gray-900" : " text-black bg-white"
                                                    }`}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-semibold">Email:</label>
                                            <input
                                                type="text"
                                                value={user.email}
                                                disabled
                                                className={`w-full bg-gray-700 rounded-md px-4 py-2 border border-gray-600 focus:outline-none ${theme === "dark" ? "text-white bg-gray-900" : " text-black bg-white"
                                                    }`}
                                            />
                                        </div>
                                        <div className={`w-full flex justify-between mt-6 ${theme === "dark" ? "text-white bg-gray-900" : " text-black bg-white"
                                            }`}>
                                            <div className='flex justify-end items-center my-4'>
                                                <div onClick={handleLogout} className={`bg-main font-medium transitions hover:bg-blue-500 border cursor-pointer border-blue-500 text-black py-3 px-6 rounded w-full sm:w-auto ${theme === "dark" ? "text-white hover:text-black" : " text-black bg-white hover:text-white"
                                                    }`}>
                                                    <p className="flex gap-2 items-center"> <IoIosLogOut />  Log Out</p>

                                                </div>
                                            </div>
                                            <div className='flex justify-end items-center my-4'>
                                                <div onClick={() => setEditMode(true)} className={`bg-main font-medium transitions hover:bg-blue-500 border cursor-pointer border-blue-500 text-black py-3 px-6 rounded w-full sm:w-auto ${theme === "dark" ? "text-white hover:text-black" : " text-black bg-white hover:text-white"
                                                    }`}>
                                                    <p className="flex gap-2 items-center"> <RxUpdate />  Update Profile</p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (

                            <p>Không có thông tin người dùng.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserPage;
