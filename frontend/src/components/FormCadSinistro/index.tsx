// Pacotes externos
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { NumericFormat } from 'react-number-format'

// Estilos
import * as S from '../../styles'
import * as Ss from './styles'

// Componentes
import Botao from '../Button'
import { BuscarSinistroModal } from '../BuscarSinistroModal'
import voltarIcon from '../../assets/assets/icons8-esquerda-50.png'
import atualizarIcon from '../../assets/assets/icons8-save-50.png'
import imprimirIcon from '../../assets/assets/icons8-imprimir-50.png'
import excluirIcon from '../../assets/assets/icons8-lixo-50.png'
import pesquisarIcon from '../../assets/assets/icons8-search-50.png'

// Serviços
import {
  atualizarSinistro,
  buscarSinistroPorNF,
  buscarSinistros,
  cadastrarSinistro,
  excluirSinistro
} from '../../services/sinistroService'

const FormSinistro = () => {
  const [selected, setSelected] = useState<string | null>(null)
  const [modalAberto, setModalAberto] = useState(false)

  // Dados do formulário
  const [formData, setFormData] = useState({
    id: null as number | null,
    dataOcorrencia: '',
    notaFiscal: '',
    nomeCliente: '',
    segmento: '',
    motivo: '',
    valorSinistro: null as number | null,
    responsavel1: '',
    responsavel2: '',
    status: '',
    resumo: '',
    ciaAerea: false,
    motorista: false,
    entregueFinanceiro: false,
    dataEntrega: '',
    nomeCiaAerea: '',
    awb: '',
    nomeMotorista: '',
    cpf: '',
    placa: '',
    manifesto: '',
    local: ''
  })

  const handleCheckboxChange = (value: string) => {
    setSelected((prev) => (prev === value ? null : value))
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'id' ? (value ? Number(value) : '') : value // Converte idSinistro para número
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await cadastrarSinistro(formData) // Usa a função do service
      alert('Sinistro cadastrado com sucesso!')
      handleNewSinistro()
    } catch (error) {
      alert('Erro ao cadastrar sinistro')
    }
  }

  const handleDelete = async () => {
    if (!formData.id) {
      alert('Informe o ID do sinistro para excluir.')
      return
    }

    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este sinistro?'
    )
    if (!confirmar) return

    try {
      await excluirSinistro(Number(formData.id))
      alert('Sinistro excluído com sucesso')
      handleNewSinistro()
    } catch (error) {
      alert('Erro ao excluir sinistro')
      console.error(error)
    }
  }

  const handleAtualizarSinistro = async () => {
    if (!formData.id || isNaN(Number(formData.id))) {
      alert('Nenhum sinistro válido selecionado para atualizar.')
      return
    }

    try {
      await atualizarSinistro(Number(formData.id), formData)
      alert('Sinistro atualizado com sucesso!')
    } catch (error) {
      alert('Erro ao atualizar o sinistro.')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleNewSinistro = () => {
    setFormData({
      id: null,
      dataOcorrencia: '',
      notaFiscal: '',
      nomeCliente: '',
      segmento: '',
      motivo: '',
      valorSinistro: null as number | null,
      responsavel1: '',
      responsavel2: '',
      status: '',
      resumo: '',
      ciaAerea: false,
      motorista: false,
      entregueFinanceiro: false,
      dataEntrega: '',
      nomeCiaAerea: '',
      awb: '',
      nomeMotorista: '',
      cpf: '',
      placa: '',
      manifesto: '',
      local: ''
    })
  }

  const preencherFormulario = (dados: any) => {
    setFormData({
      id: dados.id,
      dataOcorrencia: dados.dataOcorrencia,
      notaFiscal: dados.notaFiscal,
      nomeCliente: dados.nomeCliente,
      segmento: dados.segmento,
      motivo: dados.motivo,
      valorSinistro: dados.valorSinistro,
      responsavel1: dados.responsavel1,
      responsavel2: dados.responsavel2,
      status: dados.status,
      resumo: dados.resumo,
      ciaAerea: dados.ciaAerea,
      motorista: dados.motorista,
      entregueFinanceiro: dados.entregueFinanceiro,
      dataEntrega: dados.dataEntrega,
      nomeCiaAerea: dados.nomeCiaAerea,
      awb: dados.awb,
      nomeMotorista: dados.nomeMotorista,
      cpf: dados.cpf,
      placa: dados.placa,
      manifesto: dados.manifesto,
      local: dados.local
    })
  }

  const [sinistroBuscado, setSinistroBuscado] = useState<
    typeof formData | null
  >(null)

  useEffect(() => {
    if (sinistroBuscado) {
      setFormData((prev) => ({
        ...prev,
        ...sinistroBuscado,
        ciaAerea: !!sinistroBuscado.ciaAerea,
        motorista: !!sinistroBuscado.motorista
      }))

      // Se ambos vierem como true, corrige para manter apenas um ativo
      if (sinistroBuscado.ciaAerea && sinistroBuscado.motorista) {
        setFormData((prev) => ({
          ...prev,
          motorista: false // Mantém apenas `ciaAerea` como true
        }))
      }

      // Define "selected" corretamente
      if (sinistroBuscado.ciaAerea) {
        setSelected('option1')
      } else if (sinistroBuscado.motorista) {
        setSelected('option2')
      } else {
        setSelected(null)
      }
    }
  }, [sinistroBuscado])

  return (
    <div>
      {modalAberto && (
        <BuscarSinistroModal
          fechar={() => setModalAberto(false)}
          preencherFormulario={preencherFormulario}
          service={buscarSinistros} // busca lista completa e filtra no modal
        />
      )}
      <form onSubmit={handleSubmit}>
        <Ss.Campo>
          <Botao
            type="button"
            title="Novo Sinistro"
            onClick={handleNewSinistro}
          >
            + Novo sinistro
          </Botao>
        </Ss.Campo>

        <S.CampoForm>
          <div>
            <Ss.Destaque>
              <S.Title>Informação do sinistro</S.Title>
              <S.Row>
                <S.TextLabel htmlFor="idSinistro">ID do Sinistro</S.TextLabel>
                <input
                  type="number"
                  name="id"
                  value={formData.id !== null ? formData.id : ''} // Evita NaN
                  onChange={(e) => {
                    const valor = e.target.value ? Number(e.target.value) : null
                    setFormData((prev) => ({ ...prev, id: valor }))
                  }}
                />
              </S.Row>
            </Ss.Destaque>
            <S.Linha />
            <Ss.DivCampos>
              <S.Row>
                <S.TextLabel htmlFor="DataOcorrencia">
                  Data da Ocorrência
                </S.TextLabel>
                <input
                  type="date"
                  name="dataOcorrencia"
                  value={formData.dataOcorrencia || ''}
                  onChange={handleInputChange}
                />
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="NF">Nota Fiscal</S.TextLabel>
                <input
                  type="number"
                  name="notaFiscal"
                  value={formData.notaFiscal || ''}
                  onChange={handleInputChange}
                />
              </S.Row>

              <S.Row>
                <S.TextLabel htmlFor="NomeCliente">Nome do cliente</S.TextLabel>
                <input
                  type="text"
                  name="nomeCliente"
                  value={formData.nomeCliente || ''}
                  onChange={handleInputChange}
                />
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="Segmento">Segmento</S.TextLabel>
                <select
                  name="segmento"
                  id="segmento"
                  value={formData.segmento || ''}
                  onChange={handleInputChange}
                >
                  <option value="Eletronico">Eletrônico</option>
                  <option value="Farmaco">Farmaco</option>
                  <option value="Alimenticio">Alimentício</option>
                </select>
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="Motivo">Motivo</S.TextLabel>
                <select
                  name="motivo"
                  id="motivo"
                  value={formData.motivo || ''}
                  onChange={handleInputChange}
                >
                  <option value="Avaria">Avaria</option>
                  <option value="Roubo">Roubo</option>
                  <option value="Extravio/Falta">Extravio/Falta</option>
                  <option value="Acidente">Acidente</option>
                  <option value="ViolacaoLacre">Violação de lacre</option>
                  <option value="PercaTemperatura">Perca de temperatura</option>
                </select>
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="ValorSinistro">
                  Valor do sinistro
                </S.TextLabel>
                <NumericFormat
                  name="valorSinistro"
                  value={formData.valorSinistro}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  decimalScale={2}
                  fixedDecimalScale
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { floatValue } = values
                    setFormData((prev) => ({
                      ...prev,
                      valorSinistro: floatValue ?? null
                    }))
                  }}
                  placeholder="R$ 0,00"
                />
              </S.Row>
            </Ss.DivCampos>
            <S.TitleSecundario>Responsabilidade</S.TitleSecundario>
            <S.Linha />
            <Ss.DivCamposResponsabilidade>
              <S.Row>
                <S.TextLabel htmlFor="Responsavel1">Responsável 1</S.TextLabel>
                <select
                  name="responsavel1"
                  value={formData.responsavel1 || ''}
                  onChange={handleInputChange}
                >
                  <option value="SeguroProprio">Seguro Próprio</option>
                  <option value="ImpactoIBL">Impacto IBL</option>
                  <option value="ImpactoLogic">Impacto Logic</option>
                  <option value="Parceiro/Agentes">Parceiro/Agentes</option>
                  <option value="SeguroCliente">Seguro Cliente</option>
                  <option value="Improcedente">Improcedente</option>
                  <option value="EmAndamento">Em andamento</option>
                </select>
              </S.Row>
              <S.Row>
                <S.TextLabel htmlFor="Responsavel2">Responsável 2</S.TextLabel>
                <input
                  type="text"
                  name="responsavel2"
                  value={formData.responsavel2 || ''}
                  onChange={handleInputChange}
                />
              </S.Row>
            </Ss.DivCamposResponsabilidade>
            <S.TitleSecundario>Andamento</S.TitleSecundario>
            <S.Linha />
            <div>
              <S.Row className="status">
                <S.TextLabel htmlFor="Status">Status</S.TextLabel>
                <textarea
                  name="status"
                  id="status"
                  value={formData.status || ''}
                  onChange={handleInputChange}
                ></textarea>
              </S.Row>
            </div>
            <S.TitleSecundario>Informações complementares</S.TitleSecundario>
            <S.Linha />
            <div>
              <S.Row className="resumo">
                <S.TextLabel htmlFor="CiaAerea">Cia. aérea</S.TextLabel>
                <input
                  type="checkbox"
                  name="ciaAerea"
                  checked={formData.ciaAerea}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ciaAerea: e.target.checked,
                      motorista: e.target.checked ? false : prev.motorista
                    }))
                  }
                />

                <S.TextLabel htmlFor="Motorista">Motorista</S.TextLabel>
                <input
                  type="checkbox"
                  name="motorista"
                  checked={formData.motorista}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      motorista: e.target.checked,
                      ciaAerea: e.target.checked ? false : prev.ciaAerea
                    }))
                  }
                />
              </S.Row>

              <div>
                {formData.ciaAerea && (
                  <>
                    <Ss.DivCampos>
                      <S.Row>
                        <S.TextLabel htmlFor="CiaArea">
                          Nome Cia. aérea
                        </S.TextLabel>
                        <input
                          type="text"
                          name="nomeCiaAerea"
                          value={formData.nomeCiaAerea || ''}
                          onChange={handleInputChange}
                        />
                      </S.Row>
                      <S.Row>
                        <S.TextLabel htmlFor="AWB">AWB</S.TextLabel>
                        <input
                          type="text"
                          name="awb"
                          value={formData.awb || ''}
                          onChange={handleInputChange}
                        />
                      </S.Row>
                    </Ss.DivCampos>
                  </>
                )}
                {formData.motorista && (
                  <>
                    <Ss.DivCampos>
                      <S.Row>
                        <S.TextLabel htmlFor="Motorista">Motorista</S.TextLabel>
                        <input
                          type="text"
                          name="nomeMotorista"
                          value={formData.nomeMotorista || ''}
                          onChange={handleInputChange}
                        />
                      </S.Row>
                      <S.Row>
                        <S.TextLabel htmlFor="cpf">CPF</S.TextLabel>
                        <InputMask
                          mask="999.999.999-99"
                          value={formData.cpf}
                          onChange={handleInputChange}
                        >
                          {(inputProps: any) => (
                            <input
                              {...inputProps}
                              type="text"
                              name="cpf"
                              id="cpf"
                            />
                          )}
                        </InputMask>
                      </S.Row>
                      <S.Row>
                        <S.TextLabel htmlFor="Placa">Placa</S.TextLabel>
                        <input
                          type="text"
                          name="placa"
                          value={formData.placa || ''}
                          onChange={handleInputChange}
                        />
                      </S.Row>
                      <S.Row>
                        <S.TextLabel htmlFor="Manifesto">Manifesto</S.TextLabel>
                        <input
                          type="number"
                          name="manifesto"
                          value={formData.manifesto || ''}
                          onChange={handleInputChange}
                        />
                      </S.Row>
                      <S.Row>
                        <S.TextLabel htmlFor="Local">Local</S.TextLabel>
                        <input
                          type="text"
                          name="local"
                          value={formData.local || ''}
                          onChange={handleInputChange}
                        />
                      </S.Row>
                    </Ss.DivCampos>
                  </>
                )}
              </div>
            </div>
            <S.TitleSecundario>Finalização</S.TitleSecundario>
            <S.Linha />
            <div>
              <S.Row>
                <S.TextLabel htmlFor="EntregueFinanceiro">
                  Entregue no Financeiro?
                </S.TextLabel>
                <input
                  type="checkbox"
                  name="entregueFinanceiro"
                  checked={formData.entregueFinanceiro}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      entregueFinanceiro: e.target.checked
                    })
                  }
                />
              </S.Row>
              <Ss.DivCampos>
                <S.Row>
                  <S.TextLabel htmlFor="DataEntrega">
                    Data da entrega
                  </S.TextLabel>
                  <input
                    type="date"
                    name="dataEntrega"
                    value={formData.dataEntrega || ''}
                    onChange={handleInputChange}
                  />
                </S.Row>
              </Ss.DivCampos>
            </div>{' '}
            <S.CampoButtons>
              {formData.id && (
                <Botao
                  type="button"
                  onClick={handleAtualizarSinistro}
                  title={'Atualizar Sinistro'}
                >
                  <>
                    <img
                      src={atualizarIcon}
                      alt="Atualizar"
                      style={{ width: 18, marginRight: 6 }}
                    />
                    Atualizar
                  </>
                </Botao>
              )}

              <Botao
                type="button"
                title="Buscar"
                onClick={() => setModalAberto(true)}
              >
                <>
                  <img
                    src={pesquisarIcon}
                    alt="Buscar"
                    style={{ width: 18, marginRight: 6 }}
                  />
                  Buscar
                </>
              </Botao>

              <Botao type="button" title="Imprimir" onClick={handlePrint}>
                <>
                  <img
                    src={imprimirIcon}
                    alt="Imprimir"
                    style={{ width: 18, marginRight: 6 }}
                  />
                  Imprimir
                </>
              </Botao>

              <Botao
                type="button"
                title="Excluir"
                onClick={handleDelete}
                className="botaoFechar"
              >
                <>
                  <img
                    src={excluirIcon}
                    alt="Excluir"
                    style={{ width: 18, marginRight: 6 }}
                  />
                  Excluir
                </>
              </Botao>

              <Botao
                type="link"
                to={`/`}
                title="Fechar"
                className="botaoFechar"
              >
                <>
                  <img
                    src={voltarIcon}
                    alt="Voltar"
                    style={{ width: 18, marginRight: 6 }}
                  />
                  Voltar
                </>
              </Botao>
            </S.CampoButtons>
          </div>
        </S.CampoForm>
      </form>
    </div>
  )
}

export default FormSinistro
