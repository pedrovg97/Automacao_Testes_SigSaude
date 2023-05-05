import { Login } from "../support/Login/Login/loginPage"
import { NovaEspecialidade } from "../support/Especialidade/Nova especialidade/novaEspecialidadePage"
import { NovaProfissao } from "../support/Profissão/Nova profissão/novaProfissaoPage"
import { credenciais } from "../fixtures/Dados/credenciais";
//import { especialidades } from "../fixtures/Dados/especialidades"
//import { profissaoEspecialidadeMap } from "../fixtures/Dados/profissaoEspecialidadeMap";

const LoginClass = new Login();
const ProfissaoClass = new NovaProfissao();
const EspecialidadeClass = new NovaEspecialidade();



describe('Automatização do cadastro de especialidades do sistema', () => {


  it('Criar nova especialidade', () => {

    LoginClass.acessarPagina();
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.usuarioPadrao["login"], fixture.usuarioPadrao["senha"]);
    });

    cy.fixture('especialidades.json').then((fixture) => {
      for (let i = 1; i < fixture.especialidades.length; i++) {
        EspecialidadeClass.acessaNovaEspecialidade(fixture.especialidades[i]);
      }
    });
  });
})