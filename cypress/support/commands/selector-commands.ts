import 'react'
import { replaceSpacesWithDashes } from '../../../src/helpers/string-helper';
import { GetterHelper } from '../../shared';

Cypress.Commands.add('dataTest', (name: string, options?: GetterHelper.CypressOptions) => {
  return cy.get(GetterHelper.dataTestSelector(name), options);
});

Cypress.Commands.add('selectNth', (selector: string, value: number, options?: GetterHelper.CypressOptions) => {
  if (value <= 1) return cy.get(selector, options).first();

  return cy.get(selector).eq(value - 1);
});

Cypress.Commands.add('formControl', (name: string, innerSelector?: string, outerSelector?: string, options?: GetterHelper.CypressOptions) => {
  const selectorParts: string[] = []
  if (outerSelector) selectorParts.push(outerSelector);
  selectorParts.push(`[data-test="form-control-${replaceSpacesWithDashes(name)}"]`);
  if (innerSelector) selectorParts.push(innerSelector);
  return cy.get(selectorParts.join(' '), options);
});

Cypress.Commands.add('formControlError', (name: string, outerSelector?: string, options?: GetterHelper.CypressOptions) => {
  const selectorParts: string[] = []
  if (outerSelector) selectorParts.push(outerSelector);
  selectorParts.push(`[data-test="form-control-${replaceSpacesWithDashes(name)}"] .form-error-message`);
  return cy.get(selectorParts.join(' '), options);
});

Cypress.Commands.add('name', (name: string, options?: GetterHelper.CypressOptions) => {
  return cy.get(`[name="${name}"]`, options);
});

Cypress.Commands.add('getSubmit', (options?: GetterHelper.CypressOptions) => {
  return cy.get(`[type="submit"]`, options);
});

Cypress.Commands.add('getSuccessToast', (options?: GetterHelper.CypressOptions) => {
  return cy.get(`.react-toast-notifications__toast--success`, options);
});

Cypress.Commands.add('getErrorToast', (options?: GetterHelper.CypressOptions) => {
  return cy.get(`.react-toast-notifications__toast--error`, options);
});

Cypress.Commands.add('clearToast', (options?: GetterHelper.CypressOptions) => {
  return cy.get(`.react-toast-notifications__toast__dismiss-button`, options).click();
});