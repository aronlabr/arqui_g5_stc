import dayjs from 'dayjs';
import { Button, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import TableBase from '@/components/ui/table';
import { useState } from 'react';
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

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Page() {
  let { data, error, isLoading } = useSWR(
    process.env.API_URL + '/visita/',
    fetcher,
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  if (data)
    data = data.filter((item) => item.incidencia?.id_incidencia !== undefined);
  const columns = [
    {
      header: 'ID',
      accessorFn: (row) => row.incidencia?.id_incidencia,
      cell: ({ getValue }) => (
        <Link href={`incidentes/${getValue()}`}>{getValue()}</Link>
      ),
    },
    {
      header: 'Cliente',
      accessorFn: (row) => row.incidencia?.nombre_full,
    },
    {
      header: 'Punto de Atención',
      accessorFn: (row) => row.incidencia?.direccion,
    },
    {
      header: 'Estado',
      accessorFn: (row) =>
        row.incidencia?.estado ? 'Solucionado' : 'Pendiente',
    },
    {
      header: 'Agenda de Visita',
      accessorFn: (row) => dayjs(row.fecha).format('DD/MM/YY'),
      cell: ({ getValue }) =>
        getValue() !== '' ? (
          <Link href={'/'}>{getValue()}</Link>
        ) : (
          <Button>📆</Button>
        ),
    },
    {
      header: 'Problema',
      accessorFn: (row) => row.incidencia?.descripcion_prob?.slice(0, 20),
    },
    {
      header: 'Solucion',
      accessorFn: (row) => row.incidencia?.descripcion_sol,
      cell: ({ getValue }) => {
        return getValue() ? (
          getValue()?.slice(0, 20) + '...'
        ) : (
          <Button>📝</Button>
        );
      },
    },
  ];
  return (
    <Container fluid className="text-center">
      {console.log(data)}
      <h1>Lista de Incidencias</h1>
      <TableBase data={data} columns={columns} />
    </Container>
  );
}
