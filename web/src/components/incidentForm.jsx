import { Button, Card, Form, Stack } from 'react-bootstrap';
import { Input } from './formContent';

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

export default function IncidentForm({
  title,
  handleSubmit,
  details = undefined,
  isVisible = false,
  btnName,
  editable = true,
}) {
  return (
    <Card className="w-50 py-5 position-absolute top-50 start-50 translate-middle">
      <Form onSubmit={handleSubmit} className="w-75 mx-auto">
        <fieldset disabled={!editable}>
          <Stack gap={3}>
            <h1 className="text-center">{title}</h1>
            <Input
              label={'ID Cliente'}
              name={'client'}
              phold={'Numero de identificacion de cliente'}
              type={'text'}
              value={details?.client}
            />
            <Input
              label={'Nombre'}
              name={'name'}
              phold={'Nombre del Cliente'}
              type={'text'}
              value={details?.name}
            />
            <Input
              label={'Incidencia'}
              name={'desc'}
              phold={'Descripcion general de incidencia'}
              type={'text'}
              value={details?.desc}
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
              name={'dir'}
              phold={'Direccion de domicilio'}
              type={'text'}
              value={details?.dir}
            />
            <Input
              label={'🔐'}
              name={'pass2'}
              phold={'Ingrese contraseña'}
              type={'password'}
              value={details?.pas2}
            />
            <Input
              label={'🔐'}
              name={'pass3'}
              phold={'Ingrese contraseña'}
              type={'password'}
              value={details?.pass3}
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
