import { NovaProfissao } from '../../Profissão/Nova profissão/novaProfissaoPage.js';

export class ListarProfissao {

    botaoInativar() {
        cy.get('[class="btn btn-success"]').click(); // Botão inativar
    }

    botaoPesquisar() {
        cy.get('#pesquisarProfissao').click(); // Botão avançar
    }

    botaoOk() {
        cy.get('button.swal-button.swal-button--confirm').click();
    }

    preencheCodigo(codigo) {
        cy.get('#inputCodigoSigsaude').type(codigo).should('have.value', codigo); // Preenche codigo
    }

    preencheDenominacao(denominacao) {
        cy.get('#inputDenominacao').type(denominacao) // Preenche a denominação com uma string
    }

    verificaErroCamposVazios() {
        cy.get('[class="toast-message"]').should('be.visible');

    }

    verificaTabelaVazia() {
        cy.get('#dataTable tbody tr').should('contain', "Nenhum registro encontrado"); //seleciona as linhas da tabela e ferifica se está vazia
    }

    verificaColuna(valor, coluna) {
        let numeroColuna;

        if (coluna == "Nome") numeroColuna = 0;
        else if (coluna == "Nivel de Formação") numeroColuna = 1;
        else if (coluna == "Sigla") numeroColuna = 2;

        cy.get('#dataTable tbody tr').each((row) => { // seleciona todas as tr (linhas da tabela e faz um iteraçãoem cada linha )
            const td = row.find('td').eq(numeroColuna) //find.eq(2) retorna o terceiro td (coluna profissao) da linha atual(row)
            cy.wrap(td).should('contain', valor.toUpperCase()) // verifica se o elemento contem a profissão.
        })

    }

    acessaVizualizarProfissao() {
        cy.get('.btn-sigsaude.btnCorVisualizar').click();
    }

    acessaAlterarProfissao() {
        cy.get('.btn-sigsaude.btnCorEditar').click();
    }

    acessaInativarProfissao() {
        cy.get('.btn-sigsaude.btnCorInativar').click();
    }

    verificaVisualizar(nome, sigla, nivel, conselho) {
        this.acessaVizualizarProfissao();
        cy.get('p').eq(0).contains("Nome: " + nome.toUpperCase()).should('exist');
        cy.get('p').eq(1).contains("Sigla: " + sigla.toUpperCase()).should('exist');
        cy.get('p').eq(2).contains("Nivel Formação: " + nivel.toUpperCase()).should('exist');
        cy.get('p').eq(3).contains("Conselho Profissional: " + conselho.toUpperCase()).should('exist');

    }

    inativaEspecialidade(justificativa) {

        if (justificativa == null) {
            justificativa = ' ';
        }

        this.acessaInativarEspecialidade();
        cy.get('#inputJustificativa').type(justificativa);
        this.botaoInativar();
        this.botaoOk();

    }

    verificaConfirmacaoProfissao() {
        const NovaProfissaoClass = new NovaProfissao();

        NovaProfissaoClass.botaoAvancar();

        NovaProfissaoClass.botaoOk();

    }

    acessaPaginaListarProfissao() {
        cy.fixture('url.json').then((fixture) => {
            cy.visit(fixture.paginas.paginaListarProfissao); // Acessa a página do formulário
            cy.url().should('include', '/sigsaude/profissao')

        })
    }

    preencheNivelFormacao(nivelFormacao) {
        cy.get('#selectNivelFormacao').select(nivelFormacao);
        cy.get('#selectNivelFormacao').contains(nivelFormacao);
    }
}

export default new ListarProfissao();
