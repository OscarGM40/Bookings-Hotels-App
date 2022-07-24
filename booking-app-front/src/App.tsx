import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './app.scss'
import Home from './pages/Home/Home'
import Hotel from './pages/Hotel/Hotel'
import List from './pages/List/List'
import LoginPage from './pages/login/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels/' element={<List />} />
        <Route path='/hotels/:id' element={<Hotel />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
