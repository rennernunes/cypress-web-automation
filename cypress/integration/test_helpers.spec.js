/// <reference types="cypress" />

describe('Helpers', () => {
    it('Wrap', () => {
        const obj = { nome: 'User', idade: 20 }
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#formName').then($el => {
            cy.wrap($el).type('funciona via cypress')
        })
    });
});