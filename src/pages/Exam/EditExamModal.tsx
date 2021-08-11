import React, { ReactElement, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { Exam, ExamType } from '@interfaces/exam';

import { httpClient } from '@services/HttpClient';

type Props = {
  show: boolean;
  onClose(): void;
  onSubmit(): void;
  exam?: Exam;
};

export function EditExamModal({
  show,
  onClose,
  onSubmit,
  exam,
}: Props): ReactElement {
  const [name, setName] = useState<string>(exam?.name || '');
  const [type, setType] = useState<string>(exam?.type || '');
  const [loading, setLoading] = useState<boolean>(false);

  const resetForm = () => {
    setName('');
    setType('');
  };

  const handleSubmit = async e => {
    e?.preventDefault();
    if (!name) return toast.warn(`Favor informar o nome do exame`);
    if (!type) return toast.warn(`Favor informar o tipo do exame`);

    setLoading(true);
    try {
      await httpClient.put(`/exam/${exam?._id}`, { name, type });
      onSubmit();
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.message ||
          error?.response ||
          'Erro ao atualizar o exame',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return resetForm;
  }, []);

  useEffect(() => {
    setName(exam?.name || '');
    setType(exam?.type || '');
  }, [exam]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Exame - {exam?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do exame"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Tipo</Form.Label>

            <Form.Select
              aria-label="Tipo de exame"
              onChange={(e: any) => setType(e.target.value)}
              required
            >
              <option selected={type === ''} disabled>
                Selecione um tipo de exame
              </option>
              <option
                value={ExamType.CLINICAL_ANALYSIS}
                selected={type === ExamType.CLINICAL_ANALYSIS}
              >
                Análise clinica
              </option>
              <option value={ExamType.IMAGE} selected={type === ExamType.IMAGE}>
                Imagem
              </option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Atualizando...' : 'Atualizar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
