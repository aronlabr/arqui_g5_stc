import IncidentForm from '@/components/ui/incidentForm';
// import { clearLS } from '@/libs/userAuth';
// import { useRouter } from 'next/router';
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
  // const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = {
      id_cliente: form.id_cliente.value,
      id_puntoatencion: form.id_puntoatencion.value,
      estado: form.estado.value,
      fecha_ruta: form.fecha_ruta.value,
      descripcion_prob: form.descripcion_prob.value,
      descripcion_sol: form.descripcion_sol.value,
      fc_creacion: form.fc_creacion.value,
    };
    try {
      const api =
        process.env.API_URL ||
        'http://stc-g5-api.sa-east-1.elasticbeanstalk.com/api/incidentes';

      const res = await fetch(`${api}/createincident`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    alert('Incidencia Registrada');

    // clearLS();
    // router.push('/login');
  }

  return (
    <IncidentForm
      title={'Registrar Incidencia de Usuario'}
      isVisible={false}
      handleSubmit={handleSubmit}
      btnName={'Registrando inidencia'}
    />
  );
}
