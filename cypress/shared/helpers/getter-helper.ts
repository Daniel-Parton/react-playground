import { replaceSpacesWithDashes } from '../../../src/helpers/string-helper';

export const getDataTestSelector = (name: string) => `[data-test="${replaceSpacesWithDashes(name)}"]`;
export const getByDataTestName = (name: string) => cy.get(getDataTestSelector(name));

export const getFormControlByDataTestName = (name: string, innerSelector?: string, outerSelector?: string, timeout?: number) => {
  const selectorParts: string[] = []
  if (outerSelector) selectorParts.push(outerSelector);
  selectorParts.push(`[data-test="form-control-${replaceSpacesWithDashes(name)}"]`);
  if (innerSelector) selectorParts.push(innerSelector);
  return cy.get(selectorParts.join(' '), { timeout });
}

export const getFormControlError = (name: string, outerSelector?: string) => {
  const selectorParts: string[] = []
  if (outerSelector) selectorParts.push(outerSelector);
  selectorParts.push(`[data-test="form-control-${replaceSpacesWithDashes(name)}"] .form__error-message`);
  return cy.get(selectorParts.join(' '));
}

export const getByName = (name: string) => cy.get(`[name="${name}"]`);