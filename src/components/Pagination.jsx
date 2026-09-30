import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Pagination({ total, pageSize, page, onChange }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages < 1) return null;

  const pages = [];
  const delta = 1;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-black/20">
      <p className="text-xs text-black">
        {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} / {total} mục
      </p>
      <div className="flex items-center gap-1">
        <button onClick={() => onChange(1)} disabled={page === 1}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-black hover:bg-black/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ChevronsLeft size={14} />
        </button>
        <button onClick={() => onChange(page - 1)} disabled={page === 1}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-black hover:bg-black/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ChevronLeft size={14} />
        </button>
        {pages.map((p, i) => (
          p === "..."
            ? <span key={`e${i}`} className="w-7 h-7 flex items-center justify-center text-black/80 text-xs">…</span>
            : <button key={p} onClick={() => onChange(p)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition hover:bg-(--color-red-hover) hover:text-white ${
                  p === page ? "bg-(--color-red) text-white shadow-sm" : "text-black hover:bg-black/20"
                }`}>
                {p}
              </button>
        ))}
        <button onClick={() => onChange(page + 1)} disabled={page === totalPages}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-black/80 hover:bg-black/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ChevronRight size={14} />
        </button>
        <button onClick={() => onChange(totalPages)} disabled={page === totalPages}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-black/40 hover:bg-black/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ChevronsRight size={14} />
        </button>
      </div>
    </div>
  )
}
