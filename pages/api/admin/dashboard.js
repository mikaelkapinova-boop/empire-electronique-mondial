import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    totalOrders: 127,
    totalRevenue: 45890,
    pendingOrders: 12,
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
  }, [])

  const askAI = async (question) => {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: question })
    })
    const data = await res.json()
    alert(data.response)
  }

  if (!user) return <div style={{color: 'white', padding: '2rem'}}>Chargement...</div>

  return (
    <>
      <style jsx global>{`
        .dashboard {
          min-height: 100vh;
          background-color: #0a0a0a;
          color: white;
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 1rem;
          }
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .dashboard-header h1 {
          font-size: 2rem;
        }

        @media (max-width: 768px) {
          .dashboard-header h1 {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .dashboard-header h1 {
            font-size: 1.2rem;
            width: 100%;
          }
        }

        .back-btn {
          background-color: #2563eb;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }

        @media (max-width: 480px) {
          .back-btn {
            width: 100%;
          }
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .stat-card {
          background-color: #1a1a1a;
          padding: 2rem;
          border-radius: 15px;
          border: 1px solid #2563eb;
          text-align: center;
        }

        @media (max-width: 480px) {
          .stat-card {
            padding: 1.5rem;
          }
        }

        .stat-card h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        .stat-number {
          font-size: 3rem;
          color: #2563eb;
          font-weight: bold;
          margin: 1rem 0;
        }

        @media (max-width: 768px) {
          .stat-number {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .stat-number {
            font-size: 2rem;
          }
        }

        .ai-section {
          background-color: #1a1a1a;
          padding: 2rem;
          border-radius: 15px;
          margin-bottom: 3rem;
          border: 1px solid #7c3aed;
        }

        @media (max-width: 480px) {
          .ai-section {
            padding: 1.5rem;
          }
        }

        .ai-section h2 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 480px) {
          .ai-section h2 {
            font-size: 1.3rem;
          }
        }

        .ai-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        @media (max-width: 480px) {
          .ai-buttons {
            grid-template-columns: 1fr;
          }
        }

        .ai-btn {
          background-color: #7c3aed;
          color: white;
          padding: 15px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          font-size: 0.95rem;
        }

        @media (max-width: 480px) {
          .ai-btn {
            font-size: 0.9rem;
            padding: 12px;
          }
        }

        .suppliers-section {
          background-color: #1a1a1a;
          padding: 2rem;
          border-radius: 15px;
          border: 1px solid #2563eb;
        }

        @media (max-width: 480px) {
          .suppliers-section {
            padding: 1.5rem;
          }
        }

        .suppliers-section h2 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        @media (max-width: 480px) {
          .suppliers-section h2 {
            font-size: 1.3rem;
          }
        }

        .view-btn {
          margin-top: 1rem;
          background-color: #2563eb;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }

        @media (max-width: 480px) {
          .view-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="dashboard">
        <header className="dashboard-header">
          <h1>👔 Tableau de Bord - Direction</h1>
          <button onClick={() => router.push('/')} className="back-btn">
            ← Retour au site
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>📦 Commandes totales</h3>
            <p className="stat-number">{stats.totalOrders}</p>
          </div>
          <div className="stat-card">
            <h3>💰 Chiffre d'affaires</h3>
            <p className="stat-number">{stats.totalRevenue}€</p>
          </div>
          <div className="stat-card">
            <h3>⏳ Commandes en attente</h3>
            <p className="stat-number">{stats.pendingOrders}</p>
          </div>
        </div>

        <section className="ai-section">
          <h2>🤖 Assistant IA - Gestion Automatique</h2>
          <div className="ai-buttons">
            <button onClick={() => askAI('Trouve les 5 meilleurs fournisseurs de smartphones cette semaine')} className="ai-btn">
              Trouver fournisseurs smartphones
            </button>
            <button onClick={() => askAI('Optimise les routes de livraison pour réduire les coûts')} className="ai-btn">
              Optimiser livraisons
            </button>
            <button onClick={() => askAI('Analyse les tendances de vente et recommande des produits à ajouter')} className="ai-btn">
              Analyser tendances
            </button>
            <button onClick={() => askAI('Gère les stocks et passe commande automatiquement si nécessaire')} className="ai-btn">
              Gestion automatique stocks
            </button>
          </div>
        </section>

        <section className="suppliers-section">
          <h2>📋 Fournisseurs Actifs</h2>
          <p>Gérez vos fournisseurs et trouvez les meilleurs prix automatiquement</p>
          <button onClick={() => router.push('/admin/suppliers')} className="view-btn">
            Voir tous les fournisseurs →
          </button>
        </section>
      </div>
    </>
  )
}
