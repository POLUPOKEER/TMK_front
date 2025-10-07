import { Product } from "../services/types/products"
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
    product: Product
    initialQuantity: number
    initialUnit: 'm' | 't'
    onSave: (updated: { quantity: number; unit: 'm' | 't' }) => void
    onDelete: () => void
}

const CartProductCard = ({ product, initialQuantity, initialUnit, onSave, onDelete }: Props) => {
    const [expanded, setExpanded] = useState(false)
    const [unit, setUnit] = useState<'m' | 't'>(initialUnit)
    const [quantity, setQuantity] = useState(initialQuantity)

    const priceInfo = product.prices[0]

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

    const handleQuantityChange = (op: 'increment' | 'decrement') => {
        setQuantity(prev => {
            if (unit === 'm') {
                return op === 'increment' ? prev + 1 : Math.max(1, prev - 1)
            } else {
                const step = 0.1
                const newValue = op === 'increment' ? prev + step : prev - step
                return Math.max(0.1, Number(newValue.toFixed(1)))
            }
        })
    }

    const handleUnitToggle = () => {
        setUnit(prev => {
            const newUnit = prev === 'm' ? 't' : 'm'
            setQuantity(newUnit === 'm' ? 1 : 0.1)
            return newUnit
        })
    }

    return (
        <div className="bg-white rounded-2xl p-4 shadow-md transition-all">
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

                <div className="text-right">
                    <p className="text-sm text-gray-600">Цена за {unit === 'm' ? 'метр' : 'тонну'}</p>
                    <p className="text-xl font-bold text-[#E35D14]">{currentPrice.toLocaleString()} ₽</p>
                </div>
            </div>

            {/* Итоговая цена */}
            <div className="flex items-center justify-between mt-3">
                <p className="font-semibold">Сумма: {totalPrice.toLocaleString()} ₽</p>
                <button
                    onClick={() => setExpanded(prev => !prev)}
                    className="text-sm text-blue-600 hover:underline"
                >
                    {expanded ? 'Отмена' : 'Изменить'}
                </button>
            </div>

            {/* Блок редактирования */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 border-t border-gray-300 pt-3 space-y-3"
                    >
                        {/* Смена единиц измерения */}
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Единицы измерения:</span>
                            <button
                                onClick={handleUnitToggle}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Перевести в {unit === 'm' ? 'тонны' : 'метры'}
                            </button>
                        </div>

                        {/* Количество */}
                        <div className="flex items-center justify-between">
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
                            <span className="text-gray-700">Всего: {totalPrice.toLocaleString()} ₽</span>
                        </div>

                        {/* Действия */}
                        <div className="flex justify-between pt-3">
                            <button
                                onClick={() => onSave({ quantity, unit })}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                                💾 Сохранить изменения
                            </button>
                            <button
                                onClick={onDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                🗑 Удалить из корзины
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export { CartProductCard }