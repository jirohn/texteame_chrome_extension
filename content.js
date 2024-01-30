// Función para verificar si estamos en la página de Texteame
function esPaginaDeTexteame() {
  return window.location.href.includes("texteame.es/node/");
}
function verificarPermisosUsuario(callback) {
  fetch('https://texteame.es/isactivated')
  .then(response => response.text())
  .then(text => {
      if (text === 'true') {
          callback(true);
      } else {
          callback(false);
      }
  })
  .catch(error => {
      console.error('Error al verificar permisos:', error);
      callback(false);
  });
}
// Función para capturar y almacenar datos desde Texteame
function capturarYAlmacenarDatosDeTexteame() {
  // si el usuario esta activado, se añaden los datos, si no se añade el mensaje 'usuario no activado' en todos los datos
  // entramos en texteame.es/isactivated y si da el mensaje true se procede a capturar los datos
  // si da false se añade el mensaje 'usuario no activado' en todos los datos
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
  }, function() {
      // Notificar al usuario que los datos han sido almacenados
      document.getElementById("datosCopiados").style.display = "block";
      // Cerrar la ventana después de 3 segundos
      setTimeout(function() {
          window.close();
      }, 3000);
  }
  );

  
}
// Ejecutar funciones según la página

// si se hace click en copiar && espaginadetexteame se ejecuta la funcion capturarYAlmacenarDatosDeTexteame
if (esPaginaDeTexteame()) {
  capturarYAlmacenarDatosDeTexteame();
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
function esPaginaDeTuteanuncias() {
  return window.location.href.includes("tuteanuncias.com/listing-form/");
}

function autorellenarEnTuteanuncias() {
  chrome.storage.local.get(['textAnuncio', 'tituloAnuncio', 'nombre', 'edad', 'ciudad', 'provincia', 'telefono', 'whatsapp', 'nacionalidad'], function(datos) {
    if (datos.textAnuncio) {
      // Establecer valores en los campos del formulario
      // Nota: Asegúrate de que los selectores CSS sean correctos
      document.querySelector('input[name="title"]').value = datos.tituloAnuncio.trim();
      document.querySelector('textarea[name="description"]').value = datos.textAnuncio.trim();
      document.querySelector('input[name="phone"]').value = datos.telefono.trim();
      document.querySelector('input[name="email"]').value = "noresponse@noresponse.com"; // Ejemplo, ajusta según sea necesario

      // Para los campos de selección, como categorías o ubicaciones, necesitarás implementar una lógica similar
      // a la que usaste para los otros sitios, ajustando los selectores y valores según corresponda

      // Ejemplo para el campo WhatsApp (ajusta según sea necesario)
      //ciudad iria en direccion
      document.querySelector('textarea[name="address"]').value = datos.ciudad.trim();

        }
  });
}

if (esPaginaDeTuteanuncias()) {
  autorellenarEnTuteanuncias();
}
function esPaginaDeVIPScort() {
  return window.location.href.includes("vipscort.es/listing-form/");
}

function autorellenarEnVIPScort() {
  chrome.storage.local.get(['textAnuncio', 'tituloAnuncio', 'nombre', 'edad', 'ciudad', 'provincia', 'telefono', 'whatsapp', 'nacionalidad'], function(datos) {
    if (datos.textAnuncio) {
      // Autorellenar título y descripción del anuncio
      document.querySelector('input[name="title"]').value = datos.tituloAnuncio.trim();
      document.querySelector('textarea[name="description"]').value = datos.textAnuncio.trim();
      // el textarea con el name address es la ciudad
      document.querySelector('textarea[name="address"]').value = datos.ciudad.trim();
      // Autorellenar teléfono y email (ajustar si es necesario)
      document.querySelector('input[name="phone"]').value = datos.telefono.trim();
      document.querySelector('input[name="email"]').value = "noreply@noreply.com"; // Ajusta este valor según sea necesario
      // la provincia debe coincidir con el text del dropdown que esta dentro de la id acadp-form-control-location
      var whatsappSelector = document.querySelector('select[name="acadp_fields[444]"]');
      whatsappSelector.value = datos.whatsapp.trim() === "Si" ? "Si uso whatsapp" : "No, Solo llamadas";

      // Otros campos como categorías, ubicación, etc., necesitan ser ajustados según los datos almacenados y la estructura del formulario
      // Por ejemplo, si necesitas seleccionar una categoría o ubicación específica, deberás implementar una lógica similar
      // a la que usaste en los sitios anteriores para seleccionar la opción correcta del dropdown
    }
  });
}

if (esPaginaDeVIPScort()) {
  autorellenarEnVIPScort();
}

// Verifica si estamos en la página de PutaPasion
function esPaginaDePutaPasion() {
  return window.location.href.includes("putapasion.com/perfil/nuevo/");
}

// Función para autorellenar en PutaPasion
function autorellenarEnPutaPasion() {
  chrome.storage.local.get(['textAnuncio', 'tituloAnuncio', 'nombre', 'edad', 'ciudad', 'telefono', 'whatsapp', 'nacionalidad'], function(datos) {
    if (datos.textAnuncio) {
      // Autorellenar categoría, título y descripción del anuncio
      document.querySelector('#category').value = "Putas y escorts"; // Ajustar según sea necesario
      document.querySelector('#title').value = datos.tituloAnuncio.trim();
      document.querySelector('#description').value = datos.textAnuncio.trim();

      // Autorellenar edad
      document.querySelector('#age').value = datos.edad || 18;

      // Autorellenar precio, si se dispone de esta información
      // document.querySelector('#price').value = ""; // Ajustar según sea necesario

      // Configurar horarios (por ejemplo, marcando la casilla de 24 horas)
      document.querySelector('#allDay').checked = true;

      // Otros campos como teléfono, ubicación, etc., pueden ser ajustados de forma similar
      // Asegúrate de utilizar los selectores correctos para cada campo en el formulario de PutaPasion
    }
  });
}

// Verificar la página y ejecutar la función de autorelleno
if (esPaginaDePutaPasion()) {
  autorellenarEnPutaPasion();
}


function esPaginaDeMundoSexAnuncio() {
  return window.location.href.includes("mundosexanuncio.com/publicar");
}

function autorellenarEnMundoSexAnuncio() {
  chrome.storage.local.get(['textAnuncio', 'tituloAnuncio', 'nombre', 'edad', 'ciudad', 'provincia', 'telefono', 'whatsapp', 'nacionalidad'], function(datos) {
    if (datos.textAnuncio) {
      // Autorellenar título del anuncio
      document.querySelector('input[name="titol"]').value = datos.tituloAnuncio.trim();

      // Autorellenar descripción
      tinymce.get('descripcio').setContent(datos.textAnuncio.trim());

      // Autorellenar provincia (este es un ejemplo, ajustar según la lógica de selección de provincias)
      var provinciaSelector = document.querySelector('select[name="id_provincia"]');
      for (var i = 0; i < provinciaSelector.options.length; i++) {
        if (provinciaSelector.options[i].text === datos.provincia.trim()) {
          provinciaSelector.selectedIndex = i;
          break;
        }
      }

      // Autorellenar ciudad (esto requerirá una lógica adicional para manejar el cambio dinámico de ciudades basado en la provincia seleccionada)
      // ...

      // Autorellenar teléfono
      document.querySelector('#telefono').value = datos.telefono.trim();

      // Marcar el checkbox de WhatsApp si es necesario
      var whatsappCheckbox = document.querySelector('input[name="whatsapp"]');
      whatsappCheckbox.checked = datos.whatsapp.trim() === "Si";
      //marcamos todos los checkbox como true
      document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = true);
      // Otros campos como email, enlace a la web, perfil de Twitter, etc., pueden ser autorellenados de forma similar
      // ...

      // Asegúrate de implementar la lógica necesaria para manejar campos dinámicos o dependientes de otros campos
    }
  });
}

if (esPaginaDeMundoSexAnuncio()) {
  autorellenarEnMundoSexAnuncio();
}



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "autorellenar") {
      autorellenarEnDestacamos(request.data);
  }
});
