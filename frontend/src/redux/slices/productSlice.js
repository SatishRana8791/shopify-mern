import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  pages: 1,
  page: 1,
  total: 0,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productListStart: (state) => {
      state.loading = true
      state.error = null
    },
    productListSuccess: (state, action) => {
      state.loading = false
      state.products = action.payload.products
      state.pages = action.payload.pages
      state.page = action.payload.page
      state.total = action.payload.total
    },
    productListFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    productDetailStart: (state) => {
      state.loading = true
      state.error = null
    },
    productDetailSuccess: (state, action) => {
      state.loading = false
      state.product = action.payload
    },
    productDetailFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  productListStart,
  productListSuccess,
  productListFail,
  productDetailStart,
  productDetailSuccess,
  productDetailFail,
} = productSlice.actions

export default productSlice.reducer;