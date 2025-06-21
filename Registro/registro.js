// ============================================
// CONFIGURACIÓN DE CONEXIÓN AL BACKEND
// ============================================
const API_BASE_URL = "http://localhost:3001" // URL del servidor backend
const REGISTRO_ENDPOINT = "/api/registro" // Endpoint de registro

// ============================================
// ELEMENTOS DEL DOM
// ============================================
const form = document.getElementById("registroForm")
const nombreInput = document.getElementById("nombre")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const confirmarPasswordInput = document.getElementById("confirmar_password")
const registroBtn = document.querySelector(".registro-btn")
const btnText = document.querySelector(".btn-text")
const loadingIcon = document.querySelector(".loading-icon")
const mensaje = document.getElementById("mensaje")

// Elementos de error
const nombreError = document.getElementById("nombreError")
const emailError = document.getElementById("emailError")
const passwordError = document.getElementById("passwordError")
const confirmarError = document.getElementById("confirmarError")

// ============================================
// FUNCIONES DE VALIDACIÓN
// ============================================

function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validarPassword(password) {
  // Mínimo 6 caracteres
  return password.length >= 6
}

function validarNombre(nombre) {
  // Mínimo 2 caracteres, solo letras y espacios
  const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/
  return nombreRegex.test(nombre.trim())
}

function limpiarErrores() {
  nombreError.textContent = ""
  emailError.textContent = ""
  passwordError.textContent = ""
  confirmarError.textContent = ""
}

function mostrarError(elemento, mensaje) {
  elemento.textContent = mensaje
}

function validarFormulario() {
  limpiarErrores()
  let esValido = true

  // Validar nombre
  if (!validarNombre(nombreInput.value)) {
    mostrarError(nombreError, "El nombre debe tener al menos 2 caracteres y solo contener letras")
    esValido = false
  }

  // Validar email
  if (!validarEmail(emailInput.value)) {
    mostrarError(emailError, "Por favor ingresa un email válido")
    esValido = false
  }

  // Validar contraseña
  if (!validarPassword(passwordInput.value)) {
    mostrarError(passwordError, "La contraseña debe tener al menos 6 caracteres")
    esValido = false
  }

  // Validar confirmación de contraseña
  if (passwordInput.value !== confirmarPasswordInput.value) {
    mostrarError(confirmarError, "Las contraseñas no coinciden")
    esValido = false
  }

  return esValido
}

// ============================================
// FUNCIÓN PRINCIPAL DE REGISTRO
// ============================================

async function registrarUsuario(datosUsuario) {
  try {
    console.log("🔄 Enviando datos al servidor...", datosUsuario)

    // ============================================
    // CONEXIÓN AL BACKEND - PARTE CRÍTICA
    // ============================================
    const response = await fetch(`${API_BASE_URL}${REGISTRO_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(datosUsuario),
    })

    console.log("📡 Respuesta del servidor:", response.status)

    // Parsear la respuesta JSON
    const resultado = await response.json()
    console.log("📦 Datos recibidos:", resultado)

    if (response.ok) {
      // Registro exitoso
      mostrarMensaje("¡Registro exitoso! Bienvenido a la plataforma", "success")
      form.reset()

      // Opcional: redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = "../User/indexUser.html"
      }, 2000)
    } else {
      // Error del servidor
      throw new Error(resultado.mensaje || "Error en el registro")
    }
  } catch (error) {
    console.error("❌ Error en el registro:", error)

    // Manejar diferentes tipos de errores
    if (error.message.includes("fetch")) {
      mostrarMensaje("Error de conexión. Verifica que el servidor esté funcionando.", "error")
    } else {
      mostrarMensaje(error.message, "error")
    }
  }
}

// ============================================
// FUNCIONES DE UI
// ============================================

function mostrarCargando(mostrar) {
  if (mostrar) {
    registroBtn.disabled = true
    btnText.textContent = "Registrando..."
    loadingIcon.style.display = "inline-block"
  } else {
    registroBtn.disabled = false
    btnText.textContent = "Registrarse"
    loadingIcon.style.display = "none"
  }
}

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto
  mensaje.className = `mensaje ${tipo}`
  mensaje.style.display = "block"

  // Ocultar mensaje después de 5 segundos
  setTimeout(() => {
    mensaje.style.display = "none"
  }, 5000)
}

// ============================================
// EVENT LISTENERS
// ============================================

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  console.log("🚀 Iniciando proceso de registro...")

  // Validar formulario
  if (!validarFormulario()) {
    console.log("❌ Validación fallida")
    return
  }

  // Mostrar estado de carga
  mostrarCargando(true)

  // Preparar datos para enviar
  const datosUsuario = {
    nombre: nombreInput.value.trim(),
    email: emailInput.value.trim().toLowerCase(),
    password: passwordInput.value,
  }

  console.log("📋 Datos preparados:", { ...datosUsuario, password: "[OCULTO]" })

  // Enviar al servidor
  await registrarUsuario(datosUsuario)

  // Ocultar estado de carga
  mostrarCargando(false)
})

// Validación en tiempo real
nombreInput.addEventListener("blur", () => {
  if (nombreInput.value && !validarNombre(nombreInput.value)) {
    mostrarError(nombreError, "El nombre debe tener al menos 2 caracteres y solo contener letras")
  } else {
    nombreError.textContent = ""
  }
})

emailInput.addEventListener("blur", () => {
  if (emailInput.value && !validarEmail(emailInput.value)) {
    mostrarError(emailError, "Por favor ingresa un email válido")
  } else {
    emailError.textContent = ""
  }
})

passwordInput.addEventListener("blur", () => {
  if (passwordInput.value && !validarPassword(passwordInput.value)) {
    mostrarError(passwordError, "La contraseña debe tener al menos 6 caracteres")
  } else {
    passwordError.textContent = ""
  }
})

confirmarPasswordInput.addEventListener("blur", () => {
  if (confirmarPasswordInput.value && passwordInput.value !== confirmarPasswordInput.value) {
    mostrarError(confirmarError, "Las contraseñas no coinciden")
  } else {
    confirmarError.textContent = ""
  }
})

console.log("✅ Sistema de registro inicializado correctamente")
