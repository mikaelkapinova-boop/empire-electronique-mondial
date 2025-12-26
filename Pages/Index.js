import { useState } from 'react';
import axios from 'axios';

const PRODUCTS = [
  {
    id: 'iphone-17-pro-screen',
    name: 'Écran iPhone 17 Pro (Soft OLED)',
    price: 14500,
    currency: 'eur',
    description: 'Qualité pro compatible, proche origine.',
  },
  {
    id: 's25-ultra-screen',
    name: 'Écran Samsung S25 Ultra',
    price: 13200,
    currency: 'eur',
    description: 'AMOLED compatible haut de gamme.',
  },
  {
    id: 'ipad-pro-m4-screen',
    name: 'Écran iPad Pro M4 13"',
    price: 28900,
    currency: 'eur',
    description: 'Écran reconditionné premium.',
  }
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiQuestion, setAiQuestion] = useState('');

  async function handleCheckout(productId) {
    try {
      setLoading(true);
      const res = await axios.post('/api/checkout', { productId });
      window.location = res.data.url;
    } catch (e) {
      alert('Erreur paiement');
    } finally {
      setLoading(false);
    }
  }

  async function handleAskAI(e) {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setAiAnswer('Réflexion de l’IA en cours...');
    try {
      const res = await axios.post('/api/ai', { question: aiQuestion });
      setAiAnswer(res.data.answer || 'Pas de réponse IA');
    } catch (e) {
      setAiAnswer('Erreur IA');
    }
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Empire Électronique Mondial</h1>
        <p>Pièces et écrans pour smartphones, tablettes et PC – vente mondiale.</p>
      </header>

      <main className="main">
        <section>
          <h2>Produits en vedette</h2>
          <div className="grid">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="card">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <p className="price">{(p.price / 100).toFixed(2)} €</p>
                <button onClick={() => handleCheckout(p.id)} disabled={loading}>
                  {loading ? 'Redirection...' : 'Acheter'}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="ai">
          <h2>Conseiller IA (Perplexity)</h2>
          <form onSubmit={handleAskAI}>
            <input
              type="text"
              placeholder="Ex : meilleur écran pour S25 Ultra ?"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
            />
            <button type="submit">Demander à l’IA</button>
          </form>
          {aiAnswer && <div className="ai-answer">{aiAnswer}</div>}
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} empire-electronique-mondial.com</p>
      </footer>
    </div>
  );
}
