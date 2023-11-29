import { Button, Card, Container, Form, Row, Stack } from 'react-bootstrap';
import { Input } from './formContent';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { useState } from 'react';

const details = {
  client: 'a',
  name: 'b',
  descripcion_prob: 'c',
  tel: 1,
  mail: 'a@a',
  direccion: 'a',
  pass2: 'a',
  pass3: 'a',
  isHidden: true,
  tecnId: 12,
  fecha: '2012-12-12',
};
// {
//   "id_cliente": 2,
//   "id_puntoatencion": 2,
//   "estado": 0,
//   "fecha_ruta": "2023-11-15",
//   "descripcion_prob": "Lorem ipsum ipsum ipsum ipsum ipsum ipsum.",
//   "descripcion_sol": null,
//   "fc_creacion": "2023-11-14"
// }

// Componente de formulario de incidencias

const libraries = ['places'];

function Maps({ children }) {
  const [autocomplete, setAutocomplete] = useState(null);
  const [coordinates, setCoordinates] = useState([0, 0]);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
    language: 'es',
    region: 'PE',
  });
  const onLoad = (autocomplete) => {
    console.log('autocomplete: ', autocomplete);
    setAutocomplete(autocomplete);
  };
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        setCoordinates([location.lat(), location.lng()]);
        console.log('Latitude: ', location.lat());
        console.log('Longitude: ', location.lng());
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return isLoaded ? (
    <>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        {children}
      </Autocomplete>
      <input type="hidden" name="lat" value={coordinates[0]} />
      <input type="hidden" name="lng" value={coordinates[1]} />
    </>
  ) : null;
}

export default function IncidentForm({
  title = null,
  handleSubmit = null,
  details = null,
  isVisible = false,
  btnName,
  editable = true,
}) {
  //position-absolute top-50 start-50 translate-middle
  return (
    <Container fluid>
      <Row className="d-flex h-100 justify-content-center align-content-center">
        <Card className="w-50 py-5">
          <Form onSubmit={handleSubmit} className="w-75 mx-auto">
            <fieldset disabled={!editable}>
              <Stack gap={3}>
                {title && <h1 className="text-center">{title}</h1>}
                <Input
                  label={'🆔'}
                  name={'id_cliente'}
                  phold={'Numero de identificacion de cliente'}
                  type={'number'}
                  value={details?.id_client}
                />
                <input type="hidden" name={'estado'} value={0} />
                <input type="hidden" name={'fecha_ruta'} value={''} />
                <input
                  type="hidden"
                  name={'fc_creacion'}
                  value={'2023-11-10'}
                />
                <Input
                  label={'👤'}
                  name={'name'}
                  phold={'Nombre del Cliente'}
                  type={'text'}
                  value={details?.name}
                />
                <Input
                  label={'📞'}
                  name={'phone'}
                  phold={'Numero de telefono de contacto'}
                  type={'text'}
                  value={details?.phone}
                />
                <Input
                  label={'📧'}
                  name={'mail'}
                  phold={'Direccion de correo electronico'}
                  type={'mail'}
                  value={details?.mail}
                />
                <Maps>
                  <Input
                    label={'🏠'}
                    name={'direccion'}
                    phold={'Direccion de domicilio'}
                    type={'text'}
                    value={details?.direccion}
                  />
                </Maps>
                <Input
                  asInput={'textarea'}
                  label={'🚨'}
                  name={'descripcion_prob'}
                  phold={'Descripcion general de incidencia'}
                  type={'text'}
                  value={details?.descripcion_prob}
                />
                {details?.descripcion_sol && (
                  <Input
                    asInput={'textarea'}
                    label={'🔧'}
                    name={'descripcion_sol'}
                    phold={'Descripcion general de Solucion'}
                    type={'text'}
                    value={details?.descripcion_sol}
                  />
                )}
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
      </Row>
    </Container>
  );
}
