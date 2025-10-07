// import { useTelegram } from "../hooks/useTelegram";

// import { useTelegramData } from "../contexts/telegramContext";

// const ProductList = () => {

//     const telegramData = useTelegramData();



//     const products = [
//         { id: 1, name: 'Товар 1', price: 100 },
//         { id: 2, name: 'Товар 2', price: 200 },
//         { id: 3, name: 'Товар 3', price: 300 }
//     ];

//     const handleBuy = (product) => {
//         console.log(`userID: ${telegramData.user.id}, userName: ${telegramData.user.first_name} product: ${product.id}, тест деплоя4`);
//     }

//     return (
//         <div style={{
//             padding: '16px',
//             width: "100%",
//             backgroundColor: telegramData.backgroundColor
//         }}>
//             <h2 style={{
//                 color: telegramData.textColor || '#000000',
//                 textAlign: 'center',
//                 marginBottom: '20px'
//             }}>
//                 Каталог товаров
//             </h2>

//             <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '12px',
//                 alignItems: 'center',
//             }}>
//                 {products.map(product => (
//                     <div key={product.id} style={{
//                         padding: '16px',
//                         borderRadius: '12px',
//                         backgroundColor: telegramData.secondaryBgColor || '#f8f8f8',
//                         border: `1px solid ${telegramData.hintColor || '#e0e0e0'}`,
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         width: "70%",
//                         maxWidth: "500px",
//                         minWidth: "300px"
//                     }}>
//                         <h3 style={{
//                             margin: '0 0 8px 0',
//                             color: `${telegramData.textColor || '#000000'}`,
//                             textAlign: 'center'
//                         }}>
//                             {product.name}
//                         </h3>
//                         <p style={{
//                             margin: '0 0 12px 0',
//                             color: telegramData.hintColor || '#666666',
//                             textAlign: 'center'
//                         }}>
//                             Цена: {product.price} руб.
//                         </p>
//                         <button
//                             onClick={() => handleBuy(product)}
//                             style={{
//                                 backgroundColor: telegramData.buttonColor || '#2481cc',
//                                 color: telegramData.buttonTextColor || '#ffffff',
//                                 border: 'none',
//                                 padding: '8px 16px',
//                                 borderRadius: '8px',
//                                 cursor: 'pointer',
//                                 width: '100%',
//                                 maxWidth: '200px'
//                             }}
//                         >
//                             Купить
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export { ProductList };

// src/components/ProductsList.tsx