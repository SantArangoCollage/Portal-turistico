/* ==========================================================
   Rumbo Colombia — JavaScript propio (sin librerías)
   1) Año automático en el pie de página
   2) Visor de imágenes de la galería (modal de Bootstrap)
   3) Validación en tiempo real del formulario de contacto
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  iniciarAnio();
  iniciarVisorGaleria();
  iniciarFormulario();
});

/* ---------- 1) Año del pie de página ---------- */
function iniciarAnio() {
  var spanAnio = document.getElementById("anio");
  if (spanAnio) {
    spanAnio.textContent = new Date().getFullYear();
  }
}

/* ---------- 2) Visor de la galería ---------- */
function iniciarVisorGaleria() {
  var enlaces = document.querySelectorAll(".galeria-enlace");
  var modalElemento = document.getElementById("visor");
  if (!enlaces.length || !modalElemento || typeof bootstrap === "undefined") {
    return; // Sin JS/Bootstrap el enlace abre la imagen normalmente
  }

  var modal = new bootstrap.Modal(modalElemento);
  var imagen = document.getElementById("visor-imagen");
  var titulo = document.getElementById("visor-titulo");

  enlaces.forEach(function (enlace) {
    enlace.addEventListener("click", function (evento) {
      evento.preventDefault();
      var miniatura = enlace.querySelector("img");
      imagen.src = enlace.getAttribute("href");
      imagen.alt = miniatura ? miniatura.alt : "";
      titulo.textContent = enlace.getAttribute("data-titulo") || "";
      modal.show();
    });
  });
}

/* ---------- 3) Validación del formulario ---------- */
function iniciarFormulario() {
  var formulario = document.getElementById("form-contacto");
  if (!formulario) {
    return;
  }

  var MIN_NOMBRE = 3;
  var MIN_MENSAJE = 20;
  var REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Cada regla devuelve "" si el campo es válido o el mensaje de error.
  var reglas = {
    nombre: function (campo) {
      var valor = campo.value.trim();
      if (valor.length === 0) {
        return "El nombre es obligatorio.";
      }
      if (valor.length < MIN_NOMBRE) {
        return "El nombre debe tener al menos " + MIN_NOMBRE + " caracteres.";
      }
      return "";
    },
    email: function (campo) {
      var valor = campo.value.trim();
      if (valor.length === 0) {
        return "El correo electrónico es obligatorio.";
      }
      if (!REGEX_EMAIL.test(valor)) {
        return "Escribe un correo válido, por ejemplo nombre@dominio.com.";
      }
      return "";
    },
    destino: function (campo) {
      return campo.value === "" ? "Selecciona el destino que te interesa." : "";
    },
    mensaje: function (campo) {
      var longitud = campo.value.trim().length;
      if (longitud === 0) {
        return "El mensaje es obligatorio.";
      }
      if (longitud < MIN_MENSAJE) {
        return "El mensaje debe tener al menos " + MIN_MENSAJE + " caracteres (faltan " + (MIN_MENSAJE - longitud) + ").";
      }
      return "";
    },
    acepto: function (campo) {
      return campo.checked ? "" : "Debes aceptar el tratamiento de datos para continuar.";
    }
  };

  var campos = Object.keys(reglas).map(function (id) {
    return document.getElementById(id);
  });
  var tocados = {}; // campos que el usuario ya visitó
  var enviando = false; // evita borrar el mensaje de éxito al reiniciar el formulario
  var resultado = document.getElementById("resultado");
  var contador = document.getElementById("contador-mensaje");

  function validarCampo(campo) {
    var error = reglas[campo.id](campo);
    var zonaError = document.getElementById(campo.id + "-error");

    campo.classList.toggle("is-invalid", error !== "");
    campo.classList.toggle("is-valid", error === "");
    campo.setAttribute("aria-invalid", error !== "" ? "true" : "false");
    if (zonaError) {
      zonaError.textContent = error;
    }
    return error === "";
  }

  function actualizarContador() {
    if (!contador) {
      return;
    }
    var longitud = document.getElementById("mensaje").value.trim().length;
    contador.textContent = longitud + " / " + MIN_MENSAJE + " caracteres mínimos";
    contador.classList.toggle("ok", longitud >= MIN_MENSAJE);
  }

  function mostrarResultado(tipo, html) {
    resultado.className = "alert alert-" + tipo + " mt-4";
    resultado.innerHTML = html;
    resultado.setAttribute("tabindex", "-1");
    resultado.focus();
  }

  function limpiarResultado() {
    resultado.className = "";
    resultado.innerHTML = "";
  }

  // Validación en tiempo real
  campos.forEach(function (campo) {
    var evento = campo.type === "checkbox" || campo.tagName === "SELECT" ? "change" : "input";

    campo.addEventListener(evento, function () {
      if (campo.id === "mensaje") {
        actualizarContador();
      }
      if (tocados[campo.id]) {
        validarCampo(campo);
      }
    });

    campo.addEventListener("blur", function () {
      tocados[campo.id] = true;
      validarCampo(campo);
    });
  });

  // Envío del formulario
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limpiarResultado();

    var primerError = null;
    var totalErrores = 0;

    campos.forEach(function (campo) {
      tocados[campo.id] = true;
      if (!validarCampo(campo)) {
        totalErrores++;
        if (!primerError) {
          primerError = campo;
        }
      }
    });

    if (totalErrores > 0) {
      mostrarResultado(
        "danger",
        "<strong>Revisa el formulario.</strong> Hay " + totalErrores +
        (totalErrores === 1 ? " campo" : " campos") + " con errores."
      );
      primerError.focus();
      return;
    }

    var nombre = document.getElementById("nombre").value.trim();
    var destino = document.getElementById("destino").value;
    mostrarResultado(
      "success",
      "<strong>¡Gracias, " + escapar(nombre) + "!</strong> Recibimos tu mensaje sobre <em>" +
      escapar(destino) + "</em>. Te responderemos muy pronto al correo indicado."
    );

    enviando = true;
    formulario.reset();
    enviando = false;
    tocados = {};
    campos.forEach(function (campo) {
      campo.classList.remove("is-valid", "is-invalid");
      campo.removeAttribute("aria-invalid");
    });
    actualizarContador();
  });

  formulario.addEventListener("reset", function () {
    tocados = {};
    if (!enviando) {
      limpiarResultado();
    }
    campos.forEach(function (campo) {
      campo.classList.remove("is-valid", "is-invalid");
      var zona = document.getElementById(campo.id + "-error");
      if (zona) {
        zona.textContent = "";
      }
    });
    setTimeout(actualizarContador, 0);
  });

  actualizarContador();
}

// Evita que el texto escrito por el usuario se interprete como HTML
function escapar(texto) {
  var div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}
