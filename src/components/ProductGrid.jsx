import { Star, Plus, Minus } from "lucide-react";

export default function ProductGrid({ products, onAdd, cart }) {
  return (
    <section className="py-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <article key={p.id} className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              {p.stock <= 3 && p.stock > 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-amber-500/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">Low stock</span>
              )}
              {p.stock === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-neutral-900/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">Out of stock</span>
              )}
            </div>
            <div className="p-3">
              <h3 className="line-clamp-2 h-10 text-sm font-semibold text-neutral-900">{p.name}</h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-emerald-700">
                <Star size={14} className="fill-emerald-600 text-emerald-600" />
                <span className="font-medium">{p.rating.toFixed(1)}</span>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-500">{p.category}</span>
              </div>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <div className="text-base font-bold">${p.price.toFixed(2)} <span className="text-xs font-medium text-neutral-500">{p.unit}</span></div>
                  <div className={`text-xs ${p.stock === 0 ? "text-red-600" : "text-neutral-500"}`}>{p.stock} in stock</div>
                </div>

                {cart[p.id] ? (
                  <div className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 text-sm">
                    <button
                      onClick={(e) => { e.stopPropagation(); onAdd({ ...p, stock: Math.max(0, cart[p.id] - 1) }); }}
                      className="h-8 w-8 rounded-l-full text-neutral-700 hover:bg-neutral-100"
                      disabled={cart[p.id] <= 0}
                      aria-label="Decrease"
                    >
                      <Minus size={16} className="mx-auto" />
                    </button>
                    <div className="min-w-[2ch] px-2 text-center text-sm font-semibold">{cart[p.id]}</div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onAdd(p); }}
                      className="h-8 w-8 rounded-r-full text-neutral-700 hover:bg-neutral-100"
                      disabled={cart[p.id] >= p.stock}
                      aria-label="Increase"
                    >
                      <Plus size={16} className="mx-auto" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => { e.stopPropagation(); onAdd(p); }}
                    disabled={p.stock === 0}
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
                  >
                    <Plus size={14} /> Add
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {products.length === 0 && (
        <div className="py-20 text-center text-neutral-500">No items match your search.</div>
      )}
    </section>
  );
}
