// Variables para almacenar los datos
var textAnuncio = "";
var tituloAnuncio = "";
var nombre = "";
var edad = "";
var ciudad = "";
var telefono = "";

// Función para mostrar los datos en el popup
function mostrarDatosEnPopup() {
    var html = '<table>' +
        '<tr><th>Campo</th><th>Datos</th></tr>' +
        '<tr><td>Text Anuncio</td><td>' + textAnuncio + '</td></tr>' +
        '<tr><td>Título Anuncio</td><td>' + tituloAnuncio + '</td></tr>' +
        '<tr><td>Nombre</td><td>' + nombre + '</td></tr>' +
        '<tr><td>Edad</td><td>' + edad + '</td></tr>' +
        '<tr><td>Ciudad</td><td>' + ciudad + '</td></tr>' +
        '<tr><td>Teléfono</td><td>' + telefono + '</td></tr>' +
        '</table>';

    document.getElementById("datosCopiados").innerHTML = html;
    document.getElementById("datosCopiados").style.display = "block";
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
                document.getElementById("datosCopiados").textContent = "Error: Datos no copiados";
            } else {
                textAnuncio = result.textAnuncio || "";
                tituloAnuncio = result.tituloAnuncio || "";
                nombre = result.nombre || "";
                edad = result.edad || "";
                ciudad = result.ciudad || "";
                telefono = result.telefono || "";
                mostrarDatosEnPopup();
            }
        });
    }

    var copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click", obtenerDatosAlmacenados);

    var autorellenarButton = document.getElementById("autorellenarButton");
    autorellenarButton.addEventListener("click", autorellenar);

    var enterLink = document.getElementById('enterLink');
    enterLink.addEventListener('click', function () {
        chrome.tabs.create({url: 'http://texteame.es'});
    });

    // Actualizar la interfaz de usuario según la página actual
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var currentTab = tabs[0];
        var isTexteamePage = currentTab.url.includes("texteame.es/node/");
        var isCompatiblePage = currentTab.url.includes("https://www.destacamos.net/newad.php?step=3");

        if (isTexteamePage) {
            document.getElementById("message").style.display = "none";
            document.getElementById("onPage").style.display = "block";
            document.getElementById("autorellenarButton").style.display = "none";
            document.getElementById("mensajeIncompatibilidad").style.display = "none";
        } else if (isCompatiblePage) {
            document.getElementById("message").style.display = "none";
            document.getElementById("onPage").style.display = "block";
            document.getElementById("autorellenarButton").disabled = false;
            document.getElementById("mensajeIncompatibilidad").style.display = "none";
        } else {
            document.getElementById("message").style.display = "block";
            document.getElementById("onPage").style.display = "none";
            document.getElementById("autorellenarButton").disabled = true;
            document.getElementById("mensajeIncompatibilidad").style.display = "block";
        }
    });
});
