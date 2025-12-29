import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push(data.user.role === 'admin' ? '/admin/dashboard' : '/')
      } else {
        setError(data.error || 'Identifiants incorrects')
      }
    } catch (err) {
      setError('Erreur de connexion')
    }

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Connexion — Empire-Electronique</title>
      </Head>

      <div
        style={{
          minHeight: '100vh',
          background: '#050816',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            background: '#0f172a',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid #1e293b',
          }}
        >
          <h1
            style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '8px',
              background: 'linear-gradient(to right, #22c55e, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Empire-Electronique
          </h1>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>
            Connexion
          </h2>

          {error && (
            <div
              style={{
                padding: '12px',
                background: '#7f1d1d',
                border: '1px solid #991b1b',
                borderRadius: '8px',
                marginBottom: '16px',
                color: '#fca5a5',
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#a1a1aa' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #1e293b',
                  background: '#020617',
                  color: '#f5f5f5',
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#a1a1aa' }}>Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #1e293b',
                  background: '#020617',
                  color: '#f5f5f5',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: '#22c55e',
                color: '#020617',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'wait' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p style={{ marginTop: '24px', textAlign: 'center', color: '#a1a1aa' }}>
            Pas de compte ?{' '}
            <a href="/register" style={{ color: '#22c55e', textDecoration: 'none' }}>
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

