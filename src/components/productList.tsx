import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../services/store'
import { fetchProducts } from '../services/slices/productsSlice'
import { ProductCard } from './productCard'
import { useTelegramData } from '../contexts/telegramContext'
import { CartItem, CartResponse } from '../pages/Cart'
import { API_CONFIG } from '../config/api'


const ProductsList = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { items, loading, error } = useSelector((state: RootState) => state.products)
    const telegramData = useTelegramData()
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [cartLoading, setCartLoading] = useState(false)

    const userID = telegramData.user?.id || 112

    // Загружаем товары
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    // Загружаем корзину
    useEffect(() => {
        const fetchCart = async () => {
            if (!userID) return

            setCartLoading(true)
            try {
                const response = await fetch(`${API_CONFIG.baseUrl}/api/cart/${userID}`)
                if (response.ok) {
                    const cartData: CartResponse = await response.json()
                    setCartItems(cartData.items || [])
                }
            } catch (err) {
                console.error('Ошибка загрузки корзины:', err)
            } finally {
                setCartLoading(false)
            }
        }

        fetchCart()
    }, [userID])

    // Функция для получения данных товара из корзины
    const getCartItemData = (productId: number): CartItem | undefined => {
        return cartItems.find(item => item.nomenclatureId === productId)
    }

    if (loading) return <p className="text-white text-center mt-8">Загрузка товаров...</p>
    if (error) return <p className="text-red-500 text-center mt-8">{error}</p>

    return (
        <div className="p-6 grid gap-4">
            {Array.isArray(items) && items.length > 0 ? (
                items.map(product => {
                    const cartItem = getCartItemData(product.id)
                    const isInCart = !!cartItem

                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                            initialQuantity={cartItem?.quantity || 1}
                            initialUnit={cartItem?.unit || 'm'}
                            showCartButton={!isInCart}
                        />
                    )
                })
            ) : (
                <p className="text-white text-center">Нет товаров</p>
            )}

            {cartLoading && (
                <p className="text-white text-center text-sm">Обновление корзины...</p>
            )}
        </div>
    )
}

export { ProductsList }