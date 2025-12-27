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
      subtitle: 'Économisez jusqu’à 30% sur une sélection de smartphones.',
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
      subtitle: 'Garantie, contrôlé, prêt à l’emploi. Meilleur prix, même qualité.',
      tag: 'Reconditionné',
      cta: 'Voir le reconditionné',
      href: '/store?condition=refurbished',
    },
  ]

  return (
    <>
      <Head>
        <title>Empire Électronique — Offres du moment</title>
        <meta
          name="description"
          content="Offres électroniques premium, neuf et reconditionné. Service IA intégré."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #000;
          color: #f5f5f7;
          overflow-x: hidden;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        /* HEADER MINIMAL STYLE APPLE */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .header.scrolled {
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.08);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          height: 44px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: -0.4px;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          font-size: 0.85rem;
        }

        .nav-links a {
          opacity: 0.8;
        }

        .nav-links a:hover {
          opacity: 1;
        }

        .burger {
          display: none;
          background: none;
          border: none;
          color: #f5f5f7;
          font-size: 1.5rem;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .burger {
            display: block;
          }
        }

        .mobile-menu {
          position: fixed;
          top: 44px;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          padding: 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.08);
        }

        .mobile-menu a {
          font-size: 1rem;
          opacity: 0.85;
        }

        /* HERO = OFFRES DU MOMENT */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 80px 20px 60px;
          background: radial-gradient(circle at top, #1a1a1a 0, #000 55%);
        }

        .hero-label {
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          opacity: 0.7;
          margin-bottom: 1rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          letter-spacing: -0.08em;
          margin-bottom: 0.75rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.4rem;
          }
        }

        .hero-subtitle {
          font-size: 1.2rem;
          opacity: 0.75;
          max-width: 600px;
          margin-bottom: 2.5rem;
        }

        @media (max-width: 768px) {
          .hero-subtitle {
            font-size: 1rem;
          }
        }

        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .btn-primary,
        .btn-secondary {
          padding: 14px 32px;
          border-radius: 999px;
          font-size: 0.95rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #f5f5f7;
          color: #000;
        }

        .btn-primary:hover {
          background: #ffffff;
        }

        .btn-secondary {
          background: transparent;
          color: #f5f5f7;
          border: 1px solid rgba(245, 245, 247, 0.4);
        }

        .btn-secondary:hover {
          background: rgba(245, 245, 247, 0.08);
        }

        @media (max-width: 480px) {
          .btn-primary,
          .btn-secondary {
            width: 100%;
          }
        }

        /* OFFERS SECTION */
        .offers-section {
          padding: 60px 20px 80px;
          background: #000;
        }

        .offers-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .offer-card {
          background: linear-gradient(135deg, #111 0, #050505 100%);
          border-radius: 24px;
          padding: 28px 24px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          gap: 10px;
          justify-content: space-between;
        }

        .offer-tag {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: 0.7;
        }

        .offer-title {
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: -0.04em;
        }

        .offer-subtitle {
          font-size: 0.95rem;
          opacity: 0.75;
          margin-bottom: 1rem;
        }

        .offer-cta {
          align-self: flex-start;
          padding: 10px 20px;
          border-radius: 999px;
          border: 1px solid rgba(245, 245, 247, 0.4);
          font-size: 0.9rem;
          cursor: pointer;
          background: transparent;
          color: #f5f5f7;
          transition: background 0.2s;
        }

        .offer-cta:hover {
          background: rgba(245, 245, 247, 0.1);
        }

        /* NEWSLETTER MINIMAL */
        .newsletter-section {
          padding: 60px 20px 80px;
          background: #050505;
          text-align: center;
        }

        .newsletter-title {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .newsletter-text {
          font-size: 0.95rem;
          opacity: 0.7;
          margin-bottom: 1.5rem;
        }

        .newsletter-form {
          max-width: 420px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }

        .newsletter-input {
          flex: 1;
          min-width: 220px;
          padding: 12px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: transparent;
          color: #f5f5f7;
          font-size: 0.95rem;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: #f5f5f7;
        }

        .newsletter-btn {
          padding: 12px 20px;
          border-radius: 999px;
          border: none;
          background: #f5f5f7;
          color: #000;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* FOOTER */
        .footer {
          padding: 20px;
          text-align: center;
          font-size: 0.8rem;
          opacity: 0.5;
          border-top: 0.5px solid rgba(255, 255, 255, 0.1);
          background: #000;
        }

        /* FLOATING CHAT */
        .floating-chat {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: none;
          background: #f5f5f7;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
          cursor: pointer;
          z-index: 900;
        }

        @media (max-width: 480px) {
          .floating-chat {
            bottom: 16px;
            right: 16px;
          }
        }

        /* CHAT POPUP (simple, propre) */
        .chat-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 1rem;
        }

        .chat-box {
          width: 100%;
          max-width: 420px;
          max-height: 80vh;
          background: #050505;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-header {
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.9rem;
        }

        .chat-messages {
          flex: 1;
          padding: 12px 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.9rem;
        }

        .chat-input-row {
          padding: 10px 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          gap: 8px;
        }

        .chat-input {
          flex: 1;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: transparent;
          padding: 8px 12px;
          color: #f5f5f7;
          font-size: 0.85rem;
        }

        .chat-send {
          border-radius: 999px;
          border: none;
          padding: 8px 14px;
          background: #f5f5f7;
          color: #000;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .msg-ai {
          align-self: flex-start;
          background: #111;
          border-radius: 14px;
          padding: 8px 10px;
        }

        .msg-user {
          align-self: flex-end;
          background: #f5f5f7;
          color: #000;
          border-radius: 14px;
          padding: 8px 10px;
        }
      `}</style>

      <main>
        {/* HEADER */}
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
          <div className="nav-container">
            <div className="logo">Empire</div>

            <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>

            <nav className="nav-links">
              <a onClick={() => router.push('/store')}>Store</a>
              <a onClick={() => router.push('/store?search=1')}>Recherche</a>
              <a onClick={() => setShowChat(true)}>IA</a>
              <a href="#support">Support</a>
              {user ? (
                <a onClick={() => router.push('/admin/dashboard')}>
                  {user.role === 'admin' ? 'Direction' : 'Compte'}
                </a>
              ) : (
                <a onClick={() => router.push('/auth/login')}>Connexion</a>
              )}
              <a>🛒</a>
            </nav>
          </div>

          {menuOpen && (
            <nav className="mobile-menu">
              <a onClick={() => { router.push('/store'); setMenuOpen(false) }}>Store</a>
              <a onClick={() => { router.push('/store?search=1'); setMenuOpen(false) }}>Recherche</a>
              <a onClick={() => { setShowChat(true); setMenuOpen(false) }}>IA</a>
              <a href="#support" onClick={() => setMenuOpen(false)}>Support</a>
              {user ? (
                <a onClick={() => { router.push('/admin/dashboard'); setMenuOpen(false) }}>
                  {user.role === 'admin' ? 'Direction' : 'Compte'}
                </a>
              ) : (
                <a onClick={() => { router.push('/auth/login'); setMenuOpen(false) }}>
                  Connexion
                </a>
              )}
            </nav>
          )}
        </header>

        {/* HERO : OFFRES DU MOMENT */}
        <section className="hero">
          <div className="hero-label">OFFRES DU MOMENT</div>
          <h1 className="hero-title">Tech premium,<br />prix intelligents.</h1>
          <p className="hero-subtitle">
            Sélection spéciale de smartphones, PC et produits reconditionnés,  
            optimisée par ton IA pour marges et prix attractifs.
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => router.push('/store?sort=best-deals')}
            >
              Voir toutes les offres
            </button>
            <button className="btn-secondary" onClick={() => setShowChat(true)}>
              Discuter avec l’IA
            </button>
          </div>
        </section>

        {/* BLOCS D’OFFRES */}
        <section className="offers-section">
          <div className="offers-container">
            {offers.map((offer) => (
              <article key={offer.title} className="offer-card">
                <div>
                  <div className="offer-tag">{offer.tag}</div>
                  <h2 className="offer-title">{offer.title}</h2>
                  <p className="offer-subtitle">{offer.subtitle}</p>
                </div>
                <button
                  className="offer-cta"
                  onClick={() => router.push(offer.href)}
                >
                  {offer.cta}
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="newsletter-section" id="support">
          <h2 className="newsletter-title">Reste informé</h2>
          <p className="newsletter-text">
            Reçois les nouvelles offres, restocks et promos exclusives.
          </p>
          <NewsletterForm />
        </section>

        {/* FOOTER */}
        <footer className="footer">
          © 2025 Empire Électronique Mondial. Tous droits réservés.
        </footer>

        {/* BOUTON CHAT FLOTTANT */}
        <button className="floating-chat" onClick={() => setShowChat(true)}>
          💬
        </button>

        {/* POPUP CHAT IA */}
        {showChat && <ChatAI onClose={() => setShowChat(false)} user={user} />}
      </main>
    </>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('Inscription réussie.')
        setEmail('')
      } else {
        setStatus('Erreur, réessaie.')
      }
    } catch {
      setStatus('Erreur de connexion.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form">
      <input
        type="email"
        className="newsletter-input"
        placeholder="Votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="newsletter-btn">
        S’inscrire
      </button>
      {status && (
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.8 }}>{status}</p>
      )}
    </form>
  )
}

function ChatAI({ onClose, user }) {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text:
        user?.role === 'admin'
          ? 'Salut, je suis ton IA de direction. Donne-moi des ordres (offres, fournisseurs, livraisons, etc.).'
          : 'Bonjour, je peux t’aider pour les produits, commandes et conseils.',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const current = input
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text: current }])
    setLoading(true)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: current,
          userRole: user?.role || 'guest',
        }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'ai', text: data.response }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: 'Impossible de répondre pour le moment.' },
      ])
    }
    setLoading(false)
  }

  return (
    <div className="chat-overlay">
      <div className="chat-box">
        <div className="chat-header">
          <span>{user?.role === 'admin' ? 'IA Direction' : 'Assistant IA'}</span>
          <button className="chat-send" onClick={onClose}>
            Fermer
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'ai' ? 'msg-ai' : 'msg-user'}>
              {m.text}
            </div>
          ))}
          {loading && <div className="msg-ai">L’IA réfléchit…</div>}
        </div>
        <div className="chat-input-row">
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Écris ton message…"
          />
          <button className="chat-send" onClick={sendMessage}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  )
}
