import { Navigation } from '../components/navigation';
import { Products } from './Products';
import { Routes, Route } from 'react-router-dom'
import { Cart } from './Cart'
import { Profile } from "./Profile";
import { useTelegramData } from "../contexts/telegramContext";
import { NotFound } from './NotFound';

function App() {

  const telegramData = useTelegramData();

  return (
    <div className='flex flex-col justify-center' style={{
      backgroundColor: telegramData.backgroundColor
    }}>
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/home" element={<NotFound />} />
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
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
