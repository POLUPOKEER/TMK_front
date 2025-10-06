import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import './index.css'
import App from './pages/App.jsx'
import { TelegramProvider } from './contexts/telegramContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TelegramProvider>
        <App />
      </TelegramProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
