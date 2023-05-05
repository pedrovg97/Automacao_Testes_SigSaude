import { Login } from "../support/Login/Login/loginPage"

const LoginClass = new Login();

describe('template spec', () => {

  it('passes', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      for (let i in fixture.credenciais) {
        LoginClass.acessarPagina();
        LoginClass.preencherLogin(fixture.credenciais[i].login, fixture.credenciais[i].senha);
      }
    });

  })
})
