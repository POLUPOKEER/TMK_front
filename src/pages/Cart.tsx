import { useState, useEffect } from 'react';
import { useTelegramData } from "../contexts/telegramContext";
import { API_CONFIG } from '../config/api';
import { CartProductCard } from '../components/CartProductCard';
import { Product } from '../services/types/products';
import { OrderButton } from '../components/orderButton';


// Типы корзины
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

                const cartResponse = await fetch(`${API_CONFIG.baseUrl}/api/cart/${userID}`);
                if (!cartResponse.ok) throw new Error('Ошибка загрузки корзины');
                const cartData: CartResponse = await cartResponse.json();
                setCartData(cartData);

                // Загружаем все товары (для получения информации о номенклатуре)
                const productsResponse = await fetch(`${API_CONFIG.baseUrl}/api/Catalog`);
                if (productsResponse.ok) {
                    const productsData: Product[] = await productsResponse.json();
                    setProducts(productsData);
                }

            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
                console.error('❌ Ошибка загрузки корзины:', err);
            } finally {
                setLoading(false);
            }
        };

        if (userID) fetchCartData();
    }, [userID]);

    const getProductById = (productId: number): Product | undefined => {
        return products.find(product => product.id === productId);
    };

    // 🔸 Заглушка: Сохранение изменений
    const handleSaveChanges = (cartItemId: string, updated: { quantity: number; unit: 'm' | 't' }) => {
        console.log('💾 Сохранить изменения:', { cartItemId, ...updated });
        // TODO: здесь будет запрос PATCH /api/cart/item/:id
    };

    // 🔸 Заглушка: Удаление из корзины
    const handleDeleteItem = async (cartItemId: string) => {
        console.log('🗑 Удалить из корзины:', cartItemId);
        const response = await fetch(`${API_CONFIG.baseUrl}/api/cart/remove/${cartItemId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Ошибка удаления: ${response.status}`);
        }
        if (response.ok) {
            window.location.reload();
        }

        return await response.json();
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
                            const product = getProductById(cartItem.nomenclatureId);
                            if (!product) return null; // Пропускаем, если данные не найдены

                            return (
                                <div key={cartItem.id} className="mb-4">
                                    <CartProductCard
                                        product={product}
                                        initialQuantity={cartItem.quantity}
                                        initialUnit={cartItem.unit}
                                        onSave={(updated) => handleSaveChanges(cartItem.id, updated)}
                                        onDelete={() => handleDeleteItem(cartItem.id)}
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
                        <OrderButton />
                    </div>
                </>
            )}
        </div>
    );
};
