import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20'
});

const PRODUCTS = {
  'iphone-17-pro-screen': {
    name: 'Écran iPhone 17 Pro (Soft OLED)',
    amount: 14500,
    currency: 'eur'
  },
  's25-ultra-screen': {
    name: 'Écran Samsung S25 Ultra',
    amount: 13200,
    currency: 'eur'
  },
  'ipad-pro-m4-screen': {
    name: 'Écran iPad Pro M4 13"',
    amount: 28900,
    currency: 'eur'
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { productId } = req.body;
  const product = PRODUCTS[productId];

  if (!product) {
    return res.status(400).json({ error: 'Produit inconnu' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: product.currency,
            product_data: {
              name: product.name
            },
            unit_amount: product.amount
          },
          quantity: 1
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=1`
    });

    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Erreur Stripe' });
  }
}
