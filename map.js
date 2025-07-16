// map.js - Lógica del mapa y carga de capas

// Inicializar mapa centrado en Cartago
const map = L.map('map').setView([4.742509, -75.928639], 13);

// Capas base
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
});

const blancoYNegro = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
  attribution: '© Stadia Maps, © OpenMapTiles, © OpenStreetMap'
});

const satelite = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenTopoMap'
});

osm.addTo(map); // Añadir fondo base inicial

// Capas dinámicas
const capaComunas = L.layerGroup().addTo(map);
const capaVias = L.layerGroup().addTo(map);

// Mostrar u ocultar contenido de grupos
for (const button of document.querySelectorAll('.grupo-btn')) {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
}

// Mostrar contenido de todos los grupos por defecto
for (const div of document.querySelectorAll('.grupo-contenido')) {
  div.style.display = 'block';
}

// Cargar GeoJSON: comunas
fetch('comunas.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: 'green', weight: 2 },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`ID: ${feature.properties.id}<br>Área: ${feature.properties.shape_area}`);
      }
    });
    capaComunas.addLayer(geojson);
  });

// Cargar GeoJSON: sistema vial
fetch('vias.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: 'red', weight: 2 },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`Jerarquía: ${feature.properties.jerarquia}`);
      }
    });
    capaVias.addLayer(geojson);
  });

// Activar/desactivar capas desde el sidebar
const toggleLayer = (checkboxId, layerGroup) => {
  document.getElementById(checkboxId).addEventListener('change', function () {
    this.checked ? map.addLayer(layerGroup) : map.removeLayer(layerGroup);
  });
};

toggleLayer('chkComunas', capaComunas);
toggleLayer('chkVias', capaVias);

// ----------------------------
// Selector personalizado de mapa base
// ----------------------------

// Eliminar capa base actual y agregar la nueva, manteniendo capas dinámicas
function cambiarMapaBaseManual(layer) {
  map.eachLayer(l => {
    if (l instanceof L.TileLayer && !l._url.includes('geojson')) map.removeLayer(l);
  });
  layer.addTo(map);
  capaComunas.addTo(map);
  capaVias.addTo(map);
}

// Asignar eventos a los radios personalizados de mapa base
const radiosBaseMap = document.querySelectorAll('input[name="basemap"]');
radiosBaseMap.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      switch (radio.value) {
        case 'osm': cambiarMapaBaseManual(osm); break;
        case 'bw': cambiarMapaBaseManual(blancoYNegro); break;
        case 'topo': cambiarMapaBaseManual(satelite); break;
      }
    }
  });
});


// Crear y agregar leyenda dinámica
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
  const div = L.DomUtil.create('div', 'info legend');
  div.style.background = 'white';
  div.style.padding = '10px';
  div.style.border = '1px solid #ccc';
  div.style.fontSize = '12px';
  div.innerHTML = '<strong>Leyenda</strong><br>';
  return div;
};

legend.addTo(map);

// Función para actualizar la leyenda según capas activas
function actualizarLeyenda() {
  const div = document.querySelector('.legend');
  if (!div) return;

  let html = '<strong>Leyenda</strong><br>';

  if (map.hasLayer(capaComunas)) {
    html += `<div style="margin-top:5px;">
               <span style="background:green; display:inline-block; width:12px; height:12px; margin-right:5px;"></span>
               Comunas
             </div>`;
  }

  if (map.hasLayer(capaVias)) {
    html += `<div style="margin-top:5px;">
               <span style="background:red; display:inline-block; width:12px; height:12px; margin-right:5px;"></span>
               Vías
             </div>`;
  }

  div.innerHTML = html;
}

// Llamar a la función al cargar y al activar/desactivar capas
actualizarLeyenda();

document.getElementById('chkComunas').addEventListener('change', actualizarLeyenda);
document.getElementById('chkVias').addEventListener('change', actualizarLeyenda);
