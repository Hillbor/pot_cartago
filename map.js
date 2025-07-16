const map = L.map('map').setView([4.74700, -75.920420], 14);

// Mapa base
const mapaBase = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Crear grupos vacíos para las capas superpuestas
let capaComunas = L.layerGroup();
let capaVias = L.layerGroup();

// Agregarlos al mapa si quieres que estén activas por defecto
capaComunas.addTo(map);
capaVias.addTo(map);

// Control de capas (ya con las capas vacías)
const capasBase = {
  "OpenStreetMap": mapaBase
};

const capasSuperpuestas = {
  "Comunas": capaComunas,
  "Sistema vial": capaVias
};

L.control.layers(capasBase, capasSuperpuestas, {
  collapsed: false,
  position: 'topright'
}).addTo(map);

// Cargar comunas en su grupo
fetch('comunas.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: 'green', weight: 2 },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          `ID: ${feature.properties.id}<br>Área: ${feature.properties.shape_area}`
        );
      }
    });
    capaComunas.addLayer(geojson); // Añadir al grupo
  });

// Cargar vías en su grupo
fetch('vias.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: 'red', weight: 2 },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`Jerarquía: ${feature.properties.jerarquia}`);
      }
    });
    capaVias.addLayer(geojson); // Añadir al grupo
  });
