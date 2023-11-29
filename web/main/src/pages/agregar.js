import IncidentForm from '@/components/ui/incidentForm';
import { clearLS } from '@/libs/userAuth';
import { useRouter } from 'next/navigation';
import { Container } from 'react-bootstrap';
// {
//   "id_incidencia": 2,
//   "id_cliente": 2,
//   "id_puntoatencion": 2,
//   "estado": 0,
//   "fecha_ruta": "2023-11-15",
//   "descripcion_prob": "Lorem ipsum ipsum ipsum ipsum ipsum ipsum.",
//   "descripcion_sol": null,
//   "fc_creacion": "2023-11-14"
// }

export default function Page() {
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = {
      id_cliente: form.id_cliente.value,
      puntoatencion: {
        id_cliente: form.id_cliente.value,
        direccion: form.direccion.value,
        lat: form.lat.value,
        lng: form.lng.value,
      },
      estado: form.estado.value,
      fecha_ruta: form.fecha_ruta.value,
      descripcion_prob: form.descripcion_prob.value,
      descripcion_sol: form.descripcion_sol?.value || '',
      fc_creacion: form.fc_creacion.value,
    };
    try {
      console.log(data, pa);
      // const api = process.env.API_URL;

      // const res = await fetch(`${api}/createincident`, {
      //   body: JSON.stringify(data),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   method: 'POST',
      // });
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
    alert('Incidencia Registrada');

    clearLS();
    router.push('/');
  }

  return (
    <Container className="vh-100">
      <IncidentForm
        title={'Registrar Incidencia de Usuario'}
        isVisible={false}
        handleSubmit={handleSubmit}
        btnName={'Registrando inidencia'}
      />
    </Container>
  );
}
