import TableBase from '@/components/ui/table';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Button, Container, Form, Modal, Row } from 'react-bootstrap';

/*
{
  "id": 1,
  "id_incidencia": "1",
  "id_cuadrilla": 1,
  "fecha": "2023-11-11T14:21:21.000Z",
  "estado": "va",
  "id_atencion": 1
}
*/

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    id_incidencia: form.id_incidencia.value,
    id_cuadrilla: form.id_cuadrilla.value,
    fecha: form.fecha.value,
  };
  try {
    const api = process.env.API_URL;
    const res = await fetch(`${api}/visita/`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

function BtnNewVisita() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Agendar Visita
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Programar Visita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Programar fecha hasta un maximo de 5 dias habiles</p>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="string"
              name="id_incidencia"
              placeholder="ID incidencia"
              className="mb-3"
            />
            <Form.Control
              type="number"
              name="id_cuadrilla"
              placeholder="Cuadrilla"
              className="mb-3"
            />
            <Form.Control type="date" name="fecha" placeholder="Fecha" />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose} type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  try {
    const api = process.env.API_URL;
    const res = await fetch(`${api}/visita/`);
    const data = await res.json();
    // Pass data to the page via props
    data.sort((a, b) => b.id - a.id);
    return { props: { data } };
  } catch (error) {
    console.log(error.message);
    return { props: { data: [] } };
  }
}

export default function Page({ data }) {
  const estVistia = {
    nv: 'No Visitado',
    va: 'Visitado y Atendido',
    vna: 'Visitado y No Atendido',
  };
  const columns = [
    {
      header: 'ID',
      accessorFn: (row) => row.id,
    },
    {
      header: 'Incidencia',
      accessorFn: (row) => row.id_incidencia,
    },
    {
      header: 'Cuadrilla',
      accessorFn: (row) => row.id_cuadrilla,
    },
    {
      header: 'Fecha',
      accessorFn: (row) => dayjs(row.fecha).format('DD/MM/YY'),
      cell: ({ getValue }) =>
        getValue() !== '' ? getValue() : <Button>📆</Button>,
    },
    {
      header: 'Estado',
      accessorFn: (row) =>
        row.estado !== '' ? estVistia[row.estado] : 'Pendiente',
    },
    {
      header: 'Registro de Atención',
      accessorFn: (row) => row.id_atencion || 'No',
    },
  ];

  return (
    <Container fluid className="text-center">
      <Row>
        <h1>Lista de Visitas</h1>
      </Row>
      <Row md={'auto'} className="my-2 ms-2 justify-content-start">
        <BtnNewVisita />
      </Row>

      <TableBase data={data} columns={columns} />
    </Container>
  );
}
