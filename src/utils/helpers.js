export function formatVND(amount) {
  if (amount >= 1_000_000_000) {
    return (amount / 1_000_000_000).toFixed(1) + ' tỷ';
  }
  if (amount >= 10_000_000) {
    return (amount / 1_000_000).toFixed(1) + ' triệu';
  }
  return amount.toLocaleString('vi-VN') + ' đ';
};

export function formatVNDShort(amount) {
  if (amount >= 1_000_000_000) return (amount / 1_000_000_000).toFixed(1) + 'B';
  if (amount >= 1_000_000) return (amount / 1_000_000).toFixed(0) + 'M';
  if (amount >= 1_000) return (amount / 1_000).toFixed(0) + 'K';
  return amount;
};

export function formatDateVN(date) {
  return new Date(date).toLocaleDateString('vi-VN');
}

export function getInitials(name) {
  return name.split(' ').slice(-2).map(w => w[0]).join('').toUpperCase();
};

export function avatarColor(name) {
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500',
    'bg-orange-500', 'bg-pink-500', 'bg-teal-500', 'bg-indigo-500',
  ];
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) % colors.length;
  return colors[hash];
};

export function images(path) {
  const image = Object.fromEntries(Object.entries(import.meta.glob('../assets/*', { eager: true, import: 'default' })).map(([key, value]) => [key.split('/').pop(), value]));
  return image[path];
}