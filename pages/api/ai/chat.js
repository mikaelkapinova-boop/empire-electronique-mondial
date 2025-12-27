// pages/api/ai/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, userRole } = req.body

  const systemPrompt =
    userRole === 'admin'
      ? `Tu es l'IA de direction d'Empire Électronique Mondial.
Tu aides à gérer le site, les offres, les catégories, les prix, les fournisseurs et la logistique.
Tu réponds avec des actions claires et des recommandations précises.`
      : `Tu es le support client d'Empire Électronique Mondial.
Tu aides les clients pour les produits (mobiles, tablettes, PC, accessoires, pièces détachées),
le suivi de commande, le SAV et les conseils d'achat. Réponds simplement et poliment.`

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PPLX_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'sonar-reasoning-pro',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 600,
      }),
    })

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content || 'Je ne peux pas répondre pour le moment.'
    res.status(200).json({ response: reply })
  } catch (error) {
    console.error('IA error:', error)
    res.status(500).json({ response: 'Erreur IA, réessaie plus tard.' })
  }
}
