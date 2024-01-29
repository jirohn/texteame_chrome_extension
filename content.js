// Función para verificar si estamos en la página de Texteame
function esPaginaDeTexteame() {
  return window.location.href.includes("texteame.es/node/");
}

// Función para capturar y almacenar datos desde Texteame
function capturarYAlmacenarDatosDeTexteame() {
  var textAnuncio = document.querySelector('.mi-clase-text-anuncio').textContent;
  var tituloAnuncio = document.querySelector('.mi-clase-titulo-anuncio').textContent;
  var nombre = document.querySelector('.mi-clase-nombre').textContent;
  var edad = document.querySelector('.mi-clase-edad').textContent;
  var ciudad = document.querySelector('.mi-clase-ciudad').textContent;
  var telefono = document.querySelector('.mi-clase-telefono').textContent;
  var whatsapp = document.querySelector('.mi-clase-whatsapp').textContent;
  var provincia = document.querySelector('.mi-clase-provincia').textContent;
  var nacionalidad = document.querySelector('.mi-clase-nacionalidad').textContent;
  // Almacenar los datos en la memoria de la extensión
  chrome.storage.local.set({
      'textAnuncio': textAnuncio,
      'tituloAnuncio': tituloAnuncio,
      'nombre': nombre,
      'edad': edad,
      'provincia': provincia,
      'ciudad': ciudad,
      'telefono': telefono,
      'whatsapp': whatsapp,
      'nacionalidad': nacionalidad
  });
}

// Función para autorellenar en destacamos.net
function esPaginaDeDestacamos() {
  return window.location.href.includes("www.destacamos.net/newad.php?step=3");
}
// Función para autorellenar en Destacamos
function autorellenarEnDestacamos() {
  chrome.storage.local.get(['textAnuncio', 'tituloAnuncio', 'nombre', 'edad', 'ciudad', 'provincia', 'telefono', 'whatsapp', 'nacionalidad'], function(datos) {
      if (datos.textAnuncio) {
          // Asumiendo que tienes los selectores correctos para cada campo
          document.querySelector('input[name="title"]').value = datos.tituloAnuncio.trim();
          document.querySelector('textarea[name="description"]').value = datos.textAnuncio.trim();
          document.querySelector('input[name="telefono"]').value = datos.telefono.trim();
          document.querySelector('input[name="city"]').value = datos.ciudad.trim();
          //para el booleano whatsapp hay que hacer un if
          if (datos.whatsapp.trim() === "Si") {
              document.querySelector('input[name="whatsapp"]').checked = true;
          }
          
          // Para el campo de la ciudad, debes seleccionar la opción correcta en el dropdown
          var ciudadSelector = document.querySelector('select[name="localidad"]');
          for (var i = 0; i < ciudadSelector.options.length; i++) {
              if (ciudadSelector.options[i].text === datos.provincia.trim()) {
                  ciudadSelector.selectedIndex = i;
                  break;
              }
          }
          var edadSelector = document.querySelector('select[name="edad"]');
          for (var i = 0; i < edadSelector.options.length; i++) {
              if (edadSelector.options[i].text === datos.edad.trim()) {
                  edadSelector.selectedIndex = i;
                  break;
              }
          }
        // Para la nacionalidad, debes elegir la opción correcta en el dropdown
        var nacionalidadSelector = document.querySelector('select[name="pais_de_origen"]');
        var nacionalidadNormalizada = datos.nacionalidad.trim().toLowerCase();

        for (var i = 0; i < nacionalidadSelector.options.length; i++) {
            var opcion = nacionalidadSelector.options[i].text.trim().toLowerCase();
            if (opcion === nacionalidadNormalizada) {
                console.log(nacionalidadSelector.options[i].text); // Para propósitos de depuración
                console.log(datos.nacionalidad.trim()); // Para propósitos de depuración
                nacionalidadSelector.selectedIndex = i;
                break;
            }
        }

          
      }
  });
}
if (esPaginaDeDestacamos()) {
  autorellenarEnDestacamos();
}
function esPaginaDeLoquosex() {
  return window.location.href.includes("www.loquosex.com/publicar-anuncio/");
}

// Función para autorellenar en Loquosex
function autorellenarEnLoquosex() {
  chrome.storage.local.get(['textAnuncio', 'tituloAnuncio', 'nombre', 'edad', 'ciudad', 'provincia', 'telefono', 'whatsapp', 'nacionalidad'], function(datos) {
    if (datos.textAnuncio) {
      // Establecer valores en los campos del formulario
      document.querySelector('input[name="nombre"]').value = datos.nombre.trim();
      document.querySelector('input[name="post_title"]').value = datos.tituloAnuncio.trim();
      // ... (aquí iría la lógica para seleccionar la categoría, autonomía y provincia)
      document.querySelector('select[name="edad"]').value = datos.edad.trim();
      document.querySelector('select[name="nacionalidad"]').value = datos.nacionalidad.trim();
      document.querySelector('textarea[name="description"]').value = datos.textAnuncio.trim();
      document.querySelector('input[name="owner_phone"]').value = datos.telefono.trim();
      document.querySelector('select[name="whatsapp"]').value = datos.whatsapp.trim() === "Si" ? "1" : "0";

      // Establecer "No" en el campo de "Tarjetas"
      document.querySelector('select[name="visa"]').value = "0";
      // buscamos en el selector main_cat la comunidad autonoma a la que pertenece la provincia
      //primero asignamos el valor -1 al main_cat
      
      // Establecer "A Consultar" en el campo de "Tarifa mínima"
      document.querySelector('select[name="precio"]').value = "Consultar";
      // seleccionamos la categoria 8 por defecto
      document.querySelector('select[name="categoria"]').value = "8";
      // Marcar todos los servicios
      const servicios = document.querySelectorAll('input[type="checkbox"]');
      servicios.forEach(servicio => servicio.checked = true);

    }
  });
}

if (esPaginaDeLoquosex()) {
  autorellenarEnLoquosex();
}

// Ejecutar funciones según la página
if (esPaginaDeTexteame()) {
  capturarYAlmacenarDatosDeTexteame();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "autorellenar") {
      autorellenarEnDestacamos(request.data);
  }
});
