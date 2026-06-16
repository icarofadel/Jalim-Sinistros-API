import { useEffect, useState } from 'react'
import * as S from './styles'
import Botao from '../Button'

export const BuscarSinistro = ({
  onSelect,
  service
}: {
  onSelect: (dados: any) => void
  service: () => Promise<any[]>
}) => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    dataOcorrencia: '',
    notaFiscal: '',
    nomeCliente: '',
    segmento: '',
    motivo: '',
    valorMin: '',
    valorMax: '',
    status: '',
    responsavel1: ''
  })

  const [allSinistros, setAllSinistros] = useState<any[]>([])
  const [results, setResults] = useState<any[]>([])
  const [erro, setErro] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await service()
        setAllSinistros(data || [])
        setResults(data || [])
      } catch (e) {
        setErro('Erro ao carregar sinistros.')
      }
    }
    fetchAll()
  }, [service])

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    const res = allSinistros.filter((s) => {
      if (filters.dateFrom) {
        const from = new Date(filters.dateFrom)
        const d = new Date(s.dataOcorrencia)
        if (isNaN(d.getTime()) || d < from) return false
      }
      if (filters.dateTo) {
        const to = new Date(filters.dateTo)
        const d = new Date(s.dataOcorrencia)
        if (isNaN(d.getTime()) || d > to) return false
      }
      if (filters.dataOcorrencia && s.dataOcorrencia !== filters.dataOcorrencia)
        return false
      if (
        filters.notaFiscal &&
        !String(s.notaFiscal).includes(filters.notaFiscal)
      )
        return false
      if (
        filters.nomeCliente &&
        !String(s.nomeCliente || '')
          .toLowerCase()
          .includes(filters.nomeCliente.toLowerCase())
      )
        return false
      if (filters.segmento && s.segmento !== filters.segmento) return false
      if (filters.motivo && s.motivo !== filters.motivo) return false
      if (filters.valorMin) {
        const min = Number(filters.valorMin)
        if (isNaN(min) || (s.valorSinistro ?? 0) < min) return false
      }
      if (filters.valorMax) {
        const max = Number(filters.valorMax)
        if (isNaN(max) || (s.valorSinistro ?? 0) > max) return false
      }
      if (
        filters.status &&
        !String(s.status || '')
          .toLowerCase()
          .includes(filters.status.toLowerCase())
      )
        return false
      if (filters.responsavel1 && s.responsavel1 !== filters.responsavel1)
        return false
      return true
    })
    setResults(res)
    setPage(1)
  }

  const clearFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      dataOcorrencia: '',
      notaFiscal: '',
      nomeCliente: '',
      segmento: '',
      motivo: '',
      valorMin: '',
      valorMax: '',
      status: '',
      responsavel1: ''
    })
    setResults(allSinistros)
    setPage(1)
  }

  const handleSelect = (item: any) => {
    onSelect(item)
  }

  return (
    <>
      <S.TitleBuscar>
        <h2>Cadastro de Sinistro</h2>
        <Botao type="link" to={`/CadSinistro`} title="Cadastro de sinistro">
          + Novo sinistro
        </Botao>
      </S.TitleBuscar>

      <S.FilterGrid>
        <S.CamposBuscas>
          <label htmlFor="dateFrom">Data inicial</label>
          <S.Input
            name="dateFrom"
            type="date"
            value={filters.dateFrom}
            onChange={handleFilterChange}
            title="Data inicial"
          />
        </S.CamposBuscas>
        <S.CamposBuscas>
          <label htmlFor="dateTo">Data final</label>
          <S.Input
            name="dateTo"
            type="date"
            value={filters.dateTo}
            onChange={handleFilterChange}
            title="Data final"
          />
        </S.CamposBuscas>
        <S.CamposBuscas>
          <label htmlFor="notaFiscal">Nota Fiscal</label>
          <S.Input
            name="notaFiscal"
            type="text"
            value={filters.notaFiscal}
            onChange={handleFilterChange}
            placeholder="Nota Fiscal"
          />
        </S.CamposBuscas>
        <S.CamposBuscas>
          <label htmlFor="nomeCliente">Nome do cliente</label>
          <S.Input
            name="nomeCliente"
            type="text"
            value={filters.nomeCliente}
            onChange={handleFilterChange}
            placeholder="Nome do cliente"
          />
        </S.CamposBuscas>
        <S.CamposBuscas>
          <label htmlFor="segmento">Segmento</label>
          <S.Select
            name="segmento"
            value={filters.segmento}
            onChange={handleFilterChange}
          >
            <option value="">Todos os segmentos</option>
            <option value="Eletronico">Eletrônico</option>
            <option value="Farmaco">Farmaco</option>
            <option value="Alimenticio">Alimentício</option>
          </S.Select>
        </S.CamposBuscas>
        <S.CamposBuscas>
          <label htmlFor="motivo">Motivo</label>
          <S.Select
            name="motivo"
            value={filters.motivo}
            onChange={handleFilterChange}
          >
            <option value="">Todos os motivos</option>
            <option value="Avaria">Avaria</option>
            <option value="Roubo">Roubo</option>
            <option value="Extravio/Falta">Extravio/Falta</option>
            <option value="Acidente">Acidente</option>
            <option value="ViolacaoLacre">Violação de lacre</option>
            <option value="PercaTemperatura">Perda de temperatura</option>
          </S.Select>
        </S.CamposBuscas>
        <S.CamposBuscas>
          <label htmlFor="valorMin">Valor Mínimo</label>
          <S.Input
            name="valorMin"
            type="number"
            value={filters.valorMin}
            onChange={handleFilterChange}
            placeholder="Valor mínimo"
          />
        </S.CamposBuscas>
        <S.CamposBuscas>
          <label htmlFor="valorMax">Valor Máximo</label>
          <S.Input
            name="valorMax"
            type="number"
            value={filters.valorMax}
            onChange={handleFilterChange}
            placeholder="Valor máximo"
          />
        </S.CamposBuscas>
        <S.CamposBuscas>
          <label htmlFor="status">Status</label>
          <S.Input
            name="status"
            type="text"
            value={filters.status}
            onChange={handleFilterChange}
            placeholder="Status"
          />
        </S.CamposBuscas>
        <S.CamposBuscas>
          <label htmlFor="responsavel1">Responsável 1</label>
          <S.Select
            name="responsavel1"
            value={filters.responsavel1}
            onChange={handleFilterChange}
          >
            <option value="">Responsabilidades</option>
            <option value="SeguroProprio">Seguro Próprio</option>
            <option value="ImpactoIBL">Impacto IBL</option>
            <option value="ImpactoLogic">Impacto Logic</option>
            <option value="Parceiro/Agentes">Parceiro/Agentes</option>
            <option value="SeguroCliente">Seguro Cliente</option>
            <option value="Improcedente">Improcedente</option>
            <option value="EmAndamento">Em andamento</option>
          </S.Select>
        </S.CamposBuscas>
      </S.FilterGrid>

      <S.ButtonRow>
        <Botao type="button" title="Buscar" onClick={applyFilters}>
          Buscar
        </Botao>
        <Botao type="button" title="Limpar" onClick={clearFilters}>
          Limpar
        </Botao>
      </S.ButtonRow>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <S.TableWrapper>
        <S.Table>
          <thead>
            <tr>
              <th style={{ width: 110 }}>Data</th>
              <th style={{ width: 90 }}>NF</th>
              <th>Cliente</th>
              <th style={{ width: 120 }}>Segmento</th>
              <th style={{ width: 120 }}>Motivo</th>
              <th style={{ width: 110 }}>Valor</th>
              <th style={{ width: 140 }}>Status</th>
              <th style={{ width: 140 }}>Responsável</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              const total = results.length
              const startIdx = (page - 1) * pageSize
              const endIdx = Math.min(startIdx + pageSize, total)
              const paged = results.slice(startIdx, endIdx)
              return paged.map((r) => {
                const fmt = new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
                return (
                  <tr
                    key={r.id}
                    onClick={() => handleSelect(r)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{r.dataOcorrencia}</td>
                    <td>{r.notaFiscal}</td>
                    <td>{r.nomeCliente}</td>
                    <td>{r.segmento}</td>
                    <td>{r.motivo}</td>
                    <td>
                      {r.valorSinistro ? fmt.format(r.valorSinistro) : ''}
                    </td>
                    <td>{r.status}</td>
                    <td>{r.responsavel1}</td>
                  </tr>
                )
              })
            })()}
          </tbody>
        </S.Table>

        <S.PaginationRow>
          <S.PageInfo>
            {results.length === 0
              ? 'Nenhum resultado'
              : `Exibindo ${Math.min(
                  (page - 1) * pageSize + 1,
                  results.length
                )} - ${Math.min(page * pageSize, results.length)} de ${
                  results.length
                }`}
          </S.PageInfo>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <S.PageSizeSelect
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setPage(1)
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </S.PageSizeSelect>

            <S.PageButton
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Anterior
            </S.PageButton>

            <S.PageButton
              onClick={() => setPage((p) => p + 1)}
              disabled={page * pageSize >= results.length}
            >
              Próximo
            </S.PageButton>
          </div>
        </S.PaginationRow>
      </S.TableWrapper>
    </>
  )
}

export const BuscarSinistroModal = ({
  fechar,
  preencherFormulario,
  service
}: {
  fechar: () => void
  preencherFormulario: (dados: any) => void
  service: () => Promise<any[]>
}) => {
  const handleSelect = (item: any) => {
    preencherFormulario(item)
    fechar()
  }

  return (
    <S.ModalWrapper>
      <S.ModalContent>
        <BuscarSinistro onSelect={handleSelect} service={service} />
      </S.ModalContent>
    </S.ModalWrapper>
  )
}

export default BuscarSinistro
