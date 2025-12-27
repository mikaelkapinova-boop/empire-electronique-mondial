import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [showChat, setShowChat] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))
  }, [])

  const categories = [
    { name: '📱 Smartphones', slug: 'smartphones', types: ['Neuf', 'Reconditionné'] },
    { name: '💻 PC Portables', slug: 'laptops', types: ['Neuf', 'Reconditionné'] },
    { name: '🖥️ PC Bureau', slug: 'desktops', types: ['Neuf', 'Reconditionné'] },
    { name: '📲 Tablettes', slug: 'tablets', types: ['Neuf', 'Reconditionné'] },
    { name: '⌚ Montres Connectées', slug: 'watches', types: ['Neuf', 'Reconditionné'] },
    { name: '🎧 Audio', slug: 'audio', types: ['Neuf', 'Reconditionné'] },
    { name: '📷 Photo/Vidéo', slug: 'camera', types: ['Neuf', 'Reconditionné'] },
    { name: '🎮 Gaming', slug: 'gaming', types: ['Neuf', 'Reconditionné'] },
  ]

  return (
    <>
      <Head>
        <title>Empire Électronique Mondial - E-commerce Pro avec IA</title>
        <meta name="description" content="Boutique électronique professionnelle avec IA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          overflow-x: hidden;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        /* RESPONSIVE STYLES */
        .header {
          background-color: #1a1a1a;
          padding: 1rem 0;
          border-bottom: 2px solid #2563eb;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2563eb;
        }

        @media (max-width: 480px) {
          .logo {
            font-size: 1.1rem;
          }
        }

        .burger {
          display: none;
          fontSize: 2rem;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .burger {
            display: block;
          }
        }

        .nav-desktop {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .nav-desktop {
            display: none;
          }
        }

        .nav-desktop a, .nav-desktop button {
          color: white;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }

        .chat-btn {
          background-color: #7c3aed;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }

        .mobile-menu {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
          padding: 1rem;
          background-color: #111;
          border-radius: 8px;
        }

        .mobile-menu a, .mobile-menu button {
          color: white;
          padding: 10px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          font-size: 1rem;
        }

        /* HERO SECTION */
        .hero {
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          padding: 5rem 2rem;
          text-align: center;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 3rem 1rem;
          }
        }

        .hero-title {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.5rem;
          }
        }

        .hero-text {
          font-size: 1.3rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .hero-text {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-text {
            font-size: 0.9rem;
          }
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          padding: 15px 40px;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
        }

        @media (max-width: 480px) {
          .btn-primary, .btn-secondary {
            padding: 12px 30px;
            font-size: 0.9rem;
            width: 100%;
          }
        }

        .btn-primary {
          background-color: white;
          color: #2563eb;
        }

        .btn-secondary {
          background-color: transparent;
          color: white;
          border: 2px solid white;
        }

        /* CATEGORIES */
        .categories {
          padding: 4rem 2rem;
          background-color: #0a0a0a;
        }

        @media (max-width: 768px) {
          .categories {
            padding: 2rem 1rem;
          }
        }

        .section-title {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 3rem;
          color: #2563eb;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 1.5rem;
          }
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .category-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .category-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .category-card {
          background-color: #1a1a1a;
          border-radius: 15px;
          padding: 2rem;
          border: 1px solid #2563eb;
          text-align: center;
          transition: transform 0.3s ease;
        }

        .category-card:hover {
          transform: translateY(-5px);
        }

        @media (max-width: 480px) {
          .category-card {
            padding: 1.5rem;
          }
        }

        .category-name {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #fbbf24;
        }

        @media (max-width: 480px) {
          .category-name {
            font-size: 1.2rem;
          }
        }

        .category-types {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .type-btn {
          background-color: #2563eb;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }

        .type-btn:hover {
          background-color: #1d4ed8;
        }

        @media (max-width: 480px) {
          .type-btn {
            padding: 8px 16px;
            font-size: 0.9rem;
          }
        }

        /* NEWSLETTER */
        .newsletter {
          background-color: #1a1a1a;
          padding: 4rem 2rem;
          text-align: center;
        }

        @media (max-width: 768px) {
          .newsletter {
            padding: 3rem 1rem;
          }
        }

        .newsletter h2 {
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 480px) {
          .newsletter h2 {
            font-size: 1.5rem;
          }
        }

        .newsletter-form {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 600px;
          margin: 0 auto;
        }

        .newsletter-input {
          padding: 15px;
          width: 100%;
          max-width: 300px;
          border-radius: 8px;
          border: 1px solid #2563eb;
          background-color: #0a0a0a;
          color: white;
          font-size: 1rem;
        }

        @media (max-width: 480px) {
          .newsletter-input {
            max-width: 100%;
          }
        }

        .newsletter-btn {
          padding: 15px 30px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
        }

        @media (max-width: 480px) {
          .newsletter-btn {
            width: 100%;
          }
        }

        /* CHAT IA */
        .chat-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 1rem;
        }

        .chat-container {
          background-color: #1a1a1a;
          border-radius: 15px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          border: 2px solid #2563eb;
        }

        @media (max-width: 480px) {
          .chat-container {
            width: 95%;
            max-height: 90vh;
          }
        }

        .chat-header {
          padding: 1rem;
          border-bottom: 1px solid #2563eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-header h3 {
          font-size: 1.3rem;
        }

        @media (max-width: 480px) {
          .chat-header h3 {
            font-size: 1.1rem;
          }
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .user-msg, .ai-msg {
          padding: 10px 15px;
          border-radius: 15px;
          max-width: 70%;
          word-wrap: break-word;
        }

        @media (max-width: 480px) {
          .user-msg, .ai-msg {
            max-width: 85%;
            font-size: 0.9rem;
          }
        }

        .user-msg {
          align-self: flex-end;
          background-color: #2563eb;
        }

        .ai-msg {
          align-self: flex-start;
          background-color: #7c3aed;
        }

        .chat-input {
          padding: 1rem;
          border-top: 1px solid #2563eb;
          display: flex;
          gap: 0.5rem;
        }

        @media (max-width: 480px) {
          .chat-input {
            padding: 0.75rem;
          }
        }

        .chat-input-field {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #2563eb;
          background-color: #0a0a0a;
          color: white;
          font-size: 1rem;
        }

        @media (max-width: 480px) {
          .chat-input-field {
            font-size: 0.9rem;
            padding: 8px;
          }
        }

        .chat-send-btn {
          padding: 10px 20px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }

        @media (max-width: 480px) {
          .chat-send-btn {
            padding: 8px 16px;
            font-size: 0.9rem;
          }
        }

        /* FOOTER */
        .footer {
          background-color: #0a0a0a;
          padding: 2rem;
          text-align: center;
          border-top: 2px solid #2563eb;
          color: white;
        }

        @media (max-width: 480px) {
          .footer {
            padding: 1.5rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <main>
        {/* HEADER */}
        <header className="header">
          <div className="container">
            <div className="header-content">
              <h1 className="logo">⚡ Empire Électronique</h1>
              
              <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? '✕' : '☰'}
              </button>

              <nav className="nav-desktop">
                <a href="#categories">Produits</a>
                <a href="#about">À propos</a>
                {user ? (
                  <>
                    <a href="/admin/dashboard">
                      {user.role === 'admin' ? '👔 Direction' : '👤 Mon Compte'}
                    </a>
                    <button className="chat-btn" onClick={() => setShowChat(true)}>
                      💬 Chat IA
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/auth/login">Connexion</a>
                    <a href="/auth/register">Inscription</a>
                  </>
                )}
                <a href="#">🛒 (0)</a>
              </nav>
            </div>

            {menuOpen && (
              <nav className="mobile-menu">
                <a href="#categories" onClick={() => setMenuOpen(false)}>Produits</a>
                <a href="#about" onClick={() => setMenuOpen(false)}>À propos</a>
                {user ? (
                  <>
                    <a href="/admin/dashboard">
                      {user.role === 'admin' ? '👔 Direction' : '👤 Mon Compte'}
                    </a>
                    <button onClick={() => { setShowChat(true); setMenuOpen(false) }}>
                      💬 Chat IA
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/auth/login">Connexion</a>
                    <a href="/auth/register">Inscription</a>
                  </>
                )}
                <a href="#">🛒 Panier (0)</a>
              </nav>
            )}
          </div>
        </header>

        {/* HERO */}
        <section className="hero">
          <div className="container">
            <h2 className="hero-title">🤖 E-Commerce Intelligent</h2>
            <p className="hero-text">
              Gestion automatisée par IA • Meilleurs prix garantis • Livraison optimisée
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => router.push('/auth/register')}>
                Créer un compte
              </button>
              <button className="btn-secondary" onClick={() => setShowChat(true)}>
                Parler avec l'IA
              </button>
            </div>
          </div>
        </section>

        {/* CATÉGORIES */}
        <section className="categories" id="categories">
          <div className="container">
            <h2 className="section-title">🛍️ Nos Catégories</h2>
            <div className="category-grid">
              {categories.map((cat) => (
                <div key={cat.slug} className="category-card">
                  <h3 className="category-name">{cat.name}</h3>
                  <div className="category-types">
                    {cat.types.map((type) => (
                      <button 
                        key={type}
                        className="type-btn"
                        onClick={() => router.push(`/products/${cat.slug}?type=${type.toLowerCase()}`)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="newsletter">
          <div className="container">
            <h2>📧 Recevez nos meilleures offres</h2>
            <NewsletterForm />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p>© 2025 Empire Électronique Mondial • IA Autonome • Meilleurs Prix</p>
        </footer>

        {/* CHAT IA */}
        {showChat && <ChatAI onClose={() => setShowChat(false)} />}
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
        body: JSON.stringify({ email })
      })
      if (res.ok) {
        setStatus('✅ Inscription réussie !')
        setEmail('')
      } else {
        setStatus('❌ Erreur, réessayez')
      }
    } catch (error) {
      setStatus('❌ Erreur réseau')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form">
      <input 
        type="email" 
        placeholder="votre@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="newsletter-input"
      />
      <button type="submit" className="newsletter-btn">S'inscrire</button>
      {status && <p style={{width: '100%', marginTop: '1rem'}}>{status}</p>}
    </form>
  )
}

function ChatAI({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: '👋 Bonjour ! Je suis votre assistant IA. Je peux vous aider à trouver des produits, gérer vos commandes, ou trouver les meilleurs fournisseurs.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMessage = { role: 'user', text: input }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'ai', text: data.response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: '❌ Erreur de connexion' }])
    }
    setLoading(false)
  }

  return (
    <div className="chat-overlay">
      <div className="chat-container">
        <div className="chat-header">
          <h3>🤖 Assistant IA</h3>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? 'user-msg' : 'ai-msg'}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="ai-msg">💭 L'IA réfléchit...</div>}
        </div>
        <div className="chat-input">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Écrivez votre message..."
            className="chat-input-field"
          />
          <button onClick={sendMessage} className="chat-send-btn">Envoyer</button>
        </div>
      </div>
    </div>
  )
}
