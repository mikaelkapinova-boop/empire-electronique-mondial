// pages/api/ai/customize-products.js
import { sendEmailToSupplier } from '../../../lib/email-service'
import { aiAgent } from '../../../lib/ai-agent'

export default async function handler(req, res) {
  const { supplierId, supplierEmail, customizationRequest } = req.body
  // customizationRequest = { packaging: true, logo: 'Empire', colors: ['black', 'white'], bundlePack: ['charger', 'case'] }

  try {
    const aiEmail = await aiAgent({
      task: `Rédige une demande de personnalisation pour fournisseur:
      - Packaging avec logo "Empire Électronique Mondial"
      - Couleurs: ${customizationRequest.colors?.join(', ')}
      - Pack multi-produits: ${customizationRequest.bundlePack?.join(' + ')}
      - Quantité minimum pour personnalisation: 100 unités
      - Demande échantillon gratuit avant commande
      
      Email professionnel en anglais.`,
      context: customizationRequest,
    })

    const result = await sendEmailToSupplier({
      to: supplierEmail,
      subject: 'Custom Branding & Product Bundle Request - Empire Électronique',
      body: aiEmail,
    })

    res.status(200).json({
      success: true,
      emailSent: result.success,
      customizationEmail: aiEmail,
    })
  } catch (error) {
    res.status(500).json({ error: 'Erreur personnalisation' })
  }
}
