// ========================================
// SISTEMA DE AUTENTICACIÓN DE LOGIN
// Maneja la validación y autenticación de usuarios
// ========================================

/**
 * Inicializar funcionalidad de la página de login
 */
function inicializarLogin() {
  const formularioLogin = document.getElementById("loginForm")
  const mensajeError = document.getElementById("errorMessage")

  // Verificar que los elementos existen
  if (!formularioLogin) {
    console.error("No se encontró el formulario de login")
    return
  }

  if (!mensajeError) {
    console.error("No se encontró el contenedor de mensajes de error")
    return
  }

  // Ocultar mensaje de error inicialmente
  mensajeError.style.display = "none"

  // Agregar event listener al formulario
  formularioLogin.addEventListener("submit", manejarEnvioFormulario)

  // Agregar retroalimentación en tiempo real a los inputs
  agregarRetroalimentacionInputs()

  console.log("Página de login inicializada correctamente")
}

/**
 * Manejar el envío del formulario de login
 * @param {Event} evento - Evento de envío del formulario
 */
async function manejarEnvioFormulario(evento) {
  // Prevenir el comportamiento por defecto (recarga de página)
  evento.preventDefault()

  console.log("Formulario enviado - procesando...")

  // Obtener los datos del formulario
  const formData = new FormData(evento.target)
  const usuario = formData.get("username").trim()
  const contraseña = formData.get("password").trim()

  console.log("Usuario ingresado:", usuario)

  // Limpiar mensajes de error previos
  ocultarMensajeError()

  // Validar que los campos no estén vacíos
  if (!usuario || !contraseña) {
    mostrarMensajeError("Por favor complete todos los campos")
    return
  }

  // Mostrar estado de carga
  mostrarEstadoCarga()

  try {
    const esValido = await validarCredenciales(usuario, contraseña)
    
    if (esValido) {
      console.log("Credenciales válidas - redirigiendo...")
      
      // Guardar estado de autenticación
      sessionStorage.setItem("isLoggedIn", "true")
      sessionStorage.setItem("username", usuario)
      
      // Redirigir a la página de usuario
      setTimeout(() => {
        window.location.href = "../User/indexUser.html"
      }, 1000)
    } else {
      console.log("Credenciales inválidas")
      mostrarMensajeError("Credenciales inválidas. Verifique su usuario y contraseña.")
      agregarEfectoSacudida()
      resetearBotonLogin()
    }
  } catch (error) {
    console.error("Error durante el login:", error)
    mostrarMensajeError("Error de conexión. Por favor intente nuevamente.")
    resetearBotonLogin()
  }
}

/**
 * Validar credenciales contra la base de datos
 * @param {string} usuario - Usuario ingresado
 * @param {string} contraseña - Contraseña ingresada
 * @returns {boolean} - True si las credenciales son válidas
 */
async function validarCredenciales(usuario, contraseña) {
  try {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        usuario: usuario, 
        contraseña: contraseña 
      })
    })

    const data = await response.json()
    
    if (response.ok && data.success) {
      return true
    } else {
      console.log("Error de login:", data.error || data.mensaje)
      return false
    }
  } catch (error) {
    console.error("Error de conexión:", error)
    throw error
  }
}

/**
 * Resetear el botón después de error
 */
function resetearBotonLogin() {
  const botonLogin = document.querySelector(".registro-btn")
  const spanTexto = botonLogin.querySelector("span")
  const cargador = botonLogin.querySelector(".btn-loader")
  
  if (botonLogin && spanTexto) {
    botonLogin.disabled = false
    botonLogin.classList.remove("loading")
    spanTexto.textContent = "Iniciar Sesión"
    
    if (cargador) {
      cargador.style.display = "none"
    }
  }
}

/**
 * Agregar retroalimentación visual a los inputs
 */
function agregarRetroalimentacionInputs() {
  const inputs = document.querySelectorAll("#loginForm input")

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      // Ocultar mensaje de error cuando el usuario empiece a escribir
      ocultarMensajeError()

      // Cambiar color del borde según si tiene contenido
      if (this.value.trim()) {
        this.style.borderColor = "#a0522d"
      } else {
        this.style.borderColor = "#e1e5e9"
      }
    })
  })
}