import { NovaEspecialidade } from "../../Especialidade/Nova especialidade/novaEspecialidadePage";

export class NovaProfissao {


    botaoAvancar() {
        cy.get('#nextBtn').click(); // Botão avançar
    }

    botaoOk() {
        cy.get('button.swal-button.swal-button--confirm').click();
    }

    verificaErroNomeProfissaoAparece() {
        cy.get('#erroNome').should('be.visible'); // Verifica se a mensagem de erro é exibida
    }

    verificaErroSiglaAparece() {
        cy.get('#erroSigla').should('be.visible'); // Verifica se a mensagem de erro é exibida
    }

    verificaErroNivelFormacaoAparece() {
        cy.get('#erroNivel').should('be.visible'); // Verifica se a mensagem de erro é exibida
    }

    verificaErroConselhoProfissionalAparece() {
        cy.get('#erroConselho').should('be.visible'); // Verifica se a mensagem de erro é exibida
    }

    preencheNomeDaProfissaoMenorQue60(nomeValido) {
        cy.get('#inputNome').clear();
        cy.get('#inputNome').type(nomeValido) // Preenche o nome com uma string <= 60
    }

    preencheNomeDaProfissaoMaiorQue60(nomeInvalido, nomeInvalidoValido) {
        cy.get('#inputNome').type(nomeInvalido).should('have.value', nomeInvalidoValido) // Preenche o nome com uma string > 60
    }

    preencheSiglaMenorQue3(siglaValida) {
        cy.get('#inputSigla').type(siglaValida) // Preenche sigla com uma string <=3
    }

    preencheSiglaMaiorQue3(siglaInvalida, siglaInvalidaValida) {
        cy.get('#inputSigla').type(siglaInvalida).should('have.value', siglaInvalidaValida) // Preenche sigla com uma string > 3
    }

    sorteiaElemento(minIndex, maxIndex) {
        const randomIndex = Cypress._.random(minIndex, maxIndex); // Gera um número aleatório entre minIndex e maxIndex
        return randomIndex.toString();
    }

    preencheNivelFormacao() {

        const randomIndex = this.sorteiaElemento(1, 2);
        let nivel;
        if (randomIndex == 1) {
            nivel = "TÉCNICO";
        }
        else {
            nivel = "SUPERIOR";
        }
        cy.get('#selectNivel').select(nivel);
        cy.get('#selectNivel').contains(nivel);

    }

    preencheConselhoProfissional(outro) {
        if (outro == null) {
            cy.get('#selectConselho').then(($select) => {
                const optionsCount = $select.find('option').length;
                const randomIndex = this.sorteiaElemento(1, optionsCount - 2);


                // Selecione a opção pelo índice variável
                cy.get('#selectConselho').find('option').eq(randomIndex).then(($option) => {
                    const optionText = $option.text();
                    cy.get('#selectConselho').select(optionText);
                    cy.get('#selectConselho').contains(optionText);

                });


                cy.get('#inputOutroConselhoProfissao').should('not.be.visible');

            });
        }
        else {
            cy.get('#selectConselho').select("OUTRO");
            cy.get('#selectConselho').should('have.value', "OUTRO");
            cy.get('#inputOutroConselhoProfissao').should('be.visible');
            cy.get('#inputOutroConselhoProfissao').type("Outro Conselho").should('have.value', 'Outro Conselho');

        }
    }

    preencheOcupacao(ocupacao) {
        cy.get('[data-id="selectOcupacao"]').click();
        if (ocupacao == "todas") {
            cy.get('.actions-btn.bs-select-all.btn.btn-light').click(); //"botão selecionar todas"
            cy.get('#bs-select-1 > ul > li').should('have.class', 'selected'); // verifica se todos foram selecionados
        }
        else if (ocupacao == "nenhuma") {
            cy.get('.actions-btn.bs-select-all.btn.btn-light').click(); //"botão selecionar todas"
            cy.get('.actions-btn.bs-deselect-all.btn.btn-light').click(); //"botão deselecionar todas"
            cy.get('#bs-select-1 > ul > li').should('not.have.class', 'selected'); // verifica se nenhuma foram selecionados
        }
        else {
            cy.get('.bs-searchbox').type(ocupacao);
            cy.get('#bs-select-1 > ul').contains(ocupacao).click();
            cy.get('#bs-select-1 > ul').contains(ocupacao).should('have.class', 'selected');
        }
        cy.get('[data-id="selectOcupacao"]').click();

    }

    gerarSiglaAleatoria() {
        var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var stringAleatoria = '';
        
        for (var i = 0; i < 3; i++) {
          var indiceAleatorio = Math.floor(Math.random() * caracteres.length);
          stringAleatoria += caracteres.charAt(indiceAleatorio);
        }
        
        return stringAleatoria;
      }

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
            EspecialidadeClass.acessaPaginaNovaEspecialidade();
            cy.get('#selectProfissao').select(profissao.toUpperCase());
        });
    }

    verificaConfirmacaoProfissao(nome, sigla) {

        if (cy.contains("Nome da Profissão: " + nome.toUpperCase()).should('exist') && cy.contains("Sigla: " + sigla.toUpperCase()).should('exist') && cy.contains("Nivel: ").should('exist') && cy.contains("Ocupações Selecionadas: ").should('exist')) {
            this.botaoAvancar();
            this.botaoOk();
        }
    }

    acessaPaginaProfissao() {
        cy.fixture('url.json').then((fixture) => {
            cy.visit(fixture.paginas.paginaNovaProfissao); // Acessa a página do formulário
            cy.url().should('include', '/sigsaude/profissao/form')

        })
    }

    criaSigla(nomeProfissao) {
        const nomeProfissaoSemAcento = nomeProfissao.normalize("NFD").replace(/[\u0300-\u036f]/g, "");//tira os acentos da string
        const sigla = nomeProfissaoSemAcento.slice(0, 3);//retira os 3 primeiros caracteres da string
        return sigla;
    }

    criaNovaProfissao(nomeProfissao) {


        const sigla = this.criaSigla(nomeProfissao);

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