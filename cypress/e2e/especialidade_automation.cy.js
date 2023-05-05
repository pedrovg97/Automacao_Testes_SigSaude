import { Login } from "../support/Login/Login/loginPage"
import { NovaEspecialidade } from "../support/Especialidade/Nova especialidade/novaEspecialidadePage"
import { NovaProfissao } from "../support/Profissão/Nova profissão/novaProfissaoPage"


const LoginClass = new Login();
const ProfissaoClass = new NovaProfissao();
const EspecialidadeClass = new NovaEspecialidade();



describe('Automatização do cadastro de especialidades do sistema', () => {


  it('Criar nova especialidade', () => {

    LoginClass.acessarPagina();
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.usuarioPadrao["login"], fixture.credenciais.usuarioPadrao["senha"]);
    });

    cy.fixture('especialidades.json').then((fixture) => {
      for (let i in fixture.especialidades) {
        EspecialidadeClass.acessaNovaEspecialidade(fixture.especialidades[i]);
      }
    });
  });
})