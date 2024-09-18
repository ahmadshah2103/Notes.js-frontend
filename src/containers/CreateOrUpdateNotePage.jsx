import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoteForm from "../components/Notes/NoteForm";
import { createNote, updateNote, getNoteById } from "../services/noteService";
import { useAuth } from "../contexts/AuthContext";

const CreateOrUpdateNotePage = ({ notes, setNotes }) => {
    const { noteId } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState({ title: "", content: "" });
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (noteId) {
            setIsLoading(true);
            getNoteById(user.id, noteId)
                .then((fetchedNote) => {
                    setNote(fetchedNote);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching note:", error);
                    setIsLoading(false);
                });
        }
    }, [noteId, user.id]);

    const handleSubmit = async (formData) => {
        try {
            if (noteId) {
                const updatedNote = await updateNote(user.id, noteId, formData);
                setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)));
            } else {
                const newNote = await createNote(user.id, formData);
                setNotes([...notes, newNote]);
            }
            navigate("/dashboard");
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{noteId ? "Update Note" : "Create New Note"}</h1>
            <NoteForm initialData={note} onSubmit={handleSubmit} operationName={noteId ? "Update Note" : "Create Note"} />
        </div>
    );
};

export default CreateOrUpdateNotePage;
