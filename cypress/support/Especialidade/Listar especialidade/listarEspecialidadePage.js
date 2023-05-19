//import { NovaProfissao } from '../../Profissão/Nova profissão/novaProfissaoPage.js';

export class ListarEspecialidade {

    botaoInativar() {
        cy.get('[class="btn btn-success"]').click(); // Botão inativar
    }

    botaoPesquisar() {
        cy.get('#pesquisarEspecialidade').click(); // Botão avançar
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

        if (coluna == "Denominação") numeroColuna = 0;
        else if (coluna == "Código") numeroColuna = 1;
        else if (coluna == "Profissão") numeroColuna = 2;

        cy.get('#dataTable tbody tr').each((row) => { // seleciona todas as tr (linhas da tabela e faz um iteraçãoem cada linha )
            const td = row.find('td').eq(numeroColuna) //find.eq(2) retorna o terceiro td (coluna profissao) da linha atual(row)
            cy.wrap(td).should('contain', valor.toUpperCase()) // verifica se o elemento contem a profissão.
        })

    }

    acessaVizualizarEspecialidade() {
        cy.get('.btn-sigsaude.btnCorVisualizar').click();
    }

    acessaAlterarEspecialidade() {
        cy.get('.btn-sigsaude.btnCorEditar').click();
    }

    acessaInativarEspecialidade() {
        cy.get('.btn-sigsaude.btnCorInativar').click();
    }

    verificaVizualizar(denominacao, codigo, profissao, descricao) {
        this.acessaVizualizarEspecialidade();
        cy.get('p').eq(0).contains("Denominação: " + denominacao.toUpperCase()).should('exist');
        cy.get('p').eq(1).contains("Profissão: " + profissao.toUpperCase()).should('exist');
        cy.get('p').eq(2).contains("Código: " + codigo.toUpperCase()).should('exist');
        cy.get('p').eq(3).contains("Descrição: " + descricao.toUpperCase()).should('exist');

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

    acessaPaginaListarEspecialidade() {
        cy.fixture('url.json').then((fixture) => {
            cy.visit(fixture.paginas.paginaListarEspecialidade); // Acessa a página do formulário
            cy.url().should('include', '/sigsaude/especialidade')

        })
    }

}

export default new ListarEspecialidade();
