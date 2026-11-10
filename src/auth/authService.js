// Servicio de autenticación de PRUEBA.
// No hay servidor: valida contra un usuario fijo y guarda la sesión en el navegador.
// Para usar un servicio real (Supabase, Firebase, API propia) solo hay que
// reemplazar estas tres funciones; el resto de la app no cambia.

const STORAGE_KEY = 'nexo.session'

export const DEMO_USER = {
  email: 'demo@nexo.com',
  password: 'demo1234',
  name: 'Usuario Demo',
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export async function signIn(email, password) {
  await wait(600) // simula la demora de un servidor

  const ok = email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password
  if (!ok) throw new Error('Email o contraseña incorrectos.')

  const user = { email: DEMO_USER.email, name: DEMO_USER.name, signedInAt: new Date().toISOString() }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } catch {
    // Si el navegador bloquea el almacenamiento, la sesión dura hasta recargar.
  }
  return user
}

export async function signOut() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // nada que limpiar
  }
}
