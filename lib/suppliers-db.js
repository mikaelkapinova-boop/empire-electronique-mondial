// lib/suppliers-db.js
// Pour l'instant en mémoire, à migrer vers Supabase/MongoDB plus tard

const SUPPLIERS = [
  {
    id: 'ali-tech-china',
    name: 'AliTech Electronics',
    email: 'sales@alitech.com',
    country: 'China',
    specialties: ['screens', 'batteries', 'chargers'],
    minimumOrder: 50,
    averageDiscount: 0.15,
    customizationAvailable: true,
    lastContact: null,
    status: 'active',
  },
  {
    id: 'euro-parts',
    name: 'EuroParts Distribution',
    email: 'contact@europarts.eu',
    country: 'Germany',
    specialties: ['refurbished', 'parts', 'accessories'],
    minimumOrder: 20,
    averageDiscount: 0.10,
    customizationAvailable: false,
    lastContact: null,
    status: 'active',
  },
  // Ajoute tes vrais fournisseurs ici
]

export function getAllSuppliers() {
  return SUPPLIERS
}

export function findSuppliersByProduct(productType) {
  return SUPPLIERS.filter(s => 
    s.specialties.some(spec => 
      spec.toLowerCase().includes(productType.toLowerCase())
    )
  )
}

export function updateSupplierContact(supplierId, contactData) {
  const supplier = SUPPLIERS.find(s => s.id === supplierId)
  if (supplier) {
    supplier.lastContact = new Date().toISOString()
    // En production: sauvegarder en base
  }
}
