import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Alcance from './Pages/Alcance'
import Dashboard from './Pages/Dashboard'
import Prueba from './Pages/Prueba'
import Calificar from './Pages/Calificar'
import Detalle from './Pages/Detalle'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  {/* <Dashboard/> */}
   {/* <Alcance/>   */}
   <Calificar/>
   {/* <Detalle/> */}


    </>
  )
}

export default App
