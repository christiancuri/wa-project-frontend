import React, { ReactElement, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { Laboratory } from '@interfaces/laboratory';

import { httpClient } from '@services/HttpClient';

type Props = {
  show: boolean;
  onClose(): void;
  onSubmit(): void;
  lab?: Laboratory;
};

export function DeleteLabModal({
  show,
  onClose,
  onSubmit,
  lab,
}: Props): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async e => {
    e?.preventDefault();

    setLoading(true);
    try {
      await httpClient.delete(`/laboratory?ids=${lab?._id}`);
      onSubmit();
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.message ||
          error?.response ||
          'Erro ao desativar o laboratório',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Desativar laboratório</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza que dejesa desativar o laboratório &quot;{lab?.name}&quot; ?
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
