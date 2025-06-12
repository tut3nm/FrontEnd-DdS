import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Components/Home';

function AppContent() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  )
}

function App(){
  return(
    <Router>
      <AppContent/>
    </Router>
  )
}
export default App
