import React from 'react';
import {Navigate, Outlet, useOutletContext, useParams} from "react-router-dom";
import {useNoteTaker} from "../context/NoteTakerContext";
import {Note} from "../types/NoteTaker";

export const NoteLayout = () => {
    const { notesWithTags } = useNoteTaker()
    const { id } = useParams();
    const note = notesWithTags.find(note => note.id === id);

    if (note === null) return <Navigate to={'/'} replace />

    return (
        <Outlet context={note} />
    );
};

export function useNote() {
    return useOutletContext<Note>();
}
