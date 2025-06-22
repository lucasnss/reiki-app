// ========================================
// UTILIDADES DE INTERFAZ DE USUARIO
// Maneja mensajes, estados de carga y efectos visuales
// ========================================

/**
 * Mostrar mensaje de error
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarMensajeError(mensaje) {
  const mensajeError = document.getElementById("errorMessage")

  if (mensajeError) {
    mensajeError.textContent = mensaje
    mensajeError.style.display = "block"
    mensajeError.style.opacity = "1"

    console.log("Mensaje de error mostrado:", mensaje)
  }
}

/**
 * Ocultar mensaje de error
 */
function ocultarMensajeError() {
  const mensajeError = document.getElementById("errorMessage")

  if (mensajeError) {
    mensajeError.style.display = "none"
    mensajeError.style.opacity = "0"
  }
}

/**
 * Mostrar estado de carga en el botón
 */
function mostrarEstadoCarga() {
  const botonLogin = document.querySelector(".registro-btn")
  const spanTexto = botonLogin.querySelector("span")
  const cargador = botonLogin.querySelector(".btn-loader")

  if (botonLogin && spanTexto) {
    // Deshabilitar el botón
    botonLogin.disabled = true
    botonLogin.classList.add("loading")

    // Cambiar el texto
    spanTexto.textContent = "Iniciando sesión..."

    // Mostrar el cargador si existe
    if (cargador) {
      cargador.style.display = "inline-block"
    }

    console.log("Estado de carga activado")
  }
}

/**
 * Agregar efecto de sacudida al formulario
 */
function agregarEfectoSacudida() {
  const formulario = document.getElementById("loginForm")

  if (formulario) {
    formulario.style.animation = "shake 0.5s ease-in-out"

    // Remover la animación después de que termine
    setTimeout(() => {
      formulario.style.animation = ""
    }, 500)
  }
}

/**
 * Mostrar notificación de mensaje de bienvenida
 * @param {string} mensaje - El mensaje de bienvenida
 */
function mostrarMensajeBienvenida(mensaje) {
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
      document.body.removeChild(notificacion)
    }, 300)
  }, 3000)
}

// Agregar estilos CSS para la animación de sacudida si no existen
const estilosSacudida = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  .error-message {
    background: #ffe6e6;
    color: #d63031;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 20px;
    border-left: 4px solid #d63031;
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .loading {
    opacity: 0.7;
    pointer-events: none;
  }
`

// Agregar los estilos al documento si no existen
if (!document.querySelector("#estilos-login")) {
  const styleElement = document.createElement("style")
  styleElement.id = "estilos-login"
  styleElement.textContent = estilosSacudida
  document.head.appendChild(styleElement)
}