import {createContext, ReactNode, useContext, useMemo} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {v4 as uuidV4} from "uuid";
import {NoteData, RawNote, SimplifiedNoteProps, Tag} from "../types/NoteTaker";

type NoteTakerContextProps = {
    children: ReactNode
}

type NoteTakerContext = {
    onDeleteTag: (id: string) => void,
    onUpdateTag: (id: string, label: string) => void,
    onDeleteNote: (id: string) => void,
    onUpdateNote: (id: string, data: NoteData) => void,
    addTag: (tag: Tag) => void,
    onCreateNote: (data: NoteData) => void,
    notesWithTags: SimplifiedNoteProps[],
    availableTags: Tag[],
}

const NoteTakerContext = createContext({} as NoteTakerContext);

export function useNoteTaker() {
    return useContext(NoteTakerContext)
}

export function NoteTakerProvider({children}: NoteTakerContextProps) {

    const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
    const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

    const notesWithTags = useMemo(() => {
        return notes.map(note => {
            return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
        })
    }, [notes, tags]);

    const onCreateNote = ({tags, ...data}: NoteData) => {
        setNotes(prevNotes => {
            return [
                ...prevNotes,
                {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)},
            ]
        })
    }

    const addTag = (tag: Tag) => {
        setTags(prev => [...prev, tag])
    }

    const onUpdateNote = (id: string, {tags, ...data}: NoteData) => {
        setNotes(prevNotes => {
            return prevNotes.map(note => {
                if (note.id === id) {
                    return {...note, ...data, tagIds: tags.map(tag => tag.id)}
                } else {
                    return note
                }
            })
        })
    }

    const onDeleteNote = (id: string) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    }

    const updateTag = (id: string, label: string) => {
        setTags(prevTags => {
            return prevTags.map(tag => {
                if (tag.id === id) {
                    return {...tag, label: label}
                } else {
                    return tag
                }
            })
        })
    }

    const deleteTag = (id: string) => {
        setTags(prevTags => prevTags.filter(tag => tag.id !== id));
    }

    return <NoteTakerContext.Provider
        value={{
            onDeleteNote,
            onUpdateNote,
            addTag,
            onCreateNote,
            notesWithTags,
            availableTags: tags,
            onDeleteTag: deleteTag,
            onUpdateTag: updateTag
        }}>
        { children }
    </NoteTakerContext.Provider>
}
