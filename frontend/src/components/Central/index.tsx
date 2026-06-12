import { exportarSinistrosExcelParceiro } from '../../services/sinistroParceiroService'
import { exportarSinistrosExcelSeguradora } from '../../services/sinistroSeguradoraService'
import { exportarSinistrosExcel } from '../../services/sinistroService'
import Botao from '../Button'
import * as S from './styles'

const Central = () => (
  <S.HomeSection>
    <S.ContainerButtons>
      <S.Column>
        <h2>Sinistros</h2>
        <S.ControlButtons>
          <Botao type="link" to={`/CadSinistro`} title="Cadastro de sinistro">
            Cadastrar sinistro
          </Botao>
          <Botao type="link" to={`/CadSinistro`} title="Consultar de sinistro">
            Consultar sinistro
          </Botao>
        </S.ControlButtons>
      </S.Column>

      <S.Column>
        <h2>Parceiros</h2>
        <S.ControlButtons>
          <Botao type="link" to={`/CadParceiro`} title="Cadastro de parceiro">
            Cadastrar NC parceiro
          </Botao>
          <Botao type="link" to={`/ConsParceiro`} title="Consultar de parceiro">
            Consultar NC parceiro
          </Botao>
        </S.ControlButtons>
      </S.Column>

      <S.Column>
        <h2>Seguradora</h2>
        <S.ControlButtons>
          <Botao
            type="link"
            to={`/CadSeguradora`}
            title="Cadastro de seguradora"
          >
            Cadastrar seguradora
          </Botao>
          <Botao
            type="link"
            to={`/ConsSeguradora`}
            title="Consultar de seguradora"
          >
            Consultar seguradora
          </Botao>
        </S.ControlButtons>
      </S.Column>
    </S.ContainerButtons>

    <h3>Relatórios</h3>
    <S.ContainerRelatorio>
      <div>
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
          Relatório de sinistro na seguradora
        </Botao>
      </div>
    </S.ContainerRelatorio>
  </S.HomeSection>
)

export default Central
