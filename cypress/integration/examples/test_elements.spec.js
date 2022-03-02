/// <reference types="cypress" />

describe('Work with basic elements', () => {
    //hooke
    //before executa uma vez apenas antes de todos os testes
    //beforeEach executa em cada teste
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()//limpa os dados da tela
    })

    it('Text', () => {
        // cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    // it.only
    it('Links', () => {
        // cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })

    it('TextFields', () => {
        // cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 'Cypress Test')

        //para não interpretar caractere especial ":" é só colocar "\" ou "\\"
        cy.get('#elementosForm\\:sugestoes')
            .type('textArea')
            .should('have.value', 'textArea')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6)')
            .type('Teste Campo')

        cy.get('[data-cy=dataSobrenome]')
            .type('Teste12345{backspace}')
            .should('have.value', 'Teste1234')

        //para não interpretar caractere especial ":" é só colocar "\" ou "\\"
        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}acerto', { delay: 100 })
            .should('have.value', 'acerto')
    })

    it('Radio Button', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.get('#formSexoMasc')
            .should('not.be.checked')

        cy.get("[name=formSexo]").should('have.length', 2)

    });

    it('Checkbox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get('[name=formComidaFavorita]')
            .click({ multiple: true })
            .should('be.checked')

    });

    it('Combobox', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')

        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value', '1graucomp')

        //TODO Validar opções do combo múltiplo
    });

    //combo via array manda o value do elemento
    it('Combo multiplo', () => {
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada'])
        //TODO Validar opções selecionadas do combo múltiplo
    });


})