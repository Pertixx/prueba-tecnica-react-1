import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { BlogProvider } from './context/BlogContext'

function App() {
  return (
    <BrowserRouter>
      <BlogProvider>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BlogProvider>
    </BrowserRouter>
  )
}

export default App
