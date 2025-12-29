import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Store() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [condition, setCondition] = useState('all')
  const [deviceType, setDeviceType] = useState('all')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Erreur:', error)
      setProducts([])
    }
    setLoading(false)
  }

  const filtered = products.filter((p) => {
    if (search.trim() && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    if (condition !== 'all' && p.condition !== condition) return false
    if (deviceType !== 'all' && p.category !== deviceType) return false
    return true
  })

  return (
    <>
      <Head>
        <title>Boutique — Empire-Electronique</title>
      </Head>

      <div style={{ minHeight: '100vh', background: '#050816', color: '#f5f5f5' }}>
        <header
          style={{
            background: '#0f172a',
            borderBottom: '1px solid #1e293b',
            padding: '16px 24px',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1
              onClick={() => router.push('/')}
              style={{
                fontSize: '20px',
                fontWeight: '700',
                background: 'linear-gradient(to right, #22c55e, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                cursor: 'pointer',
              }}
            >
              Empire-Electronique
            </h1>
          </div>
        </header>

        <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '12px' }}>
            🛒 Store
          </h2>
          <p style={{ color: '#a1a1aa', marginBottom: '32px' }}>
            Recherche d'appareils et pièces détachées
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <input
              type="text"
              placeholder="🔍 Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #1e293b',
                background: '#020617',
                color: '#f5f5f5',
              }}
            />
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #1e293b',
                background: '#020617',
                color: '#f5f5f5',
              }}
            >
              <option value="all">Toutes conditions</option>
              <option value="new">Neuf</option>
              <option value="refurbished">Reconditionné</option>
            </select>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #1e293b',
                background: '#020617',
                color: '#f5f5f5',
              }}
            >
              <option value="all">Tous les types</option>
              <option value="smartphone">Smartphones</option>
              <option value="tablette">Tablettes</option>
              <option value="ordinateur">Ordinateurs</option>
              <option value="accessoire">Accessoires</option>
            </select>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ color: '#a1a1aa' }}>Chargement...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 24px',
                background: '#020617',
                borderRadius: '16px',
                border: '1px solid #1e293b',
              }}
            >
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>📦</p>
              <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>Aucun produit</h3>
              <p style={{ color: '#a1a1aa' }}>
                Le catalogue est en cours de construction.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {filtered.map((product) => (
                <div
                  key={product.id}
                  style={{
                    background: '#020617',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid #1e293b',
                  }}
                >
                  <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>
                    {product.name}
                  </h3>
                  <p style={{ color: '#22c55e', fontSize: '20px', fontWeight: '700' }}>
                    {product.price}€
                  </p>
                  <button
                    style={{
                      width: '100%',
                      background: '#22c55e',
                      color: '#020617',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginTop: '12px',
                    }}
                  >
                    Ajouter au panier
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}
