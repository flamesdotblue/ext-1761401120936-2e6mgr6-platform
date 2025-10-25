import { MapPin, Search, ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";

export default function Header({ cartCount, onCartOpen, query, onQueryChange }) {
  const [locationOpen, setLocationOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6 lg:px-8">
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 text-neutral-700 hover:bg-neutral-50 md:hidden" aria-label="Menu">
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-600" />
          <span className="text-lg font-semibold tracking-tight">GrocerNow</span>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => setLocationOpen((s) => !s)}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50"
          >
            <MapPin size={16} className="text-emerald-600" />
            <span>Deliver to</span>
            <span className="font-medium">Downtown</span>
          </button>
          {locationOpen && (
            <div className="absolute left-1/2 top-16 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-xl border border-neutral-200 bg-white p-4 shadow-xl">
              <p className="mb-2 text-sm font-medium">Change delivery location</p>
              <input
                type="text"
                placeholder="Search area or zip"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="mt-3 text-xs text-neutral-500">Popular: Midtown, River Park, Tech Hub</div>
            </div>
          )}
        </div>

        <div className="relative ml-auto flex-1 md:max-w-xl">
          <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search for milk, bread, fruits..."
            className="w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 py-2 text-sm outline-none ring-emerald-500/0 transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          onClick={onCartOpen}
          className="relative inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          <ShoppingCart size={18} />
          <span className="hidden md:inline">Cart</span>
          <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-emerald-700">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
