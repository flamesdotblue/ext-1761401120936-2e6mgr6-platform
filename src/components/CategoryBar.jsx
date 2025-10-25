export default function CategoryBar({ categories, active, onChange, className = "" }) {
  return (
    <div className={`no-scrollbar overflow-x-auto ${className}`}>
      <div className="flex items-center gap-2">
        {categories.map((c) => {
          const isActive = c === active;
          return (
            <button
              key={c}
              onClick={() => onChange(c)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${
                isActive
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}
