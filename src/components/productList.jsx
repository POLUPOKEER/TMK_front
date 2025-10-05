import { useTelegram } from "../hooks/useTelegram";

const ProductList = () => {
    const { tg, user, } = useTelegram();

    const products = [
        { id: 1, name: 'Товар 1', price: 100 },
        { id: 2, name: 'Товар 2', price: 200 },
        { id: 3, name: 'Товар 3', price: 300 }
    ];

    const handleBuy = (product) => {
        console.log(`user: ${user}, product: ${product.id}`);
    }

    return (
        <div style={{
            padding: '16px',
            backgroundColor: tg?.themeParams?.bg_color || '#ffffff'
        }}>
            <h2 style={{ color: tg?.themeParams?.text_color || '#000000' }}>
                Каталог товаров
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {products.map(product => (
                    <div key={product.id} style={{
                        padding: '16px',
                        borderRadius: '12px',
                        backgroundColor: tg?.themeParams?.secondary_bg_color || '#f8f8f8',
                        border: `1px solid ${tg?.themeParams?.hint_color || '#e0e0e0'}`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <h3 style={{
                            margin: '0 0 8px 0',
                            color: tg?.themeParams?.text_color || '#000000'
                        }}>
                            {product.name}
                        </h3>
                        <p style={{
                            margin: '0 0 12px 0',
                            color: tg?.themeParams?.hint_color || '#666666'
                        }}>
                            Цена: {product.price} руб.
                        </p>
                        <button
                            onClick={() => handleBuy(product)}
                            style={{
                                backgroundColor: tg?.themeParams?.button_color || '#2481cc',
                                color: tg?.themeParams?.button_text_color || '#ffffff',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            Купить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { ProductList };