// ========================================
// EFECTOS Y ANIMACIONES
// Maneja animaciones, efectos de scroll y transiciones
// ========================================

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