import { useContext } from "react"
import { ThemeContext } from "../../Context/ThemeContext"

export const Messages = ({ lable, placeholder }) => {
    return (

        <div className="text-sm w-full">
            <label className="text-border font-semibold">{lable}</label>
            <textarea placeholder={placeholder} className="w-full h-40 mt-2 p-6 bg-main border border-border rounded"></textarea>

        </div>
    )
}

export const Select = ({ lable, options, onChange }) => {
    return (
        <>
            <label className="text-border font-semibold">{lable}</label>
            <select className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded" onChange={onChange}>
                {options.map((option, index) => {
                    return <option key={index} value={option.value}>{option.title}</option>
                })}
            </select>
        </>
    )
}

export const Input = ({ lable, placeholder, type, bg }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <div className="text-sm w-full">
            <label className="text-border font-semibold">{lable}</label>
            <input type={type}
                required
                placeholder={placeholder}
                className={`w-full text-sm mt-2 p-4 border border-border rounded text-black ${bg ? 'bg-main' : 'bg-dry'} ${theme === "dark" ? "text-white bg-gray-900" : " text-black bg-white"
                    } `} />
        </div>
    )
}