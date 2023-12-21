import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Checkout from './Checkout'
import Success from './Success'

export default function App() {
  return (
  <BrowserRouter>
    <Routes>
    <Route path='/checkout' element={<Checkout/>} />
    <Route path='/success' element={<Success/>} />
    </Routes>
  </BrowserRouter>
  )
}
