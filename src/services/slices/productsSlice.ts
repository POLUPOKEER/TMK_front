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

export const fetchFilteredProducts = createAsyncThunk<
    ProductsResponse,
    ProductFilters
>(
    'products/fetchFilteredProducts',
    async (filters) => {
        const params = new URLSearchParams();

        if ('diameterFrom' in filters) params.append('diameterMin', filters.diameterFrom as string || '');
        if ('diameterTo' in filters) params.append('diameterMax', filters.diameterTo as string || '');
        if ('thicknessFrom' in filters) params.append('wallMin', filters.thicknessFrom as string || '');
        if ('thicknessTo' in filters) params.append('wallMax', filters.thicknessTo as string || '');
        if ('steelGrade' in filters) params.append('steelGrade', filters.steelGrade as string || '');
        if ('standard' in filters) params.append('gost', filters.standard as string || '');
        if ('productionType' in filters) params.append('productionType', filters.productionType || '');

        const url = `${API_CONFIG.baseUrl}/api/Catalog${params.toString() ? `?${params.toString()}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('🌐 Ответ сервера /api/Catalog с фильтрами:', data);
        return data;
    }
);



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
            .addCase(fetchFilteredProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = Array.isArray(action.payload)
                    ? action.payload
                    : action.payload?.products || [];
            })
            .addCase(fetchFilteredProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка фильтрации данных';
            });
    },
})

export const { setFilters } = productsSlice.actions
export default productsSlice.reducer