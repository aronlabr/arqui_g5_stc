import dayjs from 'dayjs';
import {
  Button,
  Container,
  Form,
  Modal,
  OverlayTrigger,
  Popover,
  Row,
  Stack,
} from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import TableBase from '@/components/ui/table';
import { request, gql } from 'graphql-request';
/*
{
  "id_incidencia": 1,
  "id_cliente": 1,
  "id_puntoatencion": 1,
  "estado": 0,
  "fecha_ruta": "2023-11-02T00:00:00.000Z",
  "descripcion_prob": "Lorem ipsum ipsum ipsum ipsum ipsum ipsum.",
  "descripcion_sol": null,
  "fc_creacion": "2023-11-01T00:00:00.000Z"
}
*/

// export async function getServerSideProps() {
//   // Fetch data from external API
//   try {
//     const api = process.env.API_URL;
//     const res = await fetch(`${api}`);
//     const data = await res.json();
//     // Pass data to the page via props
//     return { props: { data } };
//   } catch (error) {
//     console.log(error.message);
//     return { props: { data: [] } };
//   }
// }

const fetcher = (query) => request(`${process.env.API_URL}/visita/gql/`, query);

/*
{
  "query": "query Query { incidentes { id_incidencia nombre_full dni telefono correo descripcion_sol descripcion_prob direccion latitud longitud visita { id id_cuadrilla fecha estado lat lon imagen motivo atencion { id_atencion cl_dni cl_nombre descripcion img_antes img_desp } } }}"
}
*/

async function handlePopoverSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    incidencia: parseInt(form.idInc.value),
    cuadrilla: parseInt(form.groupNumber.value),
    fecha: dayjs(form.fecha.value).format('YYYY-MM-DD HH:mm:ss'),
  };
  try {
    console.log(data);
    const url = `${process.env.API_URL}/visita/new`;
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

const popover = (idInc) => (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Agendar Visita</Popover.Header>
    <Popover.Body>
      <Form onSubmit={handlePopoverSubmit}>
        <input type="hidden" name="idInc" value={idInc} />
        <Form.Control
          type="number"
          name="groupNumber"
          placeholder="Numero de grupo"
          className="mb-3"
          required
        />
        <Form.Control
          type="datetime-local"
          name="fecha"
          placeholder="Fecha de visita"
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

const BtnNewVisita = ({ idInc }) => {
  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover(idInc)}>
      <kbd className="bg-info" role="button">
        📆
      </kbd>
    </OverlayTrigger>
  );
};

const query = gql`
  query Query {
    incidentes {
      id_incidencia
      nombre_full
      dni
      telefono
      correo
      descripcion_sol
      descripcion_prob
      direccion
      latitud
      longitud
      visita {
        id
        id_cuadrilla
        fecha
        estado
        lat
        lon
        imagen
        motivo
        atencion {
          id_atencion
          cl_dni
          cl_nombre
          descripcion
          img_antes
          img_desp
        }
      }
    }
  }
`;

export default function Page() {
  let { data, error, isLoading } = useSWR(query, fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  let { incidentes } = data;
  incidentes.sort((a, b) => b.id_incidencia - a.id_incidencia);
  const estVistia = {
    nv: 'No Visitado',
    va: 'Visitado y Atendido',
    vna: 'Visitado y No Atendido',
  };

  const columns = [
    {
      header: 'ID',
      accessorFn: (row) => row.id_incidencia,
      cell: ({ getValue }) => (
        <Link href={`incidentes/${getValue()}`}>{getValue()}</Link>
      ),
    },
    {
      header: 'Cliente',
      accessorFn: (row) => row.nombre_full,
    },
    {
      header: 'Punto de Atención',
      accessorFn: (row) => row.direccion,
    },
    {
      header: 'Estado',
      accessorFn: (row) => (row.estado ? 'Solucionado' : 'Pendiente'),
    },
    {
      header: 'Problema',
      accessorFn: (row) => row.descripcion_prob?.slice(0, 20),
    },
    {
      header: 'Agenda de Visita',
      accessorFn: (row) =>
        row.visita?.fecha ? dayjs(row.visita?.fecha).format('DD/MM/YY') : '',
      cell: (info) =>
        info.getValue() !== '' ? (
          info.getValue()
        ) : (
          <BtnNewVisita idInc={info.row.original.id_incidencia} />
        ),
    },

    {
      header: 'Estado de Visita',
      accessorFn: (row) =>
        row.visita?.estado
          ? estVistia[row.visita.estado]
          : 'Pendiente de Visita',
      cell: ({ getValue }) => getValue(),
    },
    {
      header: 'Solucion',
      accessorFn: (row) =>
        row.visita?.atencion?.descripcion
          ? row.visita?.atencion.descripcion
          : 'Por Resolver',
      cell: ({ getValue }) => getValue()?.slice(0, 20) + '...',
    },
  ];
  return (
    <Container fluid className="text-center">
      {console.log(incidentes)}
      <h1>Lista de Incidencias</h1>
      <TableBase data={incidentes} columns={columns} />
    </Container>
  );
}
