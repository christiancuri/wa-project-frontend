import React, { ReactElement, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { Exam } from '@interfaces/exam';

import { httpClient } from '@services/HttpClient';

type Props = {
  show: boolean;
  onClose(): void;
  onSubmit(): void;
  exam?: Exam;
};

export function DeleteExamModal({
  show,
  onClose,
  onSubmit,
  exam,
}: Props): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async e => {
    e?.preventDefault();

    setLoading(true);
    try {
      await httpClient.delete(`/exam?ids=${exam?._id}`);
      onSubmit();
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.message ||
          error?.response ||
          'Erro ao desativar o exame',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Desativar exame</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza que dejesa desativar o exame &quot;{exam?.name}&quot; ?
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
