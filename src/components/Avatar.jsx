import { getInitials, avatarColor } from '../utils/helpers';

export default function Avatar({ name, size = 'md', src, className = '' }) {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  if (src) {
    return (
      <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover ring-2 ring-white dark:ring-dark-800 ${className}`} />
    )
  }

  return (
    <div className={`${sizes[size]} ${avatarColor(name)} rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-white dark:ring-dark-800 select-none ${className}`}>
      {getInitials(name)}
    </div>
  )
};