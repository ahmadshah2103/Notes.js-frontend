import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoteForm from "../components/Notes/NoteForm";
import { useSelector, useDispatch } from "react-redux";
import { editNote, addNote, fetchNoteById } from "../store/notesSlice";

const CreateOrUpdateNotePage = () => {
    const { noteId } = useParams();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            if (noteId) {
                dispatch(editNote({ userId: user.id, noteId, note: formData }));
            } else {
                dispatch(addNote({ userId: user.id, note: formData }));
            }
            navigate("/dashboard");
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    return (
        <div>
            <h1>{noteId ? "Update Note" : "Create New Note"}</h1>
            <NoteForm
                initialData={
                    noteId
                        ? dispatch(fetchNoteById({ userId: user.id, noteId }))
                        : {}
                }
                onSubmit={handleSubmit}
                operationName={noteId ? "Update Note" : "Create Note"}
            />
        </div>
    );
};

export default CreateOrUpdateNotePage;
