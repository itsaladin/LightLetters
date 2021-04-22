import {CreateCustomerRes} from '../../types/auth/create-customer';
import {baseUrl} from '../config';

export const signUp = async (
  fName: string,
  lName: string,
  email: string,
  password: string,
  confPassword: string,
) => {
  try {
    const url = `${baseUrl}create-customer?first_name=${fName}&last_name=${lName}&email=${email}&password=${password}&confirm_password=${confPassword}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result: CreateCustomerRes = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
