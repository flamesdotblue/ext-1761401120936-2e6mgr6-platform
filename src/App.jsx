import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import CategoryBar from "./components/CategoryBar";
import ProductGrid from "./components/ProductGrid";
import CartPanel from "./components/CartPanel";

const initialProducts = [
  {
    id: "p1",
    name: "Bananas - Cavendish",
    price: 0.49,
    unit: "/pc",
    category: "Fruits",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1200&auto=format&fit=crop",
    stock: 42,
    tags: ["fresh", "organic"],
  },
  {
    id: "p2",
    name: "Tomatoes - Roma",
    price: 1.99,
    unit: "/500g",
    category: "Vegetables",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1604948046436-0cda67c9f368?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxUb21hdG9lcyUyMC0lMjBSb21hfGVufDB8MHx8fDE3NjE0MDEzNzZ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80",
    stock: 15,
    tags: ["fresh"],
  },
  {
    id: "p3",
    name: "Whole Wheat Bread",
    price: 2.49,
    unit: "/loaf",
    category: "Bakery",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1200&auto=format&fit=crop",
    stock: 24,
  },
  {
    id: "p4",
    name: "Free Range Eggs",
    price: 3.99,
    unit: "/12 pcs",
    category: "Dairy & Eggs",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1585355611347-6fb3aca79111?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxGcmVlJTIwUmFuZ2UlMjBFZ2dzfGVufDB8MHx8fDE3NjE0MDEzNzV8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80",
    stock: 30,
  },
  {
    id: "p5",
    name: "2% Milk",
    price: 1.79,
    unit: "/1L",
    category: "Dairy & Eggs",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=1200&auto=format&fit=crop",
    stock: 10,
  },
  {
    id: "p6",
    name: "Basmati Rice",
    price: 8.99,
    unit: "/5kg",
    category: "Grains",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxCYXNtYXRpJTIwUmljZXxlbnwwfDB8fHwxNzYxNDAxMjA4fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80",
    stock: 18,
  },
  {
    id: "p7",
    name: "Olive Oil - Extra Virgin",
    price: 12.5,
    unit: "/1L",
    category: "Pantry",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1757801333175-65177bd6969c?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxPbGl2ZSUyME9pbCUyMC0lMjBFeHRyYSUyMFZpcmdpbnxlbnwwfDB8fHwxNzYxNDAxMzc1fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80",
    stock: 9,
  },
  {
    id: "p8",
    name: "Chicken Breast",
    price: 6.49,
    unit: "/500g",
    category: "Meat & Seafood",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1633096013004-e2cb4023b560?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDaGlja2VuJTIwQnJlYXN0fGVufDB8MHx8fDE3NjE0MDEzNzV8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80",
    stock: 12,
  },
];

const categories = [
  "All",
  "Fruits",
  "Vegetables",
  "Dairy & Eggs",
  "Bakery",
  "Grains",
  "Pantry",
  "Meat & Seafood",
];

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  // Simulate realtime stock changes
  useEffect(() => {
    const timer = setInterval(() => {
      setProducts((prev) =>
        prev.map((p) => {
          // random micro adjustment: simulate demand and restocks
          const delta = Math.random() < 0.6 ? 0 : Math.random() < 0.5 ? -1 : 1;
          const newStock = Math.max(0, Math.min(99, p.stock + delta));
          return { ...p, stock: newStock };
        })
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesQuery = query.trim().length === 0 ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase())) ?? false);
      return matchesCategory && matchesQuery;
    });
  }, [products, activeCategory, query]);

  const cartCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);
  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => {
      const p = products.find((x) => x.id === id);
      return { ...p, quantity: qty };
    }).filter(Boolean);
  }, [cart, products]);

  function addToCart(product) {
    if (product.stock <= 0) return;
    setCart((prev) => {
      const nextQty = (prev[product.id] || 0) + 1;
      if (nextQty > product.stock) return prev; // can't exceed stock
      return { ...prev, [product.id]: nextQty };
    });
  }

  function increment(id) {
    const prod = products.find((p) => p.id === id);
    if (!prod) return;
    setCart((prev) => {
      const next = (prev[id] || 0) + 1;
      if (next > prod.stock) return prev;
      return { ...prev, [id]: next };
    });
  }

  function decrement(id) {
    setCart((prev) => {
      const next = Math.max(0, (prev[id] || 0) - 1);
      const clone = { ...prev };
      if (next === 0) delete clone[id]; else clone[id] = next;
      return clone;
    });
  }

  function removeItem(id) {
    setCart((prev) => {
      const clone = { ...prev };
      delete clone[id];
      return clone;
    });
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        query={query}
        onQueryChange={setQuery}
      />

      <main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <section className="mt-6">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 px-6 py-10 text-white shadow-lg">
            <h1 className="text-2xl font-semibold md:text-3xl">Get groceries delivered in minutes</h1>
            <p className="mt-2 text-white/90">Fresh produce, daily essentials, and more. Real-time stock and fast checkout.</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <span className="font-medium">Free delivery</span>
              <span className="opacity-70">•</span>
              <span>On first order above $20</span>
            </div>
          </div>
        </section>

        <CategoryBar
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
          className="mt-6"
        />

        <ProductGrid
          products={filtered}
          onAdd={addToCart}
          cart={cart}
        />
      </main>

      <CartPanel
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onIncrement={increment}
        onDecrement={decrement}
        onRemove={removeItem}
      />

      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-white shadow-lg transition hover:bg-emerald-700 md:hidden"
        aria-label="Open cart"
      >
        <span className="text-sm font-semibold">Cart</span>
        <span className="rounded-full bg-white px-2 py-0.5 text-emerald-700 text-xs font-bold">{cartCount}</span>
      </button>
    </div>
  );
}
