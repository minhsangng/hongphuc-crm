import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white dark:bg-dark-800 rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-dark-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-dark-400 hover:text-dark-600">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}