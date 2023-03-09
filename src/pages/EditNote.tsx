import React from 'react';
import NoteForm from "../components/NoteForm";
import {useNote} from "../components/NoteLayout";
import {useNoteTaker} from "../context/NoteTakerContext";

const EditNote = () => {
    const {onUpdateNote, addTag, availableTags} = useNoteTaker();

    const note = useNote();
    return (
        <>
            <h1 className={'mb-4'}>Edit note</h1>
            <NoteForm
                title={note.title}
                markdown={note.markdown}
                tags={note.tags}
                onAddTag={addTag}
                availableTags={availableTags}
                onSubmit={(data: any) => onUpdateNote(note.id, data)}
            />
        </>
    );
};

export default EditNote;
