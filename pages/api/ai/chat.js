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
      ? 'Tu es l\'IA de direction d\'Empire-Electronique. Tu aides à gérer le site.'
      : 'Tu es le support client d\'Empire-Electronique. Tu aides les clients.'

  try {
    if (!process.env.PPLX_API_KEY) {
      return res.status(500).json({
        response: 'Clé API non configurée. Ajoutez PPLX_API_KEY dans .env.local',
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
      }),
    })

    if (!response.ok) {
      return res.status(500).json({
        response: 'Erreur API Perplexity',
      })
    }

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content || 'Pas de réponse'

    return res.status(200).json({ response: reply })
  } catch (error) {
    return res.status(500).json({
      response: 'Erreur serveur',
    })
  }
}
