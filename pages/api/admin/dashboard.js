import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    aiRecommendations: []
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/login')
      return
    }
    const parsed = JSON.parse(userData)
    if (parsed.role !== 'admin') {
      router.push('/')
      return
    }
    setUser(parsed)
    fetchStats()
  }, [])

  const fetchStats = async () => {
    // Appel API pour récupérer les stats
    const res = await fetch('/api/admin/dashboard')
    const data = await res.json()
    setStats(data)
  }

  const askAI = async (question) => {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: question })
    })
    const data = await res.json()
    alert(data.response)
  }

  if (!user) return <div>Chargement...</div>

  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <h1>👔 Tableau de Bord - Direction</h1>
        <button onClick={() => router.push('/')} style={styles.backBtn}>
          ← Retour au site
        </button>
      </header>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h3>📦 Commandes totales</h3>
          <p style={styles.statNumber}>{stats.totalOrders}</p>
        </div>
        <div style={styles.statCard}>
          <h3>💰 Chiffre d'affaires</h3>
          <p style={styles.statNumber}>{stats.totalRevenue}€</p>
        </div>
        <div style={styles.statCard}>
          <h3>⏳ Commandes en attente</h3>
          <p style={styles.statNumber}>{stats.pendingOrders}</p>
        </div>
      </div>

      <section style={styles.aiSection}>
        <h2>🤖 Assistant IA - Gestion Automatique</h2>
        <div style={styles.aiButtons}>
          <button onClick={() => askAI('Trouve les 5 meilleurs fournisseurs de smartphones cette semaine')} style={styles.aiBtn}>
            Trouver fournisseurs smartphones
          </button>
          <button onClick={() => askAI('Optimise les routes de livraison pour réduire les coûts')} style={styles.aiBtn}>
            Optimiser livraisons
          </button>
          <button onClick={() => askAI('Analyse les tendances de vente et recommande des produits à ajouter')} style={styles.aiBtn}>
            Analyser tendances
          </button>
          <button onClick={() => askAI('Gère les stocks et passe commande automatiquement si nécessaire')} style={styles.aiBtn}>
            Gestion automatique stocks
          </button>
        </div>
      </section>

      <section style={styles.suppliersSection}>
        <h2>📋 Fournisseurs Actifs</h2>
        <button onClick={() => router.push('/admin/suppliers')} style={styles.viewBtn}>
          Voir tous les fournisseurs →
        </button>
      </section>
    </div>
  )
}

const styles = {
  dashboard: { minHeight: '100vh', backgroundColor: '#0a0a0a', color: 'white', padding: '2rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' },
  backBtn: { backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' },
  statCard: { backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '15px', border: '1px solid #2563eb', textAlign: 'center' },
  statNumber: { fontSize: '3rem', color: '#2563eb', fontWeight: 'bold', margin: '1rem 0' },
  aiSection: { backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '15px', marginBottom: '3rem', border: '1px solid #7c3aed' },
  aiButtons: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' },
  aiBtn: { backgroundColor: '#7c3aed', color: 'white', padding: '15px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  suppliersSection: { backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '15px', border: '1px solid #2563eb' },
  viewBtn: { marginTop: '1rem', backgroundColor: '#2563eb', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
}
