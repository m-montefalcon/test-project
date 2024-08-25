import React, { useReducer, useRef, useCallback } from "react";
import "../../css/app.css";
import Input from "../Common/Input";
import Button from "../Common/Button";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

// Initial state for the form
const initialformState = {
    text: "",
    greeting: "",
    options: [] as string[],
    file: null as File | null,
};

type formState = typeof initialformState;

type Action =
    | { type: "SET_FIELD"; field: keyof formState; value: any }
    | { type: "TOGGLE_OPTION"; payload: string }
    | { type: "RESET_FORM" };

// Reducer function to handle form state updates
const reducer = (state: formState, action: Action): formState => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "TOGGLE_OPTION":
            return {
                ...state,
                options: state.options.includes(action.payload)
                    ? state.options.filter((item) => item !== action.payload)
                    : [...state.options, action.payload],
            };
        case "RESET_FORM":
            return initialformState;
        default:
            return state;
    }
};

const Form = () => {
    // Use reducer to manage form state
    const [formState, dispatch] = useReducer(reducer, initialformState);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle input changes
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, type, checked, files } = e.target;
            if (type === "checkbox") {
                dispatch({ type: "TOGGLE_OPTION", payload: value });
            } else if (type === "file") {
                dispatch({
                    type: "SET_FIELD",
                    field: "file",
                    value: files ? files[0] : null,
                });
            } else {
                dispatch({
                    type: "SET_FIELD",
                    field: name as keyof formState,
                    value,
                });
            }
        },
        []
    );

    // Handle form submission
    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            // Capitalize the first letter of each option and join them with ", "
            const newOptions =
                formState.options
                    .sort()
                    .map(
                        (option) =>
                            option.charAt(0).toUpperCase() + option.slice(1)
                    )
                    .join(", ") + "!";

            // Capitalize the first letter of the greeting and append the new options
            const newGreetings = `${formState.greeting
                .charAt(0)
                .toUpperCase()}${formState.greeting.slice(1)} ${newOptions}`;

            // Create FormData and append fields
            const formData = new FormData();
            formData.append("text", formState.text);
            formData.append("greeting", newGreetings);
            formData.append("file", formState.file || "");

            try {
                const response = await axios.post("/api/post", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("API Response:", response.data);
            } catch (error) {
                console.error("API Error:", error);
            }

            // Reset form and clear file input
            dispatch({ type: "RESET_FORM" });
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        },
        [formState]
    );

    // Handle view database button click
    const handleViewDatabase = useCallback(() => {
        Inertia.visit("/database");
    }, []);

    // Check if the form is valid
    const isFormValid = useCallback(() => {
        return (
            formState.text.trim() !== "" &&
            formState.greeting.trim() !== "" &&
            formState.options.length > 0 &&
            formState.file !== null
        );
    }, [formState]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 p-8">
            <div className="w-full max-w-lg p-10 bg-white rounded-lg shadow-md dark:bg-gray-900">
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">
                        Test Project Assignment
                    </h1>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        By: Meinardz Montefalcon
                    </p>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Input
                                type="text"
                                name="text"
                                className="input input-bordered w-full text-lg p-4"
                                placeholder="Enter text (100 characters only)"
                                maxLength={100}
                                value={formState.text}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col items-center space-y-6">
                            <div className="flex items-center space-x-6">
                                <span className="text-lg">Say a greeting:</span>
                                <label className="flex items-center">
                                    <Input
                                        type="radio"
                                        name="greeting"
                                        value="hi"
                                        checked={formState.greeting === "hi"}
                                        onChange={handleChange}
                                        className="radio-lg radio-primary"
                                    />
                                    <span className="ml-2 text-lg">Hi</span>
                                </label>
                                <label className="flex items-center">
                                    <Input
                                        type="radio"
                                        name="greeting"
                                        value="hello"
                                        checked={formState.greeting === "hello"}
                                        onChange={handleChange}
                                        className="radio-lg radio-primary"
                                    />
                                    <span className="ml-2 text-lg">Hello</span>
                                </label>
                            </div>
                            <div className="flex items-center space-x-6">
                                <span className="text-lg">To:</span>
                                <label className="flex items-center">
                                    <Input
                                        type="checkbox"
                                        name="option"
                                        value="world"
                                        checked={formState.options.includes(
                                            "world"
                                        )}
                                        onChange={handleChange}
                                        className="checkbox-lg checkbox-primary"
                                    />
                                    <span className="ml-2 text-lg">World</span>
                                </label>
                                <label className="flex items-center">
                                    <Input
                                        type="checkbox"
                                        name="option"
                                        value="web"
                                        checked={formState.options.includes(
                                            "web"
                                        )}
                                        onChange={handleChange}
                                        className="checkbox-lg checkbox-primary"
                                    />
                                    <span className="ml-2 text-lg">Web</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <Input
                                type="file"
                                name="file"
                                className="file-input file-input-bordered w-full"
                                onChange={handleChange}
                                accept="image/*"
                                ref={fileInputRef}
                            />
                        </div>
                        <div className="flex justify-between space-x-4">
                            <Button
                                className="w-1/2 btn btn-primary p-4"
                                text="Submit"
                                onClick={handleSubmit}
                                disabled={!isFormValid()}
                            />
                            <Button
                                className="w-1/2 btn btn-accent p-4"
                                onClick={handleViewDatabase}
                                text="View Database"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;
