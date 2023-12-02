import { Input } from '@/components/ui/formContent';
import TableBase from '@/components/ui/table';
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
import useSWR, { mutate } from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());
// Crear Tecnico
/** 
{
  "user": "aldairam2", 
  "pass": "1234563", 
  "name": "Aldair Asencio Medinawd",
  "dni": "71732723",
  "phone": "916829111", 
  "address": "Pasaje Ayar Manco 123", 
  "email": "aldweq@gmail.com"
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
  return (
    <>
      <Stack gap={1}>
        <Form.Control type="hidden" name="id" defaultValue={data?.id} />
        <Input
          name={'name'}
          label={'👤'}
          type={'text'}
          value={data?.name}
          phold={'Nombre completo'}
        />
        <Input
          name={'email'}
          label={'📧'}
          type={'email'}
          value={data?.email}
          phold={'Correo electrónico'}
        />
        <Input
          name={'dni'}
          label={'🪪'}
          type={'text'}
          value={data?.dni}
          phold={'Documento Nacional de Identidad'}
        />
        <Input
          name={'phone'}
          label={'📞'}
          type={'text'}
          value={data?.phone}
          phold={'Numero de Telefono'}
        />
        <Input
          name={'address'}
          label={'🏠'}
          type={'text'}
          value={data?.address}
          phold={'Direccion'}
        />
      </Stack>
    </>
  );
}

// Boton Generico para crear y editar tecnico
function BtnGeneticTecnico({
  children,
  txtLabel,
  handleSubmit,
  txtSubmit,
  data = null,
}) {
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
            <Stack className="mt-1" gap={1}>
              {children}
            </Stack>
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

// lambda mail
/**
 * {
    "email": "pexos77697@cumzle.com",
    "tipo": "tecnico",
    "data": {
      "asunto": "Gracias por contactarnos desde lamda",
      "user": "user_1",
      "pass": "pass_1"
    }
  }
 */

// Nuevo Tecnico
async function handleNewTecnicoSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    user: form.user.value,
    pass: form.pass.value,
    name: form.name.value,
    email: form.email.value,
    dni: form.dni.value,
    phone: form.phone.value,
    address: form.address.value,
  };
  try {
    const mail = {
      email: data.email,
      tipo: 'tecnico',
      data: {
        asunto: 'Gracias por contactarnos desde lamda',
        user: data.user,
        pass: data.pass,
      },
    };
    const resMail = await fetch('/api/sendEmail', {
      method: 'POST',
      body: JSON.stringify(mail),
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });

    if (resMail.ok) {
      const result = await resMail.json();
      console.log(result);
    } else {
      console.error('Failed to send email');
    }

    console.log(data);
    const api = process.env.API_URL;
    const res = await fetch(`${api}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    console.log(res, resMail);
    await mutate(`${api}/tecnicos/`);
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
      >
        <InputGroup>
          <InputGroup.Text id="user">🪪</InputGroup.Text>
          <Form.Control
            type="text"
            name="user"
            placeholder="Usuario"
            required
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text id="pass">🔑</InputGroup.Text>
          <Form.Control
            type="password"
            name="pass"
            placeholder="Contraseña"
            required
          />
        </InputGroup>
      </BtnGeneticTecnico>
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
    available: form.available.value === 'true' ? 1 : 0,
    groupNumber: parseInt(form.groupNumber.value),
  };
  try {
    console.log(id, data);
    // const api = process.env.API_URL;
    // const res = await fetch(`${api}/tecnicos/${id}`, {
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
  const [available, setAvailable] = useState(data?.available);
  return (
    <>
      <BtnGeneticTecnico
        txtLabel={text}
        handleSubmit={handleTecnicoSubmit}
        txtSubmit={'Guardar Cambios'}
        data={data}
      >
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
      </BtnGeneticTecnico>
    </>
  );
}

// Actualizar Tecnico Grupo

async function handlePopoverSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const id = form.id.value;
  const data = {
    groupNumber: parseInt(form.groupNumber.value),
  };
  try {
    console.log(id, data);
    const api = process.env.API_URL;
    const res = await fetch(`${api}/tecnicos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    await mutate(`${api}/tecnicos/`);
    console.log(res);
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

export default function Page() {
  let { data, isLoading, error } = useSWR(
    `${process.env.API_URL}/tecnicos/`,
    fetcher,
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data);
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
