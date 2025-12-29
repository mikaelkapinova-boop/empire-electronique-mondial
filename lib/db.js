// lib/db.js
// Base de données temporaire en mémoire
// À remplacer par Supabase, MongoDB ou PostgreSQL en production

export const users = [
  {
    id: 1,
    email: 'admin@empire.com',
    password: 'admin123', // En production: hasher avec bcrypt
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    email: 'client@test.com',
    password: 'client123',
    role: 'customer',
    createdAt: new Date().toISOString(),
  },
]

export const products = [
  // Pas de produits d'exemple
  // Les produits seront ajoutés via l'admin ou l'API
]

export const orders = []
