import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [showChat, setShowChat] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    if (userData) setUser(JSON.parse(userData))

    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const offers = [
    {
      title: 'Offre iPhone du moment',
      subtitle: 'Économisez jusquà 30% sur une sélection de smartphones.',
      tag: 'Smartphones',
      cta: 'Voir les offres iPhone',
      href: '/store?category=smartphones',
    },
    {
      title: 'Mac & PC pour les pros',
      subtitle: 'Performances haut de gamme pour travailler et jouer.',
      tag: 'Ordinateurs',
      cta: 'Voir les offres Mac & PC',
      href: '/store?category=computers',
    },
    {
      title: 'Reconditionné Premium',
      subtitle: 'Garantie, contrôlé, prêt à lemploi. Meilleur prix, même qualité.',
      tag: 'Reconditionné',
      cta: 'Voir le reconditionné',
      href: '/store?condition=refurbished',
    },
  ]

  return (
    <>
      <Head>
        <title>Empire-Electronique — Smartphones, PC & Reconditionnés</title>
        <meta name="description" content="Smartphones, PC et produits reconditionnés de qualité aux meilleurs prix." />
      </Head>

      <div style={{ minHeight: '100vh', background: '#050816', color: '#f5f5f5' }}>
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: scrolled ? 'rgba(15, 23, 42, 0.95)' : '#0f172a',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            borderBottom: '1px solid #1e293b',
            transition: 'all 0.3s ease',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h1
              style={{
                fontSize: '20px',
                fontWeight: '700',
                background: 'linear-gradient(to right, #22c55e, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                cursor: 'pointer',
              }}
              onClick={() => router.push('/')}
            >
              Empire-Electronique
            </h1>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                position: 'relative',
                width: '30px',
                height: '30px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              aria-label="Menu"
            >
              <span
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#22c55e',
                  transition: 'all 0.3s ease',
                  position: 'absolute',
                  transform: menuOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
              />
              <span
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#22c55e',
                  transition: 'all 0.3s ease',
                  position: 'absolute',
                  transform: menuOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
                }}
              />
            </button>
          </div>

          {menuOpen && (
            <nav
              style={{
                background: '#0f172a',
                borderTop: '1px solid #1e293b',
              }}
            >
              <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px' }}>
                <a
                  href="/store"
                  style={{
                    display: 'block',
                    padding: '12px 0',
                    color: '#f5f5f5',
                    textDecoration: 'none',
                    borderBottom: '1px solid #1e293b',
                  }}
                >
                  🛒 Boutique
                </a>
                {user ? (
                  <>
                    <a
                      href={user.role === 'admin' ? '/admin/dashboard' : '/account'}
                      style={{
                        display: 'block',
                        padding: '12px 0',
                        color: '#f5f5f5',
                        textDecoration: 'none',
                        borderBottom: '1px solid #1e293b',
                      }}
                    >
                      {user.role === 'admin' ? '⚙️ Dashboard Admin' : '👤 Mon Compte'}
                    </a>
                    <button
                      onClick={() => {
                        localStorage.removeItem('user')
                        setUser(null)
                        router.push('/')
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px 0',
                        color: '#f5f5f5',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      🚪 Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      style={{
                        display: 'block',
                        padding: '12px 0',
                        color: '#f5f5f5',
                        textDecoration: 'none',
                        borderBottom: '1px solid #1e293b',
                      }}
                    >
                      🔐 Connexion
                    </a>
                    <a
                      href="/register"
                      style={{
                        display: 'block',
                        padding: '12px 0',
                        color: '#22c55e',
                        textDecoration: 'none',
                      }}
                    >
                      ✨ Inscription
                    </a>
                  </>
                )}
              </div>
            </nav>
          )}
        </header>

        <section
          style={{
            padding: '60px 24px',
            textAlign: 'center',
            background: 'linear-gradient(180deg, #0f172a 0%, #050816 100%)',
          }}
        >
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '800',
              marginBottom: '16px',
              background: 'linear-gradient(to right, #f5f5f5, #a1a1aa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Smartphones, PC & Reconditionnés
          </h2>
          <p style={{ fontSize: '18px', color: '#a1a1aa', maxWidth: '600px', margin: '0 auto 32px' }}>
            Les meilleurs produits électroniques aux prix les plus attractifs
          </p>
          <button
            onClick={() => router.push('/store')}
            style={{
              background: '#22c55e',
              color: '#0f172a',
              border: 'none',
              padding: '14px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Voir la boutique
          </button>
        </section>

        <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {offers.map((offer, i) => (
              <div
                key={i}
                style={{
                  background: '#020617',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #1e293b',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer',
                }}
                onClick={() => router.push(offer.href)}
              >
                <span
                  style={{
                    display: 'inline-block',
                    background: '#22c55e',
                    color: '#020617',
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '16px',
                  }}
                >
                  {offer.tag}
                </span>
                <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>{offer.title}</h3>
                <p style={{ color: '#a1a1aa', marginBottom: '16px' }}>{offer.subtitle}</p>
                <button
                  style={{
                    background: 'transparent',
                    color: '#22c55e',
                    border: '1px solid #22c55e',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  {offer.cta} →
                </button>
              </div>
            ))}
          </div>
        </section>

        {showChat && (
          <div
            style={{
              position: 'fixed',
              bottom: '80px',
              right: '24px',
              width: '350px',
              height: '450px',
              background: '#0f172a',
              borderRadius: '16px',
              border: '1px solid #1e293b',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 100,
            }}
          >
            <div
              style={{
                padding: '16px',
                borderBottom: '1px solid #1e293b',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h4 style={{ margin: 0, fontSize: '16px' }}>Support Client</h4>
              <button
                onClick={() => setShowChat(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#a1a1aa',
                  cursor: 'pointer',
                  fontSize: '20px',
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
              <p style={{ color: '#a1a1aa', fontSize: '14px' }}>
                👋 Bonjour ! Comment puis-je vous aider ?
              </p>
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid #1e293b' }}>
              <input
                type="text"
                placeholder="Posez votre question..."
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #1e293b',
                  background: '#020617',
                  color: '#f5f5f5',
                }}
              />
            </div>
          </div>
        )}

        <button
          onClick={() => setShowChat(!showChat)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#22c55e',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            boxShadow: '0 4px 20px rgba(34, 197, 94, 0.4)',
            zIndex: 100,
          }}
        >
          💬
        </button>

        <footer
          style={{
            textAlign: 'center',
            padding: '24px',
            fontSize: '14px',
            color: '#71717a',
            background: '#020617',
            borderTop: '1px solid #1e293b',
          }}
        >
          © 2025 Empire-Electronique — Tous droits réservés
        </footer>
      </div>
    </>
  )
}
