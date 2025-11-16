import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import { incrementQty, decrementQty, removeFromCart } from '../features/cart/cartSlice'
import { Link } from 'react-router-dom'

const CartDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Sepetim</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-4">Sepetinizde hiç ürün yok.</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-gray-200 py-4 last:border-b-0"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg mr-6"
              />

              {/* Ürün Bilgisi */}
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                <p className="text-gray-600 text-lg">${item.price.toFixed(2)}</p>
              </div>

              {/* Quantity Controller – SHOPIFY STYLE */}
              <div className="flex items-center gap-4">
                {/* - Button */}
                {item.quantity > 0 && (
                  <button
                    onClick={() => dispatch(decrementQty(item.id))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg 
                               bg-gray-200 hover:bg-gray-300 text-xl text-gray-700"
                  >
                    −
                  </button>
                )}

                {/* Quantity */}
                <div className="w-10 text-center text-xl font-semibold">{item.quantity}</div>

                {/* + Button */}
                <button
                  onClick={() => dispatch(incrementQty(item.id))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg 
                             bg-gray-200 hover:bg-gray-300 text-xl text-gray-700"
                >
                  +
                </button>

                {/* Çöp Kutusu – Shopify Tarzı Minimal */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="ml-2 text-gray-700 hover:text-black transition"
                >
                  {/* SVG icon (Shopify minimal style) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0h8l-1-3H10L9 7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {/* Total Price */}
          <div className="flex justify-end items-center mt-8 pt-6 border-t border-gray-200">
            <span className="text-2xl font-bold text-gray-800 mr-4">Toplam:</span>
            <span className="text-3xl font-bold text-black">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartDetail
