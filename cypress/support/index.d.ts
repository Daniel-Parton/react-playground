declare namespace Cypress {

  interface CypressOptions {
    log?: boolean
    timeout?: number
    withinSubject?: JQuery | HTMLElement | null
    includeShadowDom?: boolean
  }

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
    dataTest(name: string, options?: Cypress.CypressOptions): Chainable<JQuery<HTMLElement>>
    selectNth(selector: string, value: number, options?: Cypress.CypressOptions): Chainable<Element>
    formControl(name: string, innerSelector?: string, outerSelector?: string, options?: Cypress.CypressOptions): Chainable<JQuery<HTMLElement>>
    formControlError(name: string, outerSelector?: string, options?: Cypress.CypressOptions): Chainable<JQuery<HTMLElement>>
    name(name: string, options?: Cypress.CypressOptions): Chainable<JQuery<HTMLElement>>
    getSubmit(options?: Cypress.CypressOptions): Chainable<JQuery<HTMLElement>>
    getSuccessToast(options?: Cypress.CypressOptions): Chainable<JQuery<HTMLElement>>
    getErrorToast(options?: Cypress.CypressOptions): Chainable<JQuery<HTMLElement>>
    clearToast(options?: Cypress.CypressOptions): Chainable<JQuery<HTMLElement>>
  }
}