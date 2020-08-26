export function assertNoErrorPage() {
  cy.get('#error-page').should('not.exist');
  //Or some over check
}