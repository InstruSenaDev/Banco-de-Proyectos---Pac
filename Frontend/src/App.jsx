import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Alcance from './Pages/Alcance'
import Dashboard from './Pages/Dashboard'
import Prueba from './Pages/Prueba'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <Dashboard/>
  {/* <Alcance/>  */}
    </>
  )
}

export default App
