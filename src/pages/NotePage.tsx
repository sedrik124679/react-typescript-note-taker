import React from 'react';
import {useNote} from "../components/NoteLayout";
import {Badge, Button, Col, Row, Stack} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {useNoteTaker} from "../context/NoteTakerContext";

const NotePage = () => {
    const { onDeleteNote } = useNoteTaker();
    const {id, title, markdown, tags} = useNote();
    const navigate = useNavigate();

    return (
        <>
            <Row className={'align-items-center mb-4'}>
                <Col>
                    <h1>{title}</h1>
                    {tags.length > 0 && <Stack gap={2} className={'align-items-center justify-content-center h-100'}>
                        {tags.length > 0 && (
                            <Stack direction={'horizontal'}
                                   gap={1}
                                   className={'flex-wrap'}>
                                {tags.map(tag => {
                                    return <Badge className={'text-truncate'} key={tag.id}>{tag.label}</Badge>
                                })}
                            </Stack>
                        )}
                    </Stack>
                    }
                </Col>
                <Col xs={'auto'}>
                    <Stack gap={2} direction={'horizontal'}>
                        <Link to={`/${id}/edit`}>
                            <Button variant={'primary'}>Edit</Button>
                        </Link>
                        <Button variant={'outline-danger'} onClick={() => {
                            onDeleteNote(id);
                            navigate('/');
                        }}>Delete</Button>
                        <Link to={'/'}>
                            <Button variant={'outline-secondary'}>Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </>
    );
};

export default NotePage;
