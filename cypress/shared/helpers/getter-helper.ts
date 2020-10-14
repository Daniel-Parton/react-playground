import { replaceSpacesWithDashes } from '../../../src/helpers/string-helper';

export interface CypressOptions {
  log?: boolean
  timeout?: number
  withinSubject?: JQuery | HTMLElement | null
  includeShadowDom?: boolean
}
export const dataTestSelector = (name: string) => `[data-test="${replaceSpacesWithDashes(name)}"]`;