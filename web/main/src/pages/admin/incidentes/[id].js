import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import IncidentForm from '@/components/ui/incidentForm';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import FormBase, { Input } from '@/components/ui/formContent';

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
  fecha: '2020-12-12',
};
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Page() {
  const [isEditable, setisEditable] = useState(false);
  const router = useRouter();
  let { data, isLoading, error } = useSWR(
    process.env.API_URL + '/incidentes/' + router.query.id,
    fetcher,
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  async function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <Button className="my-3 ms-5" onClick={() => setisEditable(!isEditable)}>
        {!isEditable ? 'Editar' : 'Cancelar'}
      </Button>
      {console.log(data)}
      <Row>
        <Col className="my-3 ms-5" md={'auto'}>
          <IncidentForm
            title={'Detalles de Incidencia de Usuario'}
            isVisible={true}
            details={data}
            handleSubmit={handleSubmit}
            btnName={'Guardar Datos'}
            editable={isEditable}
          />
        </Col>
        <Col className="my-3 ms-5" md={'auto'}>
          <FormBase>
            <Input
              label={'ID Tecnico'}
              name={'tecnId'}
              phold={'Tecnico asignado'}
              type={'number'}
              value={details?.tecnId}
            />
            <Input
              label={'📆'}
              name={'fecha'}
              phold={'Fecha de Visita'}
              type={'date'}
              value={details?.fecha}
            />
            <Input
              label={'Prioridad'}
              name={'prioridad'}
              phold={'Nivel de Prioridad'}
              type={'text'}
              value={details?.prioridad}
            />
          </FormBase>
        </Col>
      </Row>
    </>
  );
}
