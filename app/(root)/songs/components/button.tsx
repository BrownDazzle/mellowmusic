// components/Button.tsx

import React from 'react';

interface ButtonProps {
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-2 px-4 border-[0.5px] border-slate-500 hover:border-transparent rounded transition duration-300 ease-in-out"
        >
            Buy Ticket
        </button>
    );
};

export default Button;
