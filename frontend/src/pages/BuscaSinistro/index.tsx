import BuscarSinistro from '../../components/BuscarSinistroModal'
import { useNavigate } from 'react-router-dom'
import { buscarSinistros } from '../../services/sinistroService'

const BuscarSinistros = () => {
  const navigate = useNavigate()

  const handleSelect = (item: any) => {
    navigate('/CadSinistro', { state: { sinistro: item } })
  }

  return (
    <>
      <BuscarSinistro onSelect={handleSelect} service={buscarSinistros} />
    </>
  )
}

export default BuscarSinistros
