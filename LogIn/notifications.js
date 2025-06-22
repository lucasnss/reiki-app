// ========================================
// SISTEMA DE NOTIFICACIONES
// Maneja notificaciones y mensajes al usuario
// ========================================

/**
 * Mostrar notificación al usuario
 * @param {string} mensaje - Mensaje de notificación
 * @param {string} tipo - Tipo de notificación ('success' o 'error')
 */
function mostrarNotificacion(mensaje, tipo = "info") {
  // Crear elemento de notificación
  const notificacion = document.createElement("div")
  notificacion.className = `notification notification-${tipo}`
  notificacion.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${tipo === "success" ? "✓" : "⚠"}</span>
            <span class="notification-message">${mensaje}</span>
            <button class="notification-close" aria-label="Cerrar notificación">×</button>
        </div>
    `

  // Agregar estilos
  notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === "success" ? "#48bb78" : "#f56565"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `

  // Agregar a la página
  document.body.appendChild(notificacion)

  // Animar entrada
  setTimeout(() => {
    notificacion.style.transform = "translateX(0)"
  }, 100)

  // Funcionalidad del botón cerrar
  const botonCerrar = notificacion.querySelector(".notification-close")
  botonCerrar.addEventListener("click", () => {
    removerNotificacion(notificacion)
  })

  // Auto remover después de 5 segundos
  setTimeout(() => {
    removerNotificacion(notificacion)
  }, 5000)
}

/**
 * Remover notificación con animación
 * @param {HTMLElement} notificacion - Elemento de notificación
 */
function removerNotificacion(notificacion) {
  notificacion.style.transform = "translateX(100%)"
  setTimeout(() => {
    if (notificacion.parentNode) {
      notificacion.parentNode.removeChild(notificacion)
    }
  }, 300)
}