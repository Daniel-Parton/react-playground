/// <reference types="cypress"/>
/// <reference path="../../../../support/index.d.ts" />

describe('Dashboard - Forms', () => {
  it('Browse to forms page', () => cy.visit('http://localhost:3000/dashboard/forms'));

  describe('when testing login form', () => {
    it('browses to forms/login', () => {
      cy.selectNth('.nav-link', 1).click();
      cy.url().should('eq', 'http://localhost:3000/dashboard/forms/login');
    });

    // it('browses to forms/login', () => {
    //   cy.selectNth('.nav-link', 2).click();
    //   cy.url().should('eq', 'http://localhost:3000/dashboard/forms/user-registration');
    // });
  });
});