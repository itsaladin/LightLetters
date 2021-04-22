import {baseUrl} from '../config';

export const replayMail = async (
  direct_mail_id: number,
  mail_body: string,
  mail_file: string,
) => {
  try {
    console.log(direct_mail_id, mail_body, mail_file);

    const url = `${baseUrl}reply-mail-to-client/`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        direct_mail_id: direct_mail_id,
        mail_body: mail_body,
        mail_file: mail_file,
      }),
    });
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
