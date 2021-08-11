import React from 'react';
import { Table, Card, Button, Form } from 'react-bootstrap';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from 'react-icons/all';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import { Store } from '@store';
import { selectLabs, setLabs } from 'src/store/laboratory';
import styled from 'styled-components';

import { Laboratory } from '@interfaces/laboratory';

import { httpClient } from '@services/HttpClient';

import { CreateLabModal } from './CreateLabModal';
import { DeleteLabModal } from './DeleteLabModal';
import { EditLabModal } from './EditLabModal';
import { MultiDeleteLabModal } from './MultiDeleteLabModal';
import { ViewLabModal } from './ViewLabModal';

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
`;

export const LabaratoriesPage: React.FC<any> = () => {
  const [showCreateModal, setShowCreateModal] = React.useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showViewModal, setShowViewModal] = React.useState<boolean>(false);
  const [showMultiDeleteModal, setShowMultiDeleteModal] =
    React.useState<boolean>(false);
  const [updateLab, setUpdateLab] = React.useState<Laboratory>();
  const [deleteLab, setDeleteLab] = React.useState<Laboratory>();
  const [selectedLab, setSelectedLab] = React.useState<Laboratory>();
  const [selected, setSelected] = React.useState<
    (Laboratory & { checked?: boolean })[]
  >([]);

  const history = useHistory();

  const fetchLaboratories = async () => {
    try {
      const { data } = await httpClient.get('/laboratory');
      Store.dispatch(setLabs(data));
    } catch (error) {
      toast.error(
        error?.response?.message ||
          error?.response ||
          'Erro ao obter lista de exames',
      );
    }
  };

  const toggleAllSelects = () => {
    const checked = selected.every(e => e.checked);
    const nSelected = selected.map(e => ({ ...e, checked: !checked }));
    setSelected(nSelected);
  };

  const toggleSelect = (lab: Laboratory) => {
    const nSelected = selected.map(l =>
      l._id === lab._id ? { ...l, checked: !l.checked } : l,
    );
    setSelected(nSelected);
  };

  React.useEffect(() => {
    fetchLaboratories();
  }, []);

  const { labs } = useSelector(selectLabs);

  React.useEffect(() => {
    setSelected(labs);
  }, [labs]);

  return (
    <div>
      <CreateLabModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={fetchLaboratories}
      />
      <EditLabModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={fetchLaboratories}
        lab={updateLab}
      />
      <DeleteLabModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onSubmit={fetchLaboratories}
        lab={deleteLab}
      />
      <MultiDeleteLabModal
        show={showMultiDeleteModal}
        onClose={() => setShowMultiDeleteModal(false)}
        onSubmit={fetchLaboratories}
        labs={selected.filter(e => e.checked)}
      />
      <ViewLabModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        lab={selectedLab}
      />
      <Card>
        <Card.Body>
          <Card.Title>
            Laboratórios
            <div className="float-right">
              {~selected.findIndex(e => e.checked) ? (
                <Button
                  style={{ marginRight: '15px' }}
                  onClick={() => setShowMultiDeleteModal(true)}
                  variant="danger"
                >
                  Deletar selecionados
                </Button>
              ) : null}
              <Button
                onClick={() => history.push('/labs/search')}
                style={{ marginRight: '15px' }}
                variant="warning"
              >
                Buscar por exame
              </Button>
              <Button onClick={() => setShowCreateModal(true)}>+ Criar</Button>
            </div>
          </Card.Title>
          <Card.Body>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>
                    <Form.Check
                      type="checkbox"
                      checked={
                        !!(selected.length && selected.every(e => e.checked))
                      }
                      onClick={toggleAllSelects}
                    />
                  </th>
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
                    <td style={{ textAlign: 'center' }}>
                      <Form.Check
                        type="checkbox"
                        checked={
                          selected.find(l => l._id === lab._id)?.checked ||
                          false
                        }
                        onClick={() => toggleSelect(lab)}
                      />
                    </td>
                    <td>{lab.id}</td>
                    <td>{lab.name}</td>
                    <td>{lab.address} </td>
                    <td style={{ textAlign: 'center' }}>{lab.exams.length} </td>
                    <td style={{ textAlign: 'center' }}>
                      <ActionsContainer className="center">
                        <AiOutlineEye
                          style={{ marginLeft: '15px', cursor: 'pointer' }}
                          onClick={() => {
                            setSelectedLab(lab);
                            setShowViewModal(true);
                          }}
                        />
                        <AiOutlineEdit
                          style={{ marginLeft: '15px', cursor: 'pointer' }}
                          onClick={() => {
                            setUpdateLab(lab);
                            setShowUpdateModal(true);
                          }}
                        />
                        <AiOutlineDelete
                          style={{ marginLeft: '15px', cursor: 'pointer' }}
                          onClick={() => {
                            setDeleteLab(lab);
                            setShowDeleteModal(true);
                          }}
                        />
                      </ActionsContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card.Body>
      </Card>
    </div>
  );
};
