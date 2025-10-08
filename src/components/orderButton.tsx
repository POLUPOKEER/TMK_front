import { useState } from 'react';
import { useTelegramData } from '../contexts/telegramContext';
import { API_CONFIG } from '../config/api';

// type OrderButtonProps = {
//     cb: () => {}
// }

export const OrderButton = () => {
    // const telegramData = useTelegramData();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateOrder = async () => {
        setLoading(true);
        setError(null);

        try {
            // Получаем данные из localStorage
            const savedData = localStorage.getItem('userProfile');

            if (!savedData) {
                setError('Заполните данные профиля');
                return;
            }

            const userData = JSON.parse(savedData);

            console.log(userData)

            // Проверяем, что все обязательные поля заполнены
            const requiredFields = ['userId', 'customerFirstName', 'customerSecondName', 'customerInn', 'phone', 'email', 'address'];
            const missingFields = requiredFields.filter(field => {
                const value = userData[field];
                // Для userId проверяем что это число и не 0
                if (field === 'userId') {
                    return !value || value === 0;
                }

                // Для строковых полей проверяем что не пустая строка
                return !value || String(value).trim() === '';
            });
            if (missingFields.length > 0) {
                setError('Заполните данные профиля');
                return;
            }

            // Формируем данные для отправки
            const orderData = {
                userId: userData.userId,
                customerLastName: userData.customerSecondName,
                inn: userData.customerInn,
                customerName: userData.customerFirstName,
                phone: userData.phone,
                email: userData.email,
                address: userData.address
            };

            // Отправляем запрос на сервер
            const response = await fetch(`${API_CONFIG.baseUrl}/api/Order/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error('Ошибка при создании заказа');
            }

            const result = await response.json();
            console.log('✅ Заказ создан:', result);

            // Можно добавить редирект или показ успешного сообщения
            alert('Заказ успешно создан!');
            window.location.reload();

        } catch (err) {
            console.error('❌ Ошибка создания заказа:', err);
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleCreateOrder}
                disabled={loading}
                className={`w-full bg-[#E35D14] text-white py-3 rounded-lg font-semibold hover:bg-[#d24f0d] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mb-[55px]`}
            >
                {loading ? 'Создание заказа...' : 'Оформить заказ'}
            </button>

            {error && (
                <div className="text-red-500 text-center mb-4">
                    {error}
                </div>
            )}
        </div>
    );
};