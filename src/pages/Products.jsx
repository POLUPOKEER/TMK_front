import { ProductsList } from '../components/productList';
import { useTelegramData } from '../contexts/telegramContext';

const Products = () => {

    const telegramData = useTelegramData();

    return (
        <div className=' flex flex-col justify-center items-center pb-10' style={{
            backgroundColor: telegramData.backgroundColor || '#ffffff'
        }}>
            <ProductsList />
            <button
                className="bg-amber-700 px-5 w-[200px] h-[55px] text-amber-50 font-bold rounded-lg hover:bg-amber-800 transition-colors mt-4 mb-20"
                onClick={telegramData.closeApp}
            >
                Закрыть приложение
            </button>
        </div>
    )
}

export default Products