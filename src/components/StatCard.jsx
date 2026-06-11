import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function StatCard({ icon: Icon, label, value, change, changeLabel, color = 'primary', loading = false }) {
  const colorMap = {
    primary: { bg: 'bg-primary-50 dark:bg-primary-900/20', icon: 'text-primary-600 dark:text-primary-400', ring: 'ring-primary-200 dark:ring-primary-800' },
    accent:  { bg: 'bg-accent-50  dark:bg-accent-900/20',  icon: 'text-accent-600  dark:text-accent-400',  ring: 'ring-accent-200  dark:ring-accent-800'  },
    green:   { bg: 'bg-green-50   dark:bg-green-900/20',   icon: 'text-green-600   dark:text-green-400',   ring: 'ring-green-200   dark:ring-green-800'   },
    yellow:  { bg: 'bg-yellow-50  dark:bg-yellow-900/20',  icon: 'text-yellow-600  dark:text-yellow-400',  ring: 'ring-yellow-200  dark:ring-yellow-800'  },
    purple:  { bg: 'bg-purple-50  dark:bg-purple-900/20',  icon: 'text-purple-600  dark:text-purple-400',  ring: 'ring-purple-200  dark:ring-purple-800'  },
    pink:    { bg: 'bg-pink-50    dark:bg-pink-900/20',    icon: 'text-pink-600    dark:text-pink-400',    ring: 'ring-pink-200    dark:ring-pink-800'    },
  }

  const c = colorMap[color] || colorMap.primary
  const isPositive = change > 0
  const isNeutral = change === 0

  if (loading) {
    return (
      <div className="stat-card animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-dark-100 dark:bg-dark-700" />
          <div className="w-16 h-5 rounded-full bg-dark-100 dark:bg-dark-700" />
        </div>
        <div className="w-24 h-8 rounded bg-dark-100 dark:bg-dark-700 mb-1" />
        <div className="w-32 h-4 rounded bg-dark-100 dark:bg-dark-700" />
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
              ? 'bg-dark-100 dark:bg-dark-700 text-dark-500'
              : isPositive
                ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
          }`}>
            {isNeutral ? <Minus size={11} /> : isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {isNeutral ? '—' : `${isPositive ? '+' : ''}${change}%`}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-dark-900 dark:text-white mb-0.5 tabular-nums">{value}</p>
      <p className="text-sm text-dark-500 dark:text-dark-400">{label}</p>
      {changeLabel && (
        <p className="text-xs text-dark-400 dark:text-dark-500 mt-1">{changeLabel}</p>
      )}
    </div>
  )
}
