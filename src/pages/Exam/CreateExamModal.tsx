import React, { ReactElement, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { ExamType } from '@interfaces/exam';

import { httpClient } from '@services/HttpClient';

type Props = {
  show: boolean;
  onClose(): void;
  onSubmit(): void;
};

export function CreateExamModal({
  show,
  onClose,
  onSubmit,
}: Props): ReactElement {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
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
      await httpClient.post(`/exam`, { name, type });
      onSubmit();
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.message ||
          error?.response ||
          'Erro ao criar o novo exame',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetForm();
  }, [show]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Criar novo exame</Modal.Title>
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
          {loading ? 'Salvando...' : 'Criar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
