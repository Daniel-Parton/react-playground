import moment from 'moment';
import { getFormControlByDataTestName, getFormControlError } from './getter-helper';

//Helper actions
export const enterChars = (cypressElement: Cypress.Chainable<any>, length: number, allowedCharacters?: string) => {
  let result = '';
  const characters = allowedCharacters && allowedCharacters.length ? allowedCharacters :
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return cypressElement.type(result);
}

export const testCharacterLimit = (formControlName: string, characterLimit: number, allowedCharacters?: string, outerSelector?: string) => {
  it(`must have max char length of ${characterLimit}`, () => {
    enterChars(getFormControlByDataTestName(formControlName, 'input', outerSelector).clear(), characterLimit + 1, allowedCharacters);
    getFormControlError(formControlName).should('exist');
    enterChars(getFormControlByDataTestName(formControlName, 'input', outerSelector).clear(), characterLimit, allowedCharacters);
    getFormControlError(formControlName).should('not.exist');
    getFormControlByDataTestName(formControlName, 'input', outerSelector).clear();
  })
}

export const testMinMaxNumberRange = (fieldName: string, min: number, max: number, outerSelector?: string) => {
  getFormControlByDataTestName(fieldName, 'input', outerSelector).clear().type((min - 1).toString());
  getFormControlError(fieldName, outerSelector).should('exist');
  getFormControlByDataTestName(fieldName, 'input', outerSelector).clear().type((max + 1).toString());
  getFormControlError(fieldName, outerSelector).should('exist');
  getFormControlByDataTestName(fieldName, 'input', outerSelector).clear();
}

export const testNoDecimals = (fieldName: string, outerSelector?: string) => {
  getFormControlByDataTestName(fieldName, 'input', outerSelector).clear().type((1.1).toString());
  getFormControlError(fieldName, outerSelector).should('exist');
  getFormControlByDataTestName(fieldName, 'input', outerSelector).clear();
}

export const testDateOfBirthMinAge = (fieldName: string, age: number) => {
  getFormControlByDataTestName(fieldName, 'input').clear().type(moment().subtract(age, 'y').add(1, 'd').format('DDMMYYYY'));
  getFormControlError(fieldName).should('exist');
  getFormControlByDataTestName(fieldName, 'input').clear().type(moment().subtract(age, 'y').format('DDMMYYYY'));
  getFormControlError(fieldName).should('not.exist');
}

export const testDateOfBirthMaxAge = (fieldName: string, age: number) => {
  getFormControlByDataTestName(fieldName, 'input').clear().type(moment().subtract(age, 'y').subtract(1, 'd').format('DDMMYYYY'));
  getFormControlError(fieldName).should('exist');
  getFormControlByDataTestName(fieldName, 'input').clear().type(moment().subtract(age, 'y').add(1, 'd').format('DDMMYYYY'));
  getFormControlError(fieldName).should('not.exist');
}

export const testDateNotFuture = (fieldName: string) => {
  getFormControlByDataTestName(fieldName, 'input').clear().type(moment().add(1, 'd').format('DDMMYYYY'));
  getFormControlError(fieldName).should('exist');
}