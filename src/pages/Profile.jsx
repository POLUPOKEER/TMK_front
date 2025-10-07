import { useState } from "react";
import { useTelegramData } from "../contexts/telegramContext";

export const Profile = () => {
    const telegramData = useTelegramData();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь логика сохранения данных
        console.log("Данные сохранены:", formData);
        // Можно добавить отправку на сервер, сохранение в localStorage и т.д.
    };

    return (
        <div className="min-h-screen p-4">
            {/* Заголовок с временем (статичным как в дизайне) */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-orange-500 font-montserrat">ЛИЧНЫЙ КАБИНЕТ</h1>
            </div>

            {/* Форма */}
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                {/* Имя */}
                <div>
                    <label className="block text-orange-500/80 text-sm font-medium mb-2">
                        ВВЕДИТЕ ВАШЕ ИМЯ
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-orange-500/10 border border-orange-500/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-500/40 focus:border-orange-500/15 transition-colors"
                        placeholder="Введите ваше имя"
                    />
                </div>

                {/* Фамилия */}
                <div>
                    <label className="block text-orange-500/80 text-sm font-medium mb-2">
                        ВВЕДИТЕ ВАШУ ФАМИЛИЮ
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-orange-500/10 border border-orange-500/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-500/40 focus:border-orange-500/15 transition-colors"
                        placeholder="Введите вашу фамилию"
                    />
                </div>

                {/* Телефон */}
                <div>
                    <label className="block text-orange-500/80 text-sm font-medium mb-2">
                        ВВЕДИТЕ ВАШ НОМЕР ТЕЛЕФОНА
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-orange-500/10 border border-orange-500/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-500/40 focus:border-orange-500/15 transition-colors"
                        placeholder="+7 (XXX) XXX-XX-XX"
                    />
                </div>

                {/* Почта */}
                <div>
                    <label className="block text-orange-500/80 text-sm font-medium mb-2">
                        ВВЕДИТЕ ВАШУ ПОЧТУ
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-orange-500/10 border border-orange-500/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-500/40 focus:border-orange-500/15 transition-colors"
                        placeholder="example@mail.com"
                    />
                </div>

                {/* Кнопка сохранения */}
                <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#FE6400] to-[#FE9600] text-white font-semibold rounded-lg shadow-lg hover:from-[#FE6400]/90 hover:to-[#FE9600]/90 active:scale-95 transition-all duration-200"
                >
                    СОХРАНИТЬ
                </button>
            </form>
        </div>
    );
};