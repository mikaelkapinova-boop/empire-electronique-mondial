// pages/api/auth/login.js
import { users } from '../../../lib/db'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' })
  }

  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return res.status(401).json({ error: 'Identifiants incorrects' })
  }

  const { password: _, ...userWithoutPassword } = user

  return res.status(200).json({
    success: true,
    user: userWithoutPassword,
  })
}
