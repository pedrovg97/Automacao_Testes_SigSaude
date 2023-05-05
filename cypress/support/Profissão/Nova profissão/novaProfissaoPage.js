//import { profissaoConselhoMap } from '../../../fixtures/Dados/conselhoProfissaoMap.js';

export class NovaProfissao {

    preencheProfissao(profissao) {
        cy.get('[id="selectProfissao"]').then(select => {
            const options = select[0].options;
            for (let i = 0; i < options.length; i++) {
                if (options[i].textContent == profissao.toUpperCase()) {
                    // A opção desejada está presente, então selecione-a
                    cy.get('[id="selectProfissao"]').select(profissao.toUpperCase());
                    return;
                }
            }
            // A opção desejada não está presente, então crie uma nova
            this.acessaNovaProfissao(profissao);
            cy.visit('http://localhost:8080/sigsaude/especialidade/form');
            cy.get('[id="selectProfissao"]').select(profissao.toUpperCase());
        });
    }

    acessaNovaProfissao(nomeProfissao) {

        const nomeProfissaoSemAcento = nomeProfissao.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const sigla = nomeProfissaoSemAcento.slice(0, 3);

        cy.fixture('conselhoProfissaoMap.json').then((fixture) => {
            const conselho = fixture.conselhoProfissaoMap[nomeProfissao];

            cy.visit('http://localhost:8080/sigsaude/profissao/form');

            cy.get('[id="inputNome"]').type(nomeProfissao).should('have.value', nomeProfissao);

            //Seleciona o campo "sigla" e o preenche com os 3 primeiros caracteres do nome da profissão.
            cy.get('[id="inputSigla"]').type(sigla).should('have.value', sigla);

            cy.get('[id="selectNivel"]').select('SUPERIOR')

            //Seleciona o select conselho e busca pelo conselho correspondente a profissão.
            cy.get('[id="selectConselho"]').select(conselho);

            //seleciona o select de ocupação, pesquisa pelo nome da profissão e seleciona o promeiro elemento retornado pela pesquisa. 
            cy.get('div.filter-option-inner-inner').click().then(() => {
                cy.get('[type="search"]').type(nomeProfissao).then(() => {
                    cy.get('[aria-posinset="1"]').click();
                });

            });

            cy.get('[id="nextBtn"]').click();

            //verifica se o que foi preenchido aparece na tela de confirmação dos dados, caso apareçam, cadastra o formulário.
            if (cy.contains("Nome da Profissão: " + nomeProfissao.toUpperCase()).should('exist') && cy.contains("Sigla: " + sigla.toUpperCase()).should('exist') && cy.contains("Conselho Profissional: " + conselho.toUpperCase()).should('exist') && cy.contains("Nivel: " + "SUPERIOR").should('exist')) {
                cy.get('[id="nextBtn"]').click();
            }
        });
    }

}

export default new NovaProfissao();