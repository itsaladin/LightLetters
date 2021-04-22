import {LoginRes} from '../../types/auth/auth';
import {baseUrl} from '../config';

export const signIn = async (email: string, password: string) => {
  try {
    console.log(email, password);

    const url = `${baseUrl}customer-login?email=${email}&password=${password}`;
    // const url = 'https://customer.light-letters.co.uk/api/customers';

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result: LoginRes = await res.json();
    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
  }
};
