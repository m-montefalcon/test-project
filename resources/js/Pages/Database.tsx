import React, { useState, useEffect } from "react";
import Card from "../Common/Card";
import { Inertia } from "@inertiajs/inertia";

// Interface for Post data
interface Post {
    id: number;
    user: string;
    text: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    greeting: string;
    image_path: string;
}

// Interface for CatData
interface CatData {
    _id: string;
    user: string;
    text: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    [key: string]: any;
}

// Interface for component state
interface State {
    data: Post[];
    catData: CatData;
}

const Database = () => {
    // State initialization
    const [state, setState] = useState<State>({
        data: [],
        catData: {} as CatData,
    });

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        const fetchDatabase = async () => {
            try {
                const response = await fetch("/api/get");
                if (response.status === 200) {
                    const responseData = await response.json();
                    setState({
                        data: responseData.posts,
                        catData: responseData.apiResponse,
                    });
                } else {
                    console.error("Failed to fetch posts:", response.status);
                }
            } catch (error) {
                console.error("Error fetching database:", error);
            }
        };

        fetchDatabase();
    }, []);

    return (
        <div>
            <div className="flex justify-center md:justify-start my-10 mx-4 md:ml-10">
                <button
                    className="btn btn-outline btn-info"
                    onClick={() => window.history.back()}
                >
                    <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                    >
                        <path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
                    </svg>
                    Back to Form
                </button>
            </div>
            {/* Title for the database section */}
            <h1 className="text-3xl font-bold text-center m-10">DATABASE</h1>
            {/* Section to display a fun fact about cats */}
            <div className="text-center m-12 mx-32">
                <h1 className="text-3xl font-bold">Fun fact about cats:</h1>
                <div className="overflow-x-auto">
                    <table className="table-auto mx-auto mt-4 min-w-full">
                        <thead>
                            <tr>
                                {[
                                    "id",
                                    "user",
                                    "text",
                                    "type",
                                    "createdAt",
                                    "updatedAt",
                                ].map((key) => (
                                    <th
                                        key={key}
                                        className="border px-4 py-2 font-bold"
                                    >
                                        {key}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {[
                                    "_id",
                                    "user",
                                    "text",
                                    "type",
                                    "createdAt",
                                    "updatedAt",
                                ].map((key) => (
                                    <td key={key} className="border px-4 py-2">
                                        {state.catData && state.catData[key]
                                            ? String(state.catData[key])
                                            : "No response from the cat server"}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <p className="text-sm font-bold text-center m-10"></p>
            {/* Display the fetched data using the Card component */}
            <div className="flex flex-wrap justify-center gap-10">
                {state.data.map((item: Post) => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Database;
