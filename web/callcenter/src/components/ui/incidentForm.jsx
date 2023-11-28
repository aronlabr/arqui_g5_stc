import { Button, Card, Form, Stack } from 'react-bootstrap';
import { Input } from './formContent';

const details = {
  client: 'a',
  name: 'b',
  descripcion_prob: 'c',
  tel: 1,
  mail: 'a@a',
  dir: 'a',
  pass2: 'a',
  pass3: 'a',
  isHidden: true,
  tecnId: 12,
  fecha: '2012-12-12',
};
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

// Componente de formulario de incidencias

export default function IncidentForm({
  title = null,
  handleSubmit = null,
  details = null,
  isVisible = false,
  btnName,
  editable = true,
}) {
  return (
    <Card className="w-50 py-5 position-absolute top-50 start-50 translate-middle ">
      <Form onSubmit={handleSubmit} className="w-75 mx-auto">
        <fieldset disabled={!editable}>
          <Stack gap={3}>
            {title && <h1 className="text-center">{title}</h1>}
            <Input
              label={'ID Cliente'}
              name={'id_cliente'}
              phold={'Numero de identificacion de cliente'}
              type={'number'}
              value={details?.id_cliente}
            />
            <input type="hidden" name={'id_incidencia'} value={2} />
            <input type="hidden" name={'estado'} value={0} />
            <input type="hidden" name={'fecha_ruta'} value={''} />
            <input type="hidden" name={'descripcion_sol'} value={''} />
            <input type="hidden" name={'fc_creacion'} value={'2023-11-10'} />
            <Input
              label={'Nombre'}
              name={'name'}
              phold={'Nombre del Cliente'}
              type={'text'}
              value={details?.name}
            />
            <Input
              label={'Incidencia'}
              name={'descripcion_prob'}
              phold={'Descripcion general de incidencia'}
              type={'text'}
              value={details?.descripcion_prob}
            />
            <Input
              label={'N° Contacto'}
              name={'tel'}
              phold={'Numero de telefono de contacto'}
              type={'tel'}
              value={details?.tel}
            />
            <Input
              label={'Correo'}
              name={'mail'}
              phold={'Direccion de correo electronico'}
              type={'mail'}
              value={details?.mail}
            />
            <Input
              label={'Direccion'}
              name={'id_puntoatencion'}
              phold={'Direccion de domicilio'}
              type={'text'}
              value={details?.id_puntoatencion}
            />
            {isVisible && (
              <>
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
              </>
            )}
            <Button variant="secondary" type="submit">
              {btnName}
            </Button>
          </Stack>
        </fieldset>
      </Form>
    </Card>
  );
}
