import TableBase from '@/components/ui/table';
import dayjs from 'dayjs';
import { Container } from 'react-bootstrap';
import useSWR from 'swr';

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
    const data = await fetch(`${process.env.API_URL}/notif/all`).then((res) =>
      res.json(),
    );
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
      header: 'Tiempo',
      accessorFn: (row) => dayjs(row.fc_creacion).format('DD/MM/YY hh:mm:ss'),
    },
    {
      header: 'Responsable',
      accessorFn: (row) =>
        row.id_emisor === 0 ? 'Sistema' : `Cuadrilla ${row.id_emisor}`,
    },
    {
      header: 'Evento',
      accessorFn: (row) => row.evento,
    },
    {
      header: 'Mensaje',
      accessorFn: (row) => row.mensaje,
      enableResizing: true,
      size: 10,
    },
  ];

  return (
    <Container fluid className="text-lg-center">
      <h1>Notificaciones</h1>
      <TableBase data={data} columns={columns} />
    </Container>
  );
}
