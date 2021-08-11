import React, { ReactElement, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { Exam } from '@interfaces/exam';

import { httpClient } from '@services/HttpClient';

type Props = {
  show: boolean;
  onClose(): void;
  onSubmit(): void;
  exams?: Exam[];
};

export function MultiDeleteExamModal({
  show,
  onClose,
  onSubmit,
  exams,
}: Props): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async e => {
    e?.preventDefault();

    setLoading(true);
    try {
      await httpClient.delete(
        `/exam?ids=${exams?.map(exam => exam._id).join(',')}`,
      );
      onSubmit();
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.message ||
          error?.response ||
          'Erro ao deletar os exames',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Desativar exames - {exams?.length} Exames</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza que dejesa desativar os exames ?
        <ul>
          {exams?.map((e, i) => (
            <li key={i}>- {e.name}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Desativando...' : 'Desativar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
