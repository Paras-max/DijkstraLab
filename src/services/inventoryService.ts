import type { CartItem, DarkStore, MissingProductItem } from '../types/store';

export interface InventoryCheckResult {
  store: DarkStore;
  isEligible: boolean;
  missingProducts: MissingProductItem[];
  availableProductsCount: number;
  totalRequestedProductsCount: number;
}

export interface InventoryFilteringSummary {
  eligibleStores: DarkStore[];
  ineligibleStores: InventoryCheckResult[];
  allStoreEvaluations: InventoryCheckResult[];
  hasAnyEligibleStore: boolean;
}

/**
 * Evaluates whether a given dark store can satisfy the customer's cart.
 * A store qualifies ONLY if EVERY requested product has stock >= requested quantity.
 */
export function checkStoreInventory(store: DarkStore, cart: CartItem[]): InventoryCheckResult {
  const missingProducts: MissingProductItem[] = [];
  let availableProductsCount = 0;

  for (const item of cart) {
    if (item.quantity <= 0) continue;

    const availableStock = store.inventory[item.product.id] ?? 0;
    if (availableStock < item.quantity) {
      missingProducts.push({
        product: item.product,
        requested: item.quantity,
        available: availableStock,
      });
    } else {
      availableProductsCount++;
    }
  }

  const isEligible = missingProducts.length === 0;

  return {
    store,
    isEligible,
    missingProducts,
    availableProductsCount,
    totalRequestedProductsCount: cart.length,
  };
}

/**
 * Filters a collection of dark stores against the customer's cart.
 */
export function filterStoresByInventory(
  stores: DarkStore[],
  cart: CartItem[]
): InventoryFilteringSummary {
  // If cart is empty, all stores are trivially capable
  if (cart.length === 0) {
    const allEvaluations = stores.map((store) => ({
      store,
      isEligible: true,
      missingProducts: [],
      availableProductsCount: 0,
      totalRequestedProductsCount: 0,
    }));

    return {
      eligibleStores: [...stores],
      ineligibleStores: [],
      allStoreEvaluations: allEvaluations,
      hasAnyEligibleStore: stores.length > 0,
    };
  }

  const eligibleStores: DarkStore[] = [];
  const ineligibleStores: InventoryCheckResult[] = [];
  const allStoreEvaluations: InventoryCheckResult[] = [];

  for (const store of stores) {
    const check = checkStoreInventory(store, cart);
    allStoreEvaluations.push(check);

    if (check.isEligible) {
      eligibleStores.push(store);
    } else {
      ineligibleStores.push(check);
    }
  }

  return {
    eligibleStores,
    ineligibleStores,
    allStoreEvaluations,
    hasAnyEligibleStore: eligibleStores.length > 0,
  };
}

