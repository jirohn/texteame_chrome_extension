// Variables para almacenar los datos
var textAnuncio = "";
var tituloAnuncio = "";
var nombre = "";
var edad = "";
var provincia = "";
var ciudad = "";
var telefono = "";
var whatsapp = "";
var nacionalidad = "";

// Función para mostrar los datos en el popup
function mostrarDatosEnPopup() {
    var html = '<table>' +
        '<tr><th>Campo</th><th>Datos</th></tr>' +
        '<tr><td>Text Anuncio</td><td>' + textAnuncio + '</td></tr>' +
        '<tr><td>Título Anuncio</td><td>' + tituloAnuncio + '</td></tr>' +
        '<tr><td>Nombre</td><td>' + nombre + '</td></tr>' +
        '<tr><td>Edad</td><td>' + edad + '</td></tr>' +
        '<tr><td>Provincia</td><td>' + provincia + '</td></tr>' +
        '<tr><td>Ciudad</td><td>' + ciudad + '</td></tr>' +
        '<tr><td>Teléfono</td><td>' + telefono + '</td></tr>' +
        '<tr><td>Whatsapp</td><td>' + whatsapp + '</td></tr>' +
        '<tr><td>Nacionalidad</td><td>' + nacionalidad + '</td></tr>' +
        '</table>';

    document.getElementById("datosCopiados").innerHTML = html;
    document.getElementById("datosCopiados").style.display = "block";
}

// Función para autorellenar campos en la página objetivo
function autorellenarCamposEnPagina(datos) {
    if (document.location.href.includes("https://www.destacamos.net/newad.php?step=3")) {
        // Rellenar el título
        document.querySelector('input[name="title"]').value = datos.tituloAnuncio || '';
        // Rellenar la descripción
        document.querySelector('textarea[name="description"]').value = datos.textAnuncio || '';
        // Rellenar el teléfono
        document.querySelector('input[name="telefono"]').value = datos.telefono || '';
        // Más campos según sea necesario...
    }
}

function autorellenar() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "autorellenar",
            data: {
                textAnuncio: textAnuncio,
                tituloAnuncio: tituloAnuncio,
                nombre: nombre,
                edad: edad,
                ciudad: ciudad,
                telefono: telefono
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    function obtenerDatosAlmacenados() {
        chrome.storage.local.get([
            'textAnuncio',
            'tituloAnuncio',
            'nombre',
            'edad',
            'provincia',
            'ciudad',
            'telefono',
            'whatsapp',
            'nacionalidad'
        ], function (result) {
            if (chrome.runtime.lastError || !result.textAnuncio) {
                document.getElementById("message").style.display = "block";
                document.getElementById("datosCopiados").style.display = "none";
                document.getElementById("onPage").style.display = "none";
                document.getElementById("autorellenarButton").disabled = true;
            } else {
                document.getElementById("message").style.display = "none";
                textAnuncio = result.textAnuncio;
                tituloAnuncio = result.tituloAnuncio;
                nombre = result.nombre;
                edad = result.edad;
                provincia = result.provincia;
                ciudad = result.ciudad;
                telefono = result.telefono;
                whatsapp = result.whatsapp;
                nacionalidad = result.nacionalidad;
                mostrarDatosEnPopup();
                document.getElementById("onPage").style.display = "block";
                document.getElementById("autorellenarButton").disabled = false;
            }
        });
    }

    obtenerDatosAlmacenados();

    var copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click", obtenerDatosAlmacenados);

    var autorellenarButton = document.getElementById("autorellenarButton");
    autorellenarButton.addEventListener("click", function() {
        autorellenar();
        autorellenarCamposEnPagina({
            textAnuncio: textAnuncio,
            tituloAnuncio: tituloAnuncio,
            nombre: nombre,
            edad: edad,
            provincia: provincia,
            ciudad: ciudad,
            telefono: telefono,
            whatsapp: whatsapp,
            nacionalidad: nacionalidad
        });
    });

    var enterLink = document.getElementById('enterLink');
    enterLink.addEventListener('click', function () {
        chrome.tabs.create({url: 'http://texteame.es'});
    });
});
