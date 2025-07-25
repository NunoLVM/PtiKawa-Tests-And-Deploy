/**
 * Calcule le total d'une commande à partir des articles commandés.
 * Ignore les prix négatifs.
 * @param {Array} items - Liste d'objets { name: string, price: number }
 * @returns {number}
 */
function calculateOrderPrice(items) {
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => {
    if (typeof item.price === 'number' && item.price >= 0) {
      return total + item.price;
    }
    return total;
  }, 0);
}

/**
 * Vérifie si un utilisateur peut commander en fonction de son crédit.
 * @param {Object} user - { credit: number }
 * @param {number} total - Montant total de la commande
 * @returns {boolean}
 */
function canAffordOrder(user, total) {
  if (!user || typeof user.credit !== 'number') return false;
  return user.credit >= total;
}

/**
 * Applique une remise si le montant dépasse un seuil.
 * @param {number} total
 * @returns {number} - Total après remise
 */
function applyDiscount(total) {
  if (typeof total !== 'number' || total < 0) return 0;
  if (total >= 20) return total * 0.9; // -10%
  return total;
}

module.exports = {
  calculateOrderPrice,
  canAffordOrder,
  applyDiscount
};