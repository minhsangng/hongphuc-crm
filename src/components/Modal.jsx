import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/25 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4 border-b border-gray-300 pb-2">
          <h3 className="font-semibold text-lg text-(--color-red)">{title}</h3>
          <button onClick={onClose} className="text-gray-400">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}