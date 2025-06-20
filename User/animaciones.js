// ========================================
// MÓDULO DE ANIMACIONES
// Maneja efectos visuales, transiciones y animaciones
// ========================================

/**
 * Mostrar notificación de bienvenida
 * @param {string} mensaje - El mensaje de bienvenida
 */
function mostrarNotificacionBienvenida(mensaje) {
  // Crear elemento de notificación
  const notificacion = document.createElement("div")
  notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 184, 148, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `
  notificacion.textContent = mensaje

  // Agregar a la página
  document.body.appendChild(notificacion)

  // Animar entrada
  setTimeout(() => {
    notificacion.style.transform = "translateX(0)"
  }, 100)

  // Remover después de retraso
  setTimeout(() => {
    notificacion.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (document.body.contains(notificacion)) {
        document.body.removeChild(notificacion)
      }
    }, 300)
  }, 3000)
}

/**
 * Agregar efectos hover a las tarjetas de curso
 */
function inicializarEfectosTarjetas() {
  const tarjetasCurso = document.querySelectorAll(".tarjeta-curso")

  tarjetasCurso.forEach((tarjeta, indice) => {
    // Agregar retraso de animación escalonada
    tarjeta.style.animationDelay = `${indice * 0.1}s`

    // Agregar interacción de clic para tarjetas de curso
    tarjeta.addEventListener("click", function (evento) {
      // No activar si se hace clic en el botón
      if (!evento.target.classList.contains("boton-curso")) {
        // Agregar efecto de pulso
        this.style.transform = "scale(0.98)"
        setTimeout(() => {
          this.style.transform = ""
        }, 150)
      }
    })
  })
}

/**
 * Manejar animaciones de botones de curso
 */
function inicializarAnimacionesBotones() {
  const botonesCurso = document.querySelectorAll(".boton-curso")

  botonesCurso.forEach((boton) => {
    boton.addEventListener("click", function (evento) {
      evento.stopPropagation()

      // Obtener título del curso
      const tituloCurso = this.closest(".tarjeta-curso").querySelector("h3").textContent

      // Mostrar retroalimentación de selección de curso
      this.textContent = "¡Seleccionado!"
      this.style.background = "linear-gradient(135deg, #00b894 0%, #00cec9 100%)"

      // Resetear botón después de retraso
      setTimeout(() => {
        this.textContent = "Conocer Más"
        this.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }, 2000)

      // Log para propósitos de desarrollo
      console.log(`Usuario interesado en: ${tituloCurso}`)
    })
  })
}

/**
 * Agregar retroalimentación visual a inputs del formulario
 */
function inicializarAnimacionesFormulario() {
  const inputs = document.querySelectorAll("input")

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      // Limpiar mensaje de error cuando el usuario empieza a escribir
      const mensajeError = document.getElementById("mensajeError")
      if (mensajeError && mensajeError.style.display === "block") {
        ocultarMensajeError()
      }

      // Agregar retroalimentación visual para inputs llenos
      if (this.value.trim()) {
        this.style.borderColor = "#00b894"
        this.style.transform = "translateY(-1px)"
      } else {
        this.style.borderColor = "#e1e5e9"
        this.style.transform = "translateY(0)"
      }
    })

    // Efecto al perder el foco
    input.addEventListener("blur", function () {
      if (!this.value.trim()) {
        this.style.borderColor = "#e1e5e9"
        this.style.transform = "translateY(0)"
      }
    })
  })
}

/**
 * Inicializar animaciones de entrada de página
 */
function inicializarAnimacionesEntrada() {
  // Agregar clase de transición a elementos principales
  const elementosAnimados = document.querySelectorAll(".tarjeta-curso, .contenido-hero, .titulo-seccion")

  elementosAnimados.forEach((elemento, indice) => {
    elemento.style.opacity = "0"
    elemento.style.transform = "translateY(30px)"

    setTimeout(() => {
      elemento.style.transition = "all 0.6s ease-out"
      elemento.style.opacity = "1"
      elemento.style.transform = "translateY(0)"
    }, indice * 100)
  })
}

/**
 * Agregar transiciones suaves para cambios de página
 */
function inicializarTransicionesPagina() {
  // Agregar transición suave al cargar la página
  document.body.style.opacity = "0"

  window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.style.transition = "opacity 0.3s ease"
      document.body.style.opacity = "1"
    }, 100)
  })

  // Agregar transición al salir de la página
  window.addEventListener("beforeunload", () => {
    document.body.style.opacity = "0"
  })
}

/**
 * Inicializar todas las animaciones cuando el DOM esté listo
 */
function inicializarTodasLasAnimaciones() {
  inicializarEfectosTarjetas()
  inicializarAnimacionesBotones()
  inicializarAnimacionesFormulario()
  inicializarAnimacionesEntrada()
  inicializarTransicionesPagina()
}

// Ejecutar animaciones cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", inicializarTodasLasAnimaciones)

function ocultarMensajeError() {
  const mensajeError = document.getElementById("mensajeError")
  if (mensajeError) {
    mensajeError.style.display = "none"
  }
}
