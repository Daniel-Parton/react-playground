declare namespace Cypress {
  interface Chainable {

    pageLandingInit(): void

    //Assert
    assertNoErrorPage(): void

    //Input
    fill(text: string): Cypress.Chainable<JQuery<any>>
    typeCharacters(element: Cypress.Chainable<any>, length: number, allowedCharacters?: string): Cypress.Chainable<JQuery<any>>
    testCharacterLimit(formControlName: string, characterLimit: number, allowedCharacters?: string, outerSelector?: string): void
    testMinMaxNumberRange(fieldName: string, min: number, max: number, outerSelector?: string): void
    testNoDecimals(fieldName: string, outerSelector?: string): void
    testDateOfBirthMinAge(fieldName: string, age: number): void
    testDateOfBirthMaxAge(fieldName: string, age: number): void
    testDateNotFuture(fieldName: string): void

    //Selector
    dataTestSelector(name: string): string
    dataTest(name: string): Chainable<JQuery<HTMLElement>>
    selectNth(selector: string, value: number): Chainable<Element>
    formControl(name: string, innerSelector?: string, outerSelector?: string, timeout?: number): Chainable<JQuery<HTMLElement>>
    formControlError(name: string, outerSelector?: string): Chainable<JQuery<HTMLElement>>
    name(name: string): Chainable<JQuery<HTMLElement>>
  }
}