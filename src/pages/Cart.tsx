import { useState, useEffect } from 'react';
import { useTelegramData } from "../contexts/telegramContext";
import { API_CONFIG } from '../config/api';
import { ProductCard } from '../components/productCard';
import { Product } from '../services/types/products';

// Типы для данных корзины
export type CartItem = {
    id: string;
    nomenclatureId: number;
    nomenclatureName: string;
    stockId: string;
    stockName: string;
    quantity: number;
    unit: 'm' | 't';
    unitPrice: number;
    priceTier: string;
    totalPrice: number;
}

export type CartResponse = {
    id: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    items: CartItem[];
}

export const Cart = () => {
    const telegramData = useTelegramData();
    const [cartData, setCartData] = useState<CartResponse | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userID = telegramData.user?.id || 112;

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                setLoading(true);

                // Получаем корзину
                const cartResponse = await fetch(`${API_CONFIG.baseUrl}/api/cart/${userID}`);
                if (!cartResponse.ok) {
                    throw new Error('Ошибка загрузки корзины');
                }

                const cartData: CartResponse = await cartResponse.json();
                setCartData(cartData);

                // Получаем полные данные товаров для отображения в карточках
                const productIds = cartData.items.map(item => item.nomenclatureId);
                if (productIds.length > 0) {
                    // Используем существующий endpoint каталога или создаем моковые данные
                    const productsResponse = await fetch(`${API_CONFIG.baseUrl}/api/Catalog`);
                    if (productsResponse.ok) {
                        const productsData: Product[] = await productsResponse.json();
                        setProducts(productsData);
                    }
                }

            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
                console.error('❌ Ошибка загрузки корзины:', err);
            } finally {
                setLoading(false);
            }
        };

        if (userID) {
            fetchCartData();
        }
    }, [userID]);

    // Функция для получения товара по ID
    const getProductById = (productId: number): Product | undefined => {
        return products.find(product => product.id === productId);
    };


    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen" style={{
                backgroundColor: telegramData.backgroundColor
            }}>
                <p style={{ color: telegramData.textColor }}>Загрузка корзины...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen" style={{
                backgroundColor: telegramData.backgroundColor
            }}>
                <p style={{ color: 'red' }}>Ошибка: {error}</p>
            </div>
        );
    }

    const cartItems = cartData?.items || [];

    return (
        <div className="min-h-screen p-4" style={{
            backgroundColor: telegramData.backgroundColor
        }}>
            <h1 style={{
                color: telegramData.textColor
            }} className="text-3xl font-bold mb-6 text-center">Корзина</h1>

            {cartItems.length === 0 ? (
                <p style={{ color: telegramData.textColor }} className="text-center text-lg">
                    Корзина пуста
                </p>
            ) : (
                <>
                    <div className="space-y-4 mb-6">
                        {cartItems.map((cartItem) => {
                            // Пытаемся найти полные данные товара
                            const product = getProductById(cartItem.nomenclatureId);




                            return (
                                <div key={cartItem.id} className="mb-4">
                                    <ProductCard
                                        product={product as Product}
                                        initialQuantity={cartItem.quantity}
                                        initialUnit={cartItem.unit}
                                        showCartButton={false}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Товаров:</span>
                                <span className="font-semibold">{cartItems.length} шт.</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Общая сумма:</span>
                                <span className="text-xl font-bold text-[#E35D14]">
                                    {cartItems.reduce((total, item) => total + item.totalPrice, 0).toLocaleString()} ₽
                                </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Обновлено:</span>
                                <span>{new Date(cartData!.updatedAt).toLocaleString('ru-RU')}</span>
                            </div>
                        </div>
                        <button className="w-full bg-[#E35D14] text-white py-3 rounded-lg font-semibold hover:bg-[#d24f0d] transition-colors">
                            Оформить заказ
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};