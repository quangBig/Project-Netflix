import { useEffect, useRef, useState, useContext } from "react";
import { useContentStore } from "../store/content.js";

import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constans.js";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext.jsx";

const MovieSlider = ({ category }) => {
    const { theme } = useContext(ThemeContext); // Access the current theme
    const { contentType } = useContentStore();
    const [content, setContent] = useState([]);
    const [showArrows, setShowArrows] = useState(false);

    const sliderRef = useRef(null);

    const formattedCategoryName =
        category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
    const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

    useEffect(() => {
        const getContent = async () => {
            const res = await axios.get(`/api/v1/${contentType}/${category}`);
            setContent(res.data.content);
        };

        getContent();
    }, [contentType, category]);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
        }
    };
    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
    };

    return (
        <div
            className={`relative px-5 md:px-20 ${theme === "dark" ? " text-white" : "bg-gray-100 text-gray-800"
                }`}
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
        >
            <h2
                className={`mb-4 text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
            >
                {formattedCategoryName} {formattedContentType}
            </h2>

            <div
                className={`flex space-x-4 overflow-x-scroll scrollbar-hide ${theme === "dark" ? "scrollbar-dark" : "scrollbar-light"
                    }`}
                ref={sliderRef}
            >
                {content.map((item) => (
                    <Link
                        to={`/watch/${item.id}`}
                        className="min-w-[250px] relative group"
                        key={item.id}
                    >
                        <div className="rounded-lg overflow-hidden">
                            <img
                                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                                alt="Movie image"
                                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                            />
                        </div>
                        <p
                            className={`mt-2 text-center ${theme === "dark" ? "text-white" : "text-gray-800"
                                }`}
                        >
                            {item.title || item.name}
                        </p>
                    </Link>
                ))}
            </div>

            {showArrows && (
                <>
                    <button
                        className={`absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
                        size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 ${theme === "light" ? "bg-gray-300 text-gray-800" : ""
                            }`}
                        onClick={scrollLeft}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        className={`absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
                        size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 ${theme === "light" ? "bg-gray-300 text-gray-800" : ""
                            }`}
                        onClick={scrollRight}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}
        </div>
    );
};

export default MovieSlider;
