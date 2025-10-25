import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";

export default function CartPanel({ open, onClose, items, onIncrement, onDecrement, onRemove }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const delivery = subtotal > 20 ? 0 : subtotal > 0 ? 2.99 : 0;
  const total = subtotal + delivery;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-hidden border-l border-neutral-200 bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 p-4">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button onClick={onClose} aria-label="Close" className="rounded-md p-2 hover:bg-neutral-100">
                <X size={18} />
              </button>
            </div>

            <div className="flex h-full flex-col">
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="py-20 text-center text-neutral-500">Your cart is empty.</div>
                ) : (
                  <ul className="space-y-4">
                    {items.map((it) => (
                      <li key={it.id} className="flex gap-3">
                        <img src={it.image} alt={it.name} className="h-16 w-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm font-semibold">{it.name}</div>
                              <div className="text-xs text-neutral-500">{it.unit}</div>
                            </div>
                            <button onClick={() => onRemove(it.id)} className="text-xs text-neutral-500 hover:underline">Remove</button>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 text-sm">
                              <button
                                onClick={() => onDecrement(it.id)}
                                className="h-8 w-8 rounded-l-full text-neutral-700 hover:bg-neutral-100"
                                aria-label="Decrease"
                              >
                                <Minus size={16} className="mx-auto" />
                              </button>
                              <div className="min-w-[2ch] px-2 text-center text-sm font-semibold">{it.quantity}</div>
                              <button
                                onClick={() => onIncrement(it.id)}
                                className="h-8 w-8 rounded-r-full text-neutral-700 hover:bg-neutral-100"
                                aria-label="Increase"
                                disabled={it.quantity >= it.stock}
                              >
                                <Plus size={16} className="mx-auto" />
                              </button>
                            </div>
                            <div className="text-sm font-semibold">${(it.price * it.quantity).toFixed(2)}</div>
                          </div>
                          {it.quantity >= it.stock && (
                            <div className="mt-1 text-xs text-amber-600">Max stock reached</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-neutral-200 p-4">
                <div className="mb-3 space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-neutral-600">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-600">Delivery</span><span className="font-medium">{delivery === 0 ? "Free" : `$${delivery.toFixed(2)}`}</span></div>
                </div>
                <div className="mb-3 flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  disabled={items.length === 0}
                  className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                  Proceed to Checkout
                </button>
                <div className="mt-2 text-center text-xs text-neutral-500">Secure payments • Real-time order tracking</div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
