import { Card, Col, Container, Row } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
);

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5, 2, 3],
    },
  ],
};

/**
 * [{
 *    "Red": 12,
 *    "Blue": 19,
 *    "Yellow": 3,
 *    "Green": 5,
 *    "Purple": 2,
 * }]
 */

// [data1, data2, data3]

export default function Page() {
  return (
    <>
      <Container fluid className="text-lg-center ">
        {' '}
        <h1>Dashboard</h1>
      </Container>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header as="h5">Cuadro</Card.Header>
              <Card.Body>
                <p>Contenido</p>
                <Bar data={data} />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">Cuadro</Card.Header>
              <Card.Body>
                <p>Contenido</p>
                <Bar data={data} />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">Cuadro</Card.Header>
              <Card.Body>
                Contenido
                <Pie data={data}></Pie>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
