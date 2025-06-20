// ========================================
// MÓDULO DE LÓGICA PRINCIPAL
// Maneja la inicialización y coordinación general de la aplicación
// ========================================

/**
 * Inicializar funcionalidad de página de login
 * Configura validación de formulario y manejo de envío
 */
function inicializarPaginaLogin() {
  const formularioLogin = document.getElementById("formularioLogin")

  if (formularioLogin) {
    // Manejar envío de formulario
    formularioLogin.addEventListener("submit", manejarLogin)

    console.log("Página de login inicializada correctamente")
  }
}

/**
 * Inicializar funcionalidad de página principal
 * Configura funcionalidad de logout e interacciones de cursos
 */
function inicializarPaginaPrincipal() {
  const botonCerrarSesion = document.getElementById("botonCerrarSesion")

  if (botonCerrarSesion) {
    // Manejar funcionalidad de logout
    botonCerrarSesion.addEventListener("click", manejarLogout)

    // Agregar mensaje de bienvenida con nombre de usuario
    const usuario = obtenerUsuarioSesion()
    if (usuario) {
      // Crear notificación de bienvenida
      mostrarNotificacionBienvenida(`¡Bienvenido de vuelta, ${usuario}!`)
    }

    console.log("Página principal inicializada correctamente")
  }
}

/**
 * Determinar qué página se está cargando e inicializar apropiadamente
 */
function inicializarPaginaActual() {
  const paginaActual = window.location.pathname.split("/").pop() || "index.html"

  // Verificar autenticación antes de inicializar
  if (!verificarAutenticacion()) {
    return // La verificación manejará la redirección
  }

  // Inicializar funcionalidad específica de la página
  if (paginaActual === "index.html" || paginaActual === "") {
    inicializarPaginaLogin()
  } else if (paginaActual === "main.html") {
    inicializarPaginaPrincipal()
  }
}

/**
 * Agregar atajos de teclado para mejor accesibilidad
 */
function inicializarAtajosTeclado() {
  document.addEventListener("keydown", (evento) => {
    // Alt + L para logout (en página principal)
    if (evento.altKey && evento.key === "l" && document.getElementById("botonCerrarSesion")) {
      evento.preventDefault()
      document.getElementById("botonCerrarSesion").click()
    }

    // Tecla Enter para enviar formulario de login
    if (evento.key === "Enter" && document.getElementById("formularioLogin")) {
      const elementoActivo = document.activeElement
      if (elementoActivo.tagName === "INPUT") {
        document.getElementById("formularioLogin").dispatchEvent(new Event("submit"))
      }
    }
  })
}

/**
 * Agregar soporte táctil para dispositivos móviles
 */
function inicializarSoporteTactil() {
  if ("ontouchstart" in window) {
    document.addEventListener("touchstart", () => {
      // Habilitar interacciones táctiles
      console.log("Soporte táctil habilitado")
    })
  }
}

/**
 * Función principal de inicialización
 * Se ejecuta cuando el DOM está completamente cargado
 */
function inicializarAplicacion() {
  console.log("Iniciando aplicación Academia de Bienestar...")

  // Inicializar página actual
  inicializarPaginaActual()

  // Inicializar funcionalidades globales
  inicializarAtajosTeclado()
  inicializarSoporteTactil()

  console.log("Aplicación inicializada correctamente")
}

// Verificar si el usuario ya está logueado cuando se carga la página
document.addEventListener("DOMContentLoaded", inicializarAplicacion)

// Manejar errores globales
window.addEventListener("error", (evento) => {
  console.error("Error en la aplicación:", evento.error)
})

// Manejar errores de promesas no capturadas
window.addEventListener("unhandledrejection", (evento) => {
  console.error("Promesa rechazada no manejada:", evento.reason)
})



// Declaración de variables faltantes (asumiendo que están definidas en otro archivo o contexto)
let manejarLogin
let manejarLogout
let obtenerUsuarioSesion
let mostrarNotificacionBienvenida
let verificarAutenticacion
