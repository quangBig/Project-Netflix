import React, { useContext, useEffect, useState } from 'react';
import { useCommentStore } from '../store/commentStore.js';
import { ThemeContext } from '../../Context/ThemeContext.jsx';
import { userAuthStore } from '../store/authUser.js';
import toast from 'react-hot-toast';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaFlag } from 'react-icons/fa6';

const CommentSection = ({ movieId }) => {
    const { commentsByMovie, fetchComments, addComment, deleteComment, updateComment } = useCommentStore();
    const [content, setContent] = useState('');
    const { theme } = useContext(ThemeContext);
    const { user } = userAuthStore();
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [reportOpen, setReportOpen] = useState(null);
    const [selectedReason, setSelectedReason] = useState('');
    const [editingComment, setEditingComment] = useState(null); // Bình luận đang được chỉnh sửa
    const [editingContent, setEditingContent] = useState(''); // Nội dung chỉnh sửa

    const comments = commentsByMovie[movieId] || [];

    useEffect(() => {
        if (movieId) {
            fetchComments(movieId);
        }
    }, [movieId, fetchComments]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            toast.error('Comment content is required.');
            return;
        }

        await addComment(content, movieId);
        setContent('');
    };

    const handleDelete = async (id) => {
        try {
            await deleteComment(id, movieId);
            toast.success('Comment deleted successfully');
        } catch (error) {
            console.error('Error deleting comment:', error);
            toast.error('Failed to delete comment.');
        }
    };

    const toggleDropdown = (id) => {
        setDropdownOpen((prev) => (prev === id ? null : id));
    };

    const openReportForm = (id) => {
        setReportOpen(id);
        setDropdownOpen(null);
    };

    const handleReport = () => {
        if (selectedReason) {
            console.log(`Report submitted for comment ID ${reportOpen} with reason: ${selectedReason}`);
            toast.success('Report submitted successfully');
            setReportOpen(null);
            setSelectedReason('');
        } else {
            toast.error('Please select a reason for reporting.');
        }
    };

    const startEditing = (comment) => {
        setEditingComment(comment._id);
        setEditingContent(comment.content);
    };

    const cancelEditing = () => {
        setEditingComment(null);
        setEditingContent('');
    };

    const saveEditing = async (id) => {
        if (!editingContent.trim()) {
            toast.error('Content cannot be empty.');
            return;
        }

        try {
            await updateComment(id, editingContent, movieId);
            toast.success('Comment updated successfully');
            setEditingComment(null);
            setEditingContent('');
        } catch (error) {
            console.error('Error updating comment:', error);
            toast.error('Failed to update comment.');
        }
    };

    return (
        <div className={`container max-w-4xl mx-auto mt-8 p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <form onSubmit={handleSubmit} className={`mb-6 p-4 border rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <textarea
                    className={`w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 transition ${theme === 'dark' ? 'bg-gray-700 text-white focus:ring-blue-400' : 'focus:ring-blue-500'}`}
                    rows="3"
                    placeholder="Write your comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button
                    type="submit"
                    className={`mt-3 px-4 py-2 rounded-lg text-white font-semibold focus:outline-none transition ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    Post Comment
                </button>
            </form>

            <ul className="space-y-6">
                {comments.map((comment) => (
                    <li key={comment._id} className={`p-4 border rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                                <FaRegUserCircle className="w-10 h-10 text-gray-500" />
                                <div>
                                    <p className="text-lg font-semibold">{comment.user?.email || 'Anonymous'}</p>
                                    <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="relative">
                                <button
                                    className="flex flex-col items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-gray-200"
                                    onClick={() => toggleDropdown(comment._id)}
                                >
                                    <span className={`w-1 h-1 ${theme === 'dark' ? 'bg-white' : 'bg-gray-700'} rounded-full`}></span>
                                    <span className={`w-1 h-1 ${theme === 'dark' ? 'bg-white' : 'bg-gray-700'} rounded-full`}></span>
                                    <span className={`w-1 h-1 ${theme === 'dark' ? 'bg-white' : 'bg-gray-700'} rounded-full`}></span>
                                </button>

                                {dropdownOpen === comment._id && (
                                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}>
                                        {user?.email === comment.user?.email ? (
                                            <>
                                                <button
                                                    onClick={() => startEditing(comment)}
                                                    className="block px-4 py-2 text-blue-600 hover:bg-blue-100 hover:text-blue-800 w-full text-left"
                                                >
                                                    <MdEdit className="inline-block mr-2" /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(comment._id)}
                                                    className="block px-4 py-2 text-red-600 hover:bg-red-100 hover:text-red-800 w-full text-left"
                                                >
                                                    <MdDelete className="inline-block mr-2" /> Delete
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => openReportForm(comment._id)}
                                                className="block px-4 py-2 text-yellow-600 hover:bg-yellow-100 hover:text-yellow-800 w-full text-left"
                                            >
                                                <FaFlag className="inline-block mr-2" /> Report
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {editingComment === comment._id ? (
                            <div className="mt-3">
                                <textarea
                                    className={`w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 transition ${theme === 'dark' ? 'bg-gray-700 text-white focus:ring-blue-400' : 'focus:ring-blue-500'}`}
                                    rows="3"
                                    value={editingContent}
                                    onChange={(e) => setEditingContent(e.target.value)}
                                ></textarea>
                                <div className="mt-3 flex space-x-4">
                                    <button
                                        onClick={() => saveEditing(comment._id)}
                                        className={`px-4 py-2 rounded-lg text-white font-semibold focus:outline-none transition ${theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={cancelEditing}
                                        className={`px-4 py-2 rounded-lg text-white font-semibold focus:outline-none transition ${theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'}`}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className={`mt-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{comment.content}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentSection;


