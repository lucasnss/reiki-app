const express = require("express")
const bcrypt = require("bcrypt")
const Usuario = require("../models/usuario")
const router = express.Router()

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

module.exports = router