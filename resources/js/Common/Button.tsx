import React from "react";

// Define the props for the Button component
type ButtonProps = {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // Function to handle click events
    className: string; // CSS class for styling the button
    text: string; // Text to be displayed on the button
    disabled?: boolean; // Optional prop to disable the button
};

// Button component definition
const Button: React.FC<ButtonProps> = ({
    onClick,
    className,
    text,
    disabled,
}) => {
    return (
        <button
            type="button"
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
