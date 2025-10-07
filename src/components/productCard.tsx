import { useState, useMemo } from 'react'
import { Product } from '../services/types/products'
import { motion, AnimatePresence } from 'framer-motion'
import { InCartBtn } from './inCartBtn'

type Props = {
    product: Product
    initialQuantity?: number
    initialUnit?: 'm' | 't'
    showCartButton?: boolean
}

const ProductCard = ({
    product,
    initialQuantity = 1,
    initialUnit = 'm',
    showCartButton = true
}: Props) => {
    const [expanded, setExpanded] = useState(false)
    const [unit, setUnit] = useState<'m' | 't'>(initialUnit)
    const [quantity, setQuantity] = useState(initialQuantity)

    // Берём первую цену (например, Екатеринбург)
    const priceInfo = product.prices[0]

    // Вычисляем текущую цену в зависимости от количества и лимитов
    const currentPrice = useMemo(() => {
        if (unit === 'm') {
            if (quantity >= priceInfo.priceLimitM2) return priceInfo.priceM2
            if (quantity >= priceInfo.priceLimitM1) return priceInfo.priceM1
            return priceInfo.priceM
        } else {
            if (quantity >= priceInfo.priceLimitT2) return priceInfo.priceT2
            if (quantity >= priceInfo.priceLimitT1) return priceInfo.priceT1
            return priceInfo.priceT
        }
    }, [unit, quantity, priceInfo])

    const totalPrice = currentPrice * quantity

    // Функция для изменения количества
    const handleQuantityChange = (operation: 'increment' | 'decrement') => {
        setQuantity((prev) => {
            if (unit === 'm') {
                // Для метров: шаг 1
                return operation === 'increment' ? prev + 1 : Math.max(1, prev - 1)
            } else {
                // Для тонн: шаг 0.1
                const step = 0.1
                const newValue = operation === 'increment' ? prev + step : prev - step
                return Math.max(0.1, Number(newValue.toFixed(1)))
            }
        })
    }

    // Функция для переключения единиц измерения
    const handleUnitToggle = () => {
        setUnit((prev) => {
            const newUnit = prev === 'm' ? 't' : 'm'
            // Сбрасываем количество при переключении
            setQuantity(newUnit === 'm' ? 1 : 0.1)
            return newUnit
        })
    }

    return (
        <div className="bg-white p-4 shadow-md transition-all bg-gradient-to-r from-[#FE6400]/90 to-[#FE9600]/90">
            {/* Основная информация */}
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold mb-1">{product.productionType}</h3>
                    <p className="text-sm text-gray-700">
                        Диаметр: <span className="font-semibold">{product.diameter} мм</span>
                    </p>
                    <p className="text-sm text-gray-700">
                        Толщина стенки: <span className="font-semibold">{product.pipeWallThickness} мм</span>
                    </p>
                </div>

                {/* Блок цены */}
                <div className="text-right">
                    <p className="text-sm text-gray-600">Цена за {unit === 'm' ? 'метр' : 'тонну'}</p>
                    <p className="text-xl font-bold text-[#E35D14]">{currentPrice.toLocaleString()} ₽</p>
                </div>
            </div>

            {/* Количество и управление */}
            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleQuantityChange('decrement')}
                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        −
                    </button>
                    <span className="min-w-[30px] text-center">
                        {unit === 'm' ? quantity : quantity.toFixed(1)}
                    </span>
                    <button
                        onClick={() => handleQuantityChange('increment')}
                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        +
                    </button>
                </div>

                <p className="font-semibold">{totalPrice.toLocaleString()} ₽</p>
            </div>

            {/* Кнопки управления */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handleUnitToggle}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Перевести в {unit === 'm' ? 'тонны' : 'метры'}
                </button>

                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="text-sm text-blue-600 hover:underline"
                >
                    {expanded ? 'Скрыть' : 'Подробнее'}
                </button>
            </div>

            {/* Анимация раскрытия */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 border-t border-gray-300 pt-3 space-y-2"
                    >
                        <p className="text-sm">
                            <span className="font-semibold">Марка стали:</span> {product.steelGrade}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">Производитель:</span> {product.manufacturer}
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold">ГОСТ:</span> {product.gost}
                        </p>
                        <p className="text-sm text-green-600 font-semibold">В наличии на складе</p>

                        <InCartBtn
                            key={`in-cart-${product.id}-`}
                            product={product}
                            unit={unit}
                            quantity={quantity}
                            onCartChange={(inCart) => {
                                // Опциональный колбэк, если нужно реагировать на изменения
                                console.log('Статус корзины изменился:', inCart);
                            }}
                            showCartBtn={showCartButton}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export { ProductCard }