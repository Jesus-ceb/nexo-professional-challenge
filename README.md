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
### Panel de Administración('/admin')
- ✅ **Acceso al Panel**: Módulo accesible desde la ruta `http://localhost:5173/admin`
- ✅ **Menú de Navegación**: Barra lateral (`SideBar`) que permite estructurar la gestión de productos, inventario, categorías y configuración.
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
├── data/                    # Datos de referencia
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
- ⏳ Autenticación de usuarios (registro / inicio de sesión)

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


---

# 🚀 Sprint 2 - Nuevas Funcionalidades (Frontend)

## 📋 Resumen del Sprint

| Issue | Funcionalidad | Archivos principales |
|---|---|---|
| Registro / Login | Registro e inicio de sesión con validación de campos | `RegisterPage`, `LoginPage`, `authService` |
| #14 Identificar usuario | Sesión con JWT, avatar con iniciales en el Header, perfil y rutas protegidas | `AuthContext`, `AuthProvider`, `ProtectedRoute`, `ProfilePage`, `getInitials` |
| #16 Identificar administrador | Panel solo para ADMIN y gestión de roles de usuarios | `AdminRoute`, `CustomersPage`, `userService` |
| #17 Características de producto | CRUD de características, asignarlas a productos y editar producto | `FeaturesPage`, `FeatureForm`, `FeatureSelector`, `EditProductModal`, `featureService`, `featureIcons` |
| #18 Ver características | "¿Qué ofrece este lugar?" en el detalle, íconos en las tarjetas y lightbox de imágenes | `ProductFeatures`, `ImageLightbox` |
| #19 Confirmar registro | Página de registro exitoso y reenvío del correo de confirmación | `RegistrationSuccessPage`, `ResendEmailButton` |
| #20 Sección de categorías | Tarjetas por categoría, filtro por una o varias categorías y limpiar filtros | `CategoryFilterBar`, `ProductGrid`, `CategoryProductsPage`, `categoryUtils`, `SmallCards` |

## ✨ Funcionalidades Agregadas

### Autenticación de Usuarios
- ✅ **Registro**: Formulario con nombre, apellido, correo y contraseña, con validación de campos y aviso de correo duplicado
- ✅ **Confirmación de registro**: Página de registro exitoso y envío de un correo de confirmación, con botón para reenviarlo (espera de 60 s entre envíos)
- ✅ **Inicio de sesión**: Login con JWT; el token y el usuario se guardan en `localStorage` para mantener la sesión tras recargar
- ✅ **Identificación del usuario**: El Header muestra un avatar con las iniciales y el nombre del usuario, más el botón "Cerrar sesión"
- ✅ **Perfil de usuario**: Página `/mi-perfil` con los datos de la cuenta, cargados desde `GET /users/me`
- ✅ **Rutas protegidas**: `ProtectedRoute` (requiere sesión) y `AdminRoute` (requiere rol ADMIN)

### Funcionalidades Públicas
- ✅ **Búsqueda por tipo de alojamiento**: Una tarjeta por cada categoría registrada en el backend, con la cantidad de alojamientos, una imagen aleatoria de sus productos y sombra al pasar el mouse
- ✅ **Filtro por categorías**: Página `/productos?categorias=1,3` (con Header, SearchSection, botón de volver y Footer) para filtrar por una o varias categorías, con el texto "Mostrando X de Y alojamientos", chips seleccionables y botón "Limpiar filtros"
- ✅ **Filtro en la URL**: Se puede compartir el enlace, funciona con "atrás" y se mantiene al recargar
- ✅ **Características del alojamiento**: Bloque "¿Qué ofrece este lugar?" en el detalle con el ícono de cada característica; las `LargeCard` también muestran las características
- ✅ **Lightbox de imágenes**: Foto ampliada sobre fondo oscuro, que se recorre con flechas o con el teclado

### Panel de Administración
- ✅ **Acceso restringido**: Solo usuarios con rol ADMIN. Un invitado va a `/login` y un usuario sin permisos va al Home
- ✅ **Editar alojamiento**: Modal de edición con datos, características e imágenes
- ✅ **Administrar características**: Crear, editar y eliminar características (nombre + ícono de Remix Icon) y asignarlas a cada producto
- ✅ **Gestión de administradores**: Listado de usuarios con su rol y botón "Hacer admin / Quitar admin". Un admin no puede quitarse su propio rol

## 🏗️ Nuevos Archivos

```
src/
├── api/
│   ├── authService.js           # Registro, login, perfil, reenvío de confirmación
│   ├── userService.js           # Listado de usuarios y cambio de rol (admin)
│   └── featureService.js        # CRUD de características (admin)
├── components/
│   ├── molecules/
│   │   ├── CategoryFilterBar.jsx  # Chips para filtrar por una o varias categorías
│   │   ├── ProductFeatures.jsx    # "¿Qué ofrece este lugar?"
│   │   ├── FeatureForm.jsx        # Crear / editar característica
│   │   ├── FeatureSelector.jsx    # Asignar características a un producto
│   │   └── ResendEmailButton.jsx  # Reenvío del correo de confirmación
│   ├── organisms/
│   │   ├── ImageLightbox.jsx      # Foto ampliada con navegación
│   │   ├── ProductGrid.jsx        # Grid de LargeCards con paginación
│   │   └── EditProductModal.jsx   # Edición de un producto (admin)
│   └── pages/
│       ├── CategoryProductsPage.jsx  # Resultados filtrados por categoría
│       ├── ProfilePage.jsx
│       ├── auth/
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   └── RegistrationSuccessPage.jsx
│       └── admin/
│           └── features/
│               └── FeaturesPage.jsx
├── context/
│   ├── AuthContext.js           # Contexto + hook useAuth()
│   └── AuthProvider.jsx         # Sesión (token + usuario) persistida en localStorage
├── data/
│   └── featureIcons.js          # Íconos disponibles para características
├── routes/
│   ├── ProtectedRoute.jsx       # Requiere sesión iniciada
│   └── AdminRoute.jsx           # Requiere rol ADMIN
└── utils/
    ├── getInitials.js           # Iniciales del avatar
    └── categoryUtils.js         # Plurales, conteo por categoría, imagen aleatoria
```

**Archivos modificados**: `SmallCards` (tarjeta dinámica y clicable), `LargeCard`, `Header`, `GalleryModal`, `SideBar`, `HomePage`, `ProductDetailPage`, `CustomersPage`, `CreateProductPage`, `ProductsPage`, `productService`, `AppRouter`.

## 🧭 Nuevas Rutas

| Ruta | Acceso | Página |
|---|---|---|
| `/productos?categorias=` | Pública | `CategoryProductsPage` |
| `/login` | Pública | `LoginPage` |
| `/register` | Pública | `RegisterPage` |
| `/registro-exitoso` | Con sesión | `RegistrationSuccessPage` |
| `/mi-perfil` | Con sesión | `ProfilePage` |
| `/admin/*` | Solo ADMIN | `AdminPanel` (ahora protegido por `AdminRoute`) |
| `/admin/features` | Solo ADMIN | `FeaturesPage` |

## 🔌 Nuevos Endpoints Consumidos

| Recurso | Endpoints |
|---|---|
| Autenticación | `POST /users/register`, `POST /auth/login` |
| Usuario | `GET /users/me`, `POST /users/me/resend-confirmation` |
| Usuarios (admin) | `GET /users`, `PATCH /users/{id}/role` |
| Características | `GET /features`, `POST /features`, `PUT /features/{id}`, `DELETE /features/{id}` |

Los `GET` del catálogo son públicos; el resto de operaciones envían `Authorization: Bearer <token>` y requieren rol ADMIN.

## 📊 Cambios en la Estructura de Datos

El producto ahora incluye sus características:

```javascript
features: [
  { id: number, name: string, icon: string }   // icon: clase de Remix Icon, ej. "ri-wifi-line"
]
```

Modelo de usuario:

```javascript
{ id: number, name: string, lastName: string, email: string, role: "USER" | "ADMIN" }
```

## 🎨 Decisiones de Diseño del Sprint

### 1. **Sesión con Context API + localStorage**
- **Flujo**: Al iniciar sesión, el token JWT y el usuario se guardan en `AuthProvider` y en `localStorage`; al recargar, la sesión existe desde el primer render y se refresca con `GET /users/me`. Si el backend responde 401, se cierra la sesión.
- **Razón**: Cualquier componente (Header, rutas protegidas, panel admin) accede al usuario con `useAuth()` sin pasar props.
### 2. **Rutas protegidas solo como capa de UI**
- `ProtectedRoute` y `AdminRoute` ocultan pantallas, pero la seguridad real está en el backend, que responde 401/403.
### 3. **Filtrado de categorías en el cliente**
- `GET /products` ya devuelve todos los productos con su categoría, así que el filtro y los conteos se calculan en el navegador sin cambios en el backend.
### 4. **Filtros en la URL**
- Las categorías seleccionadas viven en `?categorias=1,3` (`useSearchParams`), no en un estado local: el enlace se puede compartir y el botón "atrás" funciona.
### 5. **Un servicio por recurso**
- `productService`, `authService`, `userService` y `featureService` separan la comunicación con cada recurso de la API.

## 🎯 Pendiente para el Próximo Sprint

- ⏳ Gestión de categorías desde el panel admin (agregar categoría con título, descripción e imagen)
- ⏳ Búsqueda funcional por destino y fechas en la sección de búsqueda del Home
- ⏳ Reservas de alojamientos
- ⏳ Dashboard, inventario y configuración del panel admin

# 🚀 Sprint 3 - Nuevas Funcionalidades (Frontend)

## 📋 Resumen del Sprint

| Funcionalidad | Qué se implementó | Archivos principales |
|---|---|---|
| Realizar búsqueda | Buscador con autocompletado, calendario doble de fechas y resultados en el Home | `SearchSection`, `SearchAutocomplete`, `DateRangeCalendar`, `CalendarMonth`, `SearchResults`, `dateUtils` |
| Visualizar disponibilidad | Calendario doble en el detalle con fechas disponibles y ocupadas | `AvailabilityCalendar`, `CalendarMonth` |
| Marcar como favorito | Corazón en cada tarjeta y en el detalle para marcar o desmarcar | `FavoriteButton`, `FavoritesProvider`, `favoriteService` |
| Listar productos favoritos | Sección "Mis viajes" con los favoritos, accesible desde el Header | `FavoritesPage`, `FavoritesIcon`, `FavoritesContext` |
| Ver bloque de políticas del producto | Bloque "Políticas del alojamiento" en columnas | `ProductPolicies`, `productPolicies` |
| Compartir productos | Ventana para compartir con vista previa, mensaje y redes sociales | `ShareModal`, `shareNetworks` |
| Puntuar producto | Calificación con estrellas, nota sobre 10 y comentarios | `StarRating`, `RatingSummaryCard`, `ReviewsModal`, `reviewService`, `ratingUtils` |

## ✨ Funcionalidades Agregadas

### Realizar búsqueda
- ✅ **Bloque de búsqueda claro**: Título, texto de ayuda, etiquetas en los campos y botón "Realizar búsqueda"
- ✅ **Autocompletado**: Al escribir 2 letras aparecen sugerencias de ciudades, tipos de alojamiento y nombres, con la parte que coincide resaltada; se recorren con ↑/↓, Enter elige y Esc cierra
- ✅ **Calendario doble**: Al hacer clic en "Llegada - Salida" se abren dos meses (uno en móvil); los días pasados no se pueden elegir y el rango elegido se marca en verde
- ✅ **Resultados en el Home**: Aparecen bajo el buscador ("Resultados para «…»" y el número de alojamientos encontrados), sin quitar las secciones de categorías y recomendaciones, con botón "Limpiar búsqueda"
- ✅ **Búsqueda en la URL**: `/?q=cali&checkIn=2026-10-20&checkOut=2026-10-25` se puede compartir, funciona con "atrás" y se mantiene al recargar

### Visualizar disponibilidad
- ✅ **Calendario en el detalle**: Sección "Disponibilidad" con dos meses, flechas para avanzar y una leyenda (Disponible, Ocupado, Hoy)
- ✅ **Fechas ocupadas**: Se ven en rojo y tachadas; por ahora son fechas de ejemplo (del 10 al 13 de cada mes) hasta que existan las reservas

### Marcar como favorito
- ✅ **Corazón en cada tarjeta**: Blanco con contorno verde sobre la foto; al marcarlo se pone rojo, con un solo clic y sin abrir el detalle
- ✅ **Corazón en el detalle**: Junto al botón de compartir, encima de las imágenes
- ✅ **Respuesta inmediata**: El corazón cambia al instante y vuelve a su estado si el servidor falla, mostrando un aviso
- ✅ **Invitados**: Si no hay sesión, el corazón lleva al login

### Listar productos favoritos
- ✅ **Acceso desde el Header**: Ícono de maleta con corazón y el texto "Mis viajes", a la izquierda del avatar (solo el ícono en móvil)
- ✅ **Página "Mis viajes"**: Lista de los alojamientos marcados, con botón para volver
- ✅ **Tiempo real**: Marcar o desmarcar en cualquier parte del sitio actualiza la lista sin recargar; desde la lista se quita un favorito con el mismo corazón
- ✅ **Estado vacío**: Mensaje y botón "Explorar alojamientos" cuando no hay favoritos

### Ver bloque de políticas del producto
- ✅ **Bloque a todo el ancho**: Título "Políticas del alojamiento" subrayado en verde
- ✅ **Políticas en columnas**: Dos columnas en escritorio y una en móvil; cada política con ícono, título y descripción (horarios, normas de la casa, no fumar, mascotas, salud y seguridad, cancelación)

### Compartir productos
- ✅ **Ventana para compartir**: Se abre desde el ícono de compartir del detalle
- ✅ **Contenido**: Imagen del producto, descripción breve y enlace directo con botón "Copiar"
- ✅ **Personalización**: Mensaje editable (hasta 280 caracteres) y elección de la red social: Facebook, X (Twitter), Instagram, WhatsApp o LinkedIn

### Puntuar producto
- ✅ **Estrellas en las tarjetas**: Al lado de la categoría, con la nota sobre 10 y su etiqueta (Excelente, Muy bueno, Bueno, Regular, Malo)
- ✅ **Estrellas en el detalle**: Debajo del nombre, en el verde de la página; la nota también aparece junto a la categoría
- ✅ **Cuadro de calificación**: Sobre la esquina de la galería, con la nota, "Ver N comentarios" y "Comentarios de reservas"
- ✅ **Ventana de comentarios**: Fondo translúcido; arriba la calificación, luego el formulario (1 a 5 estrellas, comentario y botón "Comentar") y después todas las reseñas con estrellas, nombre, fecha y comentario
- ✅ **Media en tiempo real**: Al comentar, la nota del cuadro, del detalle y de la ventana se actualiza sin recargar
- ✅ **Sin valoraciones**: El producto se muestra sin estrellas, con nota 0.0 y "Sin valoraciones"

### Mejoras de autenticación
- ✅ **Páginas solo para invitados**: Con sesión iniciada, `/login` y `/register` redirigen al Home (`GuestRoute`)
- ✅ **Validación del login**: Solo comprueba que el correo y la contraseña no estén vacíos; la validación de las credenciales queda en el backend

## 🏗️ Nuevos Archivos

```
src/
├── api/
│   ├── favoriteService.js         # Leer, agregar y quitar favoritos
│   └── reviewService.js           # Leer y publicar reseñas
├── components/
│   ├── atoms/
│   │   ├── FavoriteButton.jsx     # Corazón de favorito
│   │   ├── FavoritesIcon.jsx      # Ícono "Mis viajes" (maleta con corazón)
│   │   ├── StarRating.jsx         # Estrellas de solo lectura o para calificar
│   │   └── Toast.jsx              # Aviso breve en la parte inferior
│   ├── molecules/
│   │   ├── CalendarMonth.jsx      # Un mes del calendario
│   │   ├── SearchAutocomplete.jsx # Campo de destino con sugerencias
│   │   ├── ProductPolicies.jsx    # "Políticas del alojamiento"
│   │   └── RatingSummaryCard.jsx  # Cuadro de calificación del detalle
│   ├── organisms/
│   │   ├── DateRangeCalendar.jsx  # Calendario doble del buscador
│   │   ├── AvailabilityCalendar.jsx # Calendario de disponibilidad del detalle
│   │   ├── SearchResults.jsx      # Resultados de la búsqueda
│   │   ├── ShareModal.jsx         # Ventana para compartir
│   │   └── ReviewsModal.jsx       # Ventana de calificación y comentarios
│   └── pages/
│       └── FavoritesPage.jsx      # "Mis viajes"
├── context/
│   ├── FavoritesContext.js        # Contexto + hook useFavorites()
│   └── FavoritesProvider.jsx      # Favoritos compartidos por toda la app
├── data/
│   ├── productPolicies.js         # Políticas del alojamiento
│   └── shareNetworks.js           # Redes sociales y sus enlaces para compartir
├── routes/
│   └── GuestRoute.jsx             # Solo para usuarios sin sesión
└── utils/
    ├── dateUtils.js               # Meses, días y formato de fechas
    └── ratingUtils.js             # Nota sobre 10, etiquetas y fecha de las reseñas
```

**Archivos modificados**: `SearchSection`, `SearchInput`, `Button`, `LargeCard`, `ProductGrid`, `Header`, `HomePage`, `ProductDetailPage`, `CategoryProductsPage`, `LoginPage`, `productService`, `AppRouter`, `main.jsx` (envuelve la app con `FavoritesProvider`).

## 🧭 Nuevas Rutas

| Ruta | Acceso | Página |
|---|---|---|
| `/?q=&checkIn=&checkOut=` | Pública | `HomePage` con resultados de búsqueda |
| `/mis-viajes` | Con sesión | `FavoritesPage` |
| `/login`, `/register` | Solo sin sesión | `LoginPage`, `RegisterPage` (ahora con `GuestRoute`) |

## 🔌 Nuevos Endpoints Consumidos

| Recurso | Endpoints |
|---|---|
| Búsqueda | `GET /products/search?q=&checkIn=&checkOut=`, `GET /products/suggestions?q=` |
| Favoritos | `GET /users/me/favorites`, `PUT /users/me/favorites/{productId}`, `DELETE /users/me/favorites/{productId}` |
| Reseñas | `GET /products/{productId}/reviews`, `POST /products/{productId}/reviews` |

La búsqueda, las sugerencias y la lectura de reseñas son públicas; los favoritos y publicar reseñas envían `Authorization: Bearer <token>`.

## 📊 Cambios en la Estructura de Datos

El producto ahora incluye su calificación:

```javascript
averageRating: number | null,   // media de 1 a 5 estrellas (null si no tiene reseñas); se muestra sobre 10
reviewCount: number             // total de reseñas
```

Modelo de reseña:

```javascript
{ id: number, rating: number /* 1-5 */, comment: string | null, createdAt: string, userName: string /* "Mario B." */ }
```

Favoritos del usuario: lista de ids de productos, ej. `[1, 4, 7]`.

## 🎨 Decisiones de Diseño del Sprint

### 1. **Favoritos con Context API**
- `FavoritesProvider` guarda los favoritos una sola vez para toda la app, igual que la sesión. Así el corazón de las tarjetas, el del detalle y la lista "Mis viajes" están siempre sincronizados.
### 2. **Actualización optimista**
- Al marcar un favorito el corazón cambia antes de que responda el servidor; si la petición falla, vuelve atrás y se muestra un aviso.
### 3. **Búsqueda en la URL**
- Igual que los filtros de categorías, la búsqueda vive en los parámetros de la URL (`useSearchParams`) en lugar de un estado local.
### 4. **Calendario propio**
- El calendario se construye con React, Tailwind e `Intl.DateTimeFormat`, sin librerías externas, para que coincida con el diseño de la página.
### 5. **Nota sobre 10**
- Se califica con 1 a 5 estrellas, pero la nota se muestra sobre 10, como en Booking o Despegar.


## Autor
 
Este proyecto fue creado por:
 
**Jesus Arley Ceballos**
