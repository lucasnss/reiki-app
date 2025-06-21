# Sistema de Registro con MongoDB

Sistema completo de registro de usuarios para plataforma de cursos con frontend y backend.

## 🚀 Características

- **Frontend**: HTML5 + CSS3 + JavaScript vanilla
- **Backend**: Node.js + Express + MongoDB + Mongoose
- **Seguridad**: Hash de contraseñas con bcrypt
- **Validación**: Cliente y servidor
- **Diseño**: Responsive con tema morado

## 📋 Requisitos Previos

1. **Node.js** (versión 16 o superior)
2. **MongoDB** (local o MongoDB Atlas)
3. **npm** o **yarn**

## 🛠️ Instalación

### 1. Clonar e instalar dependencias
\`\`\`bash
npm install
\`\`\`

### 2. Configurar MongoDB

#### Opción A: MongoDB Local
\`\`\`bash
# Instalar MongoDB localmente
# La URL por defecto será: mongodb://localhost:27017/plataforma_cursos
\`\`\`

#### Opción B: MongoDB Atlas (Nube)
\`\`\`bash
# Crear cuenta en MongoDB Atlas
# Obtener string de conexión
# Configurar variable de entorno MONGODB_URI
export MONGODB_URI="mongodb+srv://usuario:password@cluster.mongodb.net/plataforma_cursos"
\`\`\`

### 3. Iniciar el servidor
\`\`\`bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
\`\`\`

## 🌐 Uso

1. **Abrir navegador**: `http://localhost:3000`
2. **Completar formulario** con:
   - Nombre completo
   - Email válido
   - Contraseña (mínimo 6 caracteres)
   - Confirmar contraseña
3. **Hacer clic en "Registrarse"**

## 📁 Estructura del Proyecto

\`\`\`
├── public/
│   ├── registro.html      # Formulario de registro
│   ├── styles.css         # Estilos CSS
│   └── registro.js        # JavaScript del frontend
├── server.js              # Servidor backend
├── package.json           # Dependencias
└── README.md             # Este archivo
\`\`\`

## 🔧 Configuración de MongoDB

### Variables de Entorno
\`\`\`bash
MONGODB_URI=mongodb://localhost:27017/plataforma_cursos
PORT=3000
\`\`\`

### Esquema de Usuario
\`\`\`javascript
{
  nombre: String (requerido, 2-50 caracteres),
  email: String (requerido, único, formato válido),
  password: String (requerido, hash con bcrypt),
  fechaRegistro: Date (automático),
  activo: Boolean (por defecto true),
  createdAt: Date (automático),
  updatedAt: Date (automático)
}
\`\`\`

## 🛡️ Seguridad Implementada

- **Hash de contraseñas** con bcrypt (salt rounds: 12)
- **Validación de email** con regex
- **Sanitización de datos** (trim, lowercase)
- **Prevención de duplicados** (email único)
- **Validación doble** (cliente y servidor)
- **Manejo de errores** robusto

## 📡 API Endpoints

### POST /api/registro
Registra un nuevo usuario.

**Request:** // solicitud
\`\`\`json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "password": "mipassword123"
}
\`\`\`

**Response (Éxito):** // respuesta
\`\`\`json
{
  "success": true,
  "mensaje": "Usuario registrado exitosamente",
  "usuario": {
    "id": "64f8a1b2c3d4e5f6g7h8i9j0",
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "fechaRegistro": "2024-01-15T10:30:00.000Z"
  }
}
\`\`\`

### GET /api/usuarios
Obtiene lista de usuarios (sin contraseñas).

## 🎨 Personalización del Diseño

### Colores Principales
- **Primario**: `#b19cff` (morado claro)
- **Secundario**: `#9f7aea` (morado medio)
- **Gradiente**: `#667eea` a `#764ba2`

### Efectos Implementados
- **Animación de entrada** (slideUp)
- **Hover en inputs** (elevación y sombra)
- **Icono animado** (bounce)
- **Transiciones suaves** en todos los elementos

## 🐛 Solución de Problemas

### Error de Conexión MongoDB
\`\`\`bash
# Verificar que MongoDB esté ejecutándose
sudo systemctl status mongod

# O iniciar MongoDB
sudo systemctl start mongod
\`\`\`

### Error de CORS
El servidor ya incluye configuración CORS. Si persiste:
\`\`\`javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
\`\`\`

### Error de Dependencias
\`\`\`bash
# Limpiar cache e instalar
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
\`\`\`

## 📝 Próximas Mejoras

- [ ] Verificación de email
- [ ] Login de usuarios
- [ ] Recuperación de contraseña
- [ ] Perfil de usuario
- [ ] Dashboard de cursos
- [ ] Sistema de roles

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
