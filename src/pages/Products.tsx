import { useState } from 'react';
import { ProductsList } from '../components/productList';
import { useTelegramData } from '../contexts/telegramContext';
import { PipeFilter } from '../components/filters';

const Products = () => {
    const telegramData = useTelegramData();
    const [showFilters, setShowFilters] = useState(true);

    return (
        <div
            className="flex flex-col items-center pb-10 w-full"
            style={{
                backgroundColor: telegramData.backgroundColor || '#ffffff',
            }}
        >
            {/* Блок фильтров и кнопка */}
            <div className="w-full max-w-5xl flex flex-col items-start mt-6 px-4">
                <button
                    onClick={() => setShowFilters((prev) => !prev)}
                    className="bg-amber-700 px-4 py-2 text-amber-50 font-bold rounded-lg hover:bg-amber-800 transition-colors mb-4"
                >
                    {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
                </button>

                {showFilters && (
                    <div className="w-full">
                        <PipeFilter />
                    </div>
                )}
            </div>

            {/* Список товаров */}
            <div className={`transition-all duration-300 w-full max-w-6xl ${showFilters ? 'mt-4' : 'mt-10'}`}>
                <ProductsList />
            </div>

            {/* Кнопка закрытия */}
            <button
                className="bg-amber-700 px-5 w-[200px] h-[55px] text-amber-50 font-bold rounded-lg hover:bg-amber-800 transition-colors mt-10 mb-20"
                onClick={telegramData.closeApp}
            >
                Закрыть приложение
            </button>
        </div>
    );
};

export { Products };