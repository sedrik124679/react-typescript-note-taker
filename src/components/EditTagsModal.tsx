import {Button, Col, Form, Modal, Row, Stack} from "react-bootstrap";
import React from "react";
import {Tag} from "../types/NoteTaker";

type EditTagsModalProps = {
    availableTags: Tag[],
    show: boolean,
    handleClose: () => void,
    onDeleteTag: (id: string) => void,
    onUpdateTag: (id: string, label: string) => void
}

const EditTagsModal = ({ availableTags, handleClose, show, onDeleteTag, onUpdateTag }: EditTagsModalProps) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {availableTags.map(tag => {
                            return <Row key={tag.id}>
                                <Col>
                                    <Form.Control onChange={e => onUpdateTag(tag.id, e.target.value)} type={'text'} value={tag.label} />
                                </Col>
                                <Col xs={'auto'}>
                                    <Button onClick={() => onDeleteTag(tag.id)} variant={'outline-danger'}>&times;</Button>
                                </Col>
                            </Row>
                        })}
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditTagsModal;
