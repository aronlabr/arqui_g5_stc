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

const fetcher = (query) => request(`${process.env.API_URL}/visita/gql`, query);

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
  let incidentes = [];
  if (error) {
    incidentes = [
      {
        id_incidencia: '1',
        nombre_full: 'Armando Paredes',
        dni: '99999999',
        telefono: '900900900',
        correo: 'armando@paredes.com',
        descripcion_sol: null,
        descripcion_prob: 'Lorem ipsum ipsum ipsum ipsum ipsum ipsum.',
        direccion: 'Av. la Marina 2382, San Miguel',
        latitud: -12.077491373558171,
        longitud: -77.08750756204068,
        visita: {
          id: 1,
          id_cuadrilla: 1,
          fecha: '2023-11-11T14:21:21.000Z',
          estado: 'va',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: {
            id_atencion: 1,
            cl_dni: null,
            cl_nombre: null,
            descripcion: null,
            img_antes: null,
            img_desp: null,
          },
        },
      },
      {
        id_incidencia: '2',
        nombre_full: 'Latrena MacMychem',
        dni: '829194184',
        telefono: '623866543',
        correo: 'lmacmychem9@deliciousdays.com',
        descripcion_sol: null,
        descripcion_prob: 'No hay seÃ±al de telÃ©fono',
        direccion: '4 Hermina Drive',
        latitud: 50.0105928,
        longitud: 12.624753,
        visita: {
          id: 2,
          id_cuadrilla: 1,
          fecha: '2023-11-16T02:42:11.000Z',
          estado: 'vna',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: null,
        },
      },
      {
        id_incidencia: '3',
        nombre_full: 'Haze Turtle',
        dni: '803653089',
        telefono: '936928725',
        correo: 'hturtle5@newsvine.com',
        descripcion_sol: null,
        descripcion_prob: 'No se pueden recibir llamadas',
        direccion: '6 Summit Parkway',
        latitud: 28.040993,
        longitud: 120.658812,
        visita: {
          id: 3,
          id_cuadrilla: 1,
          fecha: '2023-11-15T05:10:57.000Z',
          estado: 'va',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: {
            id_atencion: 6,
            cl_dni: null,
            cl_nombre: null,
            descripcion: null,
            img_antes: null,
            img_desp: null,
          },
        },
      },
      {
        id_incidencia: '4',
        nombre_full: 'Armando Paredes',
        dni: '99999999',
        telefono: '900900900',
        correo: 'armando@paredes.com',
        descripcion_sol: null,
        descripcion_prob: 'El telÃ©fono no carga',
        direccion: '7081 Talisman Plaza',
        latitud: 36.865827,
        longitud: 116.231416,
        visita: {
          id: 4,
          id_cuadrilla: 1,
          fecha: '2023-11-15T00:00:33.000Z',
          estado: 'nv',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: null,
        },
      },
      {
        id_incidencia: '5',
        nombre_full: 'Roddy Holtom',
        dni: '921594486',
        telefono: '679015173',
        correo: 'rholtom4@telegraph.co.uk',
        descripcion_sol: null,
        descripcion_prob: 'El servicio de cable se interrumpe',
        direccion: '75603 Green Ridge Plaza',
        latitud: 43.617445,
        longitud: 124.139465,
        visita: {
          id: 5,
          id_cuadrilla: 1,
          fecha: '2023-11-10T08:59:41.000Z',
          estado: 'va',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: {
            id_atencion: 5,
            cl_dni: null,
            cl_nombre: null,
            descripcion: null,
            img_antes: null,
            img_desp: null,
          },
        },
      },
      {
        id_incidencia: '6',
        nombre_full: 'Armando Paredes',
        dni: '99999999',
        telefono: '900900900',
        correo: 'armando@paredes.com',
        descripcion_sol: null,
        descripcion_prob: 'El telÃ©fono no carga',
        direccion: '84 Scofield Terrace',
        latitud: 16.8564272,
        longitud: 120.7963702,
        visita: {
          id: 6,
          id_cuadrilla: 2,
          fecha: '2023-11-10T15:03:50.000Z',
          estado: 'nv',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: null,
        },
      },
      {
        id_incidencia: '7',
        nombre_full: 'Karyn Peachman',
        dni: '818086004',
        telefono: '739776901',
        correo: 'kpeachman7@arizona.edu',
        descripcion_sol: null,
        descripcion_prob: 'No hay seÃ±al de telÃ©fono',
        direccion: '048 Vidon Center',
        latitud: -8.639266,
        longitud: 122.281829,
        visita: {
          id: 7,
          id_cuadrilla: 2,
          fecha: '2023-11-18T00:48:23.000Z',
          estado: 'nv',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: null,
        },
      },
      {
        id_incidencia: '8',
        nombre_full: 'Mollee Glennie',
        dni: '887337233',
        telefono: '574183858',
        correo: 'mglennie1@uiuc.edu',
        descripcion_sol: null,
        descripcion_prob: 'El control remoto del cable no funciona',
        direccion: '808 Larry Parkway',
        latitud: -9.38948,
        longitud: 119.75371,
        visita: {
          id: 8,
          id_cuadrilla: 2,
          fecha: '2023-11-02T14:06:37.000Z',
          estado: 'vna',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: null,
        },
      },
      {
        id_incidencia: '9',
        nombre_full: 'Guthrie Windridge',
        dni: '942675296',
        telefono: '762303967',
        correo: 'gwindridge3@so-net.ne.jp',
        descripcion_sol: null,
        descripcion_prob: 'No se pueden recibir llamadas',
        direccion: '8594 Eagan Lane',
        latitud: 19.5959923,
        longitud: -99.2820233,
        visita: {
          id: 9,
          id_cuadrilla: 2,
          fecha: '2023-11-03T10:38:27.000Z',
          estado: 'vna',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: null,
        },
      },
      {
        id_incidencia: '10',
        nombre_full: 'Karyn Peachman',
        dni: '818086004',
        telefono: '739776901',
        correo: 'kpeachman7@arizona.edu',
        descripcion_sol: null,
        descripcion_prob: 'El telÃ©fono no carga',
        direccion: '833 Shasta Junction',
        latitud: 51.2034445,
        longitud: 18.9005028,
        visita: {
          id: 10,
          id_cuadrilla: 2,
          fecha: '2023-11-03T05:10:18.000Z',
          estado: 'vna',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: null,
        },
      },
      {
        id_incidencia: '11',
        nombre_full: 'Verina Pedler',
        dni: '937138791',
        telefono: '518601431',
        correo: 'vpedler2@csmonitor.com',
        descripcion_sol: null,
        descripcion_prob: 'No se pueden recibir llamadas',
        direccion: '908 Eagle Crest Crossing',
        latitud: 30.89441,
        longitud: 120.086809,
        visita: {
          id: 11,
          id_cuadrilla: 3,
          fecha: '2023-10-28T20:49:41.000Z',
          estado: 'nv',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: null,
        },
      },
      {
        id_incidencia: '12',
        nombre_full: 'Latrena MacMychem',
        dni: '829194184',
        telefono: '623866543',
        correo: 'lmacmychem9@deliciousdays.com',
        descripcion_sol: null,
        descripcion_prob: 'Problemas con la conexiÃ³n a internet',
        direccion: '40682 Meadow Valley Center',
        latitud: 40.5974058,
        longitud: 19.8082799,
        visita: {
          id: 12,
          id_cuadrilla: 3,
          fecha: '2023-10-22T11:54:06.000Z',
          estado: 'nv',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: null,
        },
      },
      {
        id_incidencia: '13',
        nombre_full: 'Haze Turtle',
        dni: '803653089',
        telefono: '936928725',
        correo: 'hturtle5@newsvine.com',
        descripcion_sol: null,
        descripcion_prob: 'La velocidad de internet es muy lenta',
        direccion: '02 Hovde Center',
        latitud: 8.1642301,
        longitud: 99.6756794,
        visita: {
          id: 13,
          id_cuadrilla: 3,
          fecha: '2023-11-16T20:28:04.000Z',
          estado: 'va',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: {
            id_atencion: 13,
            cl_dni: null,
            cl_nombre: null,
            descripcion: null,
            img_antes: null,
            img_desp: null,
          },
        },
      },
      {
        id_incidencia: '14',
        nombre_full: 'Armando Paredes',
        dni: '99999999',
        telefono: '900900900',
        correo: 'armando@paredes.com',
        descripcion_sol: null,
        descripcion_prob: 'No hay seÃ±al de telÃ©fono',
        direccion: '7 Ruskin Avenue',
        latitud: 14.1586723,
        longitud: 121.2408815,
        visita: {
          id: 14,
          id_cuadrilla: 3,
          fecha: '2023-10-26T12:58:53.000Z',
          estado: 'nv',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: null,
        },
      },
      {
        id_incidencia: '15',
        nombre_full: 'Roddy Holtom',
        dni: '921594486',
        telefono: '679015173',
        correo: 'rholtom4@telegraph.co.uk',
        descripcion_sol: null,
        descripcion_prob: 'Problemas con la conexiÃ³n a internet',
        direccion: '5 Stuart Hill',
        latitud: 28.706919,
        longitud: 117.821005,
        visita: {
          id: 15,
          id_cuadrilla: 3,
          fecha: '2023-11-11T17:26:51.000Z',
          estado: 'vna',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: null,
        },
      },
      {
        id_incidencia: '16',
        nombre_full: 'Haze Turtle',
        dni: '803653089',
        telefono: '936928725',
        correo: 'hturtle5@newsvine.com',
        descripcion_sol: null,
        descripcion_prob: 'No hay seÃ±al de telÃ©fono',
        direccion: '066 Schlimgen Place',
        latitud: -7.0890281,
        longitud: 108.8610899,
        visita: {
          id: 16,
          id_cuadrilla: 4,
          fecha: '2023-11-05T06:33:40.000Z',
          estado: '',
          lat: null,
          lon: null,
          imagen: null,
          motivo: null,
          atencion: null,
        },
      },
      {
        id_incidencia: '17',
        nombre_full: 'Oralie Santry',
        dni: '814212940',
        telefono: '817488091',
        correo: 'osantry6@mozilla.org',
        descripcion_sol: '',
        descripcion_prob: 'Problemas con la conexiÃ³n a internet',
        direccion: '751 Carpenter Trail',
        latitud: 10.3385626,
        longitud: 122.9316044,
        visita: null,
      },
      {
        id_incidencia: '18',
        nombre_full: 'Mollee Glennie',
        dni: '887337233',
        telefono: '574183858',
        correo: 'mglennie1@uiuc.edu',
        descripcion_sol: '',
        descripcion_prob: 'No se pueden ver ciertos canales en el cable',
        direccion: '68967 Kensington Crossing',
        latitud: -4.083144,
        longitud: 137.179103,
        visita: null,
      },
      {
        id_incidencia: '19',
        nombre_full: 'Guthrie Windridge',
        dni: '942675296',
        telefono: '762303967',
        correo: 'gwindridge3@so-net.ne.jp',
        descripcion_sol: '',
        descripcion_prob: 'Problemas con la conexiÃ³n a internet',
        direccion: '88313 Truax Center',
        latitud: 23.9211737,
        longitud: -106.8915948,
        visita: null,
      },
      {
        id_incidencia: '20',
        nombre_full: 'Guthrie Windridge',
        dni: '942675296',
        telefono: '762303967',
        correo: 'gwindridge3@so-net.ne.jp',
        descripcion_sol: '',
        descripcion_prob: 'El cable se corta constantemente',
        direccion: '5 Shelley Plaza',
        latitud: 32.2009532,
        longitud: 119.4314373,
        visita: null,
      },
      {
        id_incidencia: '21',
        nombre_full: 'Verina Pedler',
        dni: '937138791',
        telefono: '518601431',
        correo: 'vpedler2@csmonitor.com',
        descripcion_sol: '',
        descripcion_prob: 'El control remoto del cable no funciona',
        direccion: 'Av. la Marina 2382, San Miguel',
        latitud: -12.077491373558171,
        longitud: -77.08750756204068,
        visita: null,
      },
    ];

    return <div>failed to load</div>;
  }
  if (isLoading) return <div>loading...</div>;
  incidentes = data.incidentes;
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
      accessorFn: (row) =>
        row?.visita?.estado === 'va' ? 'Solucionado' : 'Pendiente',
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
