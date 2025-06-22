// ========================================
// FUNCIONALIDAD DE PÁGINA PRINCIPAL
// Maneja logout, cursos y interacciones de usuario
// ========================================

/**
 * Inicializar funcionalidad de página principal
 * Configura funcionalidad de logout e interacciones de cursos
 */
function inicializarPaginaPrincipal() {
  const botonLogout = document.getElementById("botonLogout")
  const tarjetasCurso = document.querySelectorAll(".course-card")
  const botonesCurso = document.querySelectorAll(".course-btn")

  // Verificar si los elementos existen antes de agregar listeners
  if (!botonLogout) {
    console.log("Elementos de página principal no encontrados")
    return
  }

  // Manejar funcionalidad de logout
  botonLogout.addEventListener("click", () => {
    // Confirmar acción de logout
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      // Limpiar estado de autenticación
      sessionStorage.removeItem("estaLogueado")
      sessionStorage.removeItem("usuario")
      sessionStorage.removeItem("isLoggedIn")
      sessionStorage.removeItem("username")

      // Agregar efecto de desvanecimiento
      document.body.style.opacity = "0"
      setTimeout(() => {
        window.location.href = "index.html"
      }, 300)
    }
  })

  // Agregar efectos hover e interacciones a tarjetas de curso
  tarjetasCurso.forEach((tarjeta, indice) => {
    // Agregar retraso de animación escalonada
    tarjeta.style.animationDelay = `${indice * 0.1}s`

    // Agregar interacción de clic para tarjetas de curso
    tarjeta.addEventListener("click", function (e) {
      // No activar si se hace clic en el botón
      if (!e.target.classList.contains("course-btn")) {
        // Agregar efecto de pulso
        this.style.transform = "scale(0.98)"
        setTimeout(() => {
          this.style.transform = ""
        }, 150)
      }
    })
  })

  // Manejar clics en botones de curso
  botonesCurso.forEach((boton) => {
    boton.addEventListener("click", function (e) {
      e.stopPropagation()

      // Obtener título del curso
      const tituloCurso = this.closest(".course-card").querySelector("h3").textContent

      // Mostrar retroalimentación de selección de curso
      this.textContent = "¡Seleccionado!"
      this.style.background = "linear-gradient(135deg, #00b894 0%, #00cec9 100%)"

      // Resetear botón después de retraso
      setTimeout(() => {
        this.textContent = "Conocer Más"
        this.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }, 2000)

      // Aquí podrías agregar lógica real de inscripción a cursos
      console.log(`Usuario interesado en: ${tituloCurso}`)
    })
  })

  // Agregar mensaje de bienvenida con nombre de usuario
  const usuario = sessionStorage.getItem("usuario") || sessionStorage.getItem("username")
  if (usuario) {
    // Crear notificación de bienvenida
    mostrarMensajeBienvenida(`¡Bienvenido de vuelta, ${usuario}!`)
  }
}