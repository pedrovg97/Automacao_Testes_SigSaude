import { Login } from "../support/Login/Login/Login";
import { credenciais } from "../fixtures/Dados/credenciais";

const LoginClass = new Login();


describe('Teste do login', () => {



  it('Criar nova profissão', () => {


    for (const usuario in credenciais){
      LoginClass.acessarPagina();
      LoginClass.preencherLogin(credenciais[usuario].login, credenciais[usuario].senha);
    }

});
})