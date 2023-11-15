import IncidentForm from '@/components/ui/incidentForm';
// import { clearLS } from '@/libs/userAuth';
// import { useRouter } from 'next/router';

export default function Page() {
  // const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
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
