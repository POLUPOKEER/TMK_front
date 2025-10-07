import { Link, useLocation } from 'react-router-dom'
import home from '../assets/home.svg'
import catalog from '../assets/catalog.svg'
import cart from '../assets/cart.svg'
import user from '../assets/user.svg'

const Navigation = () => {
    const location = useLocation()

    const navItems = [
        { path: '/home', icon: home, alt: 'главная' },
        { path: '/products', icon: catalog, alt: 'каталог' },
        { path: '/cart', icon: cart, alt: 'корзина' },
        { path: '/profile', icon: user, alt: 'профиль' },
    ]

    return (
        <div className='flex justify-between items-center w-full px-[41px] py-[36px] bg-black h-[98px] fixed bottom-0 left-0 right-0 z-50'>
            {navItems.map(({ path, icon, alt }) => {
                const isActive = location.pathname.startsWith(path)

                return (
                    <Link
                        key={path}
                        to={path}
                        className='hover:opacity-80 transition-opacity cursor-pointer'
                    >
                        <div
                            className={`w-[40px] h-[40px] p-[8px] rounded-[4px] flex items-center justify-center ${isActive ? 'bg-white' : ''
                                }`} style={{ ...(path === '/home' && { paddingTop: '11px' }) }}
                        >
                            <img
                                src={icon}
                                alt={alt}
                                style={{
                                    filter: isActive
                                        ? 'invert(49%) sepia(91%) saturate(2284%) hue-rotate(355deg) brightness(95%) contrast(89%)'
                                        : 'invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg)',
                                    width: '24px',
                                    height: '24px',
                                }}
                            />
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}


export { Navigation };