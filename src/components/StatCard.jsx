import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function StatCard({ icon: Icon, label, value, change, changeLabel, color = 'primary', loading = false }) {
  const colorMap = {
    primary: { bg: 'bg-(--color-red)/10', icon: 'text-(--color-red)', ring: 'ring-(--color-red-light)/60' },
    accent:  { bg: 'bg-blue-50',  icon: 'text-blue-600',  ring: 'ring-blue-200'  },
    green:   { bg: 'bg-green-50',   icon: 'text-green-600',   ring: 'ring-green-200'   },
    yellow:  { bg: 'bg-yellow-50',  icon: 'text-yellow-600',  ring: 'ring-yellow-200'  },
    purple:  { bg: 'bg-purple-50',  icon: 'text-purple-600',  ring: 'ring-purple-200'  },
    pink:    { bg: 'bg-pink-50',    icon: 'text-pink-600',    ring: 'ring-pink-200'    },
  }

  const c = colorMap[color] || colorMap.primary
  const isPositive = change > 0
  const isNeutral = change === 0

  if (loading) {
    return (
      <div className="stat-card animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-gray-100" />
          <div className="w-16 h-5 rounded-full bg-gray-100" />
        </div>
        <div className="w-24 h-8 rounded bg-gray-100 mb-1" />
        <div className="w-32 h-4 rounded bg-gray-100" />
      </div>
    )
  }

  return (
    <div className="stat-card group cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 ${c.bg} ring-1 ${c.ring} rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
          <Icon size={20} className={c.icon} strokeWidth={2} />
        </div>
        {change !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            isNeutral
              ? 'bg-gray-100 text-gray-500'
              : isPositive
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
          }`}>
            {isNeutral ? <Minus size={11} /> : isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {isNeutral ? '—' : `${isPositive ? '+' : ''}${change}%`}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-0.5 tabular-nums">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
      {changeLabel && (
        <p className="text-xs text-gray-400 mt-1">{changeLabel}</p>
      )}
    </div>
  )
}
