import React from 'react';
import { X, Store, Package, Check, AlertCircle } from 'lucide-react';
import type { DarkStore, CartItem } from '../../types/store';
import { sampleProducts } from '../../data/productData';

interface StoreInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: DarkStore | null;
  cart: CartItem[];
}

export const StoreInventoryModal: React.FC<StoreInventoryModalProps> = ({
  isOpen,
  onClose,
  store,
  cart,
}) => {
  if (!isOpen || !store) return null;

  const cartMap = new Map(cart.map((i) => [i.product.id, i.quantity]));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-cyan-400">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{store.name}</h3>
              <p className="text-xs text-slate-400">
                Node ID: <strong className="text-cyan-300 font-mono">{store.nodeId}</strong> •{' '}
                {store.address}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-4">
          <div className="flex items-center justify-between bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400">Store Rating:</span>{' '}
              <strong className="text-amber-400 font-bold font-mono">★ {store.rating}</strong>
            </div>
            <div>
              <span className="text-slate-400">Quick Delivery Promise:</span>{' '}
              <strong className="text-emerald-400 font-bold font-mono">
                {store.deliveryTimeEstimate}
              </strong>
            </div>
          </div>

          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mt-1">
            <Package className="w-4 h-4 text-cyan-400" />
            Complete Inventory Ledger
          </h4>

          <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/50">
            {sampleProducts.map((prod) => {
              const stock = store.inventory[prod.id] ?? 0;
              const requested = cartMap.get(prod.id) || 0;
              const isRequested = requested > 0;
              const isFulfilled = stock >= requested;

              return (
                <div
                  key={prod.id}
                  className={`flex items-center justify-between p-3 text-xs transition-colors ${
                    isRequested
                      ? isFulfilled
                        ? 'bg-emerald-950/10'
                        : 'bg-rose-950/20'
                      : 'hover:bg-slate-900/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl select-none">{prod.imageIcon}</span>
                    <div>
                      <div className="font-semibold text-white flex items-center gap-2">
                        {prod.name}
                        {isRequested && (
                          <span
                            className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                              isFulfilled
                                ? 'bg-emerald-950 border border-emerald-800 text-emerald-300'
                                : 'bg-rose-950 border border-rose-800 text-rose-300'
                            }`}
                          >
                            Requested: {requested}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        ₹{prod.price} • {prod.unit}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <div className="font-mono">
                      <div
                        className={`font-bold text-sm ${
                          stock === 0
                            ? 'text-rose-400'
                            : stock < 10
                            ? 'text-amber-400'
                            : 'text-emerald-300'
                        }`}
                      >
                        {stock > 0 ? `${stock} units` : 'Out of Stock'}
                      </div>
                      <div className="text-[10px] text-slate-500">Live Inventory</div>
                    </div>

                    {isRequested && (
                      <div>
                        {isFulfilled ? (
                          <span
                            className="p-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 inline-block"
                            title="Fully In Stock for your cart"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span
                            className="p-1 rounded-full bg-rose-950 border border-rose-700 text-rose-400 inline-block"
                            title="Insufficient Stock"
                          >
                            <AlertCircle className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

