import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Register() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Pour l’instant : on simule l’inscription côté client
    localStorage.setItem('user', JSON.stringify({ email, role: 'customer' }))
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Créer un compte — Empire Électronique</title>
      </Head>
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
          color: '#f5f5f7',
          padding: '20px',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: '100%',
            maxWidth: 400,
            background: '#050505',
            padding: 24,
            borderRadius: 18,
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <h1 style={{ fontSize: '1.4rem', marginBottom: 8 }}>Créer un compte</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '10px 14px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'transparent',
              color: '#f5f5f7',
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '10px 14px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'transparent',
              color: '#f5f5f7',
            }}
          />
          <button
            type="submit"
            style={{
              marginTop: 8,
              padding: '10px 16px',
              borderRadius: 999,
              border: 'none',
              background: '#f5f5f7',
              color: '#000',
              cursor: 'pointer',
            }}
          >
            S’inscrire
          </button>
        </form>
      </main>
    </>
  )
}
