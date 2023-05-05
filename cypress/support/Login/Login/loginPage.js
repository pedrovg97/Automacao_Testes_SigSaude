export class Login {

    acessarPagina(){
        cy.visit('http://localhost:8080/sigsaude/login');
    }

    preencherLogin(usuario, senha){
        cy.get('[name="username"]').type(usuario);
        cy.get('[name="password"]').type(senha);
        cy.get('[type="submit"]').click();
        cy.url().should('include', '/sigsaude/index')
    }


}

export default new Login();