import type { Product } from '../features/products/productsSlice'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../app/store'
import { addToCart } from '../features/cart/cartSlice'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Link to={`/product/${product.id}`}>
      <div
        className="
          bg-white rounded-2xl shadow-md overflow-hidden
          hover:shadow-xl transition-all duration-200 hover:-translate-y-1
          flex flex-col
        "
      >
        {/* Ürün Görseli */}
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Ürün Bilgileri */}
        <div className="flex flex-col flex-grow p-3">
          <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2 mb-1">
            {product.title}
          </h3>
          <p className="text-gray-500 text-xs md:text-sm flex-grow">
            {product.description?.slice(0, 60)}...
          </p>

          {/* Fiyat + Sepet Butonu */}
          <div className="flex items-center justify-between mt-3">
            {/* Fiyat */}
            <span className="font-bold text-black text-sm md:text-base">${product.price}</span>

            {/* Sepete Ekle (Outline / Hover efektli) */}
            <button
              onClick={(e) => {
                e.preventDefault()
                dispatch(addToCart({ ...product, quantity: 1 }))
              }}
              className="
                px-3 py-1.5 rounded-lg border border-black
                text-black font-medium text-xs md:text-sm
                bg-white
                hover:bg-black hover:text-white
                transition-colors
              "
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
