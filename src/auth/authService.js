// Servicio de autenticación de PRUEBA.
// No hay servidor: los usuarios, la sesión y los enlaces de recuperación se guardan
// en el navegador (localStorage). Las contraseñas quedan sin cifrar: NO usar así en producción.
//
// Para usar un servicio real (Supabase, Firebase, API propia) solo hay que
// reemplazar las funciones exportadas; el resto de la app no cambia.

const SESSION_KEY = 'nexo.session'
const USERS_KEY = 'nexo.users'
const RESET_KEY = 'nexo.resetTokens'
const RESET_TTL_MS = 30 * 60 * 1000 // los enlaces de recuperación vencen en 30 minutos

export const DEMO_USER = {
  email: 'demo@nexo.com',
  password: 'demo1234',
  name: 'Usuario Demo',
}

// En modo de prueba no se mandan emails: la pantalla muestra el enlace directamente.
export const IS_DEMO = true

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const normalize = (email) => email.trim().toLowerCase()

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Si el navegador bloquea el almacenamiento, los datos duran hasta recargar.
  }
}

function getUsers() {
  const users = read(USERS_KEY, null)
  if (users) return users
  const seeded = [{ ...DEMO_USER, createdAt: new Date().toISOString() }]
  write(USERS_KEY, seeded)
  return seeded
}

function startSession(user) {
  const session = { email: user.email, name: user.name, signedInAt: new Date().toISOString() }
  write(SESSION_KEY, session)
  return session
}

function randomToken() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID()
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function getCurrentUser() {
  return read(SESSION_KEY, null)
}

export async function signIn(email, password) {
  await wait(600) // simula la demora de un servidor
  const user = getUsers().find((u) => u.email === normalize(email))
  if (!user || user.password !== password) throw new Error('Email o contraseña incorrectos.')
  return startSession(user)
}

export async function signUp({ name, email, password }) {
  await wait(700)
  const users = getUsers()
  const cleanEmail = normalize(email)
  if (users.some((u) => u.email === cleanEmail)) {
    throw new Error('Ya existe una cuenta con ese email. Probá iniciar sesión.')
  }
  const user = { name: name.trim(), email: cleanEmail, password, createdAt: new Date().toISOString() }
  write(USERS_KEY, [...users, user])
  return startSession(user)
}

export async function signOut() {
  write(SESSION_KEY, null)
}

// Pide un enlace para restablecer la contraseña.
// Siempre responde igual exista o no la cuenta, para no revelar qué emails están registrados.
// En modo de prueba devuelve el enlace (un servicio real lo mandaría por email).
export async function requestPasswordReset(email) {
  await wait(700)
  const user = getUsers().find((u) => u.email === normalize(email))
  if (!user) return { demoLink: null }

  const token = randomToken()
  const tokens = read(RESET_KEY, {})
  tokens[token] = { email: user.email, expiresAt: Date.now() + RESET_TTL_MS }
  write(RESET_KEY, tokens)
  return { demoLink: `/restablecer?token=${token}` }
}

export function isResetTokenValid(token) {
  const entry = token && read(RESET_KEY, {})[token]
  return Boolean(entry && entry.expiresAt > Date.now())
}

export async function resetPassword(token, newPassword) {
  await wait(600)
  const tokens = read(RESET_KEY, {})
  const entry = tokens[token]
  if (!entry || entry.expiresAt <= Date.now()) {
    throw new Error('El enlace venció o ya fue usado. Pedí uno nuevo.')
  }
  const users = getUsers().map((u) => (u.email === entry.email ? { ...u, password: newPassword } : u))
  write(USERS_KEY, users)
  delete tokens[token] // cada enlace sirve una sola vez
  write(RESET_KEY, tokens)
}
