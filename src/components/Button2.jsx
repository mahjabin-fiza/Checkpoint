import React from 'react'

//no border, green bg -hover: white bg, brown border

const Button2 = ({text ="Button", onClick}) => {
    return(
        <button
            onClick={onClick}
            className="px-5 py-1.5 rounded bg-[#9BB98F] shadow-md text-white font-semibold border border-2 border-transparent hover:bg-white hover:text-[#4B3A2D] transition hover:scale-105 hover:border-[#4B3A2D] transition duration-300 ease-in-out">
            {text}
        </button>
    )
}

export default Button2