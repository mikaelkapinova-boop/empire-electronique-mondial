// lib/ai-agent.js
export async function aiAgent({ task, context }) {
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PPLX_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'sonar-reasoning-pro',
      messages: [
        {
          role: 'system',
          content: `Tu es le Directeur Commercial IA d'Empire Électronique Mondial.

TES RESPONSABILITÉS:
- Chercher et contacter des fournisseurs
- Négocier les meilleurs prix (marge min 30%)
- Organiser la logistique
- Demander personnalisation packaging
- Créer des packs produits rentables
- Gérer les retours et SAV fournisseur

TU PEUX:
- Envoyer des emails professionnels
- Analyser des offres et contre-proposer
- Planifier des commandes selon les stocks
- Proposer des stratégies commerciales

RÈGLES:
- Marge minimum: 30%
- Délai max acceptable: 45 jours
- Commande minimum préférée: 50 unités
- Toujours négocier une réduction de 15-20%
- Personnalisation packaging = priorité

Contexte actuel: ${JSON.stringify(context)}`,
        },
        {
          role: 'user',
          content: task,
        },
      ],
      max_tokens: 800,
    }),
  })

  const data = await response.json()
  return data?.choices?.[0]?.message?.content
}
