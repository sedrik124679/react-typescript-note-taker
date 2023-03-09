import React, {FormEvent, useRef, useState} from "react";
import {Button, Col, Form, Row, Stack} from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import {Link, useNavigate} from "react-router-dom";
import {v4 as uuidV4} from "uuid";
import {NoteData, Tag} from "../types/NoteTaker";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>

const NoteForm = ({
                      onSubmit,
                      onAddTag,
                      availableTags,
                      title = '',
                      tags = [],
                      markdown = ''
}: NoteFormProps) => {

    const titleRef = useRef<HTMLInputElement>(null);
    const markDownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            markdown: markDownRef.current!.value,
            tags: selectedTags
        });

        navigate('..');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId={'title'}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} required defaultValue={title} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={'tags'}>
                            <Form.Label>Tags</Form.Label>
                            <CreatableSelect
                                onCreateOption={label => {
                                    const newTag = {id: uuidV4(), label: label};
                                    onAddTag(newTag);
                                    setSelectedTags(prev => [...prev, newTag]);
                                }}
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
                <Form.Group controlId={'markdown'}>
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        ref={markDownRef}
                        required
                        defaultValue={markdown}
                        as={'textarea'}
                        rows={15}
                    />
                </Form.Group>
                <Stack direction={'horizontal'} gap={2} className={'justify-content-end'}>
                    <Button variant={'primary'} type={'submit'}>
                        Save
                    </Button>
                    <Link to={'..'}>
                        <Button variant={'outline-secondary'} type={'button'}>
                            Cancel
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    );
};

export default NoteForm;
