import React from 'react';
import {
  Table,
  Card,
  Button,
  Form,
  Col,
  Row,
  FloatingLabel,
} from 'react-bootstrap';
import { AiOutlineEye } from 'react-icons/all';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import styled from 'styled-components';

import { Exam } from '@interfaces/exam';
import { Laboratory } from '@interfaces/laboratory';

import { httpClient } from '@services/HttpClient';

import { ViewLabModal } from './ViewLabModal';

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
`;

export const SearchLabaratoriesPage: React.FC<any> = () => {
  const [showViewModal, setShowViewModal] = React.useState<boolean>(false);
  const [selectedLab, setSelectedLab] = React.useState<Laboratory>();
  const [labs, setLabs] = React.useState<Laboratory[]>([]);
  const [search, setSearch] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const history = useHistory();

  const searchLabs = async e => {
    if (!search) return;
    e?.preventDefault();
    setLoading(true);
    setLabs([]);
    try {
      const { data } = await httpClient.get(`/exam/search?name=${search}`);
      if (data?.length) {
        const memo = new Set();
        const allLabs = data.reduce(
          (acc, item: Exam & { laboratories: Laboratory[] }) => {
            return [
              ...acc,
              ...item.laboratories.filter(lab => {
                if (memo.has(lab._id)) {
                  return false;
                }
                memo.add(lab._id);
                return true;
              }),
            ];
          },
          [] as Laboratory[],
        );
        setLabs(allLabs);
      } else {
        toast.warn(`Nenhum laboratório encontrado`);
      }
    } catch (error) {
      toast.error(
        error?.response?.message ||
          error?.response ||
          'Erro ao obter lista de exames',
      );
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    return () => {
      setLabs([]);
    };
  }, []);

  return (
    <div>
      <ViewLabModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        lab={selectedLab}
      />
      <Card>
        <Card.Body>
          <Card.Title>
            Buscar Laboratórios por Exame
            <div className="float-right">
              <Button
                onClick={() => history.push('/labs')}
                style={{ marginRight: '15px' }}
                variant="warning"
              >
                Ver todos
              </Button>
            </div>
          </Card.Title>
          <Card.Body>
            <Col>
              <Row>
                <Form onSubmit={searchLabs}>
                  <Form.Group>
                    <FloatingLabel
                      controlId="searchInput"
                      label="Digite o nome do exame"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Digite o nome do exame"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        disabled={loading}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Form>
              </Row>
              <Row>
                <Col>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Exames</th>
                        <th style={{ textAlign: 'center' }}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {labs.map((lab, i) => (
                        <tr key={i}>
                          <td>{lab.id}</td>
                          <td>{lab.name}</td>
                          <td>{lab.address} </td>
                          <td style={{ textAlign: 'center' }}>
                            {lab.exams.length}{' '}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <ActionsContainer className="center">
                              <AiOutlineEye
                                style={{
                                  marginLeft: '15px',
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  setSelectedLab(lab);
                                  setShowViewModal(true);
                                }}
                              />
                            </ActionsContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>
          </Card.Body>
        </Card.Body>
      </Card>
    </div>
  );
};
