import React, {useMemo, useState} from 'react';
import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReactSelect from "react-select";
import {useNoteTaker} from "../context/NoteTakerContext";
import {Tag} from "../types/NoteTaker";
import NoteCard from "../components/NoteCard";
import EditTagsModal from "../components/EditTagsModal";

const NoteList = () => {
    const {availableTags, notesWithTags, onDeleteTag, onUpdateTag} = useNoteTaker();

    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState('');
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

    const filteredNotes = useMemo(() => {
        return notesWithTags.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectedTags, notesWithTags])

    return (
        <>
            <Row className={'align-items-center mb-4'}>
                <Col>
                    <h1>Notes</h1>
                </Col>
                <Col xs={'auto'}>
                    <Stack gap={2} direction={'horizontal'}>
                        <Link to={'/new'}>
                            <Button variant={'primary'}>Create</Button>
                        </Link>
                        <Button variant={'outline-secondary'} onClick={() => setEditTagsModalIsOpen(true)}>Edit tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form className={'mb-4'}>
                <Row>
                    <Col>
                        <Form.Group controlId={'title'}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={title}
                                          onChange={e => setTitle(e.target.value)}
                                          type={'text'}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={'tags'}>
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect
                                value={selectedTags.map(tag => {
                                    return {
                                        label: tag.label,
                                        value: tag.id
                                    }
                                })}
                                options={availableTags.map(tag => {
                                    return {label: tag.label, value: tag.id}
                                })}
                                isMulti
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return {
                                            label: tag.label,
                                            id: tag.value
                                        }
                                    }))
                                }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className={'g-3'}>
                {filteredNotes.map(note => {
                    return <Col key={note.id}>
                        <NoteCard id={note.id} title={note.title} tags={note.tags}/>
                    </Col>
                })}
            </Row>
            <EditTagsModal show={editTagsModalIsOpen}
                           availableTags={availableTags}
                           handleClose={() => setEditTagsModalIsOpen(false)}
                           onDeleteTag={onDeleteTag}
                           onUpdateTag={onUpdateTag}
            />
        </>
    );
};

export default NoteList;
