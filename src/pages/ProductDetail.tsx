import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Product } from '../features/products/productsSlice'

import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../app/store'

import { addToCart, incrementQty, decrementQty } from '../features/cart/cartSlice'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()

  const [product, setProduct] = useState<Product | null>(null)

  // Sepetteki ürün
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === Number(id))
  )

  // Ürün yoksa quantity = 0
  const quantity = cartItem?.quantity ?? 0

  useEffect(() => {
    if (!id) return
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
  }, [id])

  if (!product) {
    return <div className="text-center py-20 text-xl font-semibold">Ürün yükleniyor...</div>
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block text-sm">
        ← Mağazaya Dön
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Ürün Görseli */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        {/* Ürün Bilgileri */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">{product.description}</p>

            <p className="text-sm text-gray-500 mb-2">
              <span className="font-medium">Kategori:</span> {product.category}
            </p>

            {/* Fiyat */}
            <p className="text-4xl font-bold text-green-600 mt-4 mb-8">${product.price}</p>
          </div>

          {/* Quantity Controller — Shopify Style */}
          <div className="mt-8">
            <div className="flex items-center gap-6">
              {/* QUANTITY BOX */}
              <div className="flex items-center gap-4 bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 shadow-sm">
                {/* "-" butonu sadece quantity > 0 ise görünür */}
                {quantity > 0 && (
                  <button
                    onClick={() => dispatch(decrementQty(product.id))}
                    className="w-10 h-10 flex items-center justify-center text-2xl rounded-lg 
                               bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
                  >
                    −
                  </button>
                )}

                {/* Quantity display (her zaman görünür) */}
                <div className="w-10 text-center text-2xl font-semibold text-gray-800">
                  {quantity}
                </div>

                {/* "+" her zaman görünür (ürün yoksa ekler) */}
                <button
                  onClick={() => {
                    if (cartItem) {
                      dispatch(incrementQty(product.id))
                    } else {
                      dispatch(addToCart({ ...product, quantity: 1 }))
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center text-2xl rounded-lg
                             bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
