import { useState } from 'react';
import { Product } from '../services/types/products';
import { CartItemData } from '../services/types/products';
import { useTelegramData } from '../contexts/telegramContext';
import { API_CONFIG } from '../config/api';



type Props = {
    product: Product;
    unit: 'm' | 't';
    quantity: number;
    onCartChange?: (inCart: boolean) => void; // Колбэк при изменении состояния корзины
    showCartBtn: boolean;
}

export const InCartBtn = ({ product, unit, quantity, onCartChange, showCartBtn }: Props) => {
    const [inCart, setInCart] = useState(!showCartBtn);
    const [loading, setLoading] = useState(false);

    const telegramData = useTelegramData();
    const userId = telegramData.user ? telegramData.user.id : 112;

    const handleCartToggle = async () => {
        setLoading(true);

        try {
            if (!inCart) {
                // Добавляем в корзину
                const cartData: CartItemData = {
                    userId: userId, // Замени на реальный ID пользователя
                    nomenclatureId: product.id,
                    stockId: product.prices[0].idStock,
                    quantity: quantity,
                    unit: unit
                };

                const response = await fetch(`${API_CONFIG.baseUrl}/api/cart/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cartData)
                });

                if (response.ok) {
                    setInCart(true);
                    onCartChange?.(true);
                    console.log('✅ Товар добавлен в корзину:', cartData);
                } else {
                    console.error('❌ Ошибка добавления в корзину');
                }
            } else {
                // Удаляем из корзины
                const response = await fetch(`${API_CONFIG.baseUrl}/api/cart/remove/${product.id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setInCart(false);
                    onCartChange?.(false);
                    console.log('🗑️ Товар удален из корзины');
                }
            }
        } catch (error) {
            console.error('❌ Ошибка:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={!inCart ? handleCartToggle : () => { }}
            disabled={loading}
            className={`mt-2 w-full py-2 rounded-lg font-semibold transition-colors ${inCart
                ? 'bg-gray-500 text-white hover:bg-gray-600'
                : 'bg-[#E35D14] text-white hover:bg-[#d24f0d]'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {loading ? 'Загрузка...' : (inCart ? 'Товар в корзине' : 'В корзину')}
        </button>
    );
};