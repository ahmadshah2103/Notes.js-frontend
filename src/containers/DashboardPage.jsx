import React from "react";
import { Link } from "react-router-dom";
import NoteList from "../components/Notes/NoteList";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../store/notesSlice";
import { useEffect } from "react";

const DashboardPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (user) {
            dispatch(fetchNotes(user.id));
        }
    }, [dispatch, user]);

    return (
        <div>
            <h1>Your Notes</h1>
            <Link to="/create-note">Create Note</Link>
            <NoteList />
        </div>
    );
};

export default DashboardPage;
