import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { BlogProvider } from './context/BlogContext'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BlogProvider>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BlogProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
