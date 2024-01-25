// Capturar los datos de la página
var textAnuncio = document.querySelector('.mi-clase-text-anuncio').textContent;
var tituloAnuncio = document.querySelector('.mi-clase-titulo-anuncio').textContent;
var nombre = document.querySelector('.mi-clase-nombre').textContent;
var edad = document.querySelector('.mi-clase-edad').textContent;
var ciudad = document.querySelector('.mi-clase-ciudad').textContent;
var telefono = document.querySelector('.mi-clase-telefono').textContent;

// Almacenar los datos en la memoria de la extensión
chrome.storage.local.set({
  'textAnuncio': textAnuncio,
  'tituloAnuncio': tituloAnuncio,
  'nombre': nombre,
  'edad': edad,
  'ciudad': ciudad,
  'telefono': telefono
});