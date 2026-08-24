import { useState, useEffect } from 'react';

export default function Loader({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const minTime = 400;
    const start = Date.now();
  
    function handleLoad() {
        const elapsed = Date.now() - start;
        const remaining = Math.max(minTime - elapsed, 0);
        setTimeout(() => {
        setVisible(false);
        onFinish?.();
        }, remaining);
    }

    if (document.readyState === 'complete') {
        handleLoad();
    } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}