import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

type Product = {
  id: number
  title: string
  price: number
  thumbnail: string
  description?: string
  category: string
}

type ProductsState = {
  items: Product[]
  categories: string[]
  loading: boolean
  error: string | null
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch('https://dummyjson.com/products?limit=100')
    if (!res.ok) throw new Error('Network response not ok')
    const data = await res.json()
    return data.products as Product[]
  }
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const res = await fetch('https://dummyjson.com/products/categories')
    if (!res.ok) throw new Error('Network response not ok')
    const data = await res.json()
    return data as string[]
  }
)

const initialState: ProductsState = {
  items: [],
  categories: [],
  loading: false,
  error: null
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Bir hata oluştu'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message ?? 'Kategoriler yüklenemedi'
      })
  }
})

export default productsSlice.reducer
export type { Product }
