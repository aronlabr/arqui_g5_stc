const axios = require('axios');
const apiKey = 'TU_CLAVE_DE_API_DE_GOOGLE_MAPS';

// Dirección que deseas geocodificar
const direccion = '1600 Amphitheatre Parkway, Mountain View, CA';

// URL de la API de Google Maps para la geocodificación
const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=${apiKey}`;

axios.get(apiUrl)
  .then((response) => {
    if (response.data.status === 'OK') {
      const results = response.data.results[0];
      const latitud = results.geometry.location.lat;
      const longitud = results.geometry.location.lng;
      const direccionGeocodificada = results.formatted_address;
      // Guarda estos datos en tu tabla PuntoAtencion
    } else {
      console.error('Error en la solicitud de geocodificación:', response.data.status);
    }
  })
  .catch((error) => {
    console.error('Error en la solicitud de geocodificación:', error);
  });
