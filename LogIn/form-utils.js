// ========================================
// UTILIDADES DE FORMULARIOS
// Funciones de validación y manejo de formularios
// ========================================

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