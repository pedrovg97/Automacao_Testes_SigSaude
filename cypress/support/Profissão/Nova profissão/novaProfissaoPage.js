import { NovaEspecialidade } from "../../Especialidade/Nova especialidade/novaEspecialidadePage";

export class NovaProfissao {



    preencheProfissao(profissao) {

        const EspecialidadeClass = new NovaEspecialidade();

        cy.get('#selectProfissao').then(select => {
            const options = select[0].options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].textContent == profissao.toUpperCase()) {
                    // A opção desejada está presente, então selecione-a
                    cy.get('#selectProfissao').select(profissao.toUpperCase());
                    return;
                }
            }
            // A opção desejada não está presente, então crie uma nova
            this.criaNovaProfissao(profissao);
            EspecialidadeClass.acessaPaginaEspecialidade();
            cy.get('#selectProfissao').select(profissao.toUpperCase());
        });
    }

    acessaPaginaProfissao() {
        cy.fixture('url.json').then((fixture) => {
            cy.visit(fixture.paginas.paginaNovaProfissao); // Acessa a página do formulário

        })
    }

    criaNovaProfissao(nomeProfissao) {

        const nomeProfissaoSemAcento = nomeProfissao.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const sigla = nomeProfissaoSemAcento.slice(0, 3);

        cy.fixture('conselhoProfissaoMap.json').then((fixture) => {
            const conselho = fixture.conselhoProfissaoMap[nomeProfissao];

            this.acessaPaginaProfissao();

            cy.get('#inputNome').type(nomeProfissao).should('have.value', nomeProfissao);

            //Seleciona o campo "sigla" e o preenche com os 3 primeiros caracteres do nome da profissão.
            cy.get('#inputSigla').type(sigla).should('have.value', sigla);

            cy.get('#selectNivel').select('SUPERIOR')

            //Seleciona o select conselho e busca pelo conselho correspondente a profissão.
            cy.get('#selectConselho').select(conselho);

            //seleciona o select de ocupação, pesquisa pelo nome da profissão e seleciona o promeiro elemento retornado pela pesquisa. 
            cy.get('div.filter-option-inner-inner').click().then(() => {
                cy.get('[type="search"]').type(nomeProfissao).then(() => {
                    cy.get('[aria-posinset="1"]').click();
                });

            });

            cy.get('#nextBtn').click();

            //verifica se o que foi preenchido aparece na tela de confirmação dos dados, caso apareçam, cadastra o formulário.
            if (cy.contains("Nome da Profissão: " + nomeProfissao.toUpperCase()).should('exist') && cy.contains("Sigla: " + sigla.toUpperCase()).should('exist') && cy.contains("Conselho Profissional: " + conselho.toUpperCase()).should('exist') && cy.contains("Nivel: " + "SUPERIOR").should('exist')) {
                cy.get('#nextBtn').click();
            }
        });
    }

}

export default new NovaProfissao();