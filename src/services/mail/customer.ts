import {CustomerMails} from '../../types/mail/customer-mails';
import {baseUrl} from '../config';

export const getCMails = async (id: any) => {
  try {
    const res = await fetch(baseUrl + `get-customer-mail/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result: CustomerMails = await res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
