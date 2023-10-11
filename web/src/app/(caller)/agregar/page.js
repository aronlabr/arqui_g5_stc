'use client';

import IncidentForm from '@components/incidentForm';
import { delLS } from '@libs/userAuth';

export default function Page() {
  async function handleSubmit(event) {
    event.preventDefault();
    alert('Incidencia Registrada');
    delLS();
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
