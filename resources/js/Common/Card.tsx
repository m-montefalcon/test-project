import React from "react";
import "../../css/app.css";

// Define the props for the Card component
interface CardProps {
    item: {
        id: number;
        text: string;
        greeting: string;
        image_path: string;
    };
}
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

// Card component definition
const Card: React.FC<CardProps> = ({ item }) => (
    <div className="card bg-base-200 w-96 shadow-xl">
        {/* Image section of the card */}
        <figure style={{ aspectRatio: "16/9" }}>
            <img
                src={`${baseUrl}/public_html/${item.image_path}`}
                alt={`Image for ${item.text}`}
                className="object-contain h-48 w-full rounded"
            />
        </figure>
        {/* Body section of the card */}
        <div className="card-body">
            <h2 className="card-title">{item.greeting}</h2>
            <p>{item.text}</p>
        </div>
    </div>
);

export default Card;
