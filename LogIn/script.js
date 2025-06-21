// Lógica de autenticación y navegación para el sitio web de la academia de bienestar

// ========================================
// SCRIPT DE VALIDACIÓN DE LOGIN
// Maneja la autenticación para la estructura de carpetas específica
// ========================================

// Credenciales hardcodeadas para validación
const CREDENCIALES_VALIDAS = {
  username: "admin",
  password: "1234",
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  console.log("Script de login cargado correctamente")

  // Inicializar la página de login
  inicializarLogin()
})

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
function manejarEnvioFormulario(evento) {
  // Prevenir el comportamiento por defecto (recarga de página)
  evento.preventDefault()

  console.log("Formulario enviado - procesando...")

  // Obtener los datos del formulario
  const formData = new FormData(evento.target)
  const usuario = formData.get("username").trim()
  const contraseña = formData.get("password").trim()

  console.log("Usuario ingresado:", usuario)
  console.log("Contraseña ingresada:", contraseña ? "***" : "vacía")

  // Limpiar mensajes de error previos
  ocultarMensajeError()

  // Validar que los campos no estén vacíos
  if (!usuario || !contraseña) {
    mostrarMensajeError("Por favor complete todos los campos")
    return
  }

  // Validar credenciales
  if (validarCredenciales(usuario, contraseña)) {
    console.log("Credenciales válidas - redirigiendo...")

    // Mostrar estado de carga
    mostrarEstadoCarga()

    // Simular un pequeño delay para mejor UX
    setTimeout(() => {
      // Guardar estado de autenticación
      sessionStorage.setItem("isLoggedIn", "true")
      sessionStorage.setItem("username", usuario)

      // Redirigir a la página de usuario
      window.location.href = "../user/indexUser.html"
    }, 1000)
  } else {
    console.log("Credenciales inválidas")

    // Mostrar mensaje de error
    mostrarMensajeError("Credenciales inválidas. Verifique su usuario y contraseña.")

    // Agregar efecto de sacudida al formulario
    agregarEfectoSacudida()
  }
}

/**
 * Validar credenciales contra valores hardcodeados
 * @param {string} usuario - Usuario ingresado
 * @param {string} contraseña - Contraseña ingresada
 * @returns {boolean} - True si las credenciales son válidas
 */
function validarCredenciales(usuario, contraseña) {
  return usuario === CREDENCIALES_VALIDAS.username && contraseña === CREDENCIALES_VALIDAS.password
}

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
        this.style.borderColor = "#00b894"
      } else {
        this.style.borderColor = "#e1e5e9"
      }
    })
  })
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

// Verificar si el usuario ya está logueado cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
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
    //inicializarPaginaLogin()
  } else if (paginaActual === "main.html") {
    inicializarPaginaPrincipal()
  }
})

/**
 * Inicializar funcionalidad de página de login
 * Configura validación de formulario y manejo de envío
 */
/*function inicializarPaginaLogin() {
  const formularioLogin = document.getElementById("formularioLogin")
  const mensajeError = document.getElementById("mensajeError")
  const botonLogin = formularioLogin.querySelector(".login-btn")

  // Manejar envío de formulario
  formularioLogin.addEventListener("submit", (e) => {
    e.preventDefault()

    // Obtener datos del formulario
    const datosFormulario = new FormData(formularioLogin)
    const usuario = datosFormulario.get("usuario").trim()
    const contraseña = datosFormulario.get("contraseña").trim()

    // Limpiar mensajes de error previos
    ocultarMensajeError()

    // Validar credenciales
    if (validarCredenciales(usuario, contraseña)) {
      // Mostrar estado de carga
      mostrarEstadoCargaLogin(botonLogin)

      // Simular retraso de autenticación para mejor UX
      setTimeout(() => {
        // Establecer estado de autenticación
        sessionStorage.setItem("estaLogueado", "true")
        sessionStorage.setItem("usuario", usuario)

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
      formularioLogin.style.animation = "shake 0.5s ease-in-out"
      setTimeout(() => {
        formularioLogin.style.animation = ""
      }, 500)
    }
  })
*/
  // Agregar retroalimentación de validación en tiempo real
  const inputs = formularioLogin.querySelectorAll("input")
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      // Limpiar mensaje de error cuando el usuario empieza a escribir
      if (mensajeError.style.display === "block") {
        ocultarMensajeError()
      }

      // Agregar retroalimentación visual para inputs llenos
      if (this.value.trim()) {
        this.style.borderColor = "#00b894"
      } else {
        this.style.borderColor = "#e1e5e9"
      }
    })
  })
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * Inicializar funcionalidad de página principal
 * Configura funcionalidad de logout e interacciones de cursos
 */
function inicializarPaginaPrincipal() {
  const botonLogout = document.getElementById("botonLogout")
  const tarjetasCurso = document.querySelectorAll(".course-card")
  const botonesCurso = document.querySelectorAll(".course-btn")

  // Manejar funcionalidad de logout
  botonLogout.addEventListener("click", () => {
    // Confirmar acción de logout
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      // Limpiar estado de autenticación
      sessionStorage.removeItem("estaLogueado")
      sessionStorage.removeItem("usuario")

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
  const usuario = sessionStorage.getItem("usuario")
  if (usuario) {
    // Crear notificación de bienvenida
    mostrarMensajeBienvenida(`¡Bienvenido de vuelta, ${usuario}!`)
  }
}

/**
 * Validar credenciales de usuario contra valores codificados
 * @param {string} usuario - El usuario ingresado
 * @param {string} contraseña - La contraseña ingresada
 * @returns {boolean} - Verdadero si las credenciales son válidas
 */
/*function validarCredenciales(usuario, contraseña) {
  return usuario === CREDENCIALES_VALIDAS.usuario && contraseña === CREDENCIALES_VALIDAS.contraseña
}*/

/**
 * Mostrar mensaje de error con animación
 * @param {string} mensaje - El mensaje de error a mostrar
 */
/*function mostrarMensajeError(mensaje) {
  const mensajeError = document.getElementById("mensajeError")
  mensajeError.textContent = mensaje
  mensajeError.style.display = "block"

  // Activar animación
  setTimeout(() => {
    mensajeError.style.opacity = "1"
  }, 10)
}*/

/**
 * Ocultar mensaje de error con transición suave
 */
/*function ocultarMensajeError() {
  const mensajeError = document.getElementById("mensajeError")
  mensajeError.style.opacity = "0"
  setTimeout(() => {
    mensajeError.style.display = "none"
  }, 300)
}*/

/**
 * Mostrar estado de carga en botón de login
 * @param {HTMLElement} boton - El elemento botón de login
 */
/*function mostrarEstadoCargaLogin(boton) {
  boton.classList.add("loading")
  boton.disabled = true

  const cargador = boton.querySelector(".btn-loader")
  const span = boton.querySelector("span")

  if (cargador && span) {
    cargador.style.display = "inline-block"
    span.textContent = "Iniciando Sesión..."
  }
}*/

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

// Agregar atajos de teclado para mejor accesibilidad
document.addEventListener("keydown", (e) => {
  // Alt + L para logout (en página principal)
  if (e.altKey && e.key === "l" && document.getElementById("botonLogout")) {
    e.preventDefault()
    document.getElementById("botonLogout").click()
  }

  // Tecla Enter para enviar formulario de login
  if (e.key === "Enter" && document.getElementById("formularioLogin")) {
    const elementoActivo = document.activeElement
    if (elementoActivo.tagName === "INPUT") {
      document.getElementById("formularioLogin").dispatchEvent(new Event("submit"))
    }
  }
})

// Agregar soporte táctil para dispositivos móviles
if ("ontouchstart" in window) {
  document.addEventListener("touchstart", () => {
    // Habilitar interacciones táctiles
  })
}

// JavaScript de Página de Aterrizaje de Terapias Holísticas
// Maneja navegación, acordeón de FAQ, envío de formulario y desplazamiento suave

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar toda la funcionalidad
  inicializarNavegacion()
  inicializarFAQ()
  inicializarFormularioContacto()
  inicializarEfectosDesplazamiento()
  inicializarAnimaciones()
})

/**
 * Funcionalidad de navegación
 * Maneja alternancia de menú móvil y efectos de desplazamiento de navbar
 */
function inicializarNavegacion() {
  const navbar = document.getElementById("navbar")
  const alternarMenu = document.getElementById("menuToggle")
  const menuNav = document.getElementById("navMenu")
  const enlacesNav = document.querySelectorAll(".nav-link")

  // Alternancia de menú móvil
  alternarMenu.addEventListener("click", function () {
    this.classList.toggle("active")
    menuNav.classList.toggle("active")

    // Prevenir desplazamiento del cuerpo cuando el menú está abierto
    document.body.style.overflow = menuNav.classList.contains("active") ? "hidden" : ""
  })

  // Cerrar menú móvil al hacer clic en enlaces de navegación
  enlacesNav.forEach((enlace) => {
    enlace.addEventListener("click", () => {
      alternarMenu.classList.remove("active")
      menuNav.classList.remove("active")
      document.body.style.overflow = ""
    })
  })

  // Efecto de desplazamiento de navbar
  let ultimoDesplazamientoArriba = 0
  window.addEventListener("scroll", () => {
    const desplazamientoArriba = window.pageYOffset || document.documentElement.scrollTop

    // Agregar clase scrolled para estilos
    if (desplazamientoArriba > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Ocultar/mostrar navbar al desplazarse (opcional)
    if (desplazamientoArriba > ultimoDesplazamientoArriba && desplazamientoArriba > 200) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }

    ultimoDesplazamientoArriba = desplazamientoArriba
  })

  // Desplazamiento suave para enlaces de anclaje
  document.querySelectorAll('a[href^="#"]').forEach((ancla) => {
    ancla.addEventListener("click", function (e) {
      e.preventDefault()
      const objetivo = document.querySelector(this.getAttribute("href"))

      if (objetivo) {
        const offsetTop = objetivo.offsetTop - 80 // Considerar navbar fijo
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

/**
 * Funcionalidad de acordeón FAQ
 * Maneja expansión/colapso de elementos FAQ
 */
function inicializarFAQ() {
  const elementosFaq = document.querySelectorAll(".faq-item")

  elementosFaq.forEach((elemento) => {
    const pregunta = elemento.querySelector(".faq-question")
    const respuesta = elemento.querySelector(".faq-answer")

    pregunta.addEventListener("click", function () {
      const estaExpandido = this.getAttribute("aria-expanded") === "true"

      // Cerrar todos los otros elementos FAQ
      elementosFaq.forEach((otroElemento) => {
        if (otroElemento !== elemento) {
          const otraPregunta = otroElemento.querySelector(".faq-question")
          const otraRespuesta = otroElemento.querySelector(".faq-answer")

          otraPregunta.setAttribute("aria-expanded", "false")
          otraRespuesta.classList.remove("active")
        }
      })

      // Alternar elemento actual
      this.setAttribute("aria-expanded", !estaExpandido)
      respuesta.classList.toggle("active")

      // Desplazamiento suave a pregunta si se está abriendo
      if (!estaExpandido) {
        setTimeout(() => {
          const offsetTop = elemento.offsetTop - 100
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }, 300)
      }
    })

    // Accesibilidad de teclado
    pregunta.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.click()
      }
    })
  })
}

/**
 * Funcionalidad de formulario de contacto
 * Maneja validación y envío de formulario
 */
function inicializarFormularioContacto() {
  const formularioContacto = document.getElementById("contactForm")
  const botonEnviar = formularioContacto.querySelector('button[type="submit"]')
  const cargador = botonEnviar.querySelector(".btn-loader")
  const textoBoton = botonEnviar.querySelector("span")

  formularioContacto.addEventListener("submit", async function (e) {
    e.preventDefault()

    // Obtener datos del formulario
    const datosFormulario = new FormData(this)
    const objetoFormulario = Object.fromEntries(datosFormulario.entries())

    // Validación básica
    if (!validarFormulario(objetoFormulario)) {
      mostrarNotificacion("Por favor completa todos los campos requeridos correctamente.", "error")
      return
    }

    // Mostrar estado de carga
    mostrarEstadoCargaContacto(botonEnviar, cargador, textoBoton)

    try {
      // Simular envío de formulario (reemplazar con llamada API real)
      await simularEnvioFormulario(objetoFormulario)

      // Retroalimentación de éxito
      mostrarNotificacion("¡Gracias por tu mensaje! Te responderemos pronto.", "success")
      formularioContacto.reset()
    } catch (error) {
      // Retroalimentación de error
      mostrarNotificacion("Lo siento, hubo un error enviando tu mensaje. Por favor intenta de nuevo.", "error")
      console.error("Error de envío de formulario:", error)
    } finally {
      // Ocultar estado de carga
      ocultarEstadoCarga(botonEnviar, cargador, textoBoton)
    }
  })

  // Retroalimentación de validación en tiempo real
  const inputs = formularioContacto.querySelectorAll("input, select, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validarCampo(this)
    })

    input.addEventListener("input", function () {
      // Limpiar estado de error cuando el usuario empieza a escribir
      this.classList.remove("error")
    })
  })
}

/**
 * Ayudante de validación de formulario
 * @param {Object} datosFormulario - Objeto de datos del formulario
 * @returns {boolean} - Resultado de validación
 */
function validarFormulario(datosFormulario) {
  const { name, email, interest } = datosFormulario

  // Verificar campos requeridos
  if (!name.trim() || !email.trim() || !interest) {
    return false
  }

  // Validar formato de email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regexEmail.test(email)) {
    return false
  }

  return true
}

/**
 * Validación de campo individual
 * @param {HTMLElement} campo - Elemento de campo del formulario
 */
function validarCampo(campo) {
  const valor = campo.value.trim()
  let esValido = true

  switch (campo.type) {
    case "email":
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      esValido = regexEmail.test(valor)
      break
    case "text":
    case "select-one":
      esValido = valor.length > 0
      break
  }

  // Agregar retroalimentación visual
  if (campo.hasAttribute("required") && !esValido) {
    campo.classList.add("error")
  } else {
    campo.classList.remove("error")
  }
}

/**
 * Simular envío de formulario (reemplazar con llamada API real)
 * @param {Object} datosFormulario - Objeto de datos del formulario
 * @returns {Promise} - Promesa de envío
 */
function simularEnvioFormulario(datosFormulario) {
  return new Promise((resolve, reject) => {
    // Simular retraso de red
    setTimeout(() => {
      // Simular éxito/fallo aleatorio para demo
      if (Math.random() > 0.1) {
        // 90% tasa de éxito
        resolve(datosFormulario)
      } else {
        reject(new Error("Error de red simulado"))
      }
    }, 2000)
  })
}

/**
 * Mostrar estado de carga en botón
 */
function mostrarEstadoCargaContacto(boton, cargador, elementoTexto) {
  boton.classList.add("loading")
  boton.disabled = true
  cargador.style.display = "inline-block"
  elementoTexto.textContent = "Enviando..."
}

/**
 * Ocultar estado de carga en botón
 */
function ocultarEstadoCarga(boton, cargador, elementoTexto) {
  boton.classList.remove("loading")
  boton.disabled = false
  cargador.style.display = "none"
  elementoTexto.textContent = "Enviar Mensaje"
}

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

/**
 * Inicializar efectos basados en desplazamiento
 */
function inicializarEfectosDesplazamiento() {
  // Intersection Observer para animaciones de aparición
  const opcionesObservador = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("fade-in")
        observador.unobserve(entrada.target)
      }
    })
  }, opcionesObservador)

  // Observar elementos para animación
  const elementosAnimar = document.querySelectorAll(".offering-card, .section-header, .about-text, .video-container")
  elementosAnimar.forEach((el) => {
    observador.observe(el)
  })
}

/**
 * Inicializar animaciones de página
 */
function inicializarAnimaciones() {
  // Agregar retrasos de animación escalonados a tarjetas de servicios
  const tarjetasServicios = document.querySelectorAll(".offering-card")
  tarjetasServicios.forEach((tarjeta, indice) => {
    tarjeta.style.animationDelay = `${indice * 0.1}s`
  })

  // Efecto parallax para fondo hero (opcional)
  window.addEventListener("scroll", () => {
    const desplazado = window.pageYOffset
    const fondoHero = document.querySelector(".hero-background")

    if (fondoHero && desplazado < window.innerHeight) {
      fondoHero.style.transform = `translateY(${desplazado * 0.5}px)`
    }
  })
}

/**
 * Función utilitaria para debounce de eventos de scroll
 * @param {Function} func - Función a debounce
 * @param {number} espera - Tiempo de espera en milisegundos
 * @returns {Function} - Función con debounce
 */
function debounce(func, espera) {
  let timeout
  return function funcionEjecutada(...args) {
    const despues = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(despues, espera)
  }
}

// Agregar estilos de error para validación de formulario
const estilo = document.createElement("style")
estilo.textContent = `
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
document.head.appendChild(estilo)

// Manejar cambios de visibilidad de página
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Página está oculta, pausar animaciones o temporizadores
    console.log("Página oculta - pausando animaciones")
  } else {
    // Página es visible, reanudar animaciones
    console.log("Página visible - reanudando animaciones")
  }
})

// Agregar soporte de navegación por teclado
document.addEventListener("keydown", (e) => {
  // Tecla Escape cierra menú móvil
  if (e.key === "Escape") {
    const alternarMenu = document.getElementById("menuToggle")
    const menuNav = document.getElementById("navMenu")

    if (menuNav.classList.contains("active")) {
      alternarMenu.classList.remove("active")
      menuNav.classList.remove("active")
      document.body.style.overflow = ""
    }
  }
})

// Agregar soporte táctil para dispositivos móviles
if ("ontouchstart" in window) {
  document.addEventListener("touchstart", () => {
    // Habilitar interacciones táctiles
  })
}

fetch("http://localhost:3001/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ usuario, contraseña })
})
.then(res => res.json())
.then(data => {
  if (data.mensaje) {
    // login ok
    sessionStorage.setItem("estaLogueado", "true")
    window.location.href = "../user/indexUser.html"
  } else {
    alert(data.error)
  }
})
