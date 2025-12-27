// pages/api/newsletter.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email invalide' })
  }

  try {
    // TODO: ici tu pourras brancher Mailchimp, Brevo, etc.
    console.log('New newsletter subscriber:', email)
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Newsletter error:', error)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}
