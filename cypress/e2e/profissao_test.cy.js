import { Login } from "../support/Login/Login/loginPage"
import { NovaEspecialidade } from "../support/Especialidade/Nova especialidade/novaEspecialidadePage"
import { NovaProfissao } from "../support/Profissão/Nova profissão/novaProfissaoPage"


const LoginClass = new Login();
const NovaProfissaoClass = new NovaProfissao();
const NovaEspecialidadeClass = new NovaEspecialidade();

let denominacaoValida;
let denominacaoInvalida;
let denominacaoInvalidaValida;
let siglaValida;
let siglaInvalida;
let justificativa;
let conselho = null;


describe('Teste do formulário de cadastro de especialidade', () => {

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