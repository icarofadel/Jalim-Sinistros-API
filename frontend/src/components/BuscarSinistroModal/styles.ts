import styled from 'styled-components'
import { cores } from '../../styles'

export const TitleBuscar = styled.div`
  background: ${cores.destaque};
  color: ${cores.colorPrimaria};
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 400;
  }
`

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${cores.fundoPrincipal};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalContent = styled.div`
  background: ${cores.fundoPrincipal};
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espaço entre os elementos */
  color: ${cores.colorPrimaria};
`

export const CamposBuscas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid ${cores.sidebar};
  border-radius: 4px;
`

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: none;
  border-bottom: 1px solid ${cores.sidebar};
  border-radius: 4px;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px;
  margin-bottom: 8px;
`

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 6px;
`

export const TableWrapper = styled.div`
  max-height: 300px;
  overflow: auto;
  margin-top: 8px;
  background: ${cores.destaque};
  border-radius: 6px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  thead th {
    position: sticky;
    top: 0;
    color: ${cores.colorPrimaria};
    background: ${cores.destaque};
    z-index: 10; /* acima das linhas */
    padding: 8px;
    font-weight: 600;
    text-align: center;
    border-bottom: 2px solid ${cores.sidebar};
  }
  tbody td {
    padding: 8px;
    border-bottom: 1px solid ${cores.sidebar};
    background: transparent;
  }
  tbody tr:hover {
    background: ${cores.colorPrimaria};
  }
`

export const Small = styled.small`
  color: #cfcfcf;
  font-size: 12px;
`

export const PaginationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 8px 4px;
`

export const PageButton = styled.button`
  background: ${cores.colorPrimaria};
  color: ${cores.white};
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const PageInfo = styled.div`
  color: #d6d6d6;
  font-size: 13px;
`

export const PageSizeSelect = styled.select`
  padding: 6px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`
