export interface CreateCustomerRes {
  customer_info: CustomerInfo;
  session?: null;
}
export interface CustomerInfo {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  status: string;
  updated_at: string;
  created_at: string;
  id: number;
}
