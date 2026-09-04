export const initialLarderInventory = [
  {
    id: 'ING-101',
    ingredient: 'Cairnspring Yecora Rojo Flour',
    available: 4500,
    minimumStock: 1500,
    unit: 'g',
  },
  {
    id: 'ING-102',
    ingredient: 'Normandy Cultured Butter (84% Fat)',
    available: 400,
    minimumStock: 1000,
    unit: 'g',
  },
  {
    id: 'ING-103',
    ingredient: 'Green Cardamom Pods',
    available: 80,
    minimumStock: 200,
    unit: 'g',
  },
  {
    id: 'ING-104',
    ingredient: 'Valrhona 70% Dark Cocoa',
    available: 2500,
    minimumStock: 500,
    unit: 'g',
  },
  {
    id: 'ING-105',
    ingredient: 'Organic Wildflower Honey',
    available: 1200,
    minimumStock: 300,
    unit: 'g',
  },
  {
    id: 'ING-106',
    ingredient: 'Maldon Sea Salt Flakes',
    available: 350,
    minimumStock: 500,
    unit: 'g',
  },
  {
    id: 'ING-107',
    ingredient: 'Sourdough Mother Culture',
    available: 8000,
    minimumStock: 2000,
    unit: 'g',
  },
  {
    id: 'ING-108',
    ingredient: 'Madagascar Bourbon Vanilla Beans',
    available: 10,
    minimumStock: 50,
    unit: 'g',
  },
];

export const inventoryMockService = {
  getInventory: () => initialLarderInventory,
};
