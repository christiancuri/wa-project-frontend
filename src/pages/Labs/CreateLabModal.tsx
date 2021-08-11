import React, { ReactElement, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { Store } from '@store';
import { selectExams, setExams as setStoreExams } from 'src/store/exam';

import { httpClient } from '@services/HttpClient';

type Props = {
  show: boolean;
  onClose(): void;
  onSubmit(): void;
};

export function CreateLabModal({
  show,
  onClose,
  onSubmit,
}: Props): ReactElement {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [exams, setExams] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { exams: availableExams } = useSelector(selectExams);

  const resetForm = () => {
    setName('');
    setAddress('');
    setExams([]);
  };

  const handleSubmit = async e => {
    e?.preventDefault();
    if (!name) return toast.warn(`Favor informar o nome do laboratório`);
    if (!address) return toast.warn(`Favor informar o endereço do laboratório`);
    if (!exams.length)
      return toast.warn(`Favor informar os exames disponíveis`);

    setLoading(true);
    try {
      await httpClient.post(`/laboratory`, {
        name,
        address,
        exams: exams.map(exam => exam.value),
      });
      onSubmit();
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.message ||
          error?.response ||
          'Erro ao criar o novo laboratório',
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchExams = async () => {
    try {
      const { data } = await httpClient.get('/exam');
      Store.dispatch(setStoreExams(data));
    } catch (error) {
      toast.error(
        error?.response?.message ||
          error?.response ||
          'Erro ao obter lista de exames',
      );
    }
  };

  useEffect(() => {
    resetForm();
  }, [show]);

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Criar novo laboratório</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome do laboratório"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type="text"
              placeholder="Endereço do laboratório"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exams">
            <Form.Label>Exames</Form.Label>
            <Select
              options={availableExams.map(e => ({
                value: e._id,
                label: e.name,
              }))}
              isMulti
              onChange={selecteds => setExams(selecteds)}
            />
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
