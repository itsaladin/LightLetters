export interface MailDetailsRes {
  mail_details: MailDetails;
  all_reply_mail?: null[] | null;
  client_info: ClientInfo;
  customer_info: CustomerInfo;
}
export interface MailDetails {
  id: number;
  receiver: string;
  sender: string;
  mail_body: string;
  type: string;
  subject: string;
  cc?: null;
  bcc?: null;
  tag?: null;
  group?: null;
  quick_reply?: null;
  remainder?: null;
  deadline?: null;
  read_status?: null;
  mail_file?: null;
  hide_status: string;
  reply_status: string;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
}
export interface ClientInfo {
  name: string;
  profile_picture: string;
}
export interface CustomerInfo {
  first_name: string;
  last_name: string;
  profile_picture: string;
}
