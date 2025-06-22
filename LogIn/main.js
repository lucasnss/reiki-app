// ========================================
// ARCHIVO PRINCIPAL DE INICIALIZACIÓN
// Coordina la inicialización de todos los módulos
// ========================================

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  console.log("Sistema cargado correctamente")

  // Verificar autenticación y redirigir
  verificarAutenticacionYRedirigir()

  // Inicializar sistema de login
  inicializarLogin()

  // Inicializar landing page (si los elementos existen)
  inicializarLandingPage()

  // Agregar event listeners globales
  inicializarEventListenersGlobales()
})

/**
 * Inicializar event listeners globales
 */
function inicializarEventListenersGlobales() {
  // Agregar atajos de teclado para mejor accesibilidad
  document.addEventListener("keydown", (e) => {
    // Alt + L para logout (en página principal)
    if (e.altKey && e.key === "l" && document.getElementById("botonLogout")) {
      e.preventDefault()
      document.getElementById("botonLogout").click()
    }

    // Tecla Enter para enviar formulario de login
    if (e.key === "Enter" && document.getElementById("loginForm")) {
      const elementoActivo = document.activeElement
      if (elementoActivo.tagName === "INPUT") {
        document.getElementById("loginForm").dispatchEvent(new Event("submit"))
      }
    }

    // Tecla Escape cierra menú móvil
    if (e.key === "Escape") {
      const alternarMenu = document.getElementById("menuToggle")
      const menuNav = document.getElementById("navMenu")

      if (menuNav && menuNav.classList.contains("active")) {
        alternarMenu.classList.remove("active")
        menuNav.classList.remove("active")
        document.body.style.overflow = ""
      }
    }
  })

  // Manejar cambios de visibilidad de página
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      console.log("Página oculta - pausando animaciones")
    } else {
      console.log("Página visible - reanudando animaciones")
    }
  })

  // Agregar soporte táctil para dispositivos móviles
  if ("ontouchstart" in window) {
    document.addEventListener("touchstart", () => {
      // Habilitar interacciones táctiles
    })
  }
}

// Agregar estilos CSS adicionales
const estilosAdicionales = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #f56565;
        box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.1);
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }

    .notification-close:hover {
        opacity: 0.8;
    }
`

if (!document.querySelector("#estilos-adicionales")) {
  const styleElement = document.createElement("style")
  styleElement.id = "estilos-adicionales"
  styleElement.textContent = estilosAdicionales
  document.head.appendChild(styleElement)
}