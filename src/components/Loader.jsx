import { useState, useEffect } from 'react';

export default function Loader({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const minTime = 1200;
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
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white transition-opacity duration-500">
      <span className="loader"></span>
    </div>
  );
}