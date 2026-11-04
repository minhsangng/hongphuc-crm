import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-[10rem] font-bold drop-shadow-lg drop-shadow-amber-100 text-(--color-ink-light)">404</h1>
        <p className="mb-2">Trang bạn tìm không tồn tại.</p>
        <button type="button" className="px-4 py-2 rounded-xl bg-(--color-red) text-white hover:bg-(--color-red-hover) transition-colors">
          <Link to="/" className="text-white hover:text-white/80 transition-colors">Về trang chủ</Link>
        </button>
    </div>
  );
}