/// <reference types="cypress"/>
/// <reference path="../../../../support/index.d.ts" />

import React from 'react';

describe('Dashboard - Tab Pages', () => {
  it('Browse to tab pages', () => cy.visit('http://localhost:3000/dashboard/tabs'));

  describe('when click on Tab 2', () => {
    it('browses to /2', () => {
      cy.selectNth('.nav-link', 2).click();
      cy.url().should('eq', 'http://localhost:3000/dashboard/tabs/2');
    });
  });

  describe('when click on Tab 4', () => {
    it('browses to /4/1 as it has netsed tabs', () => {
      cy.selectNth('.nav-link', 4).click();
      cy.url().should('eq', 'http://localhost:3000/dashboard/tabs/4/1');
    });
  });
});