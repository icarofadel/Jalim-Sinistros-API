import styled from 'styled-components'
import { cores } from '../../styles'

export const Container = styled.footer`
  background-color: ${cores.fundoPrincipal};
  color: ${cores.colorPrimaria};
  padding: 32px;
  width: 100%;

  div {
    display: flex;
    justify-content: center;
  }

  span {
    color: red;
    font-size: 16px;
  }
`
