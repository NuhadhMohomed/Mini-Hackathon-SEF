/**
 * Pure calculation function for ingredient readiness.
 * Compares required ingredients for an order against larder inventory.
 * 
 * @param {Object} order The order object e.g. { items: [{ name: 'Batard', qty: 2 }] }
 * @param {Array} inventory Larder inventory list e.g. [{ ingredient: 'Flour', available: 4500, unit: 'g' }]
 * @returns {Array} List of readiness items with required, available, shortage, and status
 */
export function calculateIngredientReadiness(order = {}, inventory = []) {
  const items = order.items || [];

  // Standard recipe definitions for bakery goods
  const RECIPES = {
    'Country Sourdough Batard': [
      { ingredient: 'Cairnspring Yecora Rojo Flour', unit: 'g', amountPerUnit: 600 },
      { ingredient: 'Sourdough Mother Culture', unit: 'g', amountPerUnit: 120 },
      { ingredient: 'Maldon Sea Salt Flakes', unit: 'g', amountPerUnit: 15 },
    ],
    'Cardamom Morning Buns': [
      { ingredient: 'Cairnspring Yecora Rojo Flour', unit: 'g', amountPerUnit: 150 },
      { ingredient: 'Normandy Cultured Butter (84% Fat)', unit: 'g', amountPerUnit: 80 },
      { ingredient: 'Green Cardamom Pods', unit: 'g', amountPerUnit: 12 },
      { ingredient: 'Organic Wildflower Honey', unit: 'g', amountPerUnit: 25 },
    ],
    'Dark Chocolate Fudge Cake': [
      { ingredient: 'Valrhona 70% Dark Cocoa', unit: 'g', amountPerUnit: 250 },
      { ingredient: 'Normandy Cultured Butter (84% Fat)', unit: 'g', amountPerUnit: 150 },
      { ingredient: 'Organic Wildflower Honey', unit: 'g', amountPerUnit: 100 },
    ],
    'Classic Vanilla Bean Cake': [
      { ingredient: 'Madagascar Bourbon Vanilla Beans', unit: 'g', amountPerUnit: 15 },
      { ingredient: 'Normandy Cultured Butter (84% Fat)', unit: 'g', amountPerUnit: 120 },
    ],
  };

  // Aggregate required ingredients for this order
  const requiredMap = {};

  items.forEach((item) => {
    const recipe = RECIPES[item.name] || [
      { ingredient: 'Cairnspring Yecora Rojo Flour', unit: 'g', amountPerUnit: 300 },
      { ingredient: 'Normandy Cultured Butter (84% Fat)', unit: 'g', amountPerUnit: 100 },
    ];

    recipe.forEach((req) => {
      const totalReq = req.amountPerUnit * (item.qty || 1);
      if (!requiredMap[req.ingredient]) {
        requiredMap[req.ingredient] = {
          ingredient: req.ingredient,
          unit: req.unit,
          required: totalReq,
        };
      } else {
        requiredMap[req.ingredient].required += totalReq;
      }
    });
  });

  return Object.values(requiredMap).map((req) => {
    const larderItem = inventory.find(
      (inv) =>
        inv.ingredient === req.ingredient ||
        (inv.name && inv.name.includes(req.ingredient))
    ) || { available: 0, unit: req.unit };

    const available = larderItem.available !== undefined ? larderItem.available : (larderItem.currentStock || 0);
    const isAvailable = available >= req.required;
    const shortage = isAvailable ? 0 : req.required - available;

    return {
      ingredient: req.ingredient,
      required: req.required,
      available,
      shortage,
      unit: req.unit,
      status: isAvailable ? 'Available' : 'Insufficient',
    };
  });
}
