import { useTelegramData } from "../contexts/telegramContext";

export const Basket = () => {

    const telegramData = useTelegramData();

    return (
        <div className="flex flex-col justify-center items-center" style={{
            backgroundColor: telegramData.backgroundColor
        }}>
            <h1 style={{
                color: telegramData.textColor
            }} className="text-3xl font-bold mb-4">Корзина</h1>
            <p style={{
                color: telegramData.textColor
            }}>Ваши товары в корзине</p>
        </div>
    )
};
