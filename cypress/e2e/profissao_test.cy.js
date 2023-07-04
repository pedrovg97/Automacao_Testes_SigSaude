import { Login } from "../support/Login/Login/loginPage"
import { NovaEspecialidade } from "../support/Especialidade/Nova especialidade/novaEspecialidadePage"
import { NovaProfissao } from "../support/Profissão/Nova profissão/novaProfissaoPage"
import { ListarProfissao } from "../support/Profissão/Listar profissão/listarProfissaoPage";
import { ListarEspecialidade } from "../support/Especialidade/Listar especialidade/listarEspecialidadePage";

const LoginClass = new Login();
const NovaProfissaoClass = new NovaProfissao();
const NovaEspecialidadeClass = new NovaEspecialidade();
const ListarEspecialidadeClass = new ListarEspecialidade();
const ListarProfissaoClass = new ListarProfissao();


const siglaInexistente = "XXX";
const denominacaoInexistente = "XXX";
let denominacaoValida;
let denominacaoValidaSup;
let denominacaoValidaTec;
let denominacaoInvalida;
let denominacaoInvalidaValida;
let siglaValida;
let siglaSup;
let siglaTec;
let siglaInvalida;
let justificativa;
let conselho = null;


describe('Teste do formulário de cadastro de profissão', () => {

  beforeEach(() => {

    LoginClass.acessarPaginaLogin();
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.usuarioPadrao["login"], fixture.credenciais.usuarioPadrao["senha"]);
    });
    denominacaoValida = 'Denominação teste ' + Math.floor(Math.random() * 1000000);
    denominacaoInvalida = 'Denominação teste ' + Math.floor(Math.random() * 1000000) + 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat';
    denominacaoInvalidaValida = denominacaoInvalida.substring(0, 60);
    siglaValida = NovaProfissaoClass.gerarSiglaAleatoria();
    siglaInvalida = siglaValida + "MAIOR"
    NovaProfissaoClass.acessaPaginaProfissao()// Acessa a página do formulário

  })

  it('Deve apresentar erro ao submeter o formulário com os campos obrigatórios vazios', () => {
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroNomeProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaProfissaoClass.verificaErroSiglaAparece();// Verifica se a mensagem de erro é exibida
    NovaProfissaoClass.verificaErroNivelFormacaoAparece();// Verifica se a mensagem de erro é exibida
    NovaProfissaoClass.verificaErroConselhoProfissionalAparece();// Verifica se a mensagem de erro é exibida

  })

  it('Deve apresentar erro ao submeter o formulário com nome da profissão vazio, sigla igual a 3, nivel de formação e conselho validos, todas as ocupações ', () => {
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaValida);
    NovaProfissaoClass.preencheNivelFormacao();
    NovaProfissaoClass.preencheConselhoProfissional(conselho);
    NovaProfissaoClass.preencheOcupacao("todas");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroNomeProfissaoAparece(); // Verifica se a mensagem de erro é exibida

  })

  it('Deve apresentar erro ao submeter o formulário com nome da profissão vazio, sigla maior q 3, nivel de formação valido, conselho iguala "outro", e outrop conselho valido, todas as ocupações ', () => {
    NovaProfissaoClass.preencheSiglaMaiorQue3(siglaInvalida, siglaValida);
    NovaProfissaoClass.preencheNivelFormacao();
    NovaProfissaoClass.preencheConselhoProfissional("OUTRO");
    NovaProfissaoClass.preencheOcupacao("todas");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroNomeProfissaoAparece(); // Verifica se a mensagem de erro é exibida

  })

  it('Deve apresentar erro ao submeter o formulário com nome da profissão valido, sigla igual a 3, nivel de formação valido e conselho e ocupação vazios', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoValida);
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaValida);
    NovaProfissaoClass.preencheNivelFormacao();
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroConselhoProfissionalAparece();

  })

  it('Deve apresentar erro ao submeter o formulário com nome da profissão valido, sigla maior q 3, nivel de formação, conselho vazio e ocupação valida', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoValida);
    NovaProfissaoClass.preencheSiglaMaiorQue3(siglaInvalida, siglaValida);
    NovaProfissaoClass.preencheOcupacao("todas");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroNivelFormacaoAparece();
    NovaProfissaoClass.verificaErroConselhoProfissionalAparece();

  })

  it('Deve apresentar erro ao submeter o formulário com nome da profissão valido, sigla vazia, nivel de formação vazio, conselho valido e ocupação valida', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoValida);
    NovaProfissaoClass.preencheConselhoProfissional(conselho);
    NovaProfissaoClass.preencheOcupacao("todas");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroSiglaAparece();
    NovaProfissaoClass.verificaErroNivelFormacaoAparece();
  })

  it('Deve apresentar erro ao submeter o formulário com nome da profissão valido, sigla vazia, nivel de formação valido, conselho igual a "outro" e outro conselho valido, ocupação igual a nenhuma', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoValida);
    NovaProfissaoClass.preencheNivelFormacao();
    NovaProfissaoClass.preencheConselhoProfissional("OUTRO");
    NovaProfissaoClass.preencheOcupacao("nenhuma");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroSiglaAparece();

  })

  it('Deve submeter o formulário com nome da profissão valido, sigla valida, nivel de formação valido, conselho valido, ocupação valida', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoValida);
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaValida);
    NovaProfissaoClass.preencheNivelFormacao();
    NovaProfissaoClass.preencheConselhoProfissional(conselho);
    NovaProfissaoClass.preencheOcupacao("todas");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaConfirmacaoProfissao(denominacaoValida, siglaValida);

  })

  it('Deve submeter o formulário com nome da profissão valido, sigla valida, nivel de formação valido, conselho outro e outro conselho valido, ocupação igual a nenhuma', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoValida);
    NovaProfissaoClass.preencheSiglaMaiorQue3(siglaInvalida, siglaValida);
    NovaProfissaoClass.preencheNivelFormacao();
    NovaProfissaoClass.preencheConselhoProfissional("OUTRO");
    NovaProfissaoClass.preencheOcupacao("nenhuma");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaConfirmacaoProfissao(denominacaoValida, siglaValida);


  })

  it('Deve apresentar erro ao submeter o formulário com nome da profissão maior q 60, sigla maior q 3, nivel de formação vazio, conselho outro e outro conselho valido, ocupação vazia', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMaiorQue60(denominacaoInvalida, denominacaoInvalidaValida);
    NovaProfissaoClass.preencheSiglaMaiorQue3(siglaInvalida, siglaValida);
    NovaProfissaoClass.preencheConselhoProfissional("OUTRO");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroNivelFormacaoAparece();

  })

  it('Deve apresentar erro ao submeter o formulário com nome da profissão maior q 60, sigla vazia, nivel de formação valido, conselho vazio, ocupação vazia', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMaiorQue60(denominacaoInvalida, denominacaoInvalidaValida);
    NovaProfissaoClass.preencheNivelFormacao();
    NovaProfissaoClass.preencheOcupacao("todas");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroSiglaAparece();
    NovaProfissaoClass.verificaErroConselhoProfissionalAparece();

  })

  it('Deve apresentar erro ao submeter o formulário com nome da profissão maior q 60, sigla vazia, nivel de formação valido, conselho vazio, ocupação igual a nenhuma', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMaiorQue60(denominacaoInvalida, denominacaoInvalidaValida);
    NovaProfissaoClass.preencheNivelFormacao();
    NovaProfissaoClass.preencheOcupacao("nenhuma");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroSiglaAparece();
    NovaProfissaoClass.verificaErroConselhoProfissionalAparece();

  })

  it('Deve apresentar erro ao submeter o formulário com nome da profissão maior q 60, sigla valida, nivel de formação vazio, conselho valido, ocupação igual a nenhuma', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMaiorQue60(denominacaoInvalida, denominacaoInvalidaValida);
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaValida);
    NovaProfissaoClass.preencheConselhoProfissional(conselho);
    NovaProfissaoClass.preencheOcupacao("nenhuma");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroNivelFormacaoAparece();

  })

  it('Deve submeter o formulário com nome da profissão maior q 60, sigla valida, nivel de formação valido, conselho valido, ocupação valida', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMaiorQue60(denominacaoInvalida, denominacaoInvalidaValida);
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaValida);
    NovaProfissaoClass.preencheNivelFormacao();
    NovaProfissaoClass.preencheConselhoProfissional(conselho);
    NovaProfissaoClass.preencheOcupacao("todas");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaConfirmacaoProfissao(denominacaoInvalidaValida, siglaValida);

  })

  it('Deve submeter o formulário com nome da profissão maior q 60, sigla valida, nivel de formação valido, conselho outro e outro conselho valido, ocupação igual a nenhuma', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMaiorQue60(denominacaoInvalida, denominacaoInvalidaValida);
    NovaProfissaoClass.preencheSiglaMaiorQue3(siglaInvalida, siglaValida);
    NovaProfissaoClass.preencheNivelFormacao();
    NovaProfissaoClass.preencheConselhoProfissional("OUTRO");
    NovaProfissaoClass.preencheOcupacao("nenhuma");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaConfirmacaoProfissao(denominacaoInvalidaValida, siglaValida);

  })

  it('Deve apresentar erro ao submeter o formulário com nome da profissão vazio, sigla vazio, nivel de formação e conselho validos, ocupações vazio', () => {
    NovaProfissaoClass.preencheNivelFormacao();
    NovaProfissaoClass.preencheConselhoProfissional(conselho);
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroSiglaAparece();
    NovaProfissaoClass.verificaErroNomeProfissaoAparece(); // Verifica se a mensagem de erro é exibida

  })

  it('Deve apresentar erro ao submeter o formulário com nome da profissão vazio, sigla vazio, nivel de formação vazio, conselho iguala "outro", e outrop conselho valido, todas as ocupações ', () => {
    NovaProfissaoClass.preencheConselhoProfissional("OUTRO");
    NovaProfissaoClass.preencheOcupacao("todas");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroSiglaAparece();
    NovaProfissaoClass.verificaErroNivelFormacaoAparece();
    NovaProfissaoClass.verificaErroNomeProfissaoAparece(); // Verifica se a mensagem de erro é exibida

  })

  it('Deve apresentar erro ao submeter o formulário com nome da profissão vazio, sigla igual a 3, nivel de formação e conselho vazios, todas as ocupações ', () => {
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaValida);
    NovaProfissaoClass.preencheOcupacao("todas");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroNomeProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaProfissaoClass.verificaErroNivelFormacaoAparece();
    NovaProfissaoClass.verificaErroConselhoProfissionalAparece();

  })

  it('Deve apresentar erro ao submeter o formulário com nome da profissão vazio, sigla maior q 3, nivel de formação valido, conselho vazio, nenhuma ocupação ', () => {
    NovaProfissaoClass.preencheSiglaMaiorQue3(siglaInvalida, siglaValida);
    NovaProfissaoClass.preencheNivelFormacao();
    NovaProfissaoClass.preencheOcupacao("nenhuma");
    NovaProfissaoClass.botaoAvancar(); // Botão avançar
    NovaProfissaoClass.verificaErroNomeProfissaoAparece(); // Verifica se a mensagem de erro é exibida
    NovaProfissaoClass.verificaErroConselhoProfissionalAparece();

  })

})

describe('Teste do formulário de pesquisa de profissão', () => {

  before(() => {
    LoginClass.acessarPaginaLogin();
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.usuarioPadrao["login"], fixture.credenciais.usuarioPadrao["senha"]);
    });

    denominacaoValidaSup = 'Denominação teste ' + Math.floor(Math.random() * 1000000);

    siglaSup = NovaProfissaoClass.gerarSiglaAleatoria();

    justificativa = "Inativação da especialidade: " + denominacaoValida;

    NovaProfissaoClass.criaNovaProfissao(denominacaoValidaSup, "SUPERIOR", siglaSup);//cria uma profissao SUPERIOR

  });

  before(() => {
    LoginClass.acessarPaginaLogin();
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.usuarioPadrao["login"], fixture.credenciais.usuarioPadrao["senha"]);
    });

    denominacaoValidaTec = 'Denominação teste ' + Math.floor(Math.random() * 1000000);
    siglaTec = NovaProfissaoClass.gerarSiglaAleatoria();

    NovaProfissaoClass.criaNovaProfissao(denominacaoValidaTec, "TÉCNICO", siglaTec);//cria uma profissao TÉCNICO

  });

  beforeEach(() => {

    LoginClass.acessarPaginaLogin();
    cy.fixture('credenciais.json').then((fixture) => {
      LoginClass.preencherLogin(fixture.credenciais.usuarioPadrao["login"], fixture.credenciais.usuarioPadrao["senha"]);
    });

    ListarProfissaoClass.acessaPaginaListarProfissao()// Acessa a página do formulário

  });

  it('Deve apresentar erro ao pesquisar com os campos vazios', () => {
    ListarProfissaoClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaErroCamposVazios();

  })

  it('Deve exibir os resultados da pesquisa ao se pesquisar informando apenas a sigla e o nível de formação, sendo a sigla pertencente a uma profissão existente e nível superior', () => {
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaSup);
    ListarProfissaoClass.preencheNivelFormacao("SUPERIOR");
    ListarProfissaoClass.botaoPesquisar(); // Botão pesquisar
    ListarProfissaoClass.verificaColuna(siglaSup, "Sigla"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Sigla da tabela 
    ListarProfissaoClass.verificaColuna("SUPERIOR", "Nivel de Formação"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Nivel de formação da tabela 

  })


  it('Deve exibir uma tabela vazia ao se pesquisar informando apenas a sigla e o nível de formação, sendo a sigla não pertencente a uma profissão existente e nível técnico', () => {
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaInexistente);
    ListarProfissaoClass.preencheNivelFormacao("TECNICO");
    ListarProfissaoClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();

  })

  it('Deve exibir os resultados da pesquisa ao se pesquisar informando nome, sigla e nível de formação, sendo o nome e a sigla pertencentes a uma profissão existente e nível técnico', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoValidaTec);
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaTec);
    ListarProfissaoClass.preencheNivelFormacao("TECNICO");
    ListarProfissaoClass.botaoPesquisar(); // Botão pesquisar
    ListarProfissaoClass.verificaColuna(denominacaoValidaTec, "Nome"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna nome de formação da tabela 
    ListarProfissaoClass.verificaColuna(siglaTec, "Sigla"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Sigla da tabela 
    ListarProfissaoClass.verificaColuna("TÉCNICO", "Nivel de Formação"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Nivel de formação da tabela 

  })


  it('Deve exibir os resultados da pesquisa ao se pesquisar informando nome, sigla e nível de formação, sendo o nome e a sigla pertencentes a uma profissão existente e nível superior', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoValidaSup);
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaSup);
    ListarProfissaoClass.preencheNivelFormacao("SUPERIOR");
    ListarProfissaoClass.botaoPesquisar(); // Botão pesquisar
    ListarProfissaoClass.verificaColuna(denominacaoValidaSup, "Nome"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna nome de formação da tabela 
    ListarProfissaoClass.verificaColuna(siglaSup, "Sigla"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Sigla da tabela 
    ListarProfissaoClass.verificaColuna("SUPERIOR", "Nivel de Formação"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Nivel de formação da tabela 

  })

  it('Deve exibir uma tabela vazia ao pesquisar informando nome e sigla, sendo o nome pertencente a uma profissão existente e sigla não correspondente', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoValidaSup);
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaInexistente);
    ListarProfissaoClass.preencheNivelFormacao("SUPERIOR");
    ListarProfissaoClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();


  })

  it('Deve exibir o resultado da pesquisa ao pesquisar informando nome e nível de formação, sendo o nome pertencente a uma profissão existente e nível superior', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoValidaSup);
    ListarProfissaoClass.preencheNivelFormacao("SUPERIOR");
    ListarProfissaoClass.botaoPesquisar(); // Botão pesquisar
    ListarProfissaoClass.verificaColuna(denominacaoValidaSup, "Nome"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna nome de formação da tabela 
    ListarProfissaoClass.verificaColuna("SUPERIOR", "Nivel de Formação"); // Verifica se o resultado da pesquisa é exibido corretamente na coluna Nivel de formação da tabela 

  })

  it('Deve exibir uma tabela vazia ao pesquisar informando nome, sigla e nível de formação, sendo o nome e a sigla não pertencentes a uma profissão existente e nível superior', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoInexistente);
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaInexistente);
    ListarProfissaoClass.preencheNivelFormacao("SUPERIOR");
    ListarProfissaoClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();

  })

  it('Deve exibir uma tabela vazia ao pesquisar informando nome e nível de formação, sendo o nome não pertencente a uma profissão existente e nível técnico', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoInexistente);
    ListarProfissaoClass.preencheNivelFormacao("TECNICO");
    ListarProfissaoClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();

  })

  it('Deve exibir uma tabela vazia ao pesquisar informando nome e sigla, sendo a sigla pertencente a uma profissão existente e nome não correspondente', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoInexistente);
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaTec);
    ListarProfissaoClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.verificaTabelaVazia();

  })

  it('Deve exibir os dados da profissao ao clicar em Visualizar profissao após a pesquisa', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoValidaSup);
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaSup);
    ListarProfissaoClass.preencheNivelFormacao("SUPERIOR");
    ListarProfissaoClass.botaoPesquisar(); // Botão pesquisar
    ListarProfissaoClass.verificaVisualizar(denominacaoValidaSup, siglaSup, "SUPERIOR", "CRN");//verifica se os dados da especialidade constam na página "Visualizar especialidae"

  })


  it('Não deve permitir a inativação da especialidade com uma justificativa vazia', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoValidaSup);
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaSup);
    ListarProfissaoClass.preencheNivelFormacao("SUPERIOR");
    ListarProfissaoClass.botaoPesquisar(); // Botão pesquisar
    ListarProfissaoClass.acessaInativarProfissao();//acessa a pagina de inativação através do botão inativar
    ListarEspecialidadeClass.botaoInativar();//clica no botão que confirma a inativação
    ListarEspecialidadeClass.verificaErroCamposVazios();//verifica se aparece o erro dizendo q a justificativa não pode ser vaziaa
  
  })
  
  it('Deve permitir a inativação da especialidade com uma justificativa válida', () => {
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoValidaSup);
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaSup);
    ListarProfissaoClass.preencheNivelFormacao("SUPERIOR");
    ListarProfissaoClass.botaoPesquisar(); // Botão pesquisar
    ListarEspecialidadeClass.inativar(justificativa);
    //pesquisa novamente pela especialidade para ver se realmente foi inativada
    NovaProfissaoClass.preencheNomeDaProfissaoMenorQue60(denominacaoValidaSup);
    NovaProfissaoClass.preencheSiglaMenorQue3(siglaSup);
    ListarProfissaoClass.preencheNivelFormacao("SUPERIOR");
    ListarProfissaoClass.botaoPesquisar(); // Botão pesquisar
  
  })

})