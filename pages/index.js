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
    const userData = localStorage.getItem('user')
    if (userData) setUser(JSON.parse(userData))

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [
    { name: 'iPhone', slug: 'smartphones', icon: '📱', color: '#000' },
    { name: 'Mac', slug: 'laptops', icon: '💻', color: '#000' },
    { name: 'iPad', slug: 'tablets', icon: '📲', color: '#000' },
    { name: 'Watch', slug: 'watches', icon: '⌚', color: '#000' },
    { name: 'AirPods', slug: 'audio', icon: '🎧', color: '#000' },
    { name: 'Accessories', slug: 'accessories', icon: '✨', color: '#000' },
  ]

  return (
    <>
      <Head>
        <title>Empire Électronique — Premium Tech Store</title>
        <meta name="description" content="The future of shopping. Powered by AI." />
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

        /* HEADER STYLE APPLE */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header.scrolled {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
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
          font-size: 1.3rem;
          font-weight: 600;
          color: #f5f5f7;
          letter-spacing: -0.5px;
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }

        .nav-links a {
          color: #f5f5f7;
          font-size: 0.85rem;
          font-weight: 400;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.2s;
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
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-menu a {
          color: #f5f5f7;
          font-size: 1.1rem;
          font-weight: 400;
          text-decoration: none;
          opacity: 0.8;
        }

        /* HERO SECTION STYLE APPLE */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 80px 20px 60px;
          background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 113, 227, 0.15) 0%, transparent 70%);
          top: -250px;
          right: -250px;
          pointer-events: none;
        }

        .hero-badge {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .hero-title {
          font-size: 4.5rem;
          font-weight: 700;
          letter-spacing: -2px;
          line-height: 1.1;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 400;
          opacity: 0.8;
          margin-bottom: 3rem;
          max-width: 700px;
        }

        @media (max-width: 768px) {
          .hero-subtitle {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-subtitle {
            font-size: 1rem;
          }
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-primary {
          background: #0071e3;
          color: white;
          padding: 14px 30px;
          border: none;
          border-radius: 980px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          background: #0077ed;
          transform: scale(1.02);
        }

        .btn-secondary {
          background: transparent;
          color: #0071e3;
          padding: 14px 30px;
          border: 1.5px solid #0071e3;
          border-radius: 980px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: rgba(0, 113, 227, 0.1);
        }

        @media (max-width: 480px) {
          .btn-primary, .btn-secondary {
            width: 100%;
            padding: 12px 24px;
          }
        }

        /* CATEGORIES SECTION */
        .categories-section {
          padding: 100px 20px;
          background: #000;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 700;
          letter-spacing: -1px;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
        }

        .section-subtitle {
          font-size: 1.1rem;
          opacity: 0.6;
          font-weight: 400;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 480px) {
          .categories-grid {
            grid-template-columns: 1fr;
          }
        }

        .category-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }

        .category-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-5px);
        }

        .category-icon {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
        }

        .category-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          letter-spacing: -0.5px;
        }

        .category-types {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .type-badge {
          background: rgba(255, 255, 255, 0.1);
          padding: 6px 14px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .type-badge:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        /* AI SECTION */
        .ai-section {
          padding: 100px 20px;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          text-align: center;
        }

        .ai-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .ai-icon {
          font-size: 4rem;
          margin-bottom: 2rem;
        }

        .ai-title {
          font-size: 3rem;
          font-weight: 700;
          letter-spacing: -1px;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .ai-title {
            font-size: 2rem;
          }
        }

        .ai-description {
          font-size: 1.2rem;
          opacity: 0.7;
          margin-bottom: 2rem;
        }

        /* NEWSLETTER */
        .newsletter-section {
          padding: 80px 20px;
          background: rgba(255, 255, 255, 0.02);
          text-align: center;
        }

        .newsletter-title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          max-width: 500px;
          margin: 2rem auto 0;
          flex-wrap: wrap;
        }

        .newsletter-input {
          flex: 1;
          min-width: 250px;
          padding: 14px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: all 0.2s;
        }

        .newsletter-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 480px) {
          .newsletter-input {
            width: 100%;
          }
        }

        /* FOOTER */
        .footer {
          padding: 2rem 20px;
          background: #000;
          border-top: 0.5px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          font-size: 0.85rem;
          opacity: 0.5;
        }

        /* CHAT AI STYLE APPLE */
        .chat-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(20px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 1rem;
        }

        .chat-container {
          background: rgba(20, 20, 20, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          width: 90%;
          max-width: 500px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          backdrop-filter: blur(40px);
        }

        .chat-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-header h3 {
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: -0.5px;
        }

        .close-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .chat-mode-badge {
          padding: 0.5rem 1rem;
          background: rgba(0, 113, 227, 0.15);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .user-msg, .ai-msg {
          padding: 12px 16px;
          border-radius: 18px;
          max-width: 75%;
          word-wrap: break-word;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .user-msg {
          align-self: flex-end;
          background: #0071e3;
          color: white;
        }

        .ai-msg {
          align-self: flex-start;
          background: rgba(255, 255, 255, 0.08);
          color: #f5f5f7;
        }

        .chat-input-container {
          padding: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          gap: 0.5rem;
        }

        .chat-input {
          flex: 1;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          color: white;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s;
        }

        .chat-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .chat-send {
          background: #0071e3;
          border: none;
          color: white;
          padding: 12px 20px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .chat-send:hover {
          background: #0077ed;
        }

        /* FLOATING CHAT BUTTON */
        .floating-chat {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          background: #0071e3;
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 113, 227, 0.4);
          transition: all 0.3s;
          z-index: 999;
        }

        .floating-chat:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(0, 113, 227, 0.5);
        }

        @media (max-width: 768px) {
          .floating-chat {
            bottom: 20px;
            right: 20px;
            width: 56px;
            height: 56px;
          }
        }
      `}</style>

      <main>
        {/* HEADER */}
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
          <div className="nav-container">
            <h1 className="logo">Empire</h1>
            
            <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>

            <nav className="nav-links">
              <a href="#products">Store</a>
              <a href="#ai">AI</a>
              <a href="#support">Support</a>
              {user ? (
                <a href="/admin/dashboard">
                  {user.role === 'admin' ? 'Dashboard' : 'Account'}
                </a>
              ) : (
                <>
                  <a href="/auth/login">Sign in</a>
                </>
              )}
              <a href="#">🛒</a>
            </nav>
          </div>

          {menuOpen && (
            <nav className="mobile-menu">
              <a href="#products" onClick={() => setMenuOpen(false)}>Store</a>
              <a href="#ai" onClick={() => setMenuOpen(false)}>AI</a>
              <a href="#support" onClick={() => setMenuOpen(false)}>Support</a>
              {user ? (
                <a href="/admin/dashboard">
                  {user.role === 'admin' ? 'Dashboard' : 'Account'}
                </a>
              ) : (
                <>
                  <a href="/auth/login">Sign in</a>
                  <a href="/auth/register">Create account</a>
                </>
              )}
            </nav>
          )}
        </header>

        {/* HERO */}
        <section className="hero">
          <span className="hero-badge">AI-POWERED SHOPPING</span>
          <h2 className="hero-title">The future<br />of tech retail.</h2>
          <p className="hero-subtitle">
            Experience intelligent shopping with AI-driven recommendations, 
            automated support, and seamless delivery.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => router.push('/products')}>
              Shop now
            </button>
            <button className="btn-secondary" onClick={() => setShowChat(true)}>
              Talk to AI
            </button>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="categories-section" id="products">
          <div className="section-header">
            <h2 className="section-title">Browse by category</h2>
            <p className="section-subtitle">New, refurbished, and everything in between.</p>
          </div>
          <div className="categories-grid">
            {categories.map((cat) => (
              <div key={cat.slug} className="category-card" onClick={() => router.push(`/products/${cat.slug}`)}>
                <div className="category-icon">{cat.icon}</div>
                <h3 className="category-name">{cat.name}</h3>
                <div className="category-types">
                  <span className="type-badge">New</span>
                  <span className="type-badge">Refurbished</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI SECTION */}
        <section className="ai-section" id="ai">
          <div className="ai-container">
            <div className="ai-icon">🤖</div>
            <h2 className="ai-title">Powered by intelligent AI</h2>
            <p className="ai-description">
              Our AI finds the best suppliers, optimizes delivery routes, 
              and provides 24/7 support. All automatically.
            </p>
            <button className="btn-primary" onClick={() => setShowChat(true)}>
              Experience AI assistant
            </button>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="newsletter-section">
          <h2 className="newsletter-title">Stay in the know</h2>
          <p style={{opacity: 0.6, marginBottom: '1rem'}}>
            Get updates on new products and exclusive offers.
          </p>
          <NewsletterForm />
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p>© 2025 Empire Électronique. All rights reserved.</p>
        </footer>

        {/* FLOATING CHAT BUTTON */}
        <button className="floating-chat" onClick={() => setShowChat(true)}>
          💬
        </button>

        {/* CHAT AI */}
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
        body: JSON.stringify({ email })
      })
      if (res.ok) {
        setStatus('✓ Thank you!')
        setEmail('')
      }
    } catch (error) {
      setStatus('Error. Try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="newsletter-form">
      <input 
        type="email" 
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="newsletter-input"
      />
      <button type="submit" className="btn-primary">Subscribe</button>
      {status && <p style={{width: '100%', marginTop: '0.5rem', fontSize: '0.9rem'}}>{status}</p>}
    </form>
  )
}

function ChatAI({ onClose, user }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.role === 'admin') {
      setMessages([{
        role: 'ai',
        text: 'Hello Boss. I'm your management AI. Give me orders and I'll execute them.'
      }])
    } else {
      setMessages([{
        role: 'ai',
        text: 'Hi! I'm here to help. Ask me anything about our products or your orders.'
      }])
    }
  }, [])

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMessage = { role: 'user', text: input }
    setMessages([...messages, userMessage])
    const currentInput = input
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: currentInput,
          userRole: user?.role || 'guest'
        })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'ai', text: data.response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Connection error. Try again.' }])
    }
    setLoading(false)
  }

  return (
    <div className="chat-overlay">
      <div className="chat-container">
        <div className="chat-header">
          <h3>{user?.role === 'admin' ? 'Management AI' : 'AI Assistant'}</h3>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>
        
        <div className="chat-mode-badge">
          {user?.role === 'admin' ? '🔧 ADMIN MODE' : '💬 SUPPORT MODE'}
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? 'user-msg' : 'ai-msg'}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="ai-msg">Thinking...</div>}
        </div>

        <div className="chat-input-container">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="chat-input"
          />
          <button onClick={sendMessage} className="chat-send">Send</button>
        </div>
      </div>
    </div>
  )
}
