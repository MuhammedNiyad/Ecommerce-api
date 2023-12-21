import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Checkout from './components/Checkout'
import Success from './components/Success'
 
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/checkout' element= {<Checkout />} />
        <Route path='/success' element={<Success />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
