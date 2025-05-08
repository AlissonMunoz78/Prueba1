const apiKey = 'bQ1Do0KAqdSpHVPEISuWYoPQKVVBtf1lUAFPp3Oe'; 

// Definir las fechas de inicio y fin para la consulta
const startDate = '2025-05-01';  // Fecha de inicio
const endDate = '2025-05-07';    // Fecha de fin

// URL de la API para los asteroides (NEOs)
const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Obtener la lista de asteroides desde el objeto de la respuesta
    const asteroids = data.near_earth_objects;

    // Mostrar los asteroides en el HTML
    const container = document.getElementById('asteroidsContainer');
    let asteroidsHtml = '<ul>';  // Crear una lista para mostrar los asteroides

    // Iterar sobre los días (en el rango de fechas)
    for (const date in asteroids) {
      asteroidsHtml += `<li><strong>Fecha: ${date}</strong><ul>`;

      // Iterar sobre los asteroides del día
      asteroids[date].forEach(asteroid => {
        const asteroidName = asteroid.name;
        const asteroidMagnitude = asteroid.absolute_magnitude_h;
        const asteroidSize = asteroid.estimated_diameter.kilometers.estimated_diameter_max;
        const asteroidUrl = asteroid.nasa_jpl_url;

        // Agregar la información de cada asteroide
        asteroidsHtml += `
          <li>
            <strong>${asteroidName}</strong><br>
            Magnitud: ${asteroidMagnitude}<br>
            Tamaño estimado: ${asteroidSize} km<br>
            <a href="${asteroidUrl}" target="_blank">Más información</a>
          </li>
        `;
      });

      asteroidsHtml += '</ul></li>';
    }

    asteroidsHtml += '</ul>';

    // Insertar la lista de asteroides en el contenedor HTML
    container.innerHTML = asteroidsHtml;
  })
  .catch(error => {
    console.error('Error al obtener la lista de asteroides:', error);
  });
