import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Empire Électronique Mondial - Boutique en ligne</title>
        <meta name="description" content="Votre boutique d'électronique en ligne" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.container}>
            <h1 style={styles.logo}>⚡ Empire Électronique Mondial</h1>
            <nav style={styles.nav}>
              <a href="#produits" style={styles.navLink}>Produits</a>
              <a href="#contact" style={styles.navLink}>Contact</a>
              <a href="#panier" style={styles.navLink}>🛒 Panier</a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.container}>
            <h2 style={styles.heroTitle}>Bienvenue sur votre boutique électronique</h2>
            <p style={styles.heroText}>
              Découvrez nos produits électroniques de qualité à prix compétitifs
            </p>
            <button style={styles.button}>
              Voir nos produits
            </button>
          </div>
        </section>

        {/* Products Section */}
        <section style={styles.products} id="produits">
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Nos Produits Populaires</h2>
            <div style={styles.productGrid}>
              <ProductCard 
                name="Produit 1"
                price="49.99€"
                description="Description du produit"
              />
              <ProductCard 
                name="Produit 2"
                price="79.99€"
                description="Description du produit"
              />
              <ProductCard 
                name="Produit 3"
                price="99.99€"
                description="Description du produit"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.container}>
            <p>© 2025 Empire Électronique Mondial - Tous droits réservés</p>
          </div>
        </footer>
      </main>
    </>
  )
}

function ProductCard({ name, price, description }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardImage}>📦</div>
      <h3 style={styles.cardTitle}>{name}</h3>
      <p style={styles.cardDescription}>{description}</p>
      <p style={styles.cardPrice}>{price}</p>
      <button style={styles.cardButton}>Ajouter au panier</button>
    </div>
  )
}

const styles = {
  main: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '1rem 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  nav: {
    marginTop: '1rem',
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  hero: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '4rem 0',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  heroText: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  button: {
    backgroundColor: 'white',
    color: '#2563eb',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  products: {
    padding: '4rem 0',
  },
  sectionTitle: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#1a1a1a',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  cardImage: {
    fontSize: '4rem',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
  },
  cardDescription: {
    color: '#666',
    marginBottom: '1rem',
  },
  cardPrice: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: '1rem',
  },
  cardButton: {
    width: '100%',
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: '2rem 0',
    textAlign: 'center',
  },
}
