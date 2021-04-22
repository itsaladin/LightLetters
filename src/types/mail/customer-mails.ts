export interface CustomerMails {
  all_mail?: AllMailEntity[] | null;
  customer_Info: CustomerInfo;
  directMail_Count: number;
}
export interface AllMailEntity {
  name: string;
  profile_picture: string;
  id: number;
  receiver: string;
  sender: string;
  mail_body: string;
  type: string;
  bcc?: null;
  tag?: null;
  group?: number | null;
  subject: string;
  quick_reply?: null;
  remainder?: null;
  deadline?: string | null;
  read_status?: null;
  mail_file?: string | null;
  hide_status?: string | null;
  reply_status?: string | null;
  created_at: string;
}
export interface CustomerInfo {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_picture: string;
  id_type: string;
  nid: string;
  ra_type: string;
  ra_file: string;
  phone?: null;
  status: string;
  comment: string;
  group?: null;
  tag?: null;
  road?: null;
  house?: null;
  city?: null;
  zip?: null;
  country?: null;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
}
