const map = L.map('map').setView([4.74700, -75.920420], 14);

// Mapas base
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
});

const blancoYNegro = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap (Blanco y negro)'
});

const satelite = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenTopoMap'
});

// Fondo inicial
osm.addTo(map);

// Grupos de capas
const capaComunas = L.layerGroup().addTo(map);
const capaVias = L.layerGroup().addTo(map);

// Control de fondo de mapa
const capasBase = {
  "OpenStreetMap": osm,
  "Blanco y negro": blancoYNegro,
  "Topográfico": satelite
};

L.control.layers(capasBase, {}, { position: 'bottomright' }).addTo(map);

// Cargar capas dinámicas
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
    capaComunas.addLayer(geojson);
  });

fetch('vias.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: 'red', weight: 2 },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(`Jerarquía: ${feature.properties.jerarquia}`);
      }
    });
    capaVias.addLayer(geojson);
  });

// Conectar checkbox del sidebar con las capas
document.getElementById('chkComunas').addEventListener('change', function () {
  if (this.checked) {
    map.addLayer(capaComunas);
  } else {
    map.removeLayer(capaComunas);
  }
});

document.getElementById('chkVias').addEventListener('change', function () {
  if (this.checked) {
    map.addLayer(capaVias);
  } else {
    map.removeLayer(capaVias);
  }
});
