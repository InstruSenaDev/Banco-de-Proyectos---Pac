import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Alcance from './Pages/Alcance.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Alcance/> */}
    <App />
  </StrictMode>,
)