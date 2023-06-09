import { NovaProfissao } from '../../Profissão/Nova profissão/novaProfissaoPage.js';

export class NovaEspecialidade {

  botaoAvancar() {
    cy.get('#nextBtn').click(); // Botão avançar
  }

  botaoOk() {
    cy.get('button.swal-button.swal-button--confirm').click();
  }

  verificaErroDenominacaoAparece() {
    cy.get('#erroDenominacao').should('be.visible'); // Verifica se a mensagem de erro é exibida
  }

  verificaErroDenominacaoNaoAparece() {
    cy.get('#erroDenominacao').should('not.be.visible'); // Verifica se a mensagem de erro é exibida
  }

  verificaErroProfissaoAparece() {
    cy.get('#erroProfissao').should('be.visible'); // Verifica se a mensagem de erro é exibida
  }

  verificaErroProfissaoNaoAparece() {
    cy.get('#erroProfissao').should('not.be.visible'); // Verifica se a mensagem de erro é exibida
  }

  preencheDescricaoMenorQue200(descricaoValida) {
    cy.get('#inputDescricao').clear();
    cy.get('#inputDescricao').type(descricaoValida).should('have.value', descricaoValida); // Preenche a descrição com uma string <= 200
  }

  preencheDescricaoMaiorQue200(descricaoInvalida, descricaoInvalidaValida) {
    cy.get('#inputDescricao').type(descricaoInvalida).should('have.value', descricaoInvalidaValida) // Preenche a descrição com uma string > 200 e verifica se o campo está registrando apenas os primeiros 200 caracteres.
  }

  verificaDescricaoPosErro(descricao) {
    cy.get('#inputDescricao').should('have.value', descricao); // verifica se o campo descrição mantém o conteúdo mesmo após o erro apresentado.
  }

  verificaDenominacaoPosErro(denominacao) {
    cy.get('#inputDenominacao').should('have.value', denominacao); // verifica se o campo denominação mantém o conteúdo mesmo após o erro apresentado.
  }

  verificaProfissaoPosErro(profissao) {
    const sigla = profissao.toUpperCase().slice(0, 3);
    cy.get('#selectProfissao').should('have.value', sigla); // verifica se o campo profissao mantém o conteúdo mesmo após o erro apresentado.
  }

  preencheDenominacaoMenorQue200(denominacaoValida) {
    cy.get('#inputDenominacao').clear();
    cy.get('#inputDenominacao').type(denominacaoValida) // Preenche a denominação com uma string <= 200
  }

  preencheDenominacaoMaiorQue200(denominacaoInvalida, denominacaoInvalidaValida) {
    cy.get('#inputDenominacao').type(denominacaoInvalida).should('have.value', denominacaoInvalidaValida) // Preenche a denominação com uma string > 200
  }

  acessaPaginaNovaEspecialidade() {
    cy.fixture('url.json').then((fixture) => {
      cy.visit(fixture.paginas.paginaNovaEspecialidade); // Acessa a página do formulário
      cy.url().should('include', '/sigsaude/especialidade/form')

    })
  }


  verificaConfirmacaoEspecialidade(denominacao, profissao, descricao) {

    if (cy.contains("Denominação: " + denominacao.toUpperCase()).should('exist') && cy.contains("Profissão: " + profissao.toUpperCase()).should('exist') && cy.contains("Descrição: " + descricao).should('exist')) {
      this.botaoAvancar();
      this.botaoOk();
    }
  }

  criaNovaEspecialidade(denominacao) {

    const ProfissaoClass = new NovaProfissao();
    const descricao = "Especialidade em " + denominacao;

    cy.fixture('profissaoEspecialidadeMap.json').then((fixture) => {
      const profissao = fixture.profissaoEspecialidadeMap[denominacao] ?? 'Cirurgião'; //caso n ache a propriedade denominação no json, profissão recebe 'Cirurgião'

      this.acessaPaginaNovaEspecialidade();

      //Acessa o selec profissao busca pela profissão correspondente a especialidade, caso ela não exista, cria uma nova profissão.
      // A opção desejada está presente, então selecione-a
      ProfissaoClass.preencheProfissao(profissao);

      cy.get('[name="denominacao"]').type(denominacao);
      cy.get('[id="inputDescricao"]').type(descricao).should('have.value', descricao);

      this.botaoAvancar();

      //verifica se o que foi preenchido aparece na tela de confirmação dos dados.
      this.verificaConfirmacaoEspecialidade(denominacao, profissao, descricao);



    });

  }
}

export default new NovaEspecialidade();
