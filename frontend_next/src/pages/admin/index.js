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

// [data1, data2, data3]

export async function getServerSideProps() {
  // Fetch data from external API
  try {
    const data = await fetch(`${process.env.API_URL}/incidentes/`).then((res) =>
      res.json(),
    );
    // count incidentes
    const { incidentes } = data;
    const count = incidentes.length;

    // Pass data to the page via props
    return { props: { data } };
  } catch (error) {
    console.log(error.message);
    return { props: { data: [] } };
  }
}

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
