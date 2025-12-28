// pages/api/ai/webhook-supplier-response.js
import { aiAgent } from '../../../lib/ai-agent'

export default async function handler(req, res) {
  // Reçoit les réponses email via webhook (SendGrid/Resend)
  const { from, subject, body, inReplyTo } = req.body

  try {
    // L'IA analyse la réponse du fournisseur
    const analysis = await aiAgent({
      task: `Analyse cette réponse de fournisseur:
      De: ${from}
      Sujet: ${subject}
      Message: ${body}
      
      Détermine:
      1. Type de réponse: devis | négociation | acceptation | refus
      2. Prix proposé (si applicable)
      3. Délais de livraison
      4. Conditions spéciales
      5. Recommandation: accepter / contre-proposer / refuser
      
      Format JSON.`,
      context: { from, subject, body },
    })

    // Sauvegarde l'analyse et décide de la suite
    // Si bon prix: envoyer confirmation automatique
    // Si trop cher: renégocier automatiquement

    res.status(200).json({ received: true, analysis })
  } catch (error) {
    res.status(500).json({ error: 'Erreur analyse réponse' })
  }
}
