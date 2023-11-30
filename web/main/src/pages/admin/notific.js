import TableBase from '@/components/ui/table';
import dayjs from 'dayjs';
import { Button, Container } from 'react-bootstrap';
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
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Page() {
  let { data, isLoading, error } = useSWR(
    `${process.env.API_URL}/notif/all`,
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  if (data) data = data.filter((row) => row.id_emisor !== 0);
  const columns = [
    {
      header: 'Tiempo',
      accessorFn: (row) => dayjs(row.fc_creacion).format('DD/MM/YY hh:mm:ss'),
    },
    {
      header: 'Cuadrilla',
      accessorFn: (row) => (row.id_emisor === 0 ? 'Sistema' : row.id_emisor),
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
