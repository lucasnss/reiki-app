const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const Usuario = require("../models/usuario.js")

// ============================================
// REGISTRO COMPLETO CON BCRYPT
// ============================================
router.post("/registro", async (req, res) => {
  console.log("📨 Nueva solicitud de registro recibida")
  console.log("📦 Datos recibidos:", { ...req.body, password: "[OCULTO]" })

  try {
    const { nombre, email, password } = req.body

    // Validaciones
    if (!nombre || !email || !password) {
      return res.status(400).json({
        success: false,
        mensaje: "Todos los campos son obligatorios",
      })
    }

    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ email: email.toLowerCase() })
    if (usuarioExistente) {
      return res.status(409).json({
        success: false,
        mensaje: "Este email ya está registrado",
      })
    }

    // Hash de la contraseña
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre: nombre.trim(),
      email: email.toLowerCase().trim(),
      password: passwordHash,
    })

    const usuarioGuardado = await nuevoUsuario.save()

    res.status(201).json({
      success: true,
      mensaje: "Usuario registrado exitosamente",
      usuario: {
        id: usuarioGuardado._id,
        nombre: usuarioGuardado.nombre,
        email: usuarioGuardado.email,
        fechaRegistro: usuarioGuardado.fechaRegistro,
      },
    })
  } catch (error) {
    console.error("❌ Error en el registro:", error)

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        mensaje: "Este email ya está registrado",
      })
    }

    res.status(500).json({
      success: false,
      mensaje: "Error interno del servidor",
    })
  }
})

// ============================================
// LOGIN CON BCRYPT Y SOPORTE PARA EMAIL/USUARIO
// ============================================
router.post("/login", async (req, res) => {
  console.log("🔐 Nueva solicitud de login recibida")
  
  try {
    const { usuario, contraseña } = req.body

    if (!usuario || !contraseña) {
      return res.status(400).json({
        success: false,
        error: "Usuario y contraseña son requeridos"
      })
    }

    // Buscar usuario por email o por campo usuario
    let usuarioEncontrado = await Usuario.findOne({
      $or: [
        { email: usuario.toLowerCase() },
        { usuario: usuario }
      ]
    })

    if (!usuarioEncontrado) {
      return res.status(401).json({
        success: false,
        error: "Credenciales inválidas"
      })
    }

    // Verificar contraseña
    let contraseñaValida = false

    if (usuarioEncontrado.password) {
      // Usuario registrado con el nuevo sistema (bcrypt)
      contraseñaValida = await bcrypt.compare(contraseña, usuarioEncontrado.password)
    } else if (usuarioEncontrado.contraseña) {
      // Usuario del sistema antiguo (sin bcrypt)
      contraseñaValida = usuarioEncontrado.contraseña === contraseña
    }

    if (!contraseñaValida) {
      return res.status(401).json({
        success: false,
        error: "Credenciales inválidas"
      })
    }

    res.status(200).json({
      success: true,
      mensaje: "Login correcto",
      usuario: {
        id: usuarioEncontrado._id,
        nombre: usuarioEncontrado.nombre || usuarioEncontrado.usuario,
        email: usuarioEncontrado.email
      }
    })

  } catch (error) {
    console.error("❌ Error en el login:", error)
    res.status(500).json({
      success: false,
      error: "Error del servidor"
    })
  }
})

module.exports = router