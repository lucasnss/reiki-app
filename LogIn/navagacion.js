// ========================================
// SISTEMA DE NAVEGACIÓN Y REDIRECCIÓN
// Maneja la lógica de navegación entre páginas
// ========================================

/**
 * Verificar autenticación y redirigir según corresponda
 */
function verificarAutenticacionYRedirigir() {
  // Verificar página actual y estado de autenticación
  const paginaActual = window.location.pathname.split("/").pop() || "index.html"
  const estaLogueado = sessionStorage.getItem("estaLogueado") === "true"

  // Lógica de redirección basada en estado de autenticación
  if (paginaActual === "main.html" && !estaLogueado) {
    // Usuario tratando de acceder a página principal sin login
    window.location.href = "index.html"
    return
  }

  if (paginaActual === "index.html" && estaLogueado) {
    // Usuario ya logueado, redirigir a página principal
    window.location.href = "main.html"
    return
  }

  // Inicializar funcionalidad específica de la página
  if (paginaActual === "index.html" || paginaActual === "") {
    // Página de login
  } else if (paginaActual === "main.html") {
    inicializarPaginaPrincipal()
  }
}

// Agregar transiciones suaves de página
window.addEventListener("beforeunload", () => {
  document.body.style.opacity = "0"
})

// Manejar navegación hacia atrás/adelante del navegador
window.addEventListener("popstate", () => {
  const estaLogueado = sessionStorage.getItem("estaLogueado") === "true"
  const paginaActual = window.location.pathname.split("/").pop() || "index.html"

  // Redirigir si el estado de autenticación no coincide con la página actual
  if (paginaActual === "main.html" && !estaLogueado) {
    window.location.href = "index.html"
  } else if (paginaActual === "index.html" && estaLogueado) {
    window.location.href = "main.html"
  }
})