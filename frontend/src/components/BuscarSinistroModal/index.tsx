import { useEffect, useState } from 'react'
import * as S from './styles'
import Botao from '../Button'

export const BuscarSinistroModal = ({
  fechar,
  preencherFormulario,
  service
}: {
  fechar: () => void
  preencherFormulario: (dados: any) => void
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
      // data range
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
    preencherFormulario(item)
    fechar()
  }

  return (
    <S.ModalWrapper>
      <S.ModalContent>
        <h2>Buscar Sinistro</h2>

        <S.FilterGrid>
          <div>
            <label htmlFor="dateFrom">Data inicial</label>
            <input
              name="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              title="Data inicial"
            />
          </div>
          <input
            name="dateTo"
            type="date"
            value={filters.dateTo}
            onChange={handleFilterChange}
            title="Data final"
          />
          <input
            name="notaFiscal"
            type="text"
            value={filters.notaFiscal}
            onChange={handleFilterChange}
            placeholder="Nota Fiscal"
          />
          <input
            name="nomeCliente"
            type="text"
            value={filters.nomeCliente}
            onChange={handleFilterChange}
            placeholder="Nome do cliente"
          />
          <select
            name="segmento"
            value={filters.segmento}
            onChange={handleFilterChange}
          >
            <option value="">Todos os segmentos</option>
            <option value="Eletronico">Eletrônico</option>
            <option value="Farmaco">Farmaco</option>
            <option value="Alimenticio">Alimentício</option>
          </select>
          <select
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
          </select>
          <input
            name="valorMin"
            type="number"
            value={filters.valorMin}
            onChange={handleFilterChange}
            placeholder="Valor mínimo"
          />
          <input
            name="valorMax"
            type="number"
            value={filters.valorMax}
            onChange={handleFilterChange}
            placeholder="Valor máximo"
          />
          <input
            name="status"
            type="text"
            value={filters.status}
            onChange={handleFilterChange}
            placeholder="Status"
          />
          <select
            name="responsavel1"
            value={filters.responsavel1}
            onChange={handleFilterChange}
          >
            <option value="">Todas responsabilidades</option>
            <option value="SeguroProprio">Seguro Próprio</option>
            <option value="ImpactoIBL">Impacto IBL</option>
            <option value="ImpactoLogic">Impacto Logic</option>
            <option value="Parceiro/Agentes">Parceiro/Agentes</option>
            <option value="SeguroCliente">Seguro Cliente</option>
            <option value="Improcedente">Improcedente</option>
            <option value="EmAndamento">Em andamento</option>
          </select>
        </S.FilterGrid>

        <S.ButtonRow>
          <Botao type="button" title="Buscar" onClick={applyFilters}>
            Buscar
          </Botao>
          <Botao type="button" title="Limpar" onClick={clearFilters}>
            Limpar
          </Botao>
          <Botao
            onClick={fechar}
            type="button"
            title="Fechar"
            className="botaoFechar"
          >
            Fechar
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
      </S.ModalContent>
    </S.ModalWrapper>
  )
}
