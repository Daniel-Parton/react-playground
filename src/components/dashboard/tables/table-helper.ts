import { uniqueNamesGenerator, animals, starWars } from 'unique-names-generator';

export interface SimpleTableValues {
  id: number
  name: string
  email: string
}

export const generateTableItem = (id: number) => {
  const firstName = uniqueNamesGenerator({ dictionaries: [starWars], separator: '', length: 1, style: 'capital' }).split(' ')[0];
  const surname = uniqueNamesGenerator({ dictionaries: [animals], separator: '', length: 1, style: 'capital' }).split(' ')[0];

  const item: SimpleTableValues = {
    id: id,
    name: `${firstName} ${surname}`,
    email: `${firstName}.${surname}@someemail.com`
  };
  return item;
}

export const generateTableItems = (total: number) => {
  const values: SimpleTableValues[] = [];
  if (total <= 0) return values;

  for (let i = 1; i < total + 1; i++) {
    values.push(generateTableItem(i));
  }
  return values;
}