# 🚀 Guía de Despliegue - Tikera

## Arquitectura de Despliegue

Este proyecto requiere **dos despliegues separados**:

1. **Frontend (React + Vite)** → Netlify o Vercel
2. **Backend (Node.js + Express + MongoDB)** → Render, Railway o Heroku

---

## 📦 1. Desplegar el Backend en Render

### Paso 1: Crear cuenta en Render
1. Ve a [render.com](https://render.com)
2. Regístrate con tu cuenta de GitHub

### Paso 2: Crear Base de Datos MongoDB
1. En Render Dashboard, haz clic en "New +"
2. Selecciona "MongoDB"
3. Nombra tu base de datos: `tikera-db`
4. Elige el plan gratuito
5. Haz clic en "Create Database"
6. **Copia la Connection String** (la necesitarás después)

### Paso 3: Desplegar el Backend
1. En Render Dashboard, haz clic en "New +"
2. Selecciona "Web Service"
3. Conecta tu repositorio de GitHub: `tikera`
4. Configuración:
   - **Name**: `tikera-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `master`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Paso 4: Configurar Variables de Entorno
En la sección "Environment Variables", agrega:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://tu-connection-string-de-render
JWT_SECRET=un-secret-muy-seguro-cambia-esto-123456
MERCADOPAGO_ACCESS_TOKEN=tu-token-de-mercadopago
MERCADOPAGO_PUBLIC_KEY=tu-public-key-de-mercadopago
```

5. Haz clic en "Create Web Service"
6. Espera a que termine el deploy (5-10 minutos)
7. **Copia la URL de tu backend** (será algo como: `https://tikera-backend.onrender.com`)

---

## 🌐 2. Desplegar el Frontend en Netlify

### Paso 1: Configurar la URL del Backend
1. Abre el archivo `frontend/.env.production`
2. Reemplaza la URL con la de tu backend de Render:

```env
VITE_API_URL=https://tikera-backend.onrender.com/api
```

### Paso 2: Hacer commit de los cambios
```bash
git add .
git commit -m "Configure production API URL"
git push origin master
```

### Paso 3: Desplegar en Netlify
1. Ve a [netlify.com](https://netlify.com)
2. Haz clic en "Add new site" → "Import an existing project"
3. Conecta con GitHub y selecciona tu repositorio `tikera`
4. Configuración:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Branch to deploy**: `master`

5. En "Advanced build settings", agrega la variable de entorno:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://tikera-backend.onrender.com/api`

6. Haz clic en "Deploy site"
7. Espera a que termine (2-3 minutos)

### Paso 4: Configurar dominio personalizado (opcional)
1. En Netlify, ve a "Site settings" → "Domain management"
2. Haz clic en "Add custom domain"
3. Sigue las instrucciones para configurar tu dominio

---

## 🔄 Alternativa: Vercel para Frontend

Si prefieres usar Vercel en lugar de Netlify:

1. Ve a [vercel.com](https://vercel.com)
2. Importa tu proyecto de GitHub
3. Configuración:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Variables de entorno:
   - `VITE_API_URL`: `https://tikera-backend.onrender.com/api`

---

## 🧪 3. Verificar el Despliegue

### Verificar Backend
1. Visita: `https://tikera-backend.onrender.com`
2. Deberías ver un JSON con la información de la API

### Verificar Frontend
1. Visita tu URL de Netlify: `https://tu-sitio.netlify.app`
2. Deberías ver la página principal de Tikera
3. Verifica que los datos se carguen correctamente desde el backend

---

## 📝 4. Configuración de MongoDB Atlas (Alternativa a Render DB)

Si prefieres usar MongoDB Atlas en lugar de Render:

1. Ve a [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un cluster gratuito (M0)
4. En "Database Access", crea un usuario con permisos de lectura/escritura
5. En "Network Access", agrega `0.0.0.0/0` (permite todas las IPs)
6. En "Clusters", haz clic en "Connect" → "Connect your application"
7. Copia la connection string
8. Actualiza la variable `MONGODB_URI` en Render con esta connection string

---

## 🔑 5. Configurar MercadoPago

1. Ve a [mercadopago.com.ar/developers](https://www.mercadopago.com.ar/developers)
2. Inicia sesión con tu cuenta
3. Ve a "Tus aplicaciones" → "Crear aplicación"
4. Selecciona "Pagos en línea"
5. Copia tus credenciales de prueba (o producción):
   - **Access Token**
   - **Public Key**
6. Actualiza las variables en Render:
   - `MERCADOPAGO_ACCESS_TOKEN`
   - `MERCADOPAGO_PUBLIC_KEY`

---

## 🔄 6. Actualizar el Proyecto

Cuando hagas cambios:

### Frontend
```bash
git add frontend/
git commit -m "Update frontend"
git push origin master
```
Netlify/Vercel desplegará automáticamente

### Backend
```bash
git add backend/
git commit -m "Update backend"
git push origin master
```
Render desplegará automáticamente

---

## ⚡ 7. Solución de Problemas

### El frontend no se conecta al backend
- Verifica que `VITE_API_URL` esté configurado correctamente en Netlify/Vercel
- Verifica que el backend esté activo en Render
- Abre las DevTools del navegador (F12) y revisa la consola

### Error de CORS
- Verifica que la URL de Netlify esté en la lista de orígenes permitidos en `backend/server.js`
- Actualiza el código si tu URL de Netlify es diferente

### El backend no inicia
- Revisa los logs en Render
- Verifica que todas las variables de entorno estén configuradas
- Verifica que la connection string de MongoDB sea correcta

### La base de datos está vacía
1. Conéctate a tu backend en Render
2. Ve a la sección "Shell"
3. Ejecuta el seed script:
```bash
npm run seed
```

---

## 📊 Costos Estimados

### Plan Gratuito (para comenzar)
- **Netlify/Vercel**: Gratis (con limitaciones)
- **Render**: Gratis (el servicio se duerme después de 15 min de inactividad)
- **MongoDB Render**: Gratis (1GB de almacenamiento)

### Plan Profesional (recomendado para producción)
- **Netlify Pro**: $19/mes
- **Render Starter**: $7/mes (sin suspensión)
- **MongoDB Atlas M2**: $9/mes

---

## 🎯 Próximos Pasos

1. ✅ Despliega el backend en Render
2. ✅ Despliega el frontend en Netlify
3. ✅ Configura MercadoPago
4. 📧 Configura el servicio de email (SendGrid o Mailgun)
5. 🎨 Personaliza el diseño
6. 🧪 Prueba el flujo de compra completo
7. 🚀 ¡Lanza tu plataforma!

---

## 📞 Soporte

Si tienes problemas con el despliegue:
- Revisa los logs en Render/Netlify
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que el código esté actualizado en GitHub
