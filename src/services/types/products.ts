// Тип для цены товара
export type ProductPrice = {
    id: number;
    idStock: string;
    stockName: string;
    priceT: number;           // Цена за тонну
    priceLimitT1: number;     // Лимит для цены T1 (в долях или процентах)
    priceT1: number;          // Цена за тонну при лимите 1
    priceLimitT2: number;     // Лимит для цены T2
    priceT2: number;          // Цена за тонну при лимите 2
    priceM: number;           // Цена за метр
    priceLimitM1: number;     // Лимит для цены M1
    priceM1: number;          // Цена за метр при лимите 1
    priceLimitM2: number;     // Лимит для цены M2
    priceM2: number;          // Цена за метр при лимите 2
    nds: number;              // НДС (%)
}

// Тип для товара
export type Product = {
    id: number;
    name: string;
    gost: string;                    // ГОСТ/ТУ
    steelGrade: string;              // Марка стали
    diameter: number;                // Диаметр в мм
    pipeWallThickness: number;       // Толщина стенки в мм
    koef: number;                    // Коэффициент (вероятно для расчетов)
    manufacturer: string;            // Производитель
    productionType: string;          // Тип производства
    prices: ProductPrice[];          // Массив цен для разных складов
}

// Тип для массива товаров
export type Products = Product[];

// Дополнительные типы для работы с фильтрами
export type ProductFilters = {
    steelGrade?: string;
    diameter?: number;
    minWallThickness?: number;
    maxWallThickness?: number;
    manufacturer?: string;
    productionType?: string;
    gost?: string;
}

// Тип для пагинации
export type ProductsResponse = {
    products: Products;
    totalCount: number;
    page: number;
    pageSize: number;
    filters: ProductFilters;
}

export type CartItemData = {
    userId: number
    nomenclatureId: number
    stockId: string
    quantity: number
    unit: 'm' | 't'
}