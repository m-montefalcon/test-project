import React, { forwardRef } from "react";

// Define the props for the Input component
interface InputProps {
    type: string; // Type of the input element (e.g., text, password, etc.)
    name: string; // Name attribute for the input element
    className?: string; // Optional CSS class for styling the input element
    placeholder?: string; // Optional placeholder text for the input element
    maxLength?: number; // Optional maximum length for the input value
    value?: string; // Optional value for the input element
    checked?: boolean; // Optional checked state for checkbox/radio inputs
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle change events
    [key: string]: any; // To allow any additional props
}

// Use forwardRef to pass ref to the input element
const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            type,
            name,
            className = "",
            placeholder = "",
            maxLength,
            value,
            checked,
            onChange,
            ...rest
        },
        ref
    ) => {
        return (
            <input
                type={type} // Set the type of the input element
                name={name} // Set the name attribute of the input element
                className={className} // Apply the CSS class for styling
                placeholder={placeholder} // Set the placeholder text
                maxLength={maxLength} // Set the maximum length for the input value
                value={value} // Set the value of the input element
                checked={checked} // Set the checked state for checkbox/radio inputs
                onChange={onChange} // Attach the change event handler
                ref={ref} // Forward the ref to the input element
                {...rest} // Spread any additional props
            />
        );
    }
);

export default Input;
