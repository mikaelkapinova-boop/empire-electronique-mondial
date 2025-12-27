// pages/store.js
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const ALL_PRODUCTS = [
  {
    id: 1,
    name: 'iPhone 13 écran reconditionné',
    category: 'smartphone',
    condition: 'refurbished',
    type: 'pièce',
    price: 129,
  },
  {
    id: 2,
    name: 'Samsung Galaxy S22 neuf',
    category: 'smartphone',
    condition: 'new',
    type: 'appareil',
    price: 799,
  },
  {
    id: 3,
    name: 'Chargeur USB-C 30W universel',
    category: 'accessoire',
    condition: 'new',
    type: 'accessoire',
    price: 29,
  },
  {
    id: 4,
    name: 'PC Portable i7 reconditionné',
    category: 'ordinateur',
    condition: 'refurbished',
    type: 'appareil',
    price: 699,
  },
  {
    id: 5,
    name: 'Coque silicone iPhone 14',
    category: 'accessoire',
    condition: 'new',
    type: 'accessoire',
    price: 19,
  },
]

export default function Store() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [condition, setCondition] = useState('all') // all | new | refurbished
  const [deviceType, setDeviceType] = useState('all') // all | smartphone | tablette | ordinateur | accessoire
  const [filtered, setFiltered] = useState(ALL_PRODUCTS)

  useEffect(() => {
    filterProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, condition, deviceType])

  const filterProducts = () => {
    let list = [...ALL_PRODUCTS]

    if (search.trim()) {
      const s = search.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(s))
    }

    if (condition !== 'all') {
      list = list.filter((p) => p.condition === condition)
    }

    if (deviceType !== 'all') {
      list = list.filter((p) => p.category === deviceType)
    }

    setFiltered(list)
  }

  return (
    <>
      <Head>
        <title>Store — Empire Électronique</title>
        <meta
          name="description"
          content="Recherchez des mobiles, tablettes, PC, accessoires et pièces détachées, neufs ou reconditionnés."
        />
      </Head>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #000;
          color: #f5f5f7;
          padding: 80px 20px 40px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          font-size: 0.95rem;
          opacity: 0.7;
          margin-bottom: 1.5rem;
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .search {
          flex: 1;
          min-width: 220px;
          padding: 10px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: transparent;
          color: #f5f5f7;
          font-size: 0.9rem;
        }

        .pill {
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background: transparent;
          color: #f5f5f7;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .pill.active {
          background: #f5f5f7;
          color: #000;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .card {
          background: linear-gradient(135deg, #111 0, #050505 100%);
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .name {
          font-size: 0.95rem;
          font-weight: 500;
        }

        .meta {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .price {
          margin-top: 0.25rem;
          font-weight: 600;
        }

        .cta {
          margin-top: 0.5rem;
          align-self: flex-start;
          padding: 8px 14px;
          border-radius: 999px;
          border: none;
          background: #f5f5f7;
          color: #000;
          font-size: 0.85rem;
          cursor: pointer;
        }
      `}</style>

      <main className="page">
        <div className="container">
          <h1 className="title">Store</h1>
          <p className="subtitle">
            Recherche d’appareils et pièces détachées (toutes marques) — neuf ou reconditionné.
          </p>

          <div className="filters">
            <input
              className="search"
              placeholder="Rechercher un modèle, une pièce, une référence..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className={`pill ${condition === 'all' ? 'active' : ''}`}
              onClick={() => setCondition('all')}
            >
              Tout
            </button>
            <button
              className={`pill ${condition === 'new' ? 'active' : ''}`}
              onClick={() => setCondition('new')}
            >
              Neuf
            </button>
            <button
              className={`pill ${condition === 'refurbished' ? 'active' : ''}`}
              onClick={() => setCondition('refurbished')}
            >
              Reconditionné
            </button>

            <button
              className={`pill ${deviceType === 'all' ? 'active' : ''}`}
              onClick={() => setDeviceType('all')}
            >
              Tout type
            </button>
            <button
              className={`pill ${deviceType === 'smartphone' ? 'active' : ''}`}
              onClick={() => setDeviceType('smartphone')}
            >
              Téléphones
            </button>
            <button
              className={`pill ${deviceType === 'ordinateur' ? 'active' : ''}`}
              onClick={() => setDeviceType('ordinateur')}
            >
              PC / Ordi
            </button>
            <button
              className={`pill ${deviceType === 'accessoire' ? 'active' : ''}`}
              onClick={() => setDeviceType('accessoire')}
            >
              Accessoires
            </button>
          </div>

          <div className="grid">
            {filtered.map((p) => (
              <article key={p.id} className="card">
                <div className="name">{p.name}</div>
                <div className="meta">
                  {p.category} • {p.type} •
                  {p.condition === 'new' ? ' neuf' : ' reconditionné'}
                </div>
                <div className="price">{p.price} €</div>
                <button className="cta">Voir le produit</button>
              </article>
            ))}

            {filtered.length === 0 && <p>Aucun produit ne correspond à ta recherche.</p>}
          </div>
        </div>
      </main>
    </>
  )
}
