// pages/api/auth/register.js
import { users } from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' })
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' })
  }

  try {
    // Vérifie si l'utilisateur existe déjà
    const existingUser = users.find((u) => u.email === email)

    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' })
    }

    // Crée le nouvel utilisateur
    const newUser = {
      id: users.length + 1,
      email,
      password, // En production: hasher avec bcrypt
      role: 'customer',
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    // Ne pas renvoyer le mot de passe
    const { password: _, ...userWithoutPassword } = newUser

    return res.status(201).json({
      success: true,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error('Erreur register:', error)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}
