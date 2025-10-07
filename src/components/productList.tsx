import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../services/store'
import { fetchProducts } from '../services/slices/productsSlice'
import { ProductCard } from './productCard'


const ProductsList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items, loading, error } = useSelector((state: RootState) => state.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if (loading) return <p className="text-white text-center mt-8">Загрузка...</p>
    if (error) return <p className="text-red-500 text-center mt-8">{error}</p>

    return (
        <div className="p-6 grid gap-4">
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                Array.isArray(items) && items.length > 0 ? (
                    items.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="text-white text-center">Нет товаров</p>
                )
            )}


        </div>
    )
}

export { ProductsList } 