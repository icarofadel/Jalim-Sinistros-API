import { useState, useRef, useEffect } from 'react'
import * as S from './styles'
import logo from '../../assets/assets/FadelSeg/fadelseg.png'
import risk from '../../assets/image/Logo.png'
import Botao from '../Button'
import { exportarSinistrosExcel } from '../../services/sinistroService'
import { exportarSinistrosExcelParceiro } from '../../services/sinistroParceiroService'
import { exportarSinistrosExcelSeguradora } from '../../services/sinistroSeguradoraService'

const Header = () => {
  const [open, setOpen] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)

  const toggle = (tab: string) => setOpen((prev) => (prev === tab ? null : tab))

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (navRef.current && !navRef.current.contains(target)) {
        setOpen(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <S.HeaderBar>
      <div>
        <div className="brand">
          <a href="/">
            <img src={logo} alt="Jalim Sistemas logo" />
          </a>
        </div>

        <S.Nav ref={navRef}>
          <S.TabWrapper>
            <S.Tab onClick={() => toggle('sinistro')}>Sinistro</S.Tab>
            {open === 'sinistro' && (
              <S.Dropdown>
                <Botao
                  type="link"
                  to={`/CadSinistro`}
                  title="Cadastro de sinistro"
                >
                  Cadastrar sinistro
                </Botao>
                <Botao
                  type="link"
                  to={`/CadSinistro`}
                  title="Consultar de sinistro"
                >
                  Consultar sinistro
                </Botao>
              </S.Dropdown>
            )}
          </S.TabWrapper>

          <S.TabWrapper>
            <S.Tab onClick={() => toggle('parceiro')}>Parceiro</S.Tab>
            {open === 'parceiro' && (
              <S.Dropdown>
                <Botao
                  type="link"
                  to={`/NcParceiro`}
                  title="Cadastro de parceiro"
                >
                  Cadastrar NC parceiro
                </Botao>
                <Botao
                  type="link"
                  to={`/NcParceiro`}
                  title="Consultar de parceiro"
                >
                  Consultar NC parceiro
                </Botao>
              </S.Dropdown>
            )}
          </S.TabWrapper>

          <S.TabWrapper>
            <S.Tab onClick={() => toggle('seguradora')}>Seguradora</S.Tab>
            {open === 'seguradora' && (
              <S.Dropdown>
                <Botao
                  type="link"
                  to={`/SiniSeguro`}
                  title="Cadastro de seguradora"
                >
                  Cadastrar seguradora
                </Botao>
                <Botao
                  type="link"
                  to={`/SiniSeguro`}
                  title="Consultar de seguradora"
                >
                  Consultar seguradora
                </Botao>
              </S.Dropdown>
            )}
          </S.TabWrapper>

          <S.TabWrapper>
            <S.Tab onClick={() => toggle('relatorios')}>Relatórios</S.Tab>
            {open === 'relatorios' && (
              <S.Dropdown>
                <Botao
                  type="button"
                  onClick={exportarSinistrosExcel}
                  title="Relatório de sinistros"
                >
                  Relatório de sinistros
                </Botao>
                <Botao
                  type="button"
                  onClick={exportarSinistrosExcelParceiro}
                  title="Relatório de NC Parceiro"
                >
                  Relatório de NC Parceiro
                </Botao>
                <Botao
                  type="button"
                  onClick={exportarSinistrosExcelSeguradora}
                  title="Relatório de sinistro na seguradora"
                >
                  Relatório seguradora
                </Botao>
              </S.Dropdown>
            )}
          </S.TabWrapper>
        </S.Nav>

        <div className="right">
          <img src={risk} alt="Servicos logo" />
        </div>
      </div>
    </S.HeaderBar>
  )
}

export default Header
