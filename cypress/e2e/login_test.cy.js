import { Login } from "../support/Login/Login/loginPage"

const LoginClass = new Login();

describe('Teste de Login', () => {
  beforeEach(() => {
    LoginClass.acessarPagina();

  })

  it('Login com usuario padrao', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.usuarioPadrao.login, fixture.credenciais.usuarioPadrao.senha);
    })
  })

  it('Login com drnutrição', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drnutricao.login, fixture.credenciais.drnutricao.senha);
    })
  })

  it('Login com drpsicologia', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drpsicologia.login, fixture.credenciais.drpsicologia.senha);
    })
  })

  it('Login com drcardiologia', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drcardiologia.login, fixture.credenciais.drcardiologia.senha);
    })
  })

  it('Login com drginecologia', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drginecologia.login, fixture.credenciais.drginecologia.senha);
    })
  })

  it('Login com drobstetricia', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drobstetricia.login, fixture.credenciais.drobstetricia.senha);
    })
  })

  it('Login com drgeriatria', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drgeriatria.login, fixture.credenciais.drgeriatria.senha);
    })
  })

  it('Login com drfisiocri', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drfisiocri.login, fixture.credenciais.drfisiocri.senha);
    })
  })

  it('Login com drfisiovenosa', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drfisiovenosa.login, fixture.credenciais.drfisiovenosa.senha);
    })
  })

  it('Login com drendocrinologia', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drendocrinologia.login, fixture.credenciais.drendocrinologia.senha);
    })
  })

  it('Login com drfisioassoalpelvico', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drfisioassoalpelvico.login, fixture.credenciais.drfisioassoalpelvico.senha);
    })
  })

  it('Login com drfisioreu', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drfisioreu.login, fixture.credenciais.drfisioreu.senha);
    })
  })

  it('Login com drfisioarterialperif', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drfisioarterialperif.login, fixture.credenciais.drfisioarterialperif.senha);
    })
  })

  it('Login com drfisioorto', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drfisioorto.login, fixture.credenciais.drfisioorto.senha);
    })
  })

  it('Login com drfisiomastectomia', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drfisiomastectomia.login, fixture.credenciais.drfisiomastectomia.senha);
    })
  })

  it('Login com drfisiorespiratoria', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drfisiorespiratoria.login, fixture.credenciais.drfisiorespiratoria.senha);
    })
  })

  it('Login com drfisiodismenorreia', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drfisiodismenorreia.login, fixture.credenciais.drfisiodismenorreia.senha);
    })
  })

  it('Login com drfisioneuro', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drfisioneuro.login, fixture.credenciais.drfisioneuro.senha);
    })
  })

  it('Login com drfisiocardiologica', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.drfisiocardiologica.login, fixture.credenciais.drfisiocardiologica.senha);
    })
  })

  it('Login com draudiologia', () => {
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.draudiologia.login, fixture.credenciais.draudiologia.senha);
    })
  })

});