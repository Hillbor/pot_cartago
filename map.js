const map = L.map('map').setView([4.74700, -75.920420], 14); // Coordenadas de Cartago

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

function cargarCapa(url, color) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      L.geoJSON(data, {
        style: { color: color, weight: 2 },
        onEachFeature: function (feature, layer) {
          if (feature.properties && feature.properties.nombre) {
            layer.bindPopup(feature.properties.nombre);
          }
        }
      }).addTo(map);
    });
}

cargarCapa('geojson_comunas.php', 'green');
//cargarCapa('geojson_manzanas.php', 'blue');
//cargarCapa('geojson_vias.php', 'red');
