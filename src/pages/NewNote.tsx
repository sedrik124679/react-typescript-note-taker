import React from 'react';
import NoteForm from "../components/NoteForm";
import {useNoteTaker} from "../context/NoteTakerContext";

const NewNote = () => {
    const {addTag, availableTags, onCreateNote} = useNoteTaker();

    return (
        <>
            <h1 className={'mb-4'}>New note</h1>
            <NoteForm
                onAddTag={addTag}
                availableTags={availableTags}
                onSubmit={onCreateNote}
            />
        </>
    );
};

export default NewNote;
