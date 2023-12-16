const servicePointRepository = require('../../infraestructura/repositorios/servicePointRepository');
const axios = require('axios');
const apiKey = 'TU_CLAVE_DE_API_DE_GOOGLE_MAPS';

// Función para geocodificar una dirección
async function geocodeAddress(direccion) {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=${apiKey}`;
  
  try {
    const response = await axios.get(apiUrl);
    if (response.data.status === 'OK') {
      const results = response.data.results[0];
      const latitud = results.geometry.location.lat;
      const longitud = results.geometry.location.lng;
      const direccionGeocodificada = results.formatted_address;

      // Utiliza la función insertServicePoint del módulo servicePointRepository
      await servicePointRepository.insertServicePoint(latitud, longitud, direccionGeocodificada);
    } else {
      console.error('Error en la solicitud de geocodificación:', response.data.status);
    }
  } catch (error) {
    console.error('Error en la solicitud de geocodificación:', error);
  }
}

// Ejemplo de uso
const direccion1 = '1600 Amphitheatre Parkway, Mountain View, CA';
const direccion2 = '123 Main Street, City, Country';

geocodeAddress(direccion1); // Geocodifica la primera dirección
geocodeAddress(direccion2); // Geocodifica la segunda dirección







