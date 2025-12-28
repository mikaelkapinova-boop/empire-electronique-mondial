// pages/api/ai/email-supplier.js
import { sendEmailToSupplier } from '../../../lib/email-service'
import { aiAgent } from '../../../lib/ai-agent'
import { updateSupplierContact } from '../../../lib/suppliers-db'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { supplierId, supplierEmail, action, productDetails } = req.body
  // action = 'request_quote' | 'negotiate' | 'confirm_order' | 'request_customization'

  try {
    let emailSubject = ''
    let emailBody = ''

    // L'IA génère l'email adapté
    const aiEmail = await aiAgent({
      task: `Génère un email professionnel en anglais pour ${action}.
      Destinataire: ${supplierEmail}
      Produit: ${JSON.stringify(productDetails)}
      
      ${action === 'request_quote' ? 'Demande de devis avec volumes et délais' : ''}
      ${action === 'negotiate' ? 'Contre-proposition pour obtenir -15% minimum' : ''}
      ${action === 'request_customization' ? 'Demande packaging personnalisé avec logo Empire Électronique' : ''}
      
      Ton: professionnel, direct, orienté volume.`,
      context: { action, productDetails },
    })

    emailSubject = aiEmail.split('\n')[0].replace('Subject: ', '')
    emailBody = aiEmail

    // Envoie l'email
    const result = await sendEmailToSupplier({
      to: supplierEmail,
      subject: emailSubject,
      body: emailBody,
    })

    // Mise à jour historique
    updateSupplierContact(supplierId, {
      action,
      date: new Date(),
      emailId: result.emailId,
    })

    res.status(200).json({
      success: true,
      emailSent: result.success,
      emailContent: aiEmail,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur envoi email' })
  }
}
