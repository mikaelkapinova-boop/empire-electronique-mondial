// pages/api/products.js
import { products } from '../../lib/db'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Récupère tous les produits
    return res.status(200).json({ products })
  }

  if (req.method === 'POST') {
    // Ajoute un produit (admin uniquement)
    const { name, category, condition, price, stock } = req.body

    if (!name || !category || !condition || !price) {
      return res.status(400).json({ error: 'Données manquantes' })
    }

    const newProduct = {
      id: products.length + 1,
      name,
      category,
      condition,
      price,
      stock: stock || 0,
      createdAt: new Date().toISOString(),
    }

    products.push(newProduct)

    return res.status(201).json({ success: true, product: newProduct })
  }

  return res.status(405).json({ error: 'Méthode non autorisée' })
}
