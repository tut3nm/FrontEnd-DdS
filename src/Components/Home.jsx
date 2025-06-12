import { useState } from 'react'
import '../styles/home.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>CMD Comparer</h1>
      <nav>
          <div className="top-buttoms">
            <button className='bot'>Home</button>
            <img src="home.svg" alt="home"/>
          </div>

          <div className="top-buttoms">
            <button className='bot'>Celulares</button>
            <img src="smartphone.svg" alt="" />
          </div>

          <div className="top-buttoms">
            <button className='bot'>Relojes</button>
            <img src="watch.svg" alt="" />
          </div>

          <div className="top-buttoms">
            <button className='bot'>Comparador</button>
            <img src="compare.svg" alt="" />
          </div>
      </nav>

      <main>
        
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

        <section>
          <h2>Relojes Destacados</h2>
          <div className="featured-products">
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


      </main>
      <footer>
        <p>© 2023 CMD Comparer. Todos los derechos reservados.</p>
      </footer>
    </>
  )
}

export default Home