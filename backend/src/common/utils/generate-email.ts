import { transliterate } from './transliterate';

export const generateCorporateEmail = (
  firstName: string,
  lastName: string,
  domain: string = 'sports-fit.ru',
): string => {
  const normalizedFirstName = transliterate(firstName);
  const normalizedLastName = transliterate(lastName);

  return `${normalizedFirstName}.${normalizedLastName}@${domain}`.toLowerCase();
};

/**
 * Если почта уже существует, добавляет суффикс
 */
export const generateUniqueCorporateEmail = async (
  firstName: string,
  lastName: string,
  checkExists: (email: string) => Promise<boolean>,
): Promise<string> => {
  const domain = 'sports-fit.ru';
  // eslint-disable-next-line prefer-const
  let baseEmail = generateCorporateEmail(firstName, lastName, domain);
  let finalEmail = baseEmail;
  let counter = 1;

  while (await checkExists(finalEmail)) {
    const namePart = baseEmail.split('@')[0];
    finalEmail = `${namePart}${counter}@${domain}`;
    counter++;
  }

  return finalEmail;
};
