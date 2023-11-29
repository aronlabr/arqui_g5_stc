import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  OverlayTrigger,
  Popover,
  Row,
  Stack,
  Table,
} from 'react-bootstrap';
const TableBase = dynamic(() => import('tables/tabledata'), { ssr: false });

// Crear Tecnico
/** 
{
  "name": "Antoni Sarosi",
  "email": "ant.saro@mail.com",
  "phone": "999-559-696",
  "address": "SMP, 158 Norte",
  "available": true,
  "groupNumber": 2
}
*/

// Lista de tecnicos

/**
[
  {
    "id": 1,
    "name": "Antoni Sarosi",
    "email": "ant.saro@mail.com",
    "phone": "999-559-696",
    "address": "SMP, 158 Norte",
    "available": true,
    "groupNumber": 2,
    "createdAt": "2023-11-19T20:56:32.000Z",
    "updatedAt": "2023-11-19T20:56:32.000Z"
  }
]
 */
function TecniInput({ data }) {
  const [available, setAvailable] = useState(data?.available);
  return (
    <>
      <Stack gap={1}>
        <Form.Control type="hidden" name="id" defaultValue={data?.id} />
        <InputGroup>
          <InputGroup.Text id="name">👤</InputGroup.Text>
          <Form.Control
            type="text"
            name="name"
            placeholder="Nombre completo"
            defaultValue={data?.name}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="email">📧</InputGroup.Text>
          <Form.Control
            type="email"
            name="email"
            placeholder="Correo electrónico"
            defaultValue={data?.email}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="phone">📞</InputGroup.Text>
          <Form.Control
            type="text"
            name="phone"
            placeholder="Telefono"
            defaultValue={data?.phone}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="address">🏠</InputGroup.Text>
          <Form.Control
            type="text"
            name="address"
            placeholder="Direccion"
            defaultValue={data?.address}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="available">👷</InputGroup.Text>
          <Form.Check
            type="switch"
            name="available"
            label={available ? 'Disponible' : 'No Disponible'}
            checked={available}
            onChange={() => setAvailable(!available)}
            value={available}
            className="ms-1 align-self-center"
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="groupNumber">🚙</InputGroup.Text>
          <Form.Control
            type="number"
            name="groupNumber"
            placeholder="Numero de grupo"
            defaultValue={data?.groupNumber ? data?.groupNumber : ''}
            min={1}
          />
        </InputGroup>
      </Stack>
    </>
  );
}

// Boton Generico para crear y editar tecnico
function BtnGeneticTecnico({ txtLabel, handleSubmit, txtSubmit, data = null }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {txtLabel}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Tecnico</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <TecniInput data={data} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="success" type="submit" onClick={handleClose}>
              {txtSubmit}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

// Nuevo Tecnico
async function handleNewTecnicoSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const id = form.id.value;
  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
    available: form.available.value === 'true' ? true : false,
    groupNumber: form.groupNumber.value,
  };
  try {
    console.log(id, data);
    // const api = process.env.API_URL;
    // const res = await fetch(`${api}/tecnicos/technicians`, {
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'POST',
    // });
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
}

function BtnCreateTecnico() {
  return (
    <>
      <BtnGeneticTecnico
        txtLabel={'Agregar Tecnico'}
        handleSubmit={handleNewTecnicoSubmit}
        txtSubmit={'Confirmar'}
      />
    </>
  );
}

// Actualizar Tecnico

async function handleTecnicoSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const id = form.id.value;
  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
    available: form.available.value === 'true' ? true : false,
    groupNumber: form.groupNumber.value,
  };
  try {
    console.log(id, data);
    // const api = process.env.API_URL;
    // const res = await fetch(`${api}/tecnicos/technicians/${id}`, {
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'PUT',
    // });
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
}

function BtnEditTecnico({ text, data }) {
  return (
    <>
      <BtnGeneticTecnico
        txtLabel={text}
        handleSubmit={handleTecnicoSubmit}
        txtSubmit={'Guardar Cambios'}
        data={data}
      />
    </>
  );
}

// Actualizar Tecnico Grupo

async function handlePopoverSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const id = form.id.value;
  const data = {
    groupNumber: form.groupNumber.value,
  };
  try {
    console.log(id, data);
    // const api = process.env.API_URL;
    // const res = await fetch(`${api}/tecnicos/technicians/${id}`, {
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'PUT',
    // });
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
}

const popover = (idTec) => (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Asignar a grupo</Popover.Header>
    <Popover.Body>
      <Form onSubmit={handlePopoverSubmit}>
        <input type="hidden" name="id" value={idTec} />
        <Form.Control
          type="number"
          name="groupNumber"
          placeholder="Numero de grupo"
          className="mb-3"
          required
        />
        <input
          type="submit"
          className="bg-success-subtle rounded border border-1"
          value={'✔'}
        />
      </Form>
    </Popover.Body>
  </Popover>
);

function BtnGroup({ idTec }) {
  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover(idTec)}>
      <kbd className="bg-info" role="button">
        ➕
      </kbd>
    </OverlayTrigger>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  try {
    const api = process.env.API_URL;
    const res = await fetch(`${api}/tecnicos/`);
    const data = await res.json();
    // Pass data to the page via props
    return { props: { data } };
  } catch (error) {
    console.log(error.message);
    return { props: { data: [] } };
  }
}

export default function Page({ data }) {
  const columns = [
    {
      header: 'ID',
      accessorFn: (row) => row.id,
    },
    {
      header: 'Nombre',
      accessorFn: (row) => row.name,
    },
    {
      header: 'Correo',
      accessorFn: (row) => row.email,
    },
    {
      header: 'Telefono',
      accessorFn: (row) => row.phone,
    },
    {
      header: 'Estado',
      accessorFn: (row) => (row.available ? 'Ocupado' : 'Desconocido'),
    },
    {
      header: 'Cuadrilla',
      accessorFn: (row) => row.groupNumber,
      cell: (info) =>
        info.getValue() ? (
          info.getValue()
        ) : (
          <BtnGroup idTec={info.row.original.id} />
        ),
    },
    {
      header: 'Direccion',
      accessorFn: (row) => row.address || 'No',
    },
    {
      header: ' ',
      cell: (info) => <BtnEditTecnico text={'📝'} data={info.row.original} />,
    },
  ];

  return (
    <Container fluid className="text-lg-center">
      <Row>
        <h1>Lista de Tecnicos</h1>
      </Row>
      <Row className="my-2 ms-1">
        <Col md="auto" className="align-self-center">
          <BtnCreateTecnico />
        </Col>
      </Row>
      <TableBase data={data} columns={columns} />
    </Container>
  );
}
