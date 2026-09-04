import { api } from '@/lib/api';
import { MOCK_PRODUCTS } from './productMockData';

// Map backend product model to frontend UI representation
export function transformBackendProduct(bp) {
  if (!bp) return null;

  // Find matching mock item for sensory editorial enrichment (flour provenance, hydration, fermentation)
  const mockMatch = MOCK_PRODUCTS.find(
    (m) =>
      m.id === bp._id ||
      m.name.toLowerCase() === (bp.name || '').toLowerCase()
  );

  // Normalize category slug
  const rawCat = bp.category || 'Loaves & Buns';
  let categorySlug = 'loaves-buns';
  if (rawCat.toLowerCase().includes('cake') && !rawCat.toLowerCase().includes('cupcake')) {
    categorySlug = 'cakes';
  } else if (rawCat.toLowerCase().includes('cupcake')) {
    categorySlug = 'cupcakes';
  } else if (rawCat.toLowerCase().includes('brownie')) {
    categorySlug = 'brownies';
  }

  const availableQuantity = bp.availableQuantity !== undefined ? bp.availableQuantity : 10;
  const isAvailable = bp.isAvailable !== false && availableQuantity > 0;

  return {
    id: bp._id || bp.id || `prod-${Date.now()}`,
    _id: bp._id,
    name: bp.name,
    category: categorySlug,
    categoryLabel: rawCat,
    price: Number(bp.price || 0),
    weight: bp.weight || mockMatch?.weight || '750g',
    imageUrl: bp.image || bp.imageUrl || mockMatch?.imageUrl || 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1000&q=80',
    available: isAvailable,
    remainingAllotment: availableQuantity,
    totalBatchCap: Math.max(availableQuantity + 5, mockMatch?.totalBatchCap || 24),
    tagline: mockMatch?.tagline || bp.description?.split('.')[0] || 'Handcrafted hearth offering',
    description: bp.description || mockMatch?.description || '',
    ingredients: bp.ingredients || mockMatch?.ingredients || 'Heritage grains, wild levain, sea salt',
    flourProvenance: mockMatch?.flourProvenance || bp.ingredients || 'Stone-milled heritage grain',
    hydration: mockMatch?.hydration || '80%',
    fermentation: mockMatch?.fermentation || '36-Hour Cold Proof',
    allergens: mockMatch?.allergens || ['Wheat / Gluten'],
    featured: bp.activeMenu !== false,
    bakerNotes: mockMatch?.bakerNotes || 'Store at room temperature in breathable linen.',
  };
}

export const productService = {
  async getProducts(params = {}) {
    try {
      const res = await api.get('/products');
      const rawProducts = Array.isArray(res) ? res : res.products || res.data || [];
      if (rawProducts.length > 0) {
        return rawProducts.map(transformBackendProduct);
      }
      return MOCK_PRODUCTS;
    } catch (error) {
      console.warn('Backend product fetch error, falling back to local catalog:', error.message);
      return MOCK_PRODUCTS;
    }
  },

  async getProductById(id) {
    try {
      const res = await api.get(`/products/${id}`);
      const raw = res.product || res.data || res;
      if (raw && (raw._id || raw.name)) {
        return transformBackendProduct(raw);
      }
      return MOCK_PRODUCTS.find((p) => p.id === id) || null;
    } catch (error) {
      console.warn(`Product ${id} fetch error, checking local catalog:`, error.message);
      return MOCK_PRODUCTS.find((p) => p.id === id) || null;
    }
  },

  async createProduct(productData) {
    return api.post('/products', productData);
  },

  async updateProduct(id, productData) {
    return api.put(`/products/${id}`, productData);
  },

  async deleteProduct(id) {
    return api.delete(`/products/${id}`);
  },
};

export default productService;
