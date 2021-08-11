import React, { ReactElement, useEffect, useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';

import { Exam, ExamHelper } from '@interfaces/exam';
import { Laboratory } from '@interfaces/laboratory';

type Props = {
  show: boolean;
  onClose(): void;
  lab?: Laboratory;
};

export function ViewLabModal({ show, onClose, lab }: Props): ReactElement {
  const [name, setName] = useState<string>(lab?.name || '');
  const [address, setAddress] = useState<string>(lab?.address || '');
  const [exams, setExams] = useState<Exam[]>(lab?.exams || []);

  useEffect(() => {
    setName(lab?.name || '');
    setAddress(lab?.address || '');
    setExams(lab?.exams || []);
  }, [lab]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalhes laboratório</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={e => e.preventDefault()}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" value={name} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Endereço</Form.Label>
            <Form.Control type="text" value={address} disabled />
          </Form.Group>

          <Form.Group>
            <Form.Label>Exames</Form.Label>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam, i) => (
                  <tr key={i}>
                    <td>{exam.id}</td>
                    <td>{exam.name}</td>
                    <td>{ExamHelper.getType(exam.type)} </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
