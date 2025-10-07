import { useTelegramData } from "../contexts/telegramContext";

export const Profile = () => {

    const telegramData = useTelegramData()

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 style={{
                color: telegramData.textColor
            }} className="text-3xl font-bold mb-4">Профиль</h1>
            <p style={{
                color: telegramData.textColor
            }}>Имя - {telegramData.user ? telegramData.user.first_name : "Гость"}</p>
            <p style={{
                color: telegramData.textColor
            }}>Фамилия - {telegramData.user ? telegramData.user.last_name : "Гость"}</p>

            <button style={{
                color: telegramData.buttonTextColor,
                backgroundColor: telegramData.buttonColor
            }}>Ввести данные для покупки товаров</button>
        </div>
    )
};