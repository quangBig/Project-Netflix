import React, { useContext, useState } from 'react';
import { FaHeart, FaListAlt, FaUsers, FaRegUserCircle } from 'react-icons/fa';
import { RiLockPasswordLine, RiMovie2Fill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../../Context/ThemeContext';
import { Input } from '../../components/UsedInput';
import Navbar from '../../components/Navbar';

import toast from 'react-hot-toast';
import { userAuthStore } from '../../store/authUser';


const ChangePass = () => {
    const { updatePassword } = userAuthStore(); // Zustand store function
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    console.log(formData, 'formData');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangePassword = async () => {
        const { oldPassword, newPassword, confirmPassword } = formData;

        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error('All fields are required');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        // Call the Zustand function to update the password
        try {
            // Gọi hàm Zustand để cập nhật mật khẩu
            const result = await updatePassword({ oldPassword, newPassword });
            // Hiển thị thông báo thành công
            toast.success(result.message || 'Password updated successfully!');
        } catch (error) {
            // Hiển thị thông báo lỗi nếu xảy ra vấn đề
            toast.error(error.message || 'Failed to update password');
        }
    };

    const SideLinks = [
        {
            name: 'Profile',
            link: "/user",
            icon: FaRegUserCircle
        },
        {
            name: 'Favorites Movies',
            link: "/favorites",
            icon: FaHeart
        },
        {
            name: 'Change Password',
            link: "/password",
            icon: RiLockPasswordLine
        }
    ];

    const active = 'bg-dryGray text-subMain';
    const hover = "hover:text-white hover:bg-main";
    const inActive = "rounded font-medium text-sm transitions flex gap-3 items-center p-4 hover:text-white hover:bg-main";
    const Hover = ({ isActive }) => {
        return isActive ? `${active} : ${inActive}` : `${inActive} : ${hover}`
    }

    const { theme } = useContext(ThemeContext);

    return (
        <>
            <div className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-300 text-black"}`}>
                <Navbar />
            </div>
            <div className={`min-h-screen container mx-auto`}>
                <div className='xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6'>
                    <div className={`col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5 ${theme === "dark" ? "text-white bg-gray-900" : "text-black bg-white"}`}>
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
                        data-aos-delay="10"
                        data-aos-offset="100"
                        className={`col-span-6 rounded-md bg-dry border border-gray-800 p-6 aos-init aos-animate ${theme === "dark" ? "text-white bg-gray-900" : "text-black bg-white"}`}
                    >
                        <div className='flex flex-col gap-6'>
                            <h2 className='text-xl font-bold'>Change Password</h2>
                            <Input
                                label="Previous Password"
                                name="oldPassword"
                                type="password"
                                placeholder="Previous Password"
                                value={formData.oldPassword}
                                onChange={handleInputChange}
                                bg={true}
                            />
                            <Input
                                label="New Password"
                                name="newPassword"
                                type="password"
                                placeholder="New Password"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                bg={true}
                            />
                            <Input
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                bg={true}
                            />
                            <div className='flex justify-end items-center my-4'>
                                <button
                                    onClick={handleChangePassword}
                                    className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePass;
