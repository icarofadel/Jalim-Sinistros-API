import styled from 'styled-components'
import { breakponints, cores } from '../../styles'

export const HeaderBar = styled.header`
  background-color: ${cores.fundoPrincipal};
  color: ${cores.colorPrimaria};

  div {
    display: flex;
    padding: 0 16px;
    align-items: center;
    justify-content: space-between;
  }

  img {
    width: 180px;
    height: 100%;
    margin: 0 8px;
  }

  h1 {
    font-size: 24px;

    @media (max-width: ${breakponints.tablet}) {
      display: none;
    }
  }
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  position: relative;
  gap: 8px;
`

export const Tab = styled.button`
  background: transparent;
  color: ${cores.colorPrimaria};
  border: none;
  font-size: 16px;
  padding: 12px 16px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 8px;

  &:hover {
    background: ${cores.colorPrimaria};
    color: ${cores.white};
  }
`

export const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  display: flex;
  flex-direction: column;
  background: ${cores.destaque};
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  z-index: 50;

  a,
  button {
    margin: 4px 8px;
    padding: 8px 12px;
    background: ${cores.destaque};
    color: ${cores.colorPrimaria};

    &:hover {
      background: ${cores.colorPrimaria};
      color: ${cores.white};
    }
  }
`

export const TabWrapper = styled.div`
  position: relative;
  display: inline-block;
`
