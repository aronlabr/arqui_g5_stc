import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const ObjectRenderer = ({ data }) => {
  return (
    <div>
      <h2>Object Data</h2>
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value !== undefined ? value : 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Page() {
  const router = useRouter();
  let { data, error } = useSWR(
    `${process.env.API_URL}/visita/${router.query.id}`,
    fetcher,
  );
  if (error) {
    data = {
      id: 31,
      id_incidencia: '26',
      id_cuadrilla: 1,
      fecha: '2023-11-24T05:00:33.000Z',
      estado: 'vna',
      motivo: 'test2',
      imagen: '',
      lat: 0,
      lon: 0,
      incidencia: {
        id_incidencia: 26,
        id_cliente: 1,
        id_puntoatencion: 26,
        estado: 0,
        fecha_ruta: null,
        descripcion_prob: 'Lorem ipsum ipsum ipsum ipsum ipsum ipsum.',
        descripcion_sol: null,
        fc_creacion: '2023-12-02T00:00:00.000Z',
        nombre_full: 'Armando Paredes',
        dni: '99999999',
        telefono: '900900900',
        direccion: 'Jr. Andahuaylas 114, Lima',
        correo: 'armando@paredes.com',
        foto: null,
        latitud: -12.0600332,
        longitud: -77.0265012,
        ubigeo: 130101,
      },
    };
    return <div>failed to load</div>;
  }
  // render data objects ...

  return (
    <div>
      {console.log(data)}
      <ObjectRenderer data={data} />
    </div>
  );
}
