import React from 'react';
import {Navigate, Outlet, useOutlet, useOutletContext, useParams} from "react-router-dom";
import {useNoteTaker} from "../context/NoteTakerContext";
import {Note} from "../types/NoteTaker";

export const NoteLayout = () => {
    const { notes } = useNoteTaker()
    const { id } = useParams();
    const note = notes.find(note => note.id === id);

    if (note === null) return <Navigate to={'/'} replace />

    return (
        <Outlet context={note} />
    );
};

export function useNote() {
    return useOutletContext<Note>();
}
