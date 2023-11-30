import TableBase from '@/components/ui/table';
import dayjs from 'dayjs';
import { Button, Container } from 'react-bootstrap';

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

export async function getServerSideProps() {
  // Fetch data from external API
  try {
    const api = process.env.API_URL;
    const res = await fetch(`${api}/visita/`);
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
      accessorFn: (row) => (row.estado !== '' ? row.estado : 'Pendiente'),
    },
    {
      header: 'Registro de Atención',
      accessorFn: (row) => row.id_atencion || 'No',
    },
  ];

  return (
    <Container fluid className="text-lg-center">
      <h1>Notificaciones</h1>
      <TableBase data={data} columns={columns} />
    </Container>
  );
}
