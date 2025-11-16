import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, fetchCategories } from '../features/products/productsSlice'
import type { RootState, AppDispatch } from '../app/store'
import ProductCard from '../components/ProductCard'

const PRODUCTS_PER_PAGE = 6

// --- SORT OPTIONS ---
interface SortOption {
  value: string
  label: string
}

const OPTIONS: SortOption[] = [
  { value: 'price-asc', label: 'Fiyat: Ucuz → Pahalı' },
  { value: 'price-desc', label: 'Fiyat: Pahalı → Ucuz' },
  { value: 'alpha-asc', label: "A'dan Z'ye" },
  { value: 'alpha-desc', label: "Z'den A'ya" }
]

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, error } = useSelector((state: RootState) => state.products)

  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isSortOpen, setIsSortOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, sortOrder])

  // SEARCH
  const filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // SORT
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'alpha-asc':
        return a.title.localeCompare(b.title)
      case 'alpha-desc':
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const currentLabel = OPTIONS.find((o) => o.value === sortOrder)?.label || 'Sırala'

  return (
    <div className="p-4 md:p-8 bg-gray-50 px-12 min-h-screen">
      {/* Search + Sort (RIGHT SIDE) */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-end items-end">
        {/* Search */}
        <input
          type="text"
          placeholder="Ürün Ara..."
          className="
            w-full md:w-64 px-4 py-3 rounded-xl bg-white border border-gray-300
            shadow-sm placeholder-gray-500 text-gray-800
            focus:border-gray-400 focus:ring-0 focus:outline-none
            transition-all
          "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sort Dropdown */}
        <div className="relative w-full md:w-64">
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="
              w-full px-4 py-3 rounded-xl bg-white border border-gray-300
              shadow-sm flex justify-between items-center
              text-gray-800 focus:outline-none focus:border-gray-400
              transition-all
            "
          >
            {currentLabel}
            <span className="ml-2 text-gray-500">▾</span>
          </button>

          {isSortOpen && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg">
              {OPTIONS.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => {
                    setSortOrder(opt.value)
                    setIsSortOpen(false)
                  }}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center mt-10 text-gray-600">Ürünler yükleniyor...</p>}
      {error && <p className="text-center mt-4 text-red-600">{error}</p>}

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 mt-6 my-5">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <p className="text-center col-span-full mt-10 text-gray-600">
            Filtre ile eşleşen ürün bulunamadı.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || totalPages === 0}
          className="
            px-4 py-2 mx-1 bg-white border rounded-lg shadow-sm 
            hover:bg-gray-100 disabled:opacity-50 transition
          "
        >
          Önceki
        </button>

        <span className="px-4 py-2 mx-1 text-gray-700">
          Sayfa {totalPages === 0 ? 1 : currentPage} / {totalPages === 0 ? 1 : totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="
            px-4 py-2 mx-1 bg-white border rounded-lg shadow-sm 
            hover:bg-gray-100 disabled:opacity-50 transition
          "
        >
          Sonraki
        </button>
      </div>
    </div>
  )
}
