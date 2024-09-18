import React from "react";
import { Link } from "react-router-dom";
import NoteList from "../components/Notes/NoteList";

const DashboardPage = ({ notes, setNotes }) => {
    return (
        <div>
            <h1>Your Notes</h1>
            <Link to="/create-note">Create Note</Link>
            <NoteList notes={notes} setNotes={setNotes} />
        </div>
    );
};

export default DashboardPage;
