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
    // si el usuario no tiene permisos, no mostramos los datos y mostramos un boton que diga contratar, que te lleve a la pagina de contratacion
    verificarPermisosUsuario(function (tienePermisos) {
        if (tienePermisos) {
            mostrarDatosEnPopupConPermisos();
        } else {
            mostrarDatosEnPopupSinPermisos();
        }
    });
}
function mostrarDatosEnPopupConPermisos() {
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
function mostrarDatosEnPopupSinPermisos() {
    //no añadimos los datos al popup y mostramos un boton que diga contratar, que te lleve a la pagina de contratacion
    //creamos el boton de contratar

    document.getElementById("datosCopiados").style.display = "none";
    document.getElementById("message").style.display = "block";
    document.getElementById("message").innerHTML = "No tienes permisos para ver los datos, contrata el servicio para poder verlos";
    document.getElementById("contratarButton").style.display = "block";
    document.getElementById("contratarButton").addEventListener("click", function() {
        chrome.tabs.create({url: 'https://wa.me/34690019789?text=Hola,%20quiero%20contactarte,%20por%20informacion%20de%20Publica2'});
    });

}

function verificarPermisosUsuario(callback) {
    fetch('https://texteame.es/isactivated')
    .then(response => response.text())
    .then(text => {
        if (text === 'true') {
            callback(true);
            //eliminamos el boton de contratar
            document.getElementById("contratarButton").style.display = "none";
        } else {
            callback(false);
        }
    })
    .catch(error => {
        console.error('Error al verificar permisos:', error);
        callback(false);
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
                document.getElementById("autorellenarButton").disabled = true;
                
            }
        });
    }

    obtenerDatosAlmacenados();

    var copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click", obtenerDatosAlmacenados);
    var borrarButton = document.getElementById("borrarButton");
    borrarButton.addEventListener("click", function() {
        chrome.storage.local.clear();
        //borramos las variables
        textAnuncio = "";
        tituloAnuncio = "";
        nombre = "";
        edad = "";
        provincia = "";
        ciudad = "";
        telefono = "";
        whatsapp = "";
        nacionalidad = "";
        //borramos los datos del popup
        document.getElementById("message").style.display = "block";
        document.getElementById("datosCopiados").style.display = "none";
        document.getElementById("onPage").style.display = "none";
        
        


    });
    
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
    //si pulsamos borrar se borraran los datos de la memoria
    var borrarButton = document.getElementById("borrarButton");
    borrarButton.addEventListener("click", function() {
        chrome.storage.local.clear();
        //borramos las variables
        textAnuncio = "";
        tituloAnuncio = "";
        nombre = "";
        edad = "";
        provincia = "";
        ciudad = "";
        telefono = "";
        whatsapp = "";
        nacionalidad = "";
    });
    var enterLink = document.getElementById('enterLink');
    enterLink.addEventListener('click', function () {
        chrome.tabs.create({url: 'http://texteame.es'});
    });
});
