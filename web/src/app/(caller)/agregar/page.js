'use client';

import IncidentForm from '@components/incidentForm';
import { clearLS } from '@libs/userAuth';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    alert('Incidencia Registrada');
    clearLS();
    router.push('/');
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
