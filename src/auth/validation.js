export const MIN_PASSWORD = 8

export function validateEmail(email) {
  if (!email.trim()) return 'Ingresá tu email.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Ese email no parece válido.'
  return ''
}

export function validatePassword(password) {
  if (!password) return 'Ingresá una contraseña.'
  if (password.length < MIN_PASSWORD) return `Usá al menos ${MIN_PASSWORD} caracteres.`
  if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) return 'Combiná letras y números.'
  return ''
}

export function validateConfirm(password, confirm) {
  if (!confirm) return 'Repetí la contraseña.'
  if (password !== confirm) return 'Las contraseñas no coinciden.'
  return ''
}
