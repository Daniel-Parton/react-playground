/// <reference types="cypress"/>
/// <reference path="../../../../support/index.d.ts" />

import { Getters } from '../../../../shared';

const pageGetters = Getters.tabs;

describe('Dashboard - Tabs', () => {
  it('Browse to tab pages', () => cy.visit('http://localhost:3000/dashboard/tabs'));

  describe('when click on Tab 2', () => {
    it('browses to /2', () => {
      pageGetters.tab2().click();
      cy.url().should('eq', 'http://localhost:3000/dashboard/tabs/2');
    });
  });

  describe('when click on Tab 4', () => {
    it('browses to /4/1 as it has netsed tabs', () => {
      pageGetters.tab4.topLevel().click();
      cy.url().should('eq', 'http://localhost:3000/dashboard/tabs/4/1');
    });
  });
});