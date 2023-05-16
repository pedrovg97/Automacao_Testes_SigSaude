import { Login } from "../support/Login/Login/loginPage"
import { NovaEspecialidade } from "../support/Especialidade/Nova especialidade/novaEspecialidadePage"
import { NovaProfissao } from "../support/Profissão/Nova profissão/novaProfissaoPage"
import { ListarEspecialidade } from "../support/Especialidade/Listar especialidade/listarEspecialidadePage";

const LoginClass = new Login();
const ProfissaoClass = new NovaProfissao();
const NovaEspecialidadeClass = new NovaEspecialidade();
const ListarEspecialidadeClass = new ListarEspecialidade();
const codigoInexistente = "XXX";
const denominacaoInexistente = "XXX";
const profissaoTeste = 'Cirurgião';
const descricaoValida = 'Descrição teste';
const descricaoInvalida = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
const descricaoInvalidaValida = descricaoInvalida.substring(0, 200);
let denominacaoValida;
let denominacaoInvalida;
let denominacaoInvalidaValida;
let sigla;

describe('Teste do formulário de cadastro de especialidade', () => {

  beforeEach(() => {

    LoginClass.acessarPaginaLogin();
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.usuarioPadrao["login"], fixture.credenciais.usuarioPadrao["senha"]);
    });
    denominacaoValida = 'Denominação teste: ' + Math.random() * 1000;
    denominacaoInvalida = 'Denominação teste: ' + Math.random() * 1000 + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    denominacaoInvalidaValida = denominacaoInvalida.substring(0, 200);
    NovaEspecialidadeClass.acessaPaginaNovaEspecialidade()// Acessa a página do formulário

  })

  it('Deve apresentar erro ao submeter o formulário com os campos obrigatórios vazios', () => {
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaEspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida

  })

  it('Deve apresentar erro ao submeter o formulário com os campos obrigatórios vazios e com descrição <= 200', () => {
    NovaEspecialidadeClass.preencheDescricaoMenorQue200(descricaoValida); // Preenche a descrição com uma string <= 200.
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaEspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaEspecialidadeClass.verificaDescricaoPosErro(descricaoValida); // Verifica se o campo descrição mantém os dados após o erro


  })

  it('Deve apresentar erro ao submeter o formulário com os campos obrigatórios vazios e com descrição > 200', () => {
    NovaEspecialidadeClass.preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida);  // Preenche a descrição com uma string > 200 e verifica se o campo está registrando apenas os primeiros 200 caracteres.
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaEspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaEspecialidadeClass.verificaDescricaoPosErro(descricaoInvalidaValida); // Verifica se o campo descrição mantém os dados após o erro


  })

  it('Deve apresentar erro ao submeter o formulário com denominação vazia, uma profissão válida e a descrição vazia', () => {
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaEspecialidadeClass.verificaErroProfissaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    NovaEspecialidadeClass.verificaProfissaoPosErro(profissaoTeste) // Verifica de o select profissão mantém os dados após o erro

  })

  it('Deve apresentar erro ao submeter o formulário com denominação vazia, uma profissão válida e a descrição <= 200 caracteres', () => {
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    NovaEspecialidadeClass.preencheDescricaoMenorQue200(descricaoValida); // Preenche a descrição com uma string <= 200.
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaEspecialidadeClass.verificaErroProfissaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    NovaEspecialidadeClass.verificaProfissaoPosErro(profissaoTeste) // Verifica de o select profissão mantém os dados após o erro
    NovaEspecialidadeClass.verificaDescricaoPosErro(descricaoValida); // Verifica se o campo descrição mantém os dados após o erro

  })

  it('Deve apresentar erro ao submeter o formulário com denominação vazia, uma profissão válida e a descrição > 200 caracteres', () => {
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    NovaEspecialidadeClass.preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida); // Preenche a descrição com uma string > 200 e verifica se o campo está registrando apenas os primeiros 200 caracteres.
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaEspecialidadeClass.verificaErroProfissaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    NovaEspecialidadeClass.verificaProfissaoPosErro(profissaoTeste) // Verifica de o select profissão mantém os dados após o erro
    NovaEspecialidadeClass.verificaDescricaoPosErro(descricaoInvalidaValida); // Verifica se o campo descrição mantém os dados após o erro

  })

  it('Não deve permitir a submissão do formulário com uma denominação <= 200, profissao e descrição vazios', () => {
    NovaEspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    NovaEspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaEspecialidadeClass.verificaDenominacaoPosErro(denominacaoValida); // Verifica se campo denominação mantém os dados após o ero

  })

  it('Não deve permitir a submissão do formulário com uma denominação <= 200, profissao vazia e descrição <= 200', () => {
    NovaEspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    NovaEspecialidadeClass.preencheDescricaoMenorQue200(descricaoValida); // Preenche a descrição com uma string <= 200.
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    NovaEspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaEspecialidadeClass.verificaDenominacaoPosErro(denominacaoValida); // Verifica se campo denominação mantém os dados após o ero
    NovaEspecialidadeClass.verificaDescricaoPosErro(descricaoValida); // Verifica se o campo descrição mantém os dados após o erro

  })

  it('Não deve permitir a submissão do formulário com uma denominação <= 200, profissão vazia  e uma descrição > 200', () => {
    NovaEspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    NovaEspecialidadeClass.preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida); // Preenche a descrição com uma string > 200 e verifica se o campo está registrando apenas os primeiros 200 caracteres.
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    NovaEspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaEspecialidadeClass.verificaDenominacaoPosErro(denominacaoValida); // Verifica se campo denominação mantém os dados após o ero
    NovaEspecialidadeClass.verificaDescricaoPosErro(descricaoInvalidaValida); // Verifica se o campo descrição mantém os dados após o erro

  })

  it('Deve permitir a submissão do formulário com uma denominação <= 200, uma profissão valida e uma descrição vazia.', () => {
    NovaEspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaConfirmacaoEspecialidade(denominacaoValida, profissaoTeste, 'Não informado');

  })

  it('Deve permitir a submissão do formulário com uma denominação <= 200, uma profissão valida e uma descrição <= 200.', () => {
    NovaEspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    NovaEspecialidadeClass.preencheDescricaoMenorQue200(descricaoValida); // Preenche a descrição com uma string <= 200.
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaConfirmacaoEspecialidade(denominacaoValida, profissaoTeste, descricaoValida);

  })

  it('Deve permitir a submissão do formulário com uma denominação <= 200, uma profissão valida e uma descrição > 200, porem deve reduzir a descrição para 200 caracteres', () => {
    NovaEspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    NovaEspecialidadeClass.preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida); // Preenche a descrição com uma string > 200 e verifica se o campo está registrando apenas os primeiros 200 caracteres.
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaConfirmacaoEspecialidade(denominacaoValida, profissaoTeste, descricaoInvalidaValida);

  })

  it('Não deve permitir a submissão do formulário com uma denominação > 200, profissao e descrição vazios', () => {
    NovaEspecialidadeClass.preencheDenominacaoMaiorQue200(denominacaoInvalida, denominacaoInvalidaValida); // Preenche a denominação com uma string > 200
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    NovaEspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaEspecialidadeClass.verificaDenominacaoPosErro(denominacaoInvalidaValida); // Verifica se campo denominação mantém os dados após o ero

  })

  it('Não deve permitir a submissão do formulário com uma denominação > 200, profissao vazia e descrição <= 200', () => {
    NovaEspecialidadeClass.preencheDenominacaoMaiorQue200(denominacaoInvalida, denominacaoInvalidaValida); // Preenche a denominação com uma string > 200
    NovaEspecialidadeClass.preencheDescricaoMenorQue200(descricaoValida); // Preenche a descrição com uma string <= 200.
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    NovaEspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaEspecialidadeClass.verificaDenominacaoPosErro(denominacaoInvalidaValida); // Verifica se campo denominação mantém os dados após o ero
    NovaEspecialidadeClass.verificaDescricaoPosErro(descricaoValida); // Verifica se o campo descrição mantém os dados após o erro

  })

  it('Não deve permitir a submissão do formulário com uma denomicação > 200, profissão vazia  e uma descrição > 200', () => {
    NovaEspecialidadeClass.preencheDenominacaoMaiorQue200(denominacaoInvalida, denominacaoInvalidaValida); // Preenche a denominação com uma string > 200
    NovaEspecialidadeClass.preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida); // Preenche a descrição com uma string > 200 e verifica se o campo está registrando apenas os primeiros 200 caracteres.
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoNaoAparece(); // Verifica se a mensagem de erro não é exibida
    NovaEspecialidadeClass.verificaErroProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaEspecialidadeClass.verificaDenominacaoPosErro(denominacaoInvalidaValida); // Verifica se campo denominação mantém os dados após o ero
    NovaEspecialidadeClass.verificaDescricaoPosErro(descricaoInvalidaValida); // Verifica se o campo descrição mantém os dados após o erro

  })

  it('Deve permitir a submissão do formulário com uma denominação > 200, uma profissão valida e uma descrição vazia.', () => {
    NovaEspecialidadeClass.preencheDenominacaoMaiorQue200(denominacaoInvalida, denominacaoInvalidaValida); // Preenche a denominação com uma string > 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaConfirmacaoEspecialidade(denominacaoInvalidaValida, profissaoTeste, 'Não informado');

  })

  it('Deve permitir a submissão do formulário com uma denominação > 200, uma profissão valida e uma descrição <= 200.', () => {
    NovaEspecialidadeClass.preencheDenominacaoMaiorQue200(denominacaoInvalida, denominacaoInvalidaValida); // Preenche a denominação com uma string > 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    NovaEspecialidadeClass.preencheDescricaoMenorQue200(descricaoValida); // Preenche a descrição com uma string <= 200.
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaConfirmacaoEspecialidade(denominacaoInvalidaValida, profissaoTeste, descricaoValida);

  })

  it('Deve permitir a submissão do formulário com uma denominação > 200, uma profissão valida e uma descrição > 200, porem deve reduzir a descrição para 200 caracteres', () => {
    NovaEspecialidadeClass.preencheDenominacaoMaiorQue200(denominacaoInvalida, denominacaoInvalidaValida); // Preenche a denominação com uma string > 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    NovaEspecialidadeClass.preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida); // Preenche a descrição com uma string > 200 e verifica se o campo está registrando apenas os primeiros 200 caracteres.
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaConfirmacaoEspecialidade(denominacaoInvalidaValida, profissaoTeste, descricaoInvalidaValida);

  })

  it('Não deve permitir a submissão do formulário com uma denominação e profissao ja existente, e descrição vazia', () => {
    NovaEspecialidadeClass.criaNovaEspecialidade(denominacaoValida); //cria uma especialidade
    NovaEspecialidadeClass.acessaPaginaNovaEspecialidade();
    NovaEspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoAparece();

  })

  it('Não deve permitir a submissão do formulário com uma denominação e profissao ja existente, e descrição <= 200', () => {
    NovaEspecialidadeClass.criaNovaEspecialidade(denominacaoValida); //cria uma especialidade
    NovaEspecialidadeClass.acessaPaginaNovaEspecialidade();
    NovaEspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    NovaEspecialidadeClass.preencheDescricaoMenorQue200(descricaoValida); // Preenche a descrição com uma string <= 200.
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoAparece();
    NovaEspecialidadeClass.verificaDescricaoPosErro(descricaoValida); // Verifica se o campo descrição mantém os dados após o erro

  })

  it('Não deve permitir a submissão do formulário com uma denominação e profissao ja existente, e descrição > 200', () => {
    NovaEspecialidadeClass.criaNovaEspecialidade(denominacaoValida); //cria uma especialidade
    NovaEspecialidadeClass.acessaPaginaNovaEspecialidade();
    NovaEspecialidadeClass.preencheDenominacaoMenorQue200(denominacaoValida); // Preenche a denominação com uma string <= 200
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    NovaEspecialidadeClass.preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida);
    NovaEspecialidadeClass.botaoAvancar(); // Botão avançar
    NovaEspecialidadeClass.verificaErroDenominacaoAparece();
    NovaEspecialidadeClass.verificaDescricaoPosErro(descricaoInvalidaValida); // Verifica se o campo descrição mantém os dados após o erro

  })

})

describe('Teste do formulário de pesquisa de especialidade', () => {

  before(() => {
    LoginClass.acessarPaginaLogin();
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.usuarioPadrao["login"], fixture.credenciais.usuarioPadrao["senha"]);
    });

    denominacaoValida = 'Denominação teste: ' + Math.random() * 1000;
    NovaEspecialidadeClass.criaNovaEspecialidade(denominacaoValida);//cria uma especialidade
    sigla = ProfissaoClass.criaSigla(profissaoTeste);

  });

  beforeEach(() => {

    LoginClass.acessarPaginaLogin();
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.usuarioPadrao["login"], fixture.credenciais.usuarioPadrao["senha"]);
    });

    ListarEspecialidadeClass.acessaPaginaListarEspecialidade()// Acessa a página do formulário

  });

  it('Deve apresentar erro ao pesquisar com os campos vazios', () => {
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaErroCamposVazios();

  })

  it('Deve exibir os resultados da pesquisa ao se pesquisar pela profissão', () => {
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaColuna(profissaoTeste, "Profissão"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Profissão da tabela 

  })

  it('Deve exibir os resultados da pesquisa ao se pesquisar pelo código', () => {
    ListarEspecialidadeClass.preencheCodigo(sigla); // Preenche com o código da especialidade criada
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaColuna(sigla, "Código");// Verifica se o resultado da pesquisa é exibido corretamente na coluna Código da tabela 

  })

  it('Deve exibir os resultados da pesquisa ao se pesquisar pelo código e pela profissão, ambos validos', () => {
    ListarEspecialidadeClass.preencheCodigo(sigla); // Preenche com o código da especialidade criada
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaColuna(sigla, "Código");// Verifica se o resultado da pesquisa é exibido corretamente na coluna Código da tabela 
    ListarEspecialidadeClass.verificaColuna(profissaoTeste, "Profissão"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Profissão da tabela 

  })

  it('Deve exibir uma tabela vazia ao pesquisar apenas pelo cógigo, sendo ele inexistente', () => {
    ListarEspecialidadeClass.preencheCodigo(codigoInexistente); // Preenche com o código da especialidade criada
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();

  })

  it('Deve exibir uma tabela vazia ao pesquisar com código inexistente e profissão valida', () => {
    ListarEspecialidadeClass.preencheCodigo(codigoInexistente); // Preenche com o código da especialidade criada
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();

  })

  it('Deve exibir o resultado da pesquisa ao pesquisar por denominação existente', () => {
    ListarEspecialidadeClass.preencheDenominacao(denominacaoValida);
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaColuna(denominacaoValida, "Denominação"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Profissão da tabela 

  })

  it('Deve exibir o resultado da pesquisa ao pesquisar por denominação existente e profissão valida', () => {
    ListarEspecialidadeClass.preencheDenominacao(denominacaoValida);
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaColuna(denominacaoValida, "Denominação"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Profissão da tabela 
    ListarEspecialidadeClass.verificaColuna(profissaoTeste, "Profissão"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Profissão da tabela 

  })

  it('Deve exibir o resultado da pesquisa ao pesquisar por denominação existente e codigo existente', () => {
    ListarEspecialidadeClass.preencheDenominacao(denominacaoValida);
    ListarEspecialidadeClass.preencheCodigo(sigla); // Preenche com o código da especialidade criada
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaColuna(denominacaoValida, "Denominação"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Profissão da tabela 
    ListarEspecialidadeClass.verificaColuna(sigla, "Código");// Verifica se o resultado da pesquisa é exibido corretamente na coluna Código da tabela 

  })

  it('Deve exibir o resultado da pesquisa ao pesquisar por denominação existente, codigo existente e profissão valida', () => {
    ListarEspecialidadeClass.preencheDenominacao(denominacaoValida);
    ListarEspecialidadeClass.preencheCodigo(sigla); // Preenche com o código da especialidade criada
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaColuna(denominacaoValida, "Denominação"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Profissão da tabela 
    ListarEspecialidadeClass.verificaColuna(sigla, "Código");// Verifica se o resultado da pesquisa é exibido corretamente na coluna Código da tabela 
    ListarEspecialidadeClass.verificaColuna(profissaoTeste, "Profissão"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Profissão da tabela 

  })

  it('Deve exibir o resultado da pesquisa ao pesquisar por denominação existente e codigo inexistente', () => {
    ListarEspecialidadeClass.preencheDenominacao(denominacaoValida);
    ListarEspecialidadeClass.preencheCodigo(codigoInexistente); // Preenche com o código da especialidade criada
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();

  })

  it('Deve exibir o resultado da pesquisa ao pesquisar por denominação existente, codigo inexistente e profissão valida', () => {
    ListarEspecialidadeClass.preencheDenominacao(denominacaoValida);
    ListarEspecialidadeClass.preencheCodigo(codigoInexistente); // Preenche com o código da especialidade criada
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();

  })

  it('Deve exibir uma tabela vazia ao pesquisar por denominação inexistente', () => {
    ListarEspecialidadeClass.preencheDenominacao(denominacaoInexistente);
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();

  })

  it('Deve exibir uma tabela vazia ao pesquisar por denominação inexistente e profissão valida', () => {
    ListarEspecialidadeClass.preencheDenominacao(denominacaoInexistente);
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();

  })

  it('Deve exibir uma tabela vazia ao pesquisar por denominação inexistente e codigo existente', () => {
    ListarEspecialidadeClass.preencheDenominacao(denominacaoInexistente);
    ListarEspecialidadeClass.preencheCodigo(sigla); // Preenche com o código da especialidade criada
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();

  })

  it('Deve exibir uma tabela vazia ao pesquisar por denominação existente, codigo existente e profissão valida', () => {
    ListarEspecialidadeClass.preencheDenominacao(denominacaoInexistente);
    ListarEspecialidadeClass.preencheCodigo(sigla); // Preenche com o código da especialidade criada
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();

  })

  it('Deve exibir uma tabela vazia ao pesquisar por denominação existente e codigo inexistente', () => {
    ListarEspecialidadeClass.preencheDenominacao(denominacaoInexistente);
    ListarEspecialidadeClass.preencheCodigo(codigoInexistente); // Preenche com o código da especialidade criada
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();

  })

  it('Deve exibir uma tabela vazia ao pesquisar por denominação existente, codigo inexistente e profissão valida', () => {
    ListarEspecialidadeClass.preencheDenominacao(denominacaoInexistente);
    ListarEspecialidadeClass.preencheCodigo(codigoInexistente); // Preenche com o código da especialidade criada
    ProfissaoClass.preencheProfissao(profissaoTeste);// Seleciona uma profissao válida
    ListarEspecialidadeClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();

  })

})
