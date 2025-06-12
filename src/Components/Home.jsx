import { useState } from 'react'
import '../styles/home.css'


function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>CMD Comparer</h1>
      <nav>
          <div className="top-buttoms">
            <button className='bot'>
              <img src="src/assets/home.svg" alt="home"/>
              Home
              </button>
            
          </div>

          <div className="top-buttoms">
            <button className='bot'>
              <img src="src/assets/smartphone.svg" alt="phone" />
              Celulares
              </button>
            
          </div>

          <div className="top-buttoms">
            <button className='bot'>
              <img src="src/assets/watch.svg" alt="watch" />
              Relojes
              </button>
          </div>

          <div className="top-buttoms">
            <button className='bot'>
              <img src="src/assets/compare.svg" alt="compare" />
              Comparar
              </button>
          </div>
      </nav>

      <div className='mainfavs'>
        
        <section className="fav">
          <h2>Telefonos favoritos</h2>
          <div className="fav-items">
            <div className="fav-item">
              <img src="" alt="Producto favorito" />
              <p>Producto 1</p>
            </div>
            <div className="fav-item">
              <img src="" alt="Producto favorito" />
              <p>Producto 2</p>
            </div>
            <div className="fav-item">
              <img src="" alt="Producto favorito" />
              <p>Producto 3</p>
            </div>
          </div>
        </section>

        <section className='fav'>
          <h2>Relojes Destacados</h2>
          <div className="fav-items">
            <div className="product">
              <img src="" alt="Producto destacado" />
              <p>Producto A</p>
            </div>
            <div className="product">
              <img src="" alt="Producto destacado" />
              <p>Producto B</p>
            </div>
            <div className="product">
              <img src="" alt="Producto destacado" />
              <p>Producto C</p>
            </div>
          </div>
        </section>


      </div>
      <footer>
        <p>© 2023 CMD Comparer. Todos los derechos reservados.</p>
      </footer>
    </>
  )
}

export default Home