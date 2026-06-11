import React, { useState, useMemo } from 'react'
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Filter } from 'lucide-react'
import Pagination from './Pagination'

export default function DataTable({
  title, columns, data, pageSize = 5, loading = false, emptyMessage = 'Không có dữ liệu', searchable = true
}) {
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [search, setSearch] = useState('')

  function handleSort(key) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
    setPage(1)
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const q = search.toLowerCase()
    return data.filter(row =>
      columns.some(col => String(row[col.key] ?? '').toLowerCase().includes(q))
    )
  }, [data, search, columns])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      const cmp = String(av).localeCompare(String(bv), 'vi')
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  const paged = sorted.slice((page - 1) * pageSize, page * pageSize)

  const SortIcon = ({ col }) => {
    if (sortKey !== col.key) return <ArrowUpDown size={13} className="text-dark-300 dark:text-dark-600" />
    return sortDir === 'asc'
      ? <ArrowUp size={13} className="text-primary-500" />
      : <ArrowDown size={13} className="text-primary-500" />
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-100 dark:border-dark-700 overflow-hidden animate-fade-in">
        <div className="px-5 py-4 border-b border-dark-100 dark:border-dark-700">
          <div className="w-40 h-5 bg-dark-100 dark:bg-dark-700 rounded animate-pulse" />
        </div>
        <div className="divide-y divide-dark-50 dark:divide-dark-700/50">
          {Array.from({ length: pageSize }).map((_, i) => (
            <div key={i} className="flex gap-4 px-5 py-3 animate-pulse">
              {columns.map(c => (
                <div key={c.key} className="h-4 bg-dark-100 dark:bg-dark-700 rounded flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl border border-dark-100 dark:border-dark-700 overflow-hidden animate-fade-in">
      {/* Table header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-dark-100 dark:border-dark-700">
        <div>
          <h3 className="font-semibold text-dark-900 dark:text-white text-sm">{title}</h3>
          <p className="text-xs text-dark-400 dark:text-dark-500 mt-0.5">{filtered.length} kết quả</p>
        </div>
        {searchable && (
          <div className="relative sm:w-56">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="input-field pl-8 h-8 text-xs"
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-dark-50 dark:bg-dark-900/50">
            <tr>
              {columns.map(col => (
                <th key={col.key} className="table-header">
                  {col.sortable !== false ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-1.5 hover:text-dark-700 dark:hover:text-dark-200 transition-colors group"
                    >
                      {col.label}
                      <SortIcon col={col} />
                    </button>
                  ) : col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-50 dark:divide-dark-700/50">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Filter size={32} className="text-dark-200 dark:text-dark-700" />
                    <p className="text-sm text-dark-400 dark:text-dark-500">{emptyMessage}</p>
                    {search && (
                      <button onClick={() => setSearch('')} className="text-xs text-accent-600 hover:underline">Xóa tìm kiếm</button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr key={row.id ?? i}
                  className="hover:bg-dark-50 dark:hover:bg-dark-700/30 transition-colors group">
                  {columns.map(col => (
                    <td key={col.key} className="table-cell">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination total={filtered.length} pageSize={pageSize} page={page} onChange={setPage} />
    </div>
  )
}
