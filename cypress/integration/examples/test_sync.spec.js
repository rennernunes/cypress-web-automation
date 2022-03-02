/// <reference types="cypress" />

describe('Esperas...', () => {
    //hooke
    //before executa uma vez apenas antes de todos os testes
    //beforeEach executa em cada teste
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()//limpa os dados da tela
    })

    it('Deve aguardar elemento estar disponível', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    });

    it('Deve fazer retentativas (retrys)', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            .should('not.exist')
            .should('exist')
    });

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        //item 2 demora ele fica retentando o .get até aparecer
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    });

    //tempo padrão é 4s
    //pode-se alterar o timeout tanto no método não precisa esperar o tempo total e libera o fluxo
    // ou com wait força esperar o tempo total fixo
    //alterando o cypress.json com a propriedade "defaultCommandTimeout": 1000
    it('Uso do timeout', () => {
        cy.get('#buttonDelay').click()
        // cy.get('#novoCampo', { timeout: 1000 }).should('exist')
        // cy.wait(5000)
        cy.get('#novoCampo').should('exist')

        // cy.get('#buttonList').click()
        //cy.get('#lista li span')
        //  .should('have.length', 1)

        //segundo elemento demora para aparecer
        //aguardar até 30s ou liberar antes 
        //com as duas buscas juntas
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span')
            .should('have.length', 1)
        cy.get('#lista li span', { timeout: 30000 })
            .should('have.length', 2)

    });

    it('comando click não possui retentativa', () => {
        //a cada clique adiciona numero 1
        cy.get('#buttonCount')
            .click() //11
            .click() //111
            .should('have.value', '111')

    });

    // should fica executando e printando / faz a busca em seguida as verificações
    // then só print quando encontra o elemento/aguarda o .get ser finalizado para ser executado
    //$el convenção para o elemento
    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span').then($el => {
            //.should('have.length', 1)
            //ecpect mesma coisa so que em notação diferente (test_asserts)
            console.log($el)
            expect($el).to.have.length(1)

        }).and('have.id', 'buttonListDOM')//quando possui # indica próprio id
    });
})