import dayjs from 'dayjs';
import { Button, Container, Row } from 'react-bootstrap';
// import data1 from './MOCK_DATA.json';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
const TableBase = dynamic(() => import('tables/tabledata'), { ssr: false });
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
  const { data, error, isLoading } = useSWR(
    process.env.API_URL + '/incidentes/',
    fetcher,
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const columns = [
    {
      header: 'ID',
      accessorFn: (row) => row.id_incidencia,
      cell: ({ getValue }) => <Link href={`${getValue()}`}>{getValue()}</Link>,
    },
    {
      header: 'Cliente',
      accessorFn: (row) => row.id_cliente,
    },
    {
      header: 'Punto de Atención',
      accessorFn: (row) => row.id_puntoatencion,
    },
    {
      header: 'Estado',
      accessorFn: (row) => row.estado,
    },
    {
      header: 'Agenda de Visita',
      accessorFn: (row) => dayjs(row.fecha_ruta).format('DD/MM/YY'),
      cell: ({ getValue }) =>
        getValue() !== '' ? getValue() : <Button>📆</Button>,
    },
    {
      header: 'Problema',
      accessorFn: (row) => row.descripcion_prob,
    },
    {
      header: 'Solucion',
      accessorFn: (row) => row.descripcion_sol,
    },
  ];
  return (
    <Container fluid className="text-center">
      <h1>Lista de Incidencias</h1>
      <Row></Row>
      <TableBase data={data} columns={columns} />
    </Container>
  );
}
