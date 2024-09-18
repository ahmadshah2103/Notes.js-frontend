import React from "react";
import NoteCard from "./NoteCard";
import { deleteNote } from "../../services/noteService";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const NoteList = ({ notes, setNotes }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const sortedNotes = [...notes].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const handleDelete = async (noteId) => {
        try {
            const message = await deleteNote(user.id, noteId);
            console.log(message);
            
            setNotes(notes.filter(note => note.id !== noteId));

            const alertElement = document.createElement("div");
            alertElement.textContent = "Note has been deleted";
            alertElement.style.cssText =
                "position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background-color: #4CAF50; color: white; padding: 15px; border-radius: 5px; z-index: 1000;";
            document.body.appendChild(alertElement);

            setTimeout(() => {
                document.body.removeChild(alertElement);
            }, 3000);
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };

    const handleUpdate = async (note) => {
        try {
            navigate(`/update-note/${note.id}`);
        } catch (error) {
            console.error("Failed to navigate to update page:", error);
        }
    };

    return (
        <div>
            {sortedNotes.length === 0 ? (
                <p>No notes available. Create a new note to get started!</p>
            ) : (
                <div>
                    {sortedNotes.map((note) => (
                        <NoteCard key={note.id} note={note} onDelete={handleDelete} onUpdate={handleUpdate} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NoteList;
