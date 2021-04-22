import {ProfileRes} from '../../types/profile/profile';
import {baseUrl} from '../config';

export const getProDetails = async (id: any) => {
  try {
    const res = await fetch(baseUrl + `specific-customer/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result: ProfileRes = await res.json();
    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
  }
};

interface PassResetRes {
  message: string;
}
export const savePassword = async (
  customer_id: number,
  oldPass: number,
  newPass: number,
  cNewPass: number,
) => {
  try {
    console.log(customer_id, newPass, cNewPass, oldPass);
    const url =
      baseUrl +
      `customer-pass-change/${customer_id}
       ?password=${oldPass}&new_password=${newPass}
       &confirm_password=${cNewPass}`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result: PassResetRes = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
