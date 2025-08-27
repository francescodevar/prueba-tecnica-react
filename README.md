# Prueba Técnica React

Una aplicación de gestión de perfiles de usuarios construida con React, TypeScript y Vite.

## 🚀 Características

- **Gestión de usuarios**: Ver, crear y eliminar perfiles de usuarios
- **Búsqueda y filtrado**: Buscar usuarios por nombre, email o ubicación
- **Ordenamiento**: Ordenar usuarios por nombre, edad o ubicación
- **Scroll infinito**: Cargar más usuarios automáticamente
- **Persistencia local**: Los datos se guardan en localStorage
- **Interfaz responsive**: Diseño adaptativo con Tailwind CSS
- **Modal de detalles**: Ver información completa de cada usuario

## 🛠️ Tecnologías

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconos
- **Fetch API** - Peticiones HTTP

## 📦 Instalación

1. **Clona el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd prueba-tecnica-react
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Ejecuta el servidor de desarrollo**

   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   ```
   http://localhost:5173
   ```

## 🎯 Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del proyecto

```
src/
├── components/     # Componentes React
├── hooks/         # Custom hooks
├── services/      # Servicios API
├── types/         # Definiciones TypeScript
├── utils/         # Utilidades y helpers
├── constants/     # Constantes de configuración
└── context/       # Contextos de React
```

## 🔧 Funcionalidades principales

### Gestión de usuarios

- **Generar perfil**: Crea un nuevo perfil de usuario aleatorio
- **Cargar más**: Carga 3 usuarios adicionales
- **Eliminar usuario**: Elimina un usuario específico
- **Eliminar todos**: Limpia todos los usuarios

### Búsqueda y filtrado

- **Búsqueda en tiempo real** por nombre, email o ubicación
- **Ordenamiento** por nombre (A-Z, Z-A), edad y ubicación
- **Filtrado automático** de resultados

### Persistencia

- Los usuarios se guardan automáticamente en localStorage
- Las preferencias de búsqueda y ordenamiento se mantienen
- Los datos persisten entre sesiones

## 🌐 API

La aplicación utiliza la [Random User API](https://randomuser.me/) para generar perfiles de usuarios aleatorios.

## 📱 Responsive

La aplicación está optimizada para dispositivos móviles, tablets y desktop.

## 🚀 Despliegue

Para construir la aplicación para producción:

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/` y están listos para desplegar en cualquier servidor web estático.
