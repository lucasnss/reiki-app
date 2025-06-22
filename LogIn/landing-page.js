// ========================================
// FUNCIONALIDAD DE LANDING PAGE
// Maneja navegación, FAQ, formularios de contacto y efectos
// ========================================

/**
 * Inicializar toda la funcionalidad de landing page
 */
function inicializarLandingPage() {
  inicializarNavegacion()
  inicializarFAQ()
  inicializarFormularioContacto()
  inicializarEfectosDesplazamiento()
  inicializarAnimaciones()
}

/**
 * Funcionalidad de navegación
 * Maneja alternancia de menú móvil y efectos de desplazamiento de navbar
 */
function inicializarNavegacion() {
  const navbar = document.getElementById("navbar")
  const alternarMenu = document.getElementById("menuToggle")
  const menuNav = document.getElementById("navMenu")
  const enlacesNav = document.querySelectorAll(".nav-link")

  // Verificar si los elementos existen
  if (!navbar || !alternarMenu || !menuNav) {
    console.log("Elementos de navegación no encontrados")
    return
  }

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

  if (elementosFaq.length === 0) {
    console.log("Elementos FAQ no encontrados")
    return
  }

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
  
  if (!formularioContacto) {
    console.log("Formulario de contacto no encontrado")
    return
  }

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