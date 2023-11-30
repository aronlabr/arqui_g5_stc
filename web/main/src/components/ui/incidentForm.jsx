import {
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  Row,
  Stack,
} from 'react-bootstrap';
import FormBase, { Input } from './formContent';
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

function Client({ details, editable }) {
  const [verifiedTxt, setVerifiedTxt] = useState('');
  const [client, setClient] = useState(null);
  const [id, setId] = useState(null);
  const verifiedClient = async () => {
    try {
      // const defaultClient = {
      //   id_cliente: 2,
      //   nombre_full: 'Antonio Zegarra',
      //   telefono: '999999999',
      //   correo: 'a@a',
      // };
      if (id) {
        const clientData = await fetch(
          process.env.API_URL + '/incidentes/client/' + id,
        ).then((res) => res.json());
        if (clientData?.id_cliente) {
          setClient(clientData);
          setVerifiedTxt('✅');
        } else {
          setVerifiedTxt('❌');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <InputGroup>
        <InputGroup.Text id={'id_cliente'}>🆔</InputGroup.Text>
        <Form.Control
          type={'number'}
          placeholder={'Numero de identificacion de cliente'}
          name={'id_cliente'}
          defaultValue={details?.id_cliente}
          onChange={(e) => setId(e.target.value)}
          required
        />
        {editable && (
          <Button type="button" onClick={() => verifiedClient()}>
            Verificar
          </Button>
        )}
        <span className="align-self-center">{verifiedTxt}</span>
      </InputGroup>

      <Input
        label={'👤'}
        name={'name'}
        phold={'Nombre del Cliente'}
        type={'text'}
        value={details?.nombre_full || client?.nombre_full}
      />
      <Input
        label={'📞'}
        name={'phone'}
        phold={'Numero de telefono de contacto'}
        type={'text'}
        value={details?.telefono || client?.telefono}
      />
      <Input
        label={'📧'}
        name={'mail'}
        phold={'Direccion de correo electronico'}
        type={'mail'}
        value={details?.correo || client?.correo}
      />
    </>
  );
}

export default function IncidentForm({
  title = null,
  handleSubmit = null,
  details = null,
  isVisible = false,
  btnName,
  editable = true,
}) {
  return (
    <FormBase handleSubmit={handleSubmit} editable={editable} btnText={btnName}>
      {title && <h1 className="text-center">{title}</h1>}
      <Client details={details} editable={editable} />
      <input type="hidden" name={'fecha_ruta'} value={''} />
      <input type="hidden" name={'fc_creacion'} value={'2023-11-10'} />

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
    </FormBase>
  );
}
