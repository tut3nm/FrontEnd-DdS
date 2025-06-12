import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>CMD Comparer</h1>
      <nav>
          <div className="top-buttoms">
            <button>Home</button>
            <img src="" alt="" />
          </div>

          <div className="top-buttoms">
            <button>Celulares</button>
            <img src="" alt="" />
          </div>

          <div className="top-buttoms">
            <button>Relojes</button>
            <img src="" alt="" />
          </div>

          <div className="top-buttoms">
            <button>Comparador</button>
            <img src="" alt="" />
          </div>
      </nav>

      <main>
        <h2>Comparador de celulares y relojes</h2>
        <p>Selecciona dos productos para comparar sus características</p>
        <div className="comparador">
          <div className="producto">
            <h3>Producto 1</h3>
            <button>Seleccionar</button>
          </div>
          <div className="producto">
            <h3>Producto 2</h3>
            <button>Seleccionar</button>
          </div>
        </div>
        <div className="resultado">
          <h3>Resultados de la comparación</h3>
          <p>Aquí se mostrarán las características comparadas.</p>
          <button>Comparar</button>
        </div>
      </main>
      <footer>
        <p>© 2023 CMD Comparer. Todos los derechos reservados.</p>
      </footer>
    </>
  )
}

export default App
