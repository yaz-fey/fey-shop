import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../products/productsSlice'

type CartItem = Product & { quantity: number }

type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product & { quantity: number }>) => {
      const { id, quantity } = action.payload
      const found = state.items.find(i => i.id === id)
      if (found) {
        found.quantity += quantity
      } else {
        state.items.push({ ...action.payload, quantity })
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    incrementQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item) item.quantity += 1
    },
    decrementQty: (state, action: PayloadAction<number>) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item) {
        item.quantity -= 1
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload)
        }
      }
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addToCart, removeFromCart, incrementQty, decrementQty, clearCart } = cartSlice.actions
export default cartSlice.reducer
export type { CartItem }
