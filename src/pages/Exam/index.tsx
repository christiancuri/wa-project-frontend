import React from 'react';
import { Table, Card, Button, Form } from 'react-bootstrap';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/all';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Store } from '@store';
import { selectExams, setExams } from 'src/store/exam';
import styled from 'styled-components';

import { Exam, ExamHelper } from '@interfaces/exam';

import { httpClient } from '@services/HttpClient';

import { CreateExamModal } from './CreateExamModal';
import { DeleteExamModal } from './DeleteExamModal';
import { EditExamModal } from './EditExamModal';
import { MultiDeleteExamModal } from './MultiDeleteExamModal';

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
`;

export const ExamsPage: React.FC<any> = () => {
  const [showCreateModal, setShowCreateModal] = React.useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = React.useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showMultiDeleteModal, setShowMultiDeleteModal] =
    React.useState<boolean>(false);
  const [updateExam, setUpdateExam] = React.useState<Exam>();
  const [deleteExam, setDeleteExam] = React.useState<Exam>();
  const [selected, setSelected] = React.useState<
    (Exam & { checked?: boolean })[]
  >([]);

  const fetchExams = async () => {
    try {
      const { data } = await httpClient.get('/exam');
      Store.dispatch(setExams(data));
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

  const toggleSelect = (exam: Exam) => {
    const nSelected = selected.map(e =>
      e._id === exam._id ? { ...e, checked: !e.checked } : e,
    );
    setSelected(nSelected);
  };

  React.useEffect(() => {
    fetchExams();
  }, []);

  const { exams } = useSelector(selectExams);

  React.useEffect(() => {
    setSelected(exams);
  }, [exams]);

  return (
    <div>
      <CreateExamModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={fetchExams}
      />
      <EditExamModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={fetchExams}
        exam={updateExam}
      />
      <DeleteExamModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onSubmit={fetchExams}
        exam={deleteExam}
      />
      <MultiDeleteExamModal
        show={showMultiDeleteModal}
        onClose={() => setShowMultiDeleteModal(false)}
        onSubmit={fetchExams}
        exams={selected.filter(e => e.checked)}
      />
      <Card>
        <Card.Body>
          <Card.Title>
            Exames
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
                  <th>Tipo</th>
                  <th style={{ textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam, i) => (
                  <tr key={i}>
                    <td style={{ textAlign: 'center' }}>
                      <Form.Check
                        type="checkbox"
                        checked={
                          selected.find(e => e._id === exam._id)?.checked ||
                          false
                        }
                        onClick={() => toggleSelect(exam)}
                      />
                    </td>
                    <td>{exam.id}</td>
                    <td>{exam.name}</td>
                    <td>{ExamHelper.getType(exam.type)} </td>
                    <td style={{ textAlign: 'center' }}>
                      <ActionsContainer className="center">
                        <AiOutlineEdit
                          style={{ marginLeft: '15px', cursor: 'pointer' }}
                          onClick={() => {
                            setUpdateExam(exam);
                            setShowUpdateModal(true);
                          }}
                        />
                        <AiOutlineDelete
                          style={{ marginLeft: '15px', cursor: 'pointer' }}
                          onClick={() => {
                            setDeleteExam(exam);
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
