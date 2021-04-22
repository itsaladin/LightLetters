import {MailDetailsRes} from '../../types/mail/mail-details';
import {baseUrl} from '../config';

export const getMDetails = async (id: any) => {
  try {
    const res = await fetch(baseUrl + `get-specific-customer-mail/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result: MailDetailsRes = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
