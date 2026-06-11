import styled from 'styled-components'
import { cores } from '../../styles'

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

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
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
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead th {
    position: sticky;
    top: 0;
    background: ${cores.fundoPrincipal};
    padding: 8px;
    font-weight: 600;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  tbody td {
    padding: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }
  tbody tr:hover {
    background: rgba(255, 255, 255, 0.03);
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
