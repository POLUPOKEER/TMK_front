import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './pages/App.tsx'
import { TelegramProvider } from './contexts/telegramContext.jsx'
import { store } from './services/store';
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <TelegramProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </TelegramProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
