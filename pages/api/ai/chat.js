// pages/api/ai/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const { message, userRole } = req.body

  if (!message) {
    return res.status(400).json({ error: 'Message requis' })
  }

  const systemPrompt =
    userRole === 'admin'
      ? `Tu es l'IA de direction d'Empire-Electronique.
Tu aides à gérer le site, les offres, les catégories, les prix, les fournisseurs et la logistique.
Tu réponds avec des actions claires et des recommandations précises.`
      : `Tu es le support client d'Empire-Electronique.
Tu aides les clients pour les produits (mobiles, tablettes, PC, accessoires, pièces détachées),
le suivi de commande, le SAV et les conseils d'achat. Réponds simplement et poliment.`

  try {
    // Vérifie que la clé API est configurée
    if (!process.env.PPLX_API_KEY) {
      return res.status(500).json({
        error: 'Configuration IA manquante',
        response: 'La clé API Perplexity n\'est pas configurée. Ajoutez PPLX_API_KEY dans vos variables d\'environnement.',
      })
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PPLX_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'sonar-reasoning',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        max_tokens: 600,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erreur API Perplexity:', errorData)
      return res.status(500).json({
        error: 'Erreur API',
        response: 'L\'IA est temporairement indisponible. Vérifiez votre clé API.',
      })
    }

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content || 'Je ne peux pas répondre pour le moment.'

    return res.status(200).json({ response: reply })
  } catch (error) {
    console.error('Erreur IA:', error)
    return res.status(500).json({
      error: 'Erreur serveur',
      response: 'Erreur de connexion à l\'IA. Réessayez plus tard.',
    })
  }
}
