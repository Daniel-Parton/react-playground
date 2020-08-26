import { uniqueNamesGenerator, animals, starWars } from 'unique-names-generator';

export const randomFirstName = () => {
  return uniqueNamesGenerator({ dictionaries: [starWars], separator: '', length: 1, style: 'capital' }).split(' ')[0].replace('-', '');
}

export const randomSurname = () => {
  return uniqueNamesGenerator({ dictionaries: [animals], separator: '', length: 1, style: 'capital' }).split(' ')[0].replace('-', '');
}