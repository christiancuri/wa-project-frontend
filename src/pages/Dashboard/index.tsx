import React, { ReactElement } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

import { Store } from '@store';
import { selectExams, setExams } from 'src/store/exam';
import { selectLabs, setLabs } from 'src/store/laboratory';

import { httpClient } from '@services/HttpClient';

type KpiProps = {
  title: string;
  body: string;
  page: string;
};

function KPI({ title, body, page }: KpiProps): ReactElement {
  const history = useHistory();
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Link href="#" onClick={() => history.push(page)}>
          {body}
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export const DashboardPage: React.FC<any> = () => {
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

  React.useEffect(() => {
    fetchExams();
    fetchLaboratories();
  }, []);

  const { exams } = useSelector(selectExams);
  const { labs } = useSelector(selectLabs);

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Dashboard</Card.Title>
          <Card.Body>
            <Col>
              <Row>
                <Col sm="6">
                  <KPI
                    title="Exames ativos"
                    body={`${exams.length} exames`}
                    page="/exam"
                  />
                </Col>
                <Col sm="6">
                  <KPI
                    title="Laboratórios ativos"
                    body={`${labs.length} laboratórios`}
                    page="/labs"
                  />
                </Col>
              </Row>
            </Col>
          </Card.Body>
        </Card.Body>
      </Card>
    </div>
  );
};
