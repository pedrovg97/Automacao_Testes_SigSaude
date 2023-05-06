import { Login } from "../support/Login/Login/loginPage"
import { NovaEspecialidade } from "../support/Especialidade/Nova especialidade/novaEspecialidadePage"
import { NovaProfissao } from "../support/Profissão/Nova profissão/novaProfissaoPage"

const LoginClass = new Login();
const ProfissaoClass = new NovaProfissao();
const EspecialidadeClass = new NovaEspecialidade();

describe('Teste do formulário de cadastro de especialidade', () => {

  const profissaoTeste = 'Cirurgião';
  const descricaoValida = 'Descrição teste';
  const descricaoInvalida = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
  const descricaoInvalidaValida = descricaoInvalida.substring(0, 200);
  let denominacaoValida;
  let denominacaoInvalida;
  let denominacaoInvalidaValida;

  beforeEach(() => {

    LoginClass.acessarPaginaLogin();
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.usuarioPadrao["login"], fixture.credenciais.usuarioPadrao["senha"]);
    });
    denominacaoValida = 'Denominação teste: ' + Math.random() * 1000;
    denominacaoInvalida = 'Denominação teste: ' + Math.random() * 1000 + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    denominacaoInvalidaValida = denominacaoInvalida.substring(0, 200);
    EspecialidadeClass.acessaPaginaEspecialidade()// Acessa a página do formulário

  })

  it('Deve apresentar erro ao submeter o formulário com os campos obrigatórios vazios', () => {
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoAparece(); // Verifica se a mensagem de erro é exibida
    EspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida

  })

  it('Deve apresentar erro ao submeter o formulário com os campos obrigatórios vazios e com descrição <= 200', () => {
    EspecialidadeClass.preencheDescricaoMenorQue200(descricaoValida); // Preenche a descrição com uma string <= 200.
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoAparece(); // Verifica se a mensagem de erro é exibida
    EspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    EspecialidadeClass.verificaDescricaoPosErro(descricaoValida); // Verifica se o campo descrição mantém os dados após o erro


  })

  it('Deve apresentar erro ao submeter o formulário com os campos obrigatórios vazios e com descrição > 200', () => {
    EspecialidadeClass.preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida);  // Preenche a descrição com uma string > 200 e verifica se o campo está registrando apenas os primeiros 200 caracteres.
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoAparece(); // Verifica se a mensagem de erro é exibida
    EspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    EspecialidadeClass.verificaDescricaoPosErro(descricaoInvalidaValida); // Verifica se o campo descrição mantém os dados após o erro


  })

  it('Deve apresentar erro ao submeter o formulário com denominação vazia, uma profissão válida e a descrição vazia', () => {
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoAparece(); // Verifica se a mensagem de erro é exibida
    EspecialidadeClass.verificaErroProfissaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    EspecialidadeClass.verificaProfissaoPosErro(profissaoTeste) // Verifica de o select profissão mantém os dados após o erro

  })

  it('Deve apresentar erro ao submeter o formulário com denominação vazia, uma profissão válida e a descrição <= 200 caracteres', () => {
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    EspecialidadeClass.preencheDescricaoMenorQue200(descricaoValida); // Preenche a descrição com uma string <= 200.
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoAparece(); // Verifica se a mensagem de erro é exibida
    EspecialidadeClass.verificaErroProfissaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    EspecialidadeClass.verificaProfissaoPosErro(profissaoTeste) // Verifica de o select profissão mantém os dados após o erro
    EspecialidadeClass.verificaDescricaoPosErro(descricaoValida); // Verifica se o campo descrição mantém os dados após o erro

  })

  it('Deve apresentar erro ao submeter o formulário com denominação vazia, uma profissão válida e a descrição > 200 caracteres', () => {
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    EspecialidadeClass.preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida); // Preenche a descrição com uma string > 200 e verifica se o campo está registrando apenas os primeiros 200 caracteres.
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoAparece(); // Verifica se a mensagem de erro é exibida
    EspecialidadeClass.verificaErroProfissaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    EspecialidadeClass.verificaProfissaoPosErro(profissaoTeste) // Verifica de o select profissão mantém os dados após o erro
    EspecialidadeClass.verificaDescricaoPosErro(descricaoInvalidaValida); // Verifica se o campo descrição mantém os dados após o erro

  })

  it('Não deve permitir a submissão do formulário com uma denominação <= 200, profissao e descrição vazios', () => {
    EspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    EspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    EspecialidadeClass.verificaDenominacaoPosErro(denominacaoValida); // Verifica se campo denominação mantém os dados após o ero

  })

  it('Não deve permitir a submissão do formulário com uma denominação <= 200, profissao vazia e descrição <= 200', () => {
    EspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    EspecialidadeClass.preencheDescricaoMenorQue200(descricaoValida); // Preenche a descrição com uma string <= 200.
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    EspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    EspecialidadeClass.verificaDenominacaoPosErro(denominacaoValida); // Verifica se campo denominação mantém os dados após o ero
    EspecialidadeClass.verificaDescricaoPosErro(descricaoValida); // Verifica se o campo descrição mantém os dados após o erro

  })

  it('Não deve permitir a submissão do formulário com uma denominação <= 200, profissão vazia  e uma descrição > 200', () => {
    EspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    EspecialidadeClass.preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida); // Preenche a descrição com uma string > 200 e verifica se o campo está registrando apenas os primeiros 200 caracteres.
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    EspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    EspecialidadeClass.verificaDenominacaoPosErro(denominacaoValida); // Verifica se campo denominação mantém os dados após o ero
    EspecialidadeClass.verificaDescricaoPosErro(descricaoInvalidaValida); // Verifica se o campo descrição mantém os dados após o erro

  })

  it('Deve permitir a submissão do formulário com uma denominação <= 200, uma profissão valida e uma descrição vazia.', () => {
    EspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaConfirmacaoEspecialidade(denominacaoValida, profissaoTeste, 'Não informado');

  })

  it('Deve permitir a submissão do formulário com uma denominação <= 200, uma profissão valida e uma descrição <= 200.', () => {
    EspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    EspecialidadeClass.preencheDescricaoMenorQue200(descricaoValida); // Preenche a descrição com uma string <= 200.
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaConfirmacaoEspecialidade(denominacaoValida, profissaoTeste, descricaoValida);

  })

  it('Deve permitir a submissão do formulário com uma denominação <= 200, uma profissão valida e uma descrição > 200, porem deve reduzir a descrição para 200 caracteres', () => {
    EspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    EspecialidadeClass.preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida); // Preenche a descrição com uma string > 200 e verifica se o campo está registrando apenas os primeiros 200 caracteres.
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaConfirmacaoEspecialidade(denominacaoValida, profissaoTeste, descricaoInvalidaValida);

  })

  it('Não deve permitir a submissão do formulário com uma denominação > 200, profissao e descrição vazios', () => {
    EspecialidadeClass.preencheDenominacaoMaiorQue200(denominacaoInvalida, denominacaoInvalidaValida); // Preenche a denominação com uma string > 200
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    EspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    EspecialidadeClass.verificaDenominacaoPosErro(denominacaoInvalidaValida); // Verifica se campo denominação mantém os dados após o ero

  })

  it('Não deve permitir a submissão do formulário com uma denominação > 200, profissao vazia e descrição <= 200', () => {
    EspecialidadeClass.preencheDenominacaoMaiorQue200(denominacaoInvalida, denominacaoInvalidaValida); // Preenche a denominação com uma string > 200
    EspecialidadeClass.preencheDescricaoMenorQue200(descricaoValida); // Preenche a descrição com uma string <= 200.
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    EspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    EspecialidadeClass.verificaDenominacaoPosErro(denominacaoInvalidaValida); // Verifica se campo denominação mantém os dados após o ero
    EspecialidadeClass.verificaDescricaoPosErro(descricaoValida); // Verifica se o campo descrição mantém os dados após o erro

  })

  it('Não deve permitir a submissão do formulário com uma denomicação > 200, profissão vazia  e uma descrição > 200', () => {
    EspecialidadeClass.preencheDenominacaoMaiorQue200(denominacaoInvalida, denominacaoInvalidaValida); // Preenche a denominação com uma string > 200
    EspecialidadeClass.preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida); // Preenche a descrição com uma string > 200 e verifica se o campo está registrando apenas os primeiros 200 caracteres.
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    EspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    EspecialidadeClass.verificaDenominacaoPosErro(denominacaoInvalidaValida); // Verifica se campo denominação mantém os dados após o ero
    EspecialidadeClass.verificaDescricaoPosErro(descricaoInvalidaValida); // Verifica se o campo descrição mantém os dados após o erro

  })

  it('Deve permitir a submissão do formulário com uma denominação > 200, uma profissão valida e uma descrição vazia.', () => {
    EspecialidadeClass.preencheDenominacaoMaiorQue200(denominacaoInvalida, denominacaoInvalidaValida); // Preenche a denominação com uma string > 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaConfirmacaoEspecialidade(denominacaoInvalidaValida, profissaoTeste, 'Não informado');

  })

  it('Deve permitir a submissão do formulário com uma denominação > 200, uma profissão valida e uma descrição <= 200.', () => {
    EspecialidadeClass.preencheDenominacaoMaiorQue200(denominacaoInvalida, denominacaoInvalidaValida); // Preenche a denominação com uma string > 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    EspecialidadeClass.preencheDescricaoMenorQue200(descricaoValida); // Preenche a descrição com uma string <= 200.
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaConfirmacaoEspecialidade(denominacaoInvalidaValida, profissaoTeste, descricaoValida);

  })

  it('Deve permitir a submissão do formulário com uma denominação > 200, uma profissão valida e uma descrição > 200, porem deve reduzir a descrição para 200 caracteres', () => {
    EspecialidadeClass.preencheDenominacaoMaiorQue200(denominacaoInvalida, denominacaoInvalidaValida); // Preenche a denominação com uma string > 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    EspecialidadeClass.preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida); // Preenche a descrição com uma string > 200 e verifica se o campo está registrando apenas os primeiros 200 caracteres.
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaConfirmacaoEspecialidade(denominacaoInvalidaValida, profissaoTeste, descricaoInvalidaValida);

  })

  it('Não deve permitir a submissão do formulário com uma denominação e profissao ja existente, e descrição vazia', () => {
    EspecialidadeClass.criaNovaEspecialidade(denominacaoValida); //cria uma especialidade
    EspecialidadeClass.acessaPaginaEspecialidade();
    EspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoAparece();

  })

  it('Não deve permitir a submissão do formulário com uma denominação e profissao ja existente, e descrição <= 200', () => {
    EspecialidadeClass.criaNovaEspecialidade(denominacaoValida); //cria uma especialidade
    EspecialidadeClass.acessaPaginaEspecialidade();
    EspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    EspecialidadeClass.preencheDescricaoMenorQue200(descricaoValida); // Preenche a descrição com uma string <= 200.
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoAparece();
    EspecialidadeClass.verificaDescricaoPosErro(descricaoValida); // Verifica se o campo descrição mantém os dados após o erro

  })

  it('Não deve permitir a submissão do formulário com uma denominação e profissao ja existente, e descrição > 200', () => {
    EspecialidadeClass.criaNovaEspecialidade(denominacaoValida); //cria uma especialidade
    EspecialidadeClass.acessaPaginaEspecialidade();
    EspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    EspecialidadeClass.preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida);
    EspecialidadeClass.botaoAvancar(); // Botão avançar
    EspecialidadeClass.verificaErroDenominacaoAparece();
    EspecialidadeClass.verificaDescricaoPosErro(descricaoInvalidaValida); // Verifica se o campo descrição mantém os dados após o erro

  })

})
