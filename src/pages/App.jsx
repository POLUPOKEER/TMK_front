import '../index.css'
import { ProductList } from "../components/productList"
import { useTelegram } from "../hooks/useTelegram"


function App() {

  const { closeApp } = useTelegram();

  return (
    <div className='flex flex-col justify-center'>
      <ProductList />
      <button className="bg-amber-700 px-5 w-[200px] h-[55px] text-amber-50 font-bold rounded-lg hover:bg-amber-800 transition-colors self-center" onClick={closeApp}>Закрыть приложение</button>

    </div>
  )
}

export default App
