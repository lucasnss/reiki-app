const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/miProyecto", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Conectado a MongoDB")
}).catch((error) => {
  console.error("❌ Error al conectar con MongoDB:", error)
})

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando!")
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
})

const authRoutes = require("./routes/auth")
app.use("/api/auth", authRoutes)