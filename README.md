# 🎬 MovieApp

Aplicación web para explorar películas y actores usando la API de [The Movie Database (TMDB)](https://www.themoviedb.org/). Permite buscar películas, filtrar por género, ver detalles y consultar la filmografía de actores.

---

## 🛠️ Stack tecnológico

- **React 19** — biblioteca de UI
- **Vite 8** — bundler y servidor de desarrollo
- **React Router v7** — navegación y rutas
- **Tailwind CSS v4** — estilos
- **Lucide React** — iconos
- **TMDB API** — fuente de datos de películas y actores

---

## 📁 Estructura del proyecto

```
src/
├── adapters/       # Transformación de datos crudos de la API
├── api/            # Llamada a la API de TMDB
├── components/     # Componentes reutilizables
├── constants/      # Constantes y configuración
├── hooks/          # Custom hooks
├── pages/          # Páginas/vistas de la aplicación
├── App.jsx
├── Router.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```
VITE_TMBD_API_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
VITE_TMDB_API_KEY=tu_api_key_aqui
VITE_TMBD_API_TOKEN=tu_api_token_aqui
```

Puedes obtener tu API key en [themoviedb.org → Settings → API](https://www.themoviedb.org/settings/api).

---

##  Instalación y uso local

```bash
# 1. Clona el repositorio
git clone https://github.com/LexyArraez/MovieApp.git
cd movieapp

# 2. Instala las dependencias
pnpm install

# 3. Configura las variables de entorno
cp .env.example .env
# Edita .env y añade tu API key de TMDB

# 4. Levanta el servidor de desarrollo
pnpm dev
```

La app estará disponible en `movie-app-git-main-lexyarraez95-9507s-projects.vercel.app`.

---