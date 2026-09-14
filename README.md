# 🏨 Professional Challenge - Plataforma de Reservas
 
## 📋 Descripción del Proyecto
 
Aplicación web de reservas de alojamiento desarrollada en React, inspirada en plataformas tipo Airbnb/Booking. Permite a los usuarios explorar y visualizar en detalle alojamientos de distintos tipos (hoteles, apartamentos, hostales, entre otros), mientras que desde un panel de administración es posible gestionar el catálogo completo de propiedades: creación, listado, edición y eliminación, incluyendo la carga de imágenes reales por producto.
 
El frontend consume una API REST propia desarrollada en **Spring Boot** (ver sección [Conexión con el Backend](#-conexión-con-el-backend)), que expone los datos de productos, categorías y ciudades.
 
## ✨ Funcionalidades Implementadas
 
### Funcionalidades Públicas (Home)
- ✅ **Listado de alojamientos**: Tarjetas con imagen real, nombre y categoría, obtenidas desde la API
- ✅ **Orden aleatorio**: Los alojamientos se mezclan en cada carga para variar las recomendaciones
- ✅ **Paginación**: Navegación entre páginas de resultados (10 alojamientos por página)
- ✅ **Búsqueda por tipo de alojamiento**: Accesos rápidos por categoría (Hoteles, Departamentos, Hostales, Desayunos)
- ✅ **Página de detalle de producto**: Vista ampliada con galería de imágenes, dirección, ciudad, categoría y descripción
- ✅ **Galería de imágenes**: Modal con todas las fotos del alojamiento en formato de cuadrícula
- ✅ **Navegación por rutas dinámicas**: Cada alojamiento tiene su propia URL (`/products/:id`)
### Panel de Administración
- ✅ **Crear alojamiento**: Formulario completo con nombre, categoría, ciudad, dirección, descripción e imágenes
- ✅ **Selects dinámicos**: Categorías y ciudades cargadas en tiempo real desde el backend (no hardcodeadas)
- ✅ **Carga múltiple de imágenes**: Selección de varios archivos, con previsualización y opción de eliminar cada una antes de guardar
- ✅ **Validación de duplicados**: El backend valida nombres de producto repetidos y el formulario muestra el error correspondiente
- ✅ **Listado de alojamientos**: Tabla administrativa con todos los productos creados
- ✅ **Eliminar alojamiento**: Borrado con confirmación, actualizando la tabla sin recargar la página
- ⏳ **Editar alojamiento**: Interfaz lista, lógica pendiente de implementar
## 🏗️ Arquitectura del Proyecto
 
### Diseño Atómico
 
El proyecto sigue la metodología **Atomic Design**, separando además una capa dedicada a la comunicación con la API:
 
```
src/
├── api/                     # Comunicación con el backend
│   └── productService.js    # Funciones fetch: productos, categorías, ciudades, imágenes
├── components/
│   ├── atoms/                # Componentes básicos indivisibles
│   │   ├── Button.jsx
│   │   └── SearchInput.jsx
│   ├── molecules/             # Combinación de átomos
│   │   ├── LargeCard.jsx      # Tarjeta de alojamiento (imagen + info)
│   │   └── SmallCards.jsx     # Accesos rápidos por tipo de alojamiento
│   ├── organisms/              # Componentes complejos
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── SearchSection.jsx
│   │   ├── SideBar.jsx
│   │   └── GalleryModal.jsx    # Modal de galería de imágenes del producto
│   └── pages/                   # Vistas completas
│       ├── HomePage.jsx
│       ├── ProductDetailPage.jsx
│       └── admin/
│           ├── AdminPanel.jsx
│           ├── dashboard/
│           ├── categories/
│           ├── customers/
│           ├── inventory/
│           ├── setup/
│           └── products/
│               ├── CreateProductPage.jsx
│               └── ProductsPage.jsx
├── data/                    # Datos de referencia/legado
├── routes/
│   └── AppRouter.jsx        # Definición de todas las rutas de la app
├── App.jsx
└── index.css
```
 
### Capas de la Arquitectura
 
#### 1. **API** (`src/api/`)
Capa dedicada exclusivamente a la comunicación con el backend, separada de los componentes de UI. Centraliza todas las llamadas `fetch` (`getProducts`, `getProductById`, `createProduct`, `uploadProductImage`, `deleteProduct`, `getCategories`, `getCities`), evitando duplicar lógica de red en cada componente.
 
#### 2. **Átomos** (Componentes Básicos)
Componentes mínimos reutilizables:
- `Button`: Botón reutilizable con estilos configurables por props
- `SearchInput`: Campo de búsqueda con icono
#### 3. **Moléculas** (Combinaciones Simples)
- `LargeCard`: Tarjeta de alojamiento con imagen real del producto, categoría y nombre
- `SmallCards`: Accesos rápidos por tipo de alojamiento
#### 4. **Organismos** (Componentes Complejos)
- `Header`: Encabezado con logo y accesos de usuario
- `Footer`: Pie de página
- `SearchSection`: Sección de búsqueda principal del Home
- `SideBar`: Barra lateral del panel administrativo
- `GalleryModal`: Modal que muestra todas las imágenes de un producto en cuadrícula
#### 5. **Páginas**
- `HomePage`: Listado público de alojamientos, con paginación y orden aleatorio
- `ProductDetailPage`: Vista de detalle de un alojamiento específico
- `AdminPanel` y subpáginas: Gestión administrativa del catálogo
#### 6. **Rutas** (`src/routes/AppRouter.jsx`)
Define la navegación de toda la aplicación con `react-router-dom`, separando el sitio público (`/`, `/products/:id`) del panel administrativo (`/admin/*`).
 
## 🛠️ Stack Tecnológico
 
### Frontend
 
- **Framework**: React 19
- **Build Tool**: Vite
- **Enrutamiento**: React Router DOM
- **Estilos**: Tailwind CSS (utility classes)
- **Iconos**: react-icons (Remix Icon)
- **Lenguaje**: JavaScript (ES6+)
- **Comunicación con API**: Fetch API nativa (`fetch`), incluyendo `multipart/form-data` para carga de imágenes
- **Linting**: ESLint
### Backend
 
- **Framework**: Spring Boot
- **Lenguaje**: Java 21
- **Persistencia**: Spring Data JPA / Hibernate
- **Base de datos**: H2 (en memoria, entorno de desarrollo)
- **Migraciones/seed de datos**: `data.sql` (carga inicial de categorías y ciudades)
- **Build Tool**: Maven
- **Testing**: JUnit 5 + Mockito (tests unitarios de la capa de servicios)
- **Serialización JSON**: Jackson
- **Carga de archivos**: `MultipartFile` (Spring Web), almacenamiento en disco servido como recurso estático
- **CORS**: Configurado explícitamente para permitir peticiones desde el frontend (Vite, `http://localhost:5173`)
## 🔌 Conexión con el Backend
 
Este frontend consume una **API REST propia desarrollada en Spring Boot**, que expone los siguientes recursos principales:
 
| Recurso | Endpoints |
|---|---|
| Productos | `GET /products`, `GET /products/{id}`, `POST /products`, `PUT /products/{id}`, `DELETE /products/{id}` |
| Categorías | `GET /categories` |
| Ciudades | `GET /cities` |
| Imágenes | `POST /products/{id}/images/upload` (subida de archivos), `DELETE /products/{id}/images/{imageId}` |
 
La comunicación se centraliza en `src/api/productService.js`, y la URL base de la API se configura mediante una variable de entorno.
 
### Variable de entorno requerida
 
Crea un archivo `.env` en la raíz del proyecto con:
 
```
VITE_API_URL=http://localhost:8080
```
 
> **Nota**: el backend debe estar corriendo y tener CORS habilitado para el origen del frontend (por defecto, `http://localhost:5173`).
 
## 📦 Instalación y Configuración
 
### Prerrequisitos
- Node.js (versión 18 o superior)
- npm
- El backend de la API corriendo (Spring Boot + H2/base de datos configurada)
### Pasos de Instalación
 
1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd professional-challenge
```
 
2. **Instalar dependencias**
```bash
npm install
```
 
3. **Configurar variables de entorno**
Crea el archivo `.env` en la raíz del proyecto (ver sección [Conexión con el Backend](#-conexión-con-el-backend)).
 
4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```
 
5. **Abrir en el navegador**
```
http://localhost:5173
```
 
## 🚀 Scripts Disponibles
 
```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con hot reload
 
# Producción
npm run build        # Genera build optimizado para producción
npm run preview      # Previsualiza el build de producción
 
# Calidad de Código
npm run lint          # Ejecuta ESLint para verificar código
```
 
## 🎨 Decisiones de Diseño
 
### 1. **Arquitectura Atómica + capa de API separada**
- **Razón**: Facilita la reutilización de componentes visuales y mantiene la lógica de comunicación con el backend desacoplada de la interfaz.
- **Beneficio**: Si la API cambia de URL o de contrato, solo se ajusta `productService.js`, sin tocar los componentes.
### 2. **Gestión de Estado con Hooks**
- **useState**: Para estado local de formularios, listados y modales.
- **useEffect**: Para disparar las peticiones a la API al montar cada página.
- **Razón**: Solución simple y directa, adecuada para el tamaño actual del proyecto, sin necesidad de una librería externa de manejo de estado.
### 3. **Tailwind CSS**
- **Razón**: Desarrollo rápido y consistente sin escribir CSS personalizado.
- **Beneficio**: Fácil mantenimiento y ajuste de estilos directamente en el JSX.
### 4. **Carga de imágenes en dos pasos**
- **Flujo**: Primero se crea el producto (`POST /products`), y luego se suben las imágenes asociadas una por una (`POST /products/{id}/images/upload`) usando `multipart/form-data`.
- **Razón**: Evita mezclar JSON y archivos binarios en una sola petición, y permite mostrar previsualizaciones antes de confirmar el guardado.
### 5. **Rutas absolutas para assets estáticos**
- Las imágenes ubicadas en `public/` se referencian siempre con `/` inicial (ej. `/images/logo2-nx.png`), nunca con rutas relativas, para que funcionen correctamente sin importar la profundidad de la ruta activa en el navegador.
### 6. **Componentes controlados**
- Todos los inputs de formularios (crear producto) son controlados desde el estado del componente, facilitando validación y limpieza del formulario tras un guardado exitoso.
## 📊 Estructura de Datos
 
### Modelo de Producto (alojamiento)
 
```javascript
{
  id: number,
  name: string,
  description: string,
  category: {
    id: number,
    category: string
  },
  city: {
    id: number,
    city: string
  },
  address: {
    id: number,
    direction: string
  },
  images: [
    {
      id: number,
      url: string,
      displayOrder: number
    }
  ]
}
```
 
## 🎯 Funcionalidades por Implementar
 
- ⏳ Edición de alojamientos existentes desde el panel admin
- ⏳ Búsqueda funcional por nombre en la sección de búsqueda del Home
- ⏳ Filtro real por tipo de alojamiento (Hoteles, Departamentos, Hostales, Desayunos)
- ⏳ Gestión de clientes e inventario (secciones ya presentes en el scaffolding del panel admin)
- ⏳ Autenticación de usuarios (registro / inicio de sesión)
- ⏳ Reordenamiento de imágenes desde la interfaz
## 🎨 Guía de Estilos
 
### Colores Principales
- **Primary**: Verde (`#5D9C42`) - Botones, textos destacados y elementos interactivos
- **Fondo secundario**: Verde claro (`#F0F7ED`) - Secciones de recomendaciones
- **Neutros**: Escala de grises (Tailwind `slate`/`gray`) para textos y fondos administrativos
### Tipografía
- **Font Family**: System fonts (sans-serif)
- **Tamaños**: Clases utilitarias de Tailwind (`text-sm`, `text-xl`, `text-3xl`, etc.)
## 📱 Responsividad
 
La aplicación está construida con clases responsivas de Tailwind (`sm:`, `md:`, `lg:`, `xl:`), optimizada para:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (< 768px)
## 📖 Buenas Prácticas Implementadas
 
### Código Limpio
- ✅ Nombres descriptivos de variables y funciones
- ✅ Componentes pequeños con responsabilidad única
- ✅ Destructuring de props
- ✅ Separación entre lógica de datos (`api/`) y presentación (`components/`)
### Manejo de Errores
- ✅ Estados de error visibles al usuario en formularios y listados
- ✅ Validación de nombres duplicados reflejada desde la respuesta real del backend
- ✅ Manejo defensivo con optional chaining (`?.`) para datos anidados (categoría, ciudad, dirección, imágenes)
### Mantenibilidad
- ✅ Separación de responsabilidades por capa (api / atoms / molecules / organisms / pages)
- ✅ Reutilización de componentes (`Button`, `LargeCard`) en distintas vistas
- ✅ Variables de entorno para configuración de la URL del backend
## 🔄 Flujo de Datos
 
```
Usuario interactúa → Página (useState) → api/productService.js → Backend (Spring Boot)
                          ↓                                              ↓
                    Actualiza estado local  ←───────────── Respuesta JSON
                          ↓
                  Re-render de componentes hijos (props)
```
 
## Autor
 
Este proyecto fue creado por:
 
**Jesus Arley Ceballos**
