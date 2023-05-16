export class Login {

    acessarPaginaLogin(){
        cy.fixture('url.json').then((fixture) => {
            cy.visit(fixture.paginas.paginaLoginLocalHost);
            cy.url().should('include', '/sigsaude/login')
        })
        
    }

    preencherLogin(usuario, senha){
        cy.get('[name="username"]').type(usuario);
        cy.get('[name="password"]').type(senha);
        cy.get('[type="submit"]').click();
        cy.url().should('include', '/sigsaude/index')
    }


}

export default new Login();