import IncidentForm from '@/components/ui/incidentForm';
import { clearLS } from '@/libs/userAuth';
import { useRouter } from 'next/navigation';
import { Container, Row } from 'react-bootstrap';
// {
//   "id_cliente": 1,
//   "direccion": "Jr. Andahuaylas 114, Lima",
//   "latitud": -12.0600332,
//   "longitud": -77.0265012,
//   "ubigeo": 130101,
//   "fecha_ruta": "2023-11-30",
//   "descripcion_prob": "Lorem ipsum ipsum ipsum ipsum ipsum ipsum.",
//   "descripcion_sol": null
// }

export default function Page() {
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = {
      id_cliente: parseInt(form.id_cliente.value),
      direccion: form.direccion.value,
      latitud: parseFloat(form.lat.value),
      longitud: parseFloat(form.lng.value),
      ubigeo: 130101,
      fecha_ruta: null,
      descripcion_prob: form.descripcion_prob.value,
      descripcion_sol: null,
    };
    try {
      console.log(data);
      const api = process.env.API_URL;
      const res = await fetch(`${api}/incidentes/createincident`, {
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
    alert('Incidencia Registrada Exitosamente');
    clearLS();
    router.push('/');
  }

  return (
    <Container className="vh-100">
      <Container fluid className="h-100 d-flex justify-content-center">
        <Row className="h-100 w-50 justify-content-center align-content-center">
          <IncidentForm
            title={'Registrar Incidencia de Usuario'}
            isVisible={false}
            handleSubmit={handleSubmit}
            btnName={'Registrando inidencia'}
          />
        </Row>
      </Container>
    </Container>
  );
}
