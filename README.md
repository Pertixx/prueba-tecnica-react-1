# Aplicación de Blog con DummyAPI

## ⚡ Características
- Ver publicaciones con imagen principal, etiquetas e información del publicador
- Listado de comentarios para cada publicación
- Sistema de filtrado por etiquetas
- Rutas protegidas con autenticación de Google
- Listado de usuarios con fotos de perfil
- Persistencia de datos en tiempo real con Firebase

## 🛠️ Tecnologías Utilizadas
- React + Vite
- React Router DOM
- Firebase (Autenticación y Firestore)
- TailwindCSS
- DummyAPI

## 📋 Requisitos
- Node.js 16+
- npm o yarn

## 🚀 Instalación

1. Clona el repositorio
```bash
git clone https://github.com/Pertixx/prueba-tecnica-react-1.git
```

2. Instala las dependencias
```bash
cd prueba-tecnica-react-1
npm install
```

3. Crea un archivo `.env` en el directorio raíz con las siguientes variables:
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_DUMMY_API_KEY=tu_dummy_api_key
```

4. Ejecuta el servidor de desarrollo
```bash
npm run dev
```

## 📱 Estructura del Proyecto
```
src/
├── components/
│   ├── blog/
│   ├── shared/
│   └── auth/
├── pages/
├── services/
├── context/
└── utils/
...
```

## 🚀 Despliegue
Este proyecto se despliega usando GitHub Pages. Para desplegar:

1. Ejecuta el comando de construcción:
```bash
npm run build
```

2. Despliega en GitHub Pages:
```bash
npm run deploy
```

## ⏱️ Cronograma de Desarrollo
- Hora 1: Configuración inicial y estructura del proyecto
- Hora 2: Implementación de características principales
- Hora 3: Autenticación y características de usuario
- Hora 4: Toques finales y despliegue

## 📝 Notas
- El proyecto utiliza Firebase para la persistencia de datos en tiempo real
- La autenticación se maneja a través de Google Sign In