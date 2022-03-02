/// <reference types="cypress" />

describe('Cypress basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        // const title = cy.title()
        // console.log(title)


        //cy.pause() //pausa
        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo').debug() //entra em modo debugg

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .should('contain', 'Campo')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')

        //cy.title().debug() //lista no console
        //printa no console nome
        cy.title().then(title => {
            console.log(title)
        })

        //printa no console nome
        cy.title().should(title => {
            console.log(title)
        })

        //diferença de should vs then no arquivo test_sync...js

    })

    // it.only executa só a função

    it('Should find and interact with an element', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')

    })
})