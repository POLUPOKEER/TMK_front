import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Products, ProductsResponse, ProductFilters } from '../types/products'
import { API_CONFIG } from '../../config/api';

export const fetchProducts = createAsyncThunk<ProductsResponse>(
    'products/fetchProducts',
    async () => {
        const response = await fetch(`${API_CONFIG.baseUrl}/api/Catalog`)
        const data = await response.json()
        // console.log('🌐 Ответ сервера /api/Catalog:', data)
        return data
    }

)

type ProductsState = {
    items: Products
    totalCount: number
    page: number
    pageSize: number
    filters: ProductFilters
    loading: boolean
    error: string | null
}

const initialState: ProductsState = {
    items: [],
    totalCount: 0,
    page: 1,
    pageSize: 10,
    filters: {},
    loading: false,
    error: null,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<ProductFilters>) {
            state.filters = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.loading = false
                state.items = Array.isArray(action.payload)
                    ? action.payload
                    : action.payload?.products || []
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Ошибка загрузки данных'
            })
    },
})

export const { setFilters } = productsSlice.actions
export default productsSlice.reducer