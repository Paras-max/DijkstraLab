import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, Sparkles, Filter } from 'lucide-react';
import type { CartItem } from '../../types/store';
import { sampleProducts } from '../../data/productData';

interface ProductCatalogProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  onApplyPreset: (presetName: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  cart,
  onUpdateQuantity,
  onClearCart,
  onApplyPreset,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Dairy', 'Bakery', 'Fresh', 'Pantry', 'Beverage'];

  const filteredProducts =
    selectedCategory === 'ALL'
      ? sampleProducts
      : sampleProducts.filter((p) => p.category === selectedCategory);

  const getQuantityInCart = (productId: string): number => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const totalItemsCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalCartPrice = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      {/* Header & Cart Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Select Products for Delivery
            </h2>
            <p className="text-xs text-slate-400">
              Pick your grocery items. Only dark stores stocking all items will qualify.
            </p>
          </div>
        </div>

        {/* Live Cart Pill */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2 text-xs">
            <span className="text-slate-400">Cart Total:</span>
            <span className="font-bold text-emerald-400 font-mono text-sm">
              ₹{totalCartPrice}
            </span>
            <span className="text-slate-600">|</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800/80 text-emerald-300 font-semibold text-[11px]">
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          {totalItemsCount > 0 && (
            <button
              onClick={onClearCart}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-900/50 transition-colors"
              title="Clear entire cart"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Preset Combo Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 flex items-center gap-1 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Quick Combos:
        </span>
        <button
          onClick={() => onApplyPreset('BREAKFAST')}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all text-[11px]"
        >
          🍳 Breakfast (Milk, Bread, Eggs, Butter)
        </button>
        <button
          onClick={() => onApplyPreset('PANTRY')}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all text-[11px]"
        >
          🍚 Daily Staples (Rice, Veggies, Milk)
        </button>
        <button
          onClick={() => onApplyPreset('FRESH')}
          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all text-[11px]"
        >
          🥗 Fresh & Healthy (Fruits, Veggies, Juice)
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-1 mr-0.5" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredProducts.map((product) => {
          const qty = getQuantityInCart(product.id);
          const isSelected = qty > 0;

          return (
            <div
              key={product.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/90 border-emerald-500/60 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/30'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div>
                {/* Icon & Category Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-3xl select-none">{product.imageIcon}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-400 uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>

                {/* Product Name & Unit */}
                <h3 className="font-semibold text-white text-xs leading-snug line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 font-mono">{product.unit}</p>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                  {product.description}
                </p>
              </div>

              {/* Price & Quantity Controls */}
              <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-800/70">
                <span className="text-sm font-bold text-white font-mono">₹{product.price}</span>

                {qty === 0 ? (
                  <button
                    onClick={() => onUpdateQuantity(product.id, 1)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-xs shadow-md shadow-emerald-950/40 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 bg-slate-900 border border-emerald-600/70 rounded-lg p-0.5">
                    <button
                      onClick={() => onUpdateQuantity(product.id, qty - 1)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center font-bold text-xs text-emerald-300 font-mono">
                      {qty}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, qty + 1)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-emerald-700 hover:bg-emerald-600 text-white transition-colors"
                      title="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
