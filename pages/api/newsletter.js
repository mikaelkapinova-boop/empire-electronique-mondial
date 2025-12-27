export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body

  // Ici tu peux intégrer un service comme Mailchimp, SendGrid, etc.
  // Pour l'instant, on simule l'inscription
  
  try {
    // Sauvegarde dans une base de données (à implémenter)
    console.log('Nouvelle inscription newsletter:', email)
    
    res.status(200).json({ message: 'Inscription réussie!' })
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'inscription' })
  }
}
