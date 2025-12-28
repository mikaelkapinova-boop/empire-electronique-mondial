// lib/email-service.js
export async function sendEmailToSupplier({ to, subject, body, threadId = null }) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'direction@empire-electronique.com',
        to: to,
        subject: subject,
        html: body,
        headers: threadId ? { 'In-Reply-To': threadId } : {},
      }),
    })

    const data = await response.json()
    return { success: true, emailId: data.id }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error: error.message }
  }
}
