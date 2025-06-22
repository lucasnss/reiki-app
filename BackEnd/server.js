const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

// ============================================
// IMPORTAR RUTAS
// ============================================
const authRoutes = require("./routes/auth")

const registroRoutes = require("./routes/registro")

// ============================================
// CONEXIÓN A MONGODB (UNA SOLA VEZ)
// ============================================
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/plataforma_cursos"

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Conectado a MongoDB")
    console.log("🏷️  Base de datos:", mongoose.connection.name)
  })
  .catch((error) => {
    console.error("❌ Error conectando a MongoDB:", error)
  })

// ============================================
// CONFIGURAR RUTAS
// ============================================
app.use("/api/auth", authRoutes)
app.use("/api", registroRoutes)

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando! 🚀")
})

// ============================================
// INICIAR SERVIDOR
// ============================================
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
  console.log(`📋 Endpoint de registro: http://localhost:${PORT}/api/registro`)
})
