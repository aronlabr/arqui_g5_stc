'use client';

import IncidentForm from '@components/incidentForm';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const details = {
  client: 'a',
  name: 'b',
  desc: 'c',
  tel: 1,
  mail: 'a@a',
  dir: 'a',
  pass2: 'a',
  pass3: 'a',
  isHidden: true,
  tecnId: 12,
  fecha: '12/12/12',
};

export default function Page() {
  const [isEditable, setisEditable] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <Button className="mt-3 " onClick={() => setisEditable(!isEditable)}>
        {!isEditable ? 'Editar' : 'Cancelar'}
      </Button>

      <IncidentForm
        title={'Detalles de Incidencia de Usuario'}
        isVisible={true}
        details={details}
        handleSubmit={handleSubmit}
        btnName={'Guardar Datos'}
        editable={isEditable}
      />
    </>
  );
}
