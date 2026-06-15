import { BrowserRouter } from 'react-router-dom'

import { GlobalCss } from './styles'

import Header from './components/Header'
import Footer from './components/Footer'
import Rotas from './routes'

function App() {
  return (
    <BrowserRouter>
      <GlobalCss />
      <Header />
      <div className="fundo">
        <div className="container">
          <Rotas />
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
