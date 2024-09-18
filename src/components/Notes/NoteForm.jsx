import React, { useState } from "react";

const NoteForm = ({ onSubmit, operationName }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            try {
                onSubmit({ title, content });
                setTitle("");
                setContent("");
            } catch (error) {
                console.error("Error creating note:", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Note Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">{operationName}</button>
        </form>
    );
};

export default NoteForm;
