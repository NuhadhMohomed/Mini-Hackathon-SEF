import { calculateIngredientReadiness } from './readinessCalculator';

export const readinessMockService = {
  checkOrderReadiness: (order, inventory) => {
    const auditRows = calculateIngredientReadiness(order, inventory);
    const insufficientCount = auditRows.filter((r) => r.status === 'Insufficient').length;
    return {
      auditRows,
      isReady: insufficientCount === 0,
      insufficientCount,
    };
  },
};
