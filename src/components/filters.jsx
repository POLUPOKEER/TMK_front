import { useState } from 'react';

const PipeFilter = () => {
    // Состояния для фильтров
    const [filters, setFilters] = useState({
        diameterFrom: '',
        diameterTo: '',
        thicknessFrom: '',
        thicknessTo: '',
        steelGrade: '',
        standard: '',
        manufacturer: ''
    });

    // Обработчик изменения полей ввода
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Отправка фильтров на сервер
    const applyFilters = async () => {
        try {
            // Создаем объект с параметрами для URL
            const params = new URLSearchParams();
            
            // Добавляем только заполненные параметры
            if (filters.diameterFrom) params.append('diameterMin', filters.diameterFrom);
            if (filters.diameterTo) params.append('diameterMax', filters.diameterTo);
            if (filters.thicknessFrom) params.append('thicknessMin', filters.thicknessFrom);
            if (filters.thicknessTo) params.append('thicknessMax', filters.thicknessTo);
            if (filters.steelGrade) params.append('steelGrade', filters.steelGrade);
            if (filters.standard) params.append('standard', filters.standard);
            if (filters.manufacturer) params.append('manufacturer', filters.manufacturer);
    
            // Формируем URL с параметрами
            const url = `/api/Catalog${params.toString() ? `?${params.toString()}` : ''}`;
    
            console.log('Отправляем запрос на:', url);
    
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log('Результаты фильтрации:', result);
            
            // Обрабатываем результат
            // setFilteredPipes(result);
    
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при применении фильтров');
        }
    };

    // Сброс фильтров
    const resetFilters = () => {
        setFilters({
            diameterFrom: '',
            diameterTo: '',
            thicknessFrom: '',
            thicknessTo: '',
            steelGrade: '',
            standard: '',
            manufacturer: ''
        });
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Фильтр труб</h1>
            
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                {/* ДИАМЕТР */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">ДИАМЕТР</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">ОТ</label>
                            <input
                                type="number"
                                name="diameterFrom"
                                value={filters.diameterFrom}
                                onChange={handleInputChange}
                                placeholder="мм"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">ДО</label>
                            <input
                                type="number"
                                name="diameterTo"
                                value={filters.diameterTo}
                                onChange={handleInputChange}
                                placeholder="мм"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>
                </div>

                {/* ТОЛЩИНА СТЕНКИ */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">ТОЛЩИНА СТЕНКИ</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">ОТ</label>
                            <input
                                type="number"
                                name="thicknessFrom"
                                value={filters.thicknessFrom}
                                onChange={handleInputChange}
                                placeholder="мм"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">ДО</label>
                            <input
                                type="number"
                                name="thicknessTo"
                                value={filters.thicknessTo}
                                onChange={handleInputChange}
                                placeholder="мм"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>
                </div>

                {/* МАРКА СТАЛИ */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">МАРКА СТАЛИ</h3>
                    <input
                        type="text"
                        name="steelGrade"
                        value={filters.steelGrade}
                        onChange={handleInputChange}
                        placeholder="Например: СинТЗ"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                </div>

                {/* ГОСТ */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">ГОСТ</h3>
                    <input
                        type="text"
                        name="standard"
                        value={filters.standard}
                        onChange={handleInputChange}
                        placeholder="Например: ТУ 14-162-68-2000"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                </div>

                {/* ПРОИЗВОДИТЕЛЬ */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">ПРОИЗВОДИТЕЛЬ</h3>
                    <input
                        type="text"
                        name="manufacturer"
                        value={filters.manufacturer}
                        onChange={handleInputChange}
                        placeholder="Название производителя"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                </div>

                {/* Кнопки действий */}
                <div className="flex gap-3 pt-4">
                    <button
                        onClick={applyFilters}
                        className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-md"
                    >
                        ПРИМЕНИТЬ ФИЛЬТРЫ
                    </button>
                    <button
                        onClick={resetFilters}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                        Сбросить
                    </button>
                </div>
            </div>
        </div>
    );
};

export { PipeFilter };