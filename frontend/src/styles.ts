import { createGlobalStyle, styled } from 'styled-components'

export const cores = {
  fundoPrincipal: '#F8FAFC',
  sidebar: '#0F172A',
  white: '#fff',
  colorPrimaria: '#2563EB',
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
export const CampoForm = styled.div`
  color: ${cores.colorPrimaria};
`

export const Title = styled.h3`
  color: ${cores.colorPrimaria};
  padding: 8px;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
`
export const TitleSecundario = styled.span`
  color: ${cores.corSecundária};
  margin: 32px 0;
  font-weight: bold;
`

export const Row = styled.div`
  margin: 16px 0;

  &.status {
    display: flex;
    align-items: center;
  }

  input {
    border-radius: 8px;
    padding: 3px;
    text-align: center;
  }

  select {
    border-radius: 8px;
    padding: 3px;
  }
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
