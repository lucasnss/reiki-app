// ========================================
// MÓDULO DE AUTENTICACIÓN
// Maneja el login, logout y validación de credenciales
// ========================================

// Credenciales codificadas para propósitos de demostración
const CREDENCIALES_VALIDAS = {
  usuario: "admin",
  contraseña: "1234",
}

/**
 * Validar credenciales de usuario contra valores codificados
 * @param {string} usuario - El usuario ingresado
 * @param {string} contraseña - La contraseña ingresada
 * @returns {boolean} - Verdadero si las credenciales son válidas
 */
function validarCredenciales(usuario, contraseña) {
  return usuario === CREDENCIALES_VALIDAS.usuario && contraseña === CREDENCIALES_VALIDAS.contraseña
}

/**
 * Establecer estado de autenticación en sessionStorage
 * @param {string} usuario - Nombre de usuario para guardar
 */
function establecerSesion(usuario) {
  sessionStorage.setItem("estaLogueado", "true")
  sessionStorage.setItem("usuario", usuario)
}

/**
 * Limpiar estado de autenticación
 */
function limpiarSesion() {
  sessionStorage.removeItem("estaLogueado")
  sessionStorage.removeItem("usuario")
}

/**
 * Verificar si el usuario está logueado
 * @returns {boolean} - Estado de autenticación
 */
function estaUsuarioLogueado() {
  return sessionStorage.getItem("estaLogueado") === "true"
}

/**
 * Obtener nombre de usuario de la sesión
 * @returns {string|null} - Nombre de usuario o null
 */
function obtenerUsuarioSesion() {
  return sessionStorage.getItem("usuario")
}

/**
 * Manejar proceso de login
 * @param {Event} evento - Evento de envío del formulario
 */
function manejarLogin(evento) {
  evento.preventDefault()

  const formulario = evento.target
  const datosFormulario = new FormData(formulario)
  const usuario = datosFormulario.get("usuario").trim()
  const contraseña = datosFormulario.get("contraseña").trim()
  const botonLogin = formulario.querySelector(".boton-login")

  // Limpiar mensajes de error previos
  ocultarMensajeError()

  // Validar credenciales
  if (validarCredenciales(usuario, contraseña)) {
    // Mostrar estado de carga
    mostrarEstadoCarga(botonLogin)

    // Simular retraso de autenticación para mejor UX
    setTimeout(() => {
      // Establecer estado de autenticación
      establecerSesion(usuario)

      // Redirigir a página principal con transición suave
      document.body.style.opacity = "0"
      setTimeout(() => {
        window.location.href = "main.html"
      }, 300)
    }, 1000)
  } else {
    // Mostrar mensaje de error para credenciales inválidas
    mostrarMensajeError("Usuario o contraseña inválidos. Por favor intenta de nuevo.")

    // Agregar animación de sacudida al formulario
    formulario.style.animation = "sacudir 0.5s ease-in-out"
    setTimeout(() => {
      formulario.style.animation = ""
    }, 500)
  }
}

/**
 * Manejar proceso de logout
 */
function manejarLogout() {
  // Confirmar acción de logout
  if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
    // Limpiar estado de autenticación
    limpiarSesion()

    // Agregar efecto de desvanecimiento
    document.body.style.opacity = "0"
    setTimeout(() => {
      window.location.href = "index.html"
    }, 300)
  }
}

/**
 * Mostrar mensaje de error con animación
 * @param {string} mensaje - El mensaje de error a mostrar
 */
function mostrarMensajeError(mensaje) {
  const mensajeError = document.getElementById("mensajeError")
  if (mensajeError) {
    mensajeError.textContent = mensaje
    mensajeError.style.display = "block"

    // Activar animación
    setTimeout(() => {
      mensajeError.style.opacity = "1"
    }, 10)
  }
}

/**
 * Ocultar mensaje de error con transición suave
 */
function ocultarMensajeError() {
  const mensajeError = document.getElementById("mensajeError")
  if (mensajeError) {
    mensajeError.style.opacity = "0"
    setTimeout(() => {
      mensajeError.style.display = "none"
    }, 300)
  }
}

/**
 * Mostrar estado de carga en botón de login
 * @param {HTMLElement} boton - El elemento botón de login
 */
function mostrarEstadoCarga(boton) {
  boton.classList.add("cargando")
  boton.disabled = true

  const cargador = boton.querySelector(".cargador-boton")
  const span = boton.querySelector("span")

  if (cargador && span) {
    cargador.style.display = "inline-block"
    span.textContent = "Iniciando Sesión..."
  }
}

/**
 * Verificar autenticación y redirigir si es necesario
 */
function verificarAutenticacion() {
  const paginaActual = window.location.pathname.split("/").pop() || "indexUser.html"
  const estaLogueado = estaUsuarioLogueado()

  // Lógica de redirección basada en estado de autenticación
  if (paginaActual === "indexUser.html" && !estaLogueado) {
    // Usuario tratando de acceder a página principal sin login
    window.location.href = "../LogIn/indexLog.html"
    return false
  }


  if (paginaActual === "indexLog.html" && estaLogueado) {
    // Usuario ya logueado, redirigir a página principal
    window.location.href = "indexUser.html"
    return false
  }

  return true
}

// Manejar navegación hacia atrás/adelante del navegador
window.addEventListener("popstate", () => {
  verificarAutenticacion()
})

// Maneja la funcionalidad de cerrar sesión
logoutBtn.addEventListener("click", () => {
  // Confirma la acción de cerrar sesión
  if (confirm("Quieres cerrar sesion?")) {
    // Borra el estado de autenticación
    sessionStorage.removeItem("isLoggedIn")
    sessionStorage.removeItem("username")

    // Agrega efecto de desvanecimiento y redirige al login
    document.body.style.opacity = "0"
    setTimeout(() => {
      window.location.href = "../Inicio/indexInicio.html"
    }, 300)
  }
})

// Registro de nuevo usuario
router.post("/registro", async (req, res) => {
  const { usuario, contraseña } = req.body

  try {
    const nuevoUsuario = new Usuario({ usuario, contraseña })
    await nuevoUsuario.save()
    res.status(201).json({ mensaje: "Usuario registrado correctamente" })
  } catch (error) {
    res.status(400).json({ error: "Ese usuario ya existe o hubo un error" })
  }
})
