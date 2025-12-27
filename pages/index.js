import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [showChat, setShowChat] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté
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

      <main style={styles.main}>
        {/* HEADER avec Menu Burger */}
        <header style={styles.header}>
          <div style={styles.container}>
            <div style={styles.headerContent}>
              <h1 style={styles.logo}>⚡ Empire Électronique</h1>
              
              {/* Menu Burger */}
              <button 
                style={styles.burger}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? '✕' : '☰'}
              </button>

              {/* Navigation Desktop */}
              <nav style={styles.navDesktop}>
                <a href="#categories">Produits</a>
                <a href="#about">À propos</a>
                {user ? (
                  <>
                    <a href="/admin/dashboard">
                      {user.role === 'admin' ? '👔 Direction' : '👤 Mon Compte'}
                    </a>
                    <button onClick={() => setShowChat(true)} style={styles.chatBtn}>
                      💬 Chat IA
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/auth/login">Connexion</a>
                    <a href="/auth/register">Inscription</a>
                  </>
                )}
                <a href="#" style={styles.cart}>🛒 (0)</a>
              </nav>
            </div>

            {/* Menu Mobile (Burger ouvert) */}
            {menuOpen && (
              <nav style={styles.mobileMenu}>
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
              </nav>
            )}
          </div>
        </header>

        {/* HERO Section */}
        <section style={styles.hero}>
          <div style={styles.container}>
            <h2 style={styles.heroTitle}>🤖 E-Commerce Intelligent</h2>
            <p style={styles.heroText}>
              Gestion automatisée par IA • Meilleurs prix garantis • Livraison optimisée
            </p>
            <div style={styles.heroButtons}>
              <button style={styles.btnPrimary} onClick={() => router.push('/auth/register')}>
                Créer un compte
              </button>
              <button style={styles.btnSecondary} onClick={() => setShowChat(true)}>
                Parler avec l'IA
              </button>
            </div>
          </div>
        </section>

        {/* CATÉGORIES */}
        <section style={styles.categories} id="categories">
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>🛍️ Nos Catégories</h2>
            <div style={styles.categoryGrid}>
              {categories.map((cat) => (
                <div key={cat.slug} style={styles.categoryCard}>
                  <h3 style={styles.categoryName}>{cat.name}</h3>
                  <div style={styles.categoryTypes}>
                    {cat.types.map((type) => (
                      <button 
                        key={type}
                        style={styles.typeBtn}
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
        <section style={styles.newsletter}>
          <div style={styles.container}>
            <h2>📧 Recevez nos meilleures offres</h2>
            <NewsletterForm />
          </div>
        </section>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <p>© 2025 Empire Électronique Mondial • IA Autonome • Meilleurs Prix</p>
        </footer>

        {/* CHAT IA (Popup) */}
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
    <form onSubmit={handleSubmit} style={styles.newsletterForm}>
      <input 
        type="email" 
        placeholder="votre@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={styles.newsletterInput}
      />
      <button type="submit" style={styles.newsletterBtn}>S'inscrire</button>
      {status && <p style={styles.status}>{status}</p>}
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
    <div style={styles.chatOverlay}>
      <div style={styles.chatContainer}>
        <div style={styles.chatHeader}>
          <h3>🤖 Assistant IA</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>
        <div style={styles.chatMessages}>
          {messages.map((msg, i) => (
            <div key={i} style={msg.role === 'user' ? styles.userMsg : styles.aiMsg}>
              {msg.text}
            </div>
          ))}
          {loading && <div style={styles.aiMsg}>💭 L'IA réfléchit...</div>}
        </div>
        <div style={styles.chatInput}>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Écrivez votre message..."
            style={styles.chatInputField}
          />
          <button onClick={sendMessage} style={styles.chatSendBtn}>Envoyer</button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  main: { minHeight: '100vh', backgroundColor: '#0a0a0a', color: 'white' },
  header: { backgroundColor: '#1a1a1a', padding: '1rem 0', borderBottom: '2px solid #2563eb', position: 'sticky', top: 0, zIndex: 100 },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
  headerContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#2563eb' },
  burger: { display: 'none', fontSize: '2rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', '@media(max-width: 768px)': { display: 'block' } },
  navDesktop: { display: 'flex', gap: '2rem', alignItems: 'center' },
  mobileMenu: { display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', padding: '1rem', backgroundColor: '#111', borderRadius: '8px' },
  chatBtn: { backgroundColor: '#7c3aed', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  cart: { fontSize: '1.5rem' },
  hero: { background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', padding: '5rem 0', textAlign: 'center' },
  heroTitle: { fontSize: '3rem', marginBottom: '1rem' },
  heroText: { fontSize: '1.3rem', opacity: 0.9, marginBottom: '2rem' },
  heroButtons: { display: 'flex', gap: '1rem', justifyContent: 'center' },
  btnPrimary: { backgroundColor: 'white', color: '#2563eb', padding: '15px 40px', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' },
  btnSecondary: { backgroundColor: 'transparent', color: 'white', padding: '15px 40px', border: '2px solid white', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' },
  categories: { padding: '4rem 0' },
  sectionTitle: { fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: '#2563eb' },
  categoryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' },
  categoryCard: { backgroundColor: '#1a1a1a', borderRadius: '15px', padding: '2rem', border: '1px solid #2563eb', textAlign: 'center' },
  categoryName: { fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' },
  categoryTypes: { display: 'flex', gap: '1rem', justifyContent: 'center' },
  typeBtn: { backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  newsletter: { backgroundColor: '#1a1a1a', padding: '4rem 0', textAlign: 'center' },
  newsletterForm: { display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' },
  newsletterInput: { padding: '15px', width: '300px', borderRadius: '8px', border: '1px solid #2563eb', backgroundColor: '#0a0a0a', color: 'white', fontSize: '1rem' },
  newsletterBtn: { padding: '15px 30px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' },
  status: { width: '100%', marginTop: '1rem' },
  footer: { backgroundColor: '#0a0a0a', padding: '2rem 0', textAlign: 'center', borderTop: '2px solid #2563eb' },
  
  // Chat IA
  chatOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  chatContainer: { backgroundColor: '#1a1a1a', borderRadius: '15px', width: '90%', maxWidth: '600px', maxHeight: '80vh', display: 'flex', flexDirection: 'column', border: '2px solid #2563eb' },
  chatHeader: { padding: '1rem', borderBottom: '1px solid #2563eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  closeBtn: { background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' },
  chatMessages: { flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
  userMsg: { alignSelf: 'flex-end', backgroundColor: '#2563eb', padding: '10px 15px', borderRadius: '15px', maxWidth: '70%' },
  aiMsg: { alignSelf: 'flex-start', backgroundColor: '#7c3aed', padding: '10px 15px', borderRadius: '15px', maxWidth: '70%' },
  chatInput: { padding: '1rem', borderTop: '1px solid #2563eb', display: 'flex', gap: '1rem' },
  chatInputField: { flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #2563eb', backgroundColor: '#0a0a0a', color: 'white' },
  chatSendBtn: { padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
}

