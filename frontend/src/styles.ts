import { createGlobalStyle, styled } from 'styled-components'

export const cores = {
  fundoPrincipal: '#F6FCFF',
  sidebar: '#0F172A',
  white: '#ffffff',
  destaque: '#D9D9D9',
  colorPrimaria: '#4D3EFC',
  corSecundária: '#64748B',
  sucesso: '#16A34A',
  exclusao: '#DC2626'
}

export const breakponints = {
  desktop: '1024px',
  tablet: '768px'
}

export const GlobalCss = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    background-color: ${cores.fundoPrincipal};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
  }

  .fundo{
    background-color: ${cores.fundoPrincipal};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .container {
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
  }
`

export const Title = styled.h3`
  color: ${cores.colorPrimaria};
  padding: 8px;
  font-size: 24px;
  font-weight: bold;
`
export const TitleSecundario = styled.span`
  color: ${cores.colorPrimaria};
  margin: 32px 0;
  font-weight: bold;
`

export const Row = styled.div`
  margin: 8px;

  &.status {
    display: flex;
    align-items: center;
  }

  input {
    margin: 8px 0;
    border-radius: 8px;
    padding: 3px;
    text-align: center;
  }

  select {
    margin: 8px;
    border-radius: 8px;
    padding: 3px;
  }
`

export const CampoForm = styled.div`
  color: ${cores.sidebar};
`

export const Linha = styled.div`
  border: 1px solid ${cores.sidebar};
`

export const TextLabel = styled.label`
  margin: 0 8px 0;
`
export const CampoButtons = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
  gap: 8px;

  @media (max-width: ${breakponints.tablet}){
    flex-direction: column;
    align-items: stretch;
  }
  }
`

export const Destaque = styled.div`
  display: flex;
  justify-content: space-between;
`
export const DivCampos = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  div {
    display: grid;
  }
`
