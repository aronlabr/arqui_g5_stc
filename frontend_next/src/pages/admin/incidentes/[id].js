import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import IncidentForm from '@/components/ui/incidentForm';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import FormBase, { Input } from '@/components/ui/formContent';
import { request, gql } from 'graphql-request';

const fetcher = (query) => request(`${process.env.API_URL}/visita/gql`, query);

const query = gql`
  query Query {
    incidentes {
      id_incidencia
      nombre_full
      dni
      telefono
      correo
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
  const router = useRouter();
  let { data, isLoading, error } = useSWR(query, fetcher);

  const [isEditable, setisEditable] = useState(false);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  let { incidentes } = data;
  const incidente = incidentes.filter(
    (inc) => inc.id_incidencia === router.query.id,
  )[0];
  const visita = incidente?.visita;
  const atencion = visita?.atencion;
  async function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <>
      <Button className="my-3 ms-5" onClick={() => setisEditable(!isEditable)}>
        {!isEditable ? 'Editar' : 'Cancelar'}
      </Button>
      {console.log(incidente)}
      <Row>
        <Col className="my-3 ms-5" md={'auto'}>
          <IncidentForm
            title={'Detalles de Incidencia de Usuario'}
            isVisible={true}
            details={incidente}
            handleSubmit={handleSubmit}
            btnName={'Guardar Datos'}
            editable={isEditable}
          />
        </Col>
        {visita && (
          <Col className="my-3 ms-5" md={'auto'}>
            <FormBase>
              <Input
                label={'Cuadrilla'}
                name={'tecnId'}
                phold={'Cuadrlla asignado'}
                type={'number'}
                value={visita?.id_cuadrilla}
              />
              <Input
                label={'📆'}
                name={'fecha'}
                phold={'Fecha de Visita'}
                type={'date'}
                value={visita?.fecha}
              />
              <Input
                label={'Estado de Visita'}
                name={'estvisita'}
                phold={'Nivel de Prioridad'}
                type={'text'}
                value={visita?.estado}
              />
              <Input
                label={'Motivo de Atencion'}
                name={'motivo'}
                phold={'Nivel de Prioridad'}
                type={'text'}
                value={visita?.motivo}
              />
              <Input
                label={'Latitud'}
                name={'prioridad'}
                phold={'Latitud'}
                type={'text'}
                value={visita?.lat}
              />
              <Input
                label={'Prioridad'}
                name={'prioridad'}
                phold={'Nivel de Prioridad'}
                type={'text'}
                value={visita?.lon}
              />
              {atencion && (
                <>
                  <Input
                    label={'DNI de atendido'}
                    name={'atencion'}
                    phold={'Atencion'}
                    type={'text'}
                    value={atencion?.cl_dni}
                  />
                  <Input
                    label={'Atencion'}
                    name={'atencion'}
                    phold={'Atencion'}
                    type={'text'}
                    value={atencion?.cl_nombre}
                  />
                  <Input
                    label={'Atencion'}
                    name={'atencion'}
                    phold={'Atencion'}
                    type={'text'}
                    value={atencion?.descripcion}
                  />
                </>
              )}
            </FormBase>
          </Col>
        )}
      </Row>
    </>
  );
}
