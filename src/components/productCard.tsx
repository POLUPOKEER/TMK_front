import { useState, useMemo } from 'react'
import { Product } from '../services/types/products'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
    product: Product
}

const ProductCard = ({ product }: Props) => {
    const [expanded, setExpanded] = useState(false)
    const [unit, setUnit] = useState<'m' | 't'>('m') // единица измерения
    const [quantity, setQuantity] = useState(1)

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
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        −
                    </button>
                    <span className="min-w-[30px] text-center">{quantity}</span>
                    <button
                        onClick={() => setQuantity((q) => q + 1)}
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
                    onClick={() => setUnit((prev) => (prev === 'm' ? 't' : 'm'))}
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

                        <button className="mt-2 w-full bg-[#E35D14] text-white py-2 rounded-lg font-semibold hover:bg-[#d24f0d]">
                            В корзину
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export { ProductCard };