import { api } from '@/lib/api';
import { initialLarderInventory } from './inventoryMockService';

export function transformBackendInventory(bi) {
  if (!bi) return null;

  return {
    id: bi._id || bi.id,
    _id: bi._id,
    ingredient: bi.name || bi.ingredient,
    name: bi.name || bi.ingredient,
    available: Number(bi.quantity !== undefined ? bi.quantity : bi.available || 0),
    quantity: Number(bi.quantity !== undefined ? bi.quantity : bi.available || 0),
    unit: bi.unit || 'kg',
    minimumStock: Number(bi.minimumStock !== undefined ? bi.minimumStock : 10),
    status: (bi.quantity !== undefined ? bi.quantity : bi.available) <= (bi.minimumStock || 10) ? 'LOW' : 'OK',
    lotNumber: bi.lotNumber || `LOT-${Math.floor(1000 + Math.random() * 9000)}`,
    supplier: bi.supplier || 'Local Mill Partner',
  };
}

export const inventoryService = {
  async getInventory() {
    try {
      const res = await api.get('/inventory');
      const list = res.data || res.ingredients || (Array.isArray(res) ? res : []);
      if (list.length > 0) {
        return list.map(transformBackendInventory);
      }
      return initialLarderInventory.map(transformBackendInventory);
    } catch (error) {
      console.warn('Backend inventory fetch failed, using fallback:', error.message);
      return initialLarderInventory.map(transformBackendInventory);
    }
  },

  async addIngredient(data) {
    const payload = {
      name: data.ingredient || data.name,
      quantity: Number(data.available || data.quantity || 0),
      unit: data.unit || 'kg',
      minimumStock: Number(data.minimumStock || 5),
    };
    const res = await api.post('/inventory', payload);
    return transformBackendInventory(res);
  },

  async updateIngredient(id, data) {
    const payload = {
      name: data.ingredient || data.name,
      quantity: Number(data.available || data.quantity || 0),
      unit: data.unit,
      minimumStock: Number(data.minimumStock),
    };
    const res = await api.put(`/inventory/${id}`, payload);
    return transformBackendInventory(res);
  },

  async quickRestock(id, addedQuantity) {
    const res = await api.patch(`/inventory/${id}/restock`, { addedQuantity: Number(addedQuantity) });
    return res.data ? transformBackendInventory(res.data) : res;
  },

  async deleteIngredient(id) {
    return api.delete(`/inventory/${id}`);
  },
};

export default inventoryService;
