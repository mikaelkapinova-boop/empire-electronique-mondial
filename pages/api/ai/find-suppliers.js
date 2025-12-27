export default async function handler(req, res) {
  const { product, quantity } = req.body

  // Liste de fournisseurs (tu peux intégrer ta liste partagée ici)
  const suppliers = [
    { name: 'AliExpress', website: 'aliexpress.com', specialty: 'Électronique', avgPrice: 'Bas' },
    { name: 'Alibaba', website: 'alibaba.com', specialty: 'Gros volumes', avgPrice: 'Très bas' },
    { name: 'Banggood', website: 'banggood.com', specialty: 'Électronique', avgPrice: 'Moyen' },
    { name: 'DHgate', website: 'dhgate.com', specialty: 'Dropshipping', avgPrice: 'Bas' },
    // Ajoute tes fournisseurs personnalisés ici
  ]

  try {
    // L'IA analyse et recommande les meilleurs fournisseurs
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{
          role: 'user',
          content: `Analyse ces fournisseurs ${JSON.stringify(suppliers)} et recommande les 3 meilleurs pour acheter "${product}" en quantité ${quantity}. Donne le prix estimé et le délai de livraison.`
        }],
        max_tokens: 400
      })
    })

    const data = await response.json()
    const recommendation = data.choices[0].message.content

    res.status(200).json({ 
      suppliers: suppliers,
      aiRecommendation: recommendation
    })
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la recherche de fournisseurs' })
  }
}
