import basket from '../assets/basket.svg';
import user from '../assets/user.svg'
import { Link, useLocation } from 'react-router-dom'


const Header = () => {

    const location = useLocation()

    return (
        <div className='flex justify-between items-center w-full px-4 py-3 bg-white shadow-sm'>
            <Link to={"/profile"} className='w-6 h-6 hover:opacity-80 transition-opacity cursor-pointer'>
                <img
                    src={user}
                    alt='пользователь'
                />
            </Link>


            {/* Логотип или заголовок по центру */}
            <Link to={"/products"}
                className={`hover:text-blue-500 transition-colors ${location.pathname === '/products' ? 'text-blue-500 font-semibold' : 'text-gray-600'
                    }`}> Продукты
            </Link>

            <Link to="/basket" className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                <img src={basket} alt='корзина' className='w-6 h-6' />
            </Link>
        </div>
    )
}

export { Header };