/// <reference path="../index.d.ts" />
import 'react'
import moment from 'moment';

Cypress.Commands.add('typeCharacters', (element: Cypress.Chainable<any>, length: number, allowedCharacters?: string) => {
  let result = '';
  const characters = allowedCharacters && allowedCharacters.length ? allowedCharacters :
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return element.type(result);
});

Cypress.Commands.add('testCharacterLimit', (formControlName: string, characterLimit: number, allowedCharacters?: string, outerSelector?: string) => {
  it(`must have max char length of ${characterLimit}`, () => {
    cy.typeCharacters(cy.formControl(formControlName, 'input', outerSelector).clear(), characterLimit + 1, allowedCharacters);
    cy.formControlError(formControlName).should('exist');
    cy.typeCharacters(cy.formControl(formControlName, 'input', outerSelector).clear(), characterLimit, allowedCharacters);
    cy.formControlError(formControlName).should('not.exist');
    cy.formControl(formControlName, 'input', outerSelector).clear();
  })
});

Cypress.Commands.add('testMinMaxNumberRange', (fieldName: string, min: number, max: number, outerSelector?: string) => {
  cy.formControl(fieldName, 'input', outerSelector).clear().type((min - 1).toString());
  cy.formControlError(fieldName, outerSelector).should('exist');
  cy.formControl(fieldName, 'input', outerSelector).clear().type((max + 1).toString());
  cy.formControlError(fieldName, outerSelector).should('exist');
  cy.formControl(fieldName, 'input', outerSelector).clear();
});

Cypress.Commands.add('testNoDecimals', (fieldName: string, outerSelector?: string) => {
  cy.formControl(fieldName, 'input', outerSelector).clear().type((1.1).toString());
  cy.formControlError(fieldName, outerSelector).should('exist');
  cy.formControl(fieldName, 'input', outerSelector).clear();
});

Cypress.Commands.add('testDateOfBirthMinAge', (fieldName: string, age: number) => {
  cy.formControl(fieldName, 'input').clear().type(moment().subtract(age, 'y').add(1, 'd').format('DDMMYYYY'));
  cy.formControlError(fieldName).should('exist');
  cy.formControl(fieldName, 'input').clear().type(moment().subtract(age, 'y').format('DDMMYYYY'));
  cy.formControlError(fieldName).should('not.exist');
});

Cypress.Commands.add('testDateOfBirthMaxAge', (fieldName: string, age: number) => {
  cy.formControl(fieldName, 'input').clear().type(moment().subtract(age, 'y').subtract(1, 'd').format('DDMMYYYY'));
  cy.formControlError(fieldName).should('exist');
  cy.formControl(fieldName, 'input').clear().type(moment().subtract(age, 'y').add(1, 'd').format('DDMMYYYY'));
  cy.formControlError(fieldName).should('not.exist');
});

Cypress.Commands.add('testDateNotFuture', (fieldName: string) => {
  cy.formControl(fieldName, 'input').clear().type(moment().add(1, 'd').format('DDMMYYYY'));
  cy.formControlError(fieldName).should('exist');
});

Cypress.Commands.add(
  'fill',
  {
    prevSubject: 'element'
  },
  (subject, value) => {
    const element = subject[0]

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )?.set

    const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype,
      'value'
    )?.set

    if (element.tagName.toLowerCase() === 'input') {
      nativeInputValueSetter?.call(element, value)
    } else {
      nativeTextAreaValueSetter?.call(element, value)
    }

    const inputEvent = new Event('input', { bubbles: true })

    element.dispatchEvent(inputEvent)

    Cypress.log({
      name: 'fill',
      message: value,
      $el: subject,
      consoleProps: () => {
        return {
          value
        }
      }
    })
  }
)