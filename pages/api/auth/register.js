// pages/api/auth/register.js
import { users } from '../../../lib/db'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' })
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Mot de passe trop court (min 6 caractères)' })
  }

  const existingUser = users.find((u) => u.email === email)

  if (existingUser) {
    return res.status(400).json({ error: 'Email déjà utilisé' })
  }

  const newUser = {
    id: users.length + 1,
    email,
    password,
    role: 'customer',
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)

  const { password: _, ...userWithoutPassword } = newUser

  return res.status(201).json({
    success: true,
    user: userWithoutPassword,
  })
}
