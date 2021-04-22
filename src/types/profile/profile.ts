export interface ProfileRes {
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
  comment?: null;
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
