// pages/api/ai/find-suppliers.js
import { findSuppliersByProduct } from '../../../lib/suppliers-db'
import { aiAgent } from '../../../lib/ai-agent'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { product, quantity, maxPrice } = req.body

  try {
    // 1. Cherche dans ta base fournisseurs
    const suppliers = findSuppliersByProduct(product)

    // 2. L'IA analyse et recommande
    const aiRecommendation = await aiAgent({
      task: `Je cherche ${quantity} unités de "${product}" à max ${maxPrice}€/unité. 
      Voici les fournisseurs disponibles: ${JSON.stringify(suppliers)}.
      Recommande les 3 meilleurs et rédige un email de demande de devis pour chacun.`,
      context: { product, quantity, maxPrice, suppliers },
    })

    res.status(200).json({
      suppliers: suppliers,
      aiRecommendation: aiRecommendation,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur recherche fournisseurs' })
  }
}
