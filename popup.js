// Variables para almacenar los datos
var textAnuncio = "";
var tituloAnuncio = "";
var nombre = "";
var edad = "";
var ciudad = "";
var telefono = "";

// Función para obtener los datos almacenados en la memoria de la extensión
function obtenerDatosAlmacenados() {
  chrome.storage.local.get([
    'textAnuncio',
    'tituloAnuncio',
    'nombre',
    'edad',
    'ciudad',
    'telefono'
  ], function (result) {
    if (chrome.runtime.lastError) {
      // Manejo de errores si no se pudieron obtener los datos
      document.getElementById("mensaje").textContent = "Error: Datos no copiados";
    } else {
      // Almacenar los datos en las variables
      textAnuncio = result.textAnuncio || "";
      tituloAnuncio = result.tituloAnuncio || "";
      nombre = result.nombre || "";
      edad = result.edad || "";
      ciudad = result.ciudad || "";
      telefono = result.telefono || "";

      // Mostrar los datos en el popup
      mostrarDatosEnPopup();
    }
  });
}

// Función para mostrar los datos en el popup
function mostrarDatosEnPopup() {
  document.getElementById("mensaje").textContent = "Datos copiados correctamente:";
  document.getElementById("datosCopiados").textContent =
    "Text Anuncio: " + textAnuncio + "\n" +
    "Título Anuncio: " + tituloAnuncio + "\n" +
    "Nombre: " + nombre + "\n" +
    "Edad: " + edad + "\n" +
    "Ciudad: " + ciudad + "\n" +
    "Teléfono: " + telefono;
}

// Ejecutar la función para obtener datos al cargar la extensión
obtenerDatosAlmacenados();

// Actualizar la interfaz de usuario según la página actual
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var currentTab = tabs[0];
  var isTexteamePage = currentTab.url.includes("texteame.es/node/");

  if (isTexteamePage) {
    document.getElementById("message").style.display = "none";
    document.getElementById("copyButton").style.display = "block";
  } else {
    document.getElementById("message").style.display = "block";
    document.getElementById("copyButton").style.display = "none";
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var enterLink = document.getElementById('enterLink');

  enterLink.addEventListener('click', function () {
    chrome.tabs.create({ url: 'http://texteame.es' });
  });
});
