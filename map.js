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

// Capas nuevas
const capaBarrios = L.layerGroup().addTo(map);
const capaPerimetro = L.layerGroup().addTo(map);
const capaAsentamientos = L.layerGroup().addTo(map);
const capaExpansion = L.layerGroup().addTo(map);
const capaEspacioPublico = L.layerGroup().addTo(map);
const capaEquipamientoColectivo = L.layerGroup().addTo(map);
const capaEquipamientoServicios = L.layerGroup().addTo(map);
const capaRecintos = L.layerGroup().addTo(map);
const capaAreasActividad = L.layerGroup().addTo(map);
const capaReservas = L.layerGroup().addTo(map);
const capaTratamientos = L.layerGroup().addTo(map);


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

//GEOJSON

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

// Cargar GeoJSON: barrios
fetch('barrios.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: '#9b59b6', weight: 1.5 },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`ID: ${feature.properties.id}<br>Área: ${feature.properties.shape_area}<br>Nombre: ${feature.properties.nombre}`);
      }
    });
    capaBarrios.addLayer(geojson);
  });

// Cargar GeoJSON: perimetro_urbano
fetch('perimetro.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: '#f39c12', weight: 2 },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`Nombre: ${feature.properties.nombre}`);
      }
    });
    capaPerimetro.addLayer(geojson);
  });

// Cargar GeoJSON: sistema_asentamientos
fetch('asentamientos.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: '#e67e22', weight: 1.5 },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`ID: ${feature.properties.id}<br>Área: ${feature.properties.shape_area}<br>Tipo: ${feature.properties.tipo}`);
      }
    });
    capaAsentamientos.addLayer(geojson);
  });

// Cargar GeoJSON: suelo_expansion
fetch('expansion.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: '#d35400', weight: 1.5 },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`ID: ${feature.properties.id}<br>Área: ${feature.properties.shape_area}`);
      }
    });
    capaExpansion.addLayer(geojson);
  });

// Cargar GeoJSON: inventario_espacio_publico
fetch('espacio_publico.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: '#27ae60', weight: 1.5 },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`ID: ${feature.properties.id}<br>Área: ${feature.properties.shape_area}<br>Tipo: ${feature.properties.tipo}`);
      }
    });
    capaEspacioPublico.addLayer(geojson);
  });

// Cargar GeoJSON: inventario_equipamientos_colectivos
fetch('equipamientos_colectivos.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: '#16a085', weight: 1.5 },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`ID: ${feature.properties.id}<br>Área: ${feature.properties.shape_area}<br>Tipo: ${feature.properties.tipo}`);
      }
    });
    capaEquipamientoColectivo.addLayer(geojson);
  });

// Cargar GeoJSON: inventario_equipamientos_servicios_basicos
fetch('equipamientos_servicios.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: '#1abc9c', weight: 1.5 },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`ID: ${feature.properties.id}<br>Área: ${feature.properties.shape_area}<br>Tipo: ${feature.properties.tipo}`);
      }
    });
    capaEquipamientoServicios.addLayer(geojson);
  });

// Cargar GeoJSON: recintos_urbanos
fetch('recintos.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: '#34495e', weight: 1.5 },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`ID: ${feature.properties.id}<br>Área: ${feature.properties.shape_area}<br>Descripción: ${feature.properties.descripcio}`);
      }
    });
    capaRecintos.addLayer(geojson);
  });

// Cargar GeoJSON: areas_actividad
fetch('areas_actividad.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: '#c0392b', weight: 1.5 },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`ID: ${feature.properties.id}<br>Área: ${feature.properties.shape_area}<br>Actividad: ${feature.properties.actividad}`);
      }
    });
    capaAreasActividad.addLayer(geojson);
  });

// Cargar GeoJSON: reservas_forestales
fetch('reservas.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: '#2ecc71', weight: 1.5 },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`ID: ${feature.properties.id}<br>Área: ${feature.properties.shape_area}<br>Nombre: ${feature.properties.nombre}`);
      }
    });
    capaReservas.addLayer(geojson);
  });

// Cargar GeoJSON: tratamientos_urbanisticos
fetch('tratamientos.php')
  .then(res => res.json())
  .then(data => {
    const geojson = L.geoJSON(data, {
      style: { color: '#7f8c8d', weight: 1.5 },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`ID: ${feature.properties.id}<br>Área: ${feature.properties.shape_area}<br>Tratamiento: ${feature.properties.tratamient}`);
      }
    });
    capaTratamientos.addLayer(geojson);
  });





// Activar/desactivar capas desde el sidebar
const toggleLayer = (checkboxId, layerGroup) => {
  document.getElementById(checkboxId).addEventListener('change', function () {
    this.checked ? map.addLayer(layerGroup) : map.removeLayer(layerGroup);
  });
};

// Activar/desactivar capas desde el sidebar
toggleLayer('chkComunas', capaComunas);
toggleLayer('chkVias', capaVias);

toggleLayer('chkBarrios', capaBarrios);
toggleLayer('chkPerimetro', capaPerimetro);
toggleLayer('chkAsentamientos', capaAsentamientos);
toggleLayer('chkExpansion', capaExpansion);
toggleLayer('chkEspacioPublico', capaEspacioPublico);
toggleLayer('chkEquipamientoColectivo', capaEquipamientoColectivo);
toggleLayer('chkEquipamientoServicios', capaEquipamientoServicios);
toggleLayer('chkRecintos', capaRecintos);
toggleLayer('chkAreasActividad', capaAreasActividad);
toggleLayer('chkReservas', capaReservas);
toggleLayer('chkTratamientos', capaTratamientos);


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


//funcionpa la leyenda
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

  if (map.hasLayer(capaBarrios)) {
    html += `<div style="margin-top:5px;">
               <span style="background:#9b59b6; display:inline-block; width:12px; height:12px; margin-right:5px;"></span>
               Barrios
             </div>`;
  }

  if (map.hasLayer(capaPerimetro)) {
    html += `<div style="margin-top:5px;">
               <span style="background:#f39c12; display:inline-block; width:12px; height:12px; margin-right:5px;"></span>
               Perímetro urbano
             </div>`;
  }

  if (map.hasLayer(capaAsentamientos)) {
    html += `<div style="margin-top:5px;">
               <span style="background:#e67e22; display:inline-block; width:12px; height:12px; margin-right:5px;"></span>
               Asentamientos
             </div>`;
  }

  if (map.hasLayer(capaExpansion)) {
    html += `<div style="margin-top:5px;">
               <span style="background:#d35400; display:inline-block; width:12px; height:12px; margin-right:5px;"></span>
               Suelo de expansión
             </div>`;
  }

  if (map.hasLayer(capaEspacioPublico)) {
    html += `<div style="margin-top:5px;">
               <span style="background:#27ae60; display:inline-block; width:12px; height:12px; margin-right:5px;"></span>
               Espacio público
             </div>`;
  }

  if (map.hasLayer(capaEquipamientoColectivo)) {
    html += `<div style="margin-top:5px;">
               <span style="background:#16a085; display:inline-block; width:12px; height:12px; margin-right:5px;"></span>
               Equipamientos colectivos
             </div>`;
  }

  if (map.hasLayer(capaEquipamientoServicios)) {
    html += `<div style="margin-top:5px;">
               <span style="background:#1abc9c; display:inline-block; width:12px; height:12px; margin-right:5px;"></span>
               Equipamientos servicios
             </div>`;
  }

  if (map.hasLayer(capaRecintos)) {
    html += `<div style="margin-top:5px;">
               <span style="background:#34495e; display:inline-block; width:12px; height:12px; margin-right:5px;"></span>
               Recintos urbanos
             </div>`;
  }

  if (map.hasLayer(capaAreasActividad)) {
    html += `<div style="margin-top:5px;">
               <span style="background:#c0392b; display:inline-block; width:12px; height:12px; margin-right:5px;"></span>
               Áreas de actividad
             </div>`;
  }

  if (map.hasLayer(capaReservas)) {
    html += `<div style="margin-top:5px;">
               <span style="background:#2ecc71; display:inline-block; width:12px; height:12px; margin-right:5px;"></span>
               Reservas forestales
             </div>`;
  }

  if (map.hasLayer(capaTratamientos)) {
    html += `<div style="margin-top:5px;">
               <span style="background:#7f8c8d; display:inline-block; width:12px; height:12px; margin-right:5px;"></span>
               Tratamientos urbanísticos
             </div>`;
  }

  div.innerHTML = html;
}


// Llamar a la función al cargar y al activar/desactivar capas
actualizarLeyenda();

document.getElementById('chkComunas').addEventListener('change', actualizarLeyenda);
document.getElementById('chkVias').addEventListener('change', actualizarLeyenda);

document.getElementById('chkBarrios').addEventListener('change', actualizarLeyenda);
document.getElementById('chkPerimetro').addEventListener('change', actualizarLeyenda);
document.getElementById('chkAsentamientos').addEventListener('change', actualizarLeyenda);
document.getElementById('chkExpansion').addEventListener('change', actualizarLeyenda);
document.getElementById('chkEspacioPublico').addEventListener('change', actualizarLeyenda);
document.getElementById('chkEquipamientoColectivo').addEventListener('change', actualizarLeyenda);
document.getElementById('chkEquipamientoServicios').addEventListener('change', actualizarLeyenda);
document.getElementById('chkRecintos').addEventListener('change', actualizarLeyenda);
document.getElementById('chkAreasActividad').addEventListener('change', actualizarLeyenda);
document.getElementById('chkReservas').addEventListener('change', actualizarLeyenda);
document.getElementById('chkTratamientos').addEventListener('change', actualizarLeyenda);
