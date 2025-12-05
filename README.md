# Tikera - Plataforma de Venta de Tickets

Sistema completo de venta de tickets online para eventos, parques acuáticos, teatro y excursiones en Mar del Plata.

## 🎯 Características

- ✅ Catálogo de eventos y atracciones
- ✅ Sistema de reservas con selección de fecha/hora
- ✅ Checkout integrado con MercadoPago
- ✅ Generación automática de e-tickets con QR
- ✅ Panel de administración completo
- ✅ Control de stock por fecha y tipo de entrada
- ✅ Reportes y estadísticas
- ✅ Sistema de validación de tickets vía QR

## 📁 Estructura del Proyecto

```
tikera/
├── frontend/          # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/        # Páginas de la aplicación
│   │   ├── App.jsx       # Componente principal
│   │   └── main.jsx      # Punto de entrada
│   └── package.json
│
└── backend/           # Node.js + Express + MongoDB
    ├── models/        # Modelos de Mongoose
    ├── routes/        # Rutas de la API
    ├── config/        # Configuraciones
    ├── middleware/    # Middlewares
    └── server.js      # Servidor Express
```

## 🚀 Instalación

### Requisitos Previos

- Node.js v18+ 
- MongoDB (local o MongoDB Atlas)
- Cuenta de MercadoPago (para pagos)

### 1. Clonar el Repositorio

```bash
git clone <repo-url>
cd tikera
```

### 2. Configurar Backend

```bash
cd backend
npm install

# Crear archivo .env
cp .env.example .env
```

Editar `.env` con tus credenciales:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tikera
MERCADOPAGO_ACCESS_TOKEN=tu_access_token
MERCADOPAGO_PUBLIC_KEY=tu_public_key
JWT_SECRET=tu_secreto_jwt
FRONTEND_URL=http://localhost:3000
```

### 3. Configurar Frontend

```bash
cd ../frontend
npm install
```

## 🏃 Ejecutar el Proyecto

### Backend (Terminal 1)

```bash
cd backend
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

### Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📊 Modelos de Datos

### Venue (Lugar)
- Nombre, dirección, coordenadas
- Descripción e imágenes
- Categoría (parque, beach-club, teatro, excursión)

### Event (Evento)
- Título, descripción, imágenes
- Vinculado a un Venue
- Schedule (fechas/horarios con capacidad)
- Price Tiers (tipos de entradas con precios)

### Order (Orden)
- Información del evento y schedule seleccionado
- Items (tipos y cantidades de entradas)
- Datos del cliente
- Estado de pago (pending, approved, refunded)
- Tickets generados con QR

### Ticket
- Código QR único
- Estado (usado/sin usar)
- Tipo y precio

## 🔌 API Endpoints

### Públicos

```
GET  /api/venues                 # Listar lugares
GET  /api/venues/:id             # Detalle de lugar
GET  /api/events                 # Listar eventos
GET  /api/events/:id             # Detalle de evento
POST /api/orders                 # Crear orden
GET  /api/orders/:id             # Consultar orden
POST /api/payments/webhook/mercadopago  # Webhook de MercadoPago
```

### Admin (Requiere autenticación)

```
GET  /api/admin/orders           # Listar todas las órdenes
POST /api/admin/events           # Crear evento
PUT  /api/admin/events/:id       # Actualizar evento
GET  /api/admin/stats            # Estadísticas del dashboard
```

## 💳 Integración con MercadoPago

1. Crear cuenta en [MercadoPago Developers](https://www.mercadopago.com.ar/developers)
2. Obtener Access Token y Public Key
3. Configurar webhook URL en el panel de MercadoPago
4. URL del webhook: `https://tu-dominio.com/api/payments/webhook/mercadopago`

## 📱 Flujo de Compra

1. Usuario selecciona evento y fecha
2. Elige cantidad y tipo de entradas
3. Completa datos personales
4. Se crea orden (status: pending) con reserva temporal (15 min)
5. Redirige a MercadoPago para pagar
6. MercadoPago notifica vía webhook
7. Backend valida pago y genera tickets con QR
8. Se envía email con tickets (PDF + QR)
9. Usuario puede descargar tickets desde confirmación

## 🎨 Tecnologías Utilizadas

### Frontend
- **React 18** - Framework UI
- **Vite** - Build tool
- **React Router** - Navegación
- **Tailwind CSS** - Estilos
- **React Query** - Manejo de estado y caché
- **Axios** - Cliente HTTP

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **MongoDB + Mongoose** - Base de datos
- **MercadoPago SDK** - Procesamiento de pagos
- **QRCode** - Generación de códigos QR
- **Nodemailer** - Envío de emails
- **bcryptjs + JWT** - Autenticación

## 🔐 Seguridad

- Validación server-side de stock antes de confirmar pago
- Control de overbooking con reservas temporales
- Tokens únicos para cada ticket
- Validación de webhooks de MercadoPago
- Hash de contraseñas con bcrypt
- JWT para autenticación de admin

## 📦 Deploy

### Frontend (Netlify/Vercel)

```bash
cd frontend
npm run build
# Deploy carpeta dist/
```

### Backend (Render/Railway/Heroku)

1. Conectar repositorio
2. Configurar variables de entorno
3. Deploy automático desde main branch

### MongoDB (MongoDB Atlas)

1. Crear cluster gratuito
2. Obtener connection string
3. Actualizar MONGODB_URI en .env

## 🛠️ Scripts Útiles

```bash
# Backend
npm run dev          # Modo desarrollo con nodemon
npm start            # Producción
npm run seed         # Poblar DB con datos de ejemplo

# Frontend
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
```

## 📝 TODO / Roadmap

- [ ] Implementar autenticación de admin
- [ ] Sistema de envío de emails con SendGrid
- [ ] Generación de PDF para tickets
- [ ] App móvil para validación de QR
- [ ] Sistema de reembolsos automáticos
- [ ] Exportación de reportes a CSV/Excel
- [ ] Seat map para eventos con butacas numeradas
- [ ] Sistema de descuentos y cupones
- [ ] Multi-idioma (ES/EN)
- [ ] Integración con Google Analytics

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

MIT

## 👨‍💻 Autor

Desarrollado para Hotel Diva y turismo en Mar del Plata

## 📞 Soporte

Para consultas: info@tikera.com.ar

---

**¡Gracias por usar Tikera! 🎟️**
