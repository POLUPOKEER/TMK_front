import { Header } from '../components/header';
import Products from "./Products";
import { Routes, Route } from 'react-router-dom'
import { Basket } from './Basket'
import { Profile } from "./Profile";
import { useTelegramData } from "../contexts/telegramContext";

function App() {

  const telegramData = useTelegramData();

  return (
    <div className='flex flex-col justify-center' style={{
      backgroundColor: telegramData.backgroundColor
    }}>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/basket" element={<Basket />} />
          {/* <Route path="/order" element={<Order />} /> */}

          {/* <Route path="/product" element={<Product />} /> */}
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>

    </div>
  )
}

export default App
