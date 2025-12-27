export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message } = req.body

  try {
    // Appel à l'IA (OpenAI ou autre)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Tu es un assistant IA pour Empire Électronique Mondial. Tu peux : 1) Aider à trouver des produits 2) Gérer les commandes 3) Trouver les meilleurs fournisseurs 4) Optimiser les livraisons. Réponds de manière concise et professionnelle.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300
      })
    })

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    res.status(200).json({ response: aiResponse })
  } catch (error) {
    console.error('Erreur IA:', error)
    res.status(500).json({ response: '❌ Désolé, une erreur est survenue. Réessayez.' })
  }
}
