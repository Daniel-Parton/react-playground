export type Environment = 'local' | 'Test' | 'Production';

interface LiveTestFixtureOptions {
  enivronment: Environment
}

export default class LiveTestFixture {
  private readonly url: string
  private actions: Array<() => void> = [];

  constructor(options: LiveTestFixtureOptions) {
    this.url = 'http://localhost:3000';
  }

  run() {
    cy.visit(this.url, { timeout: 40000 });
    this.actions.forEach((action) => action());
  }

  happyPath() {
  }
}