/// <reference types="cypress"/>
/// <reference path="../../../../support/index.d.ts" />

import { Getters } from '../../../../shared';

const pageGetters = Getters.forms;

describe('Dashboard - Forms', () => {
  it('Browse to forms page', () => cy.visit('http://localhost:3000/dashboard/forms'));

  describe('when testing login form', () => {
    it('browses to forms/login', () => {
      pageGetters.tabs.loginForm().click();
      cy.url().should('eq', 'http://localhost:3000/dashboard/forms/login');
    });

    describe('when testing login form', () => {
      const { loginForm } = pageGetters;

      describe('when submit an invalid form', () => {

        it('should not show success', () => {
          loginForm.email.error().should('be.empty');
          loginForm.password.error().should('be.empty');
          loginForm.submitButton().click();
          cy.getSuccessToast().should('not.exist');
        });

        describe('testing email field', () => {
          it('should have an error', () => {
            loginForm.email.error().should('not.be.empty');
          });

          describe('entering not an email', () => {
            it('should still have an error', () => {
              loginForm.email.input().type('notanemail');
              loginForm.email.error().should('not.be.empty');
              loginForm.email.input().clear().type('123456');
              loginForm.email.error().should('not.be.empty');
            });
          });

          describe('entering a valid email', () => {
            it('should not have an error', () => {
              loginForm.email.input().clear().type('test@test.com');
              loginForm.email.error().should('be.empty');
            });
          });
        });

        describe('testing password field', () => {
          it('should have an error', () => {
            loginForm.password.error().should('not.be.empty');
          });

          describe('entering a password', () => {
            it('should not have an error', () => {
              loginForm.password.input().clear().type('somepassword');
              loginForm.password.error().should('be.empty');
            });
          });
        });

        describe('submitting a valid login form', () => {
          it('should show success toast', () => {
            loginForm.submitButton().click();
            cy.getSuccessToast().should('exist');
            cy.clearToast();
          });
        })
      });
    });
  });

  describe('when testing user registration form', () => {
    it('browses to forms/user-registration', () => {
      pageGetters.tabs.userRegistration().click();
      cy.url().should('eq', 'http://localhost:3000/dashboard/forms/user-registration');
    });
  });
});