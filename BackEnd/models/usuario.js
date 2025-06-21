const mongoose = require("mongoose")

// ============================================
// ESQUEMA ÚNICO DE USUARIO (EXPANDIDO)
// ============================================
const UsuarioSchema = new mongoose.Schema(
  {
    // Campos originales (para compatibilidad con tu login existente)
    usuario: {
      type: String,
      required: false, // Opcional para mantener compatibilidad
      unique: true,
      sparse: true, // Permite que sea único solo si existe
    },
    contraseña: {
      type: String,
      required: false, // Opcional para mantener compatibilidad
    },

    // Campos nuevos para el registro completo
    nombre: {
      type: String,
      required: function () {
        return !this.usuario // Requerido si no hay campo 'usuario'
      },
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede exceder 50 caracteres"],
    },
    email: {
      type: String,
      required: function () {
        return !this.usuario // Requerido si no hay campo 'usuario'
      },
      unique: true,
      sparse: true, // Permite que sea único solo si existe
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"],
    },
    password: {
      type: String,
      required: function () {
        return !this.contraseña // Requerido si no hay campo 'contraseña'
      },
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    fechaRegistro: {
      type: Date,
      default: Date.now,
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Índices para mejorar rendimiento
UsuarioSchema.index({ email: 1 })
UsuarioSchema.index({ usuario: 1 })

module.exports = mongoose.model("Usuario", UsuarioSchema)
