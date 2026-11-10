# Burbuja — Landing Nexo Consultores

Landing page hecha con **React + Vite + Tailwind CSS 4**, con la burbuja de chat de Flamachat.

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción en dist/
npm run preview  # ver el build localmente
```

## Estructura

- `index.html` — HTML base + script de Flamachat
- `src/index.css` — Tailwind y colores de la marca (`@theme`)
- `src/data.js` — textos de servicios, stats, contacto, etc.
- `src/components/` — una sección por componente (Header, Hero, Services, About, CtaBand, Contact, Footer)
- `src/pages/` — páginas: `Landing` (`/`), `Login` (`/login`), `Panel` (`/panel`, privada)
- `src/auth/` — sesión de usuario

## Login

Por ahora el login es **de prueba**: no hay servidor y la sesión se guarda en el navegador.

- Usuario: `demo@nexo.com`
- Contraseña: `demo1234`

Para conectar un servicio real (Supabase, Firebase o una API propia) hay que reemplazar
las funciones de `src/auth/authService.js` (`signIn`, `signOut`, `getCurrentUser`).

> Al publicar el sitio, el hosting tiene que redirigir todas las rutas a `index.html`
> para que `/login` y `/panel` funcionen al recargar.
