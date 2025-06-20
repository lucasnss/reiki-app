const express = require("express")
const router = express.Router()
const Usuario = require("../models/usuario.js")

// Registro
router.post("/registro", async (req, res) => {
  const { usuario, contraseña } = req.body

  try {
    const nuevoUsuario = new Usuario({ usuario, contraseña })
    await nuevoUsuario.save()
    res.status(201).json({ mensaje: "Usuario registrado con éxito" })
  } catch (err) {
    res.status(400).json({ error: "Ese usuario ya existe" })
  }
})

// Login
router.post("/login", async (req, res) => {
  const { usuario, contraseña } = req.body

  try {
    const usuarioEncontrado = await Usuario.findOne({ usuario })

    if (!usuarioEncontrado || usuarioEncontrado.contraseña !== contraseña) {
      return res.status(401).json({ error: "Credenciales inválidas" })
    }

    res.status(200).json({ mensaje: "Login correcto" })
  } catch (err) {
    res.status(500).json({ error: "Error del servidor" })
  }
})

module.exports = router

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
