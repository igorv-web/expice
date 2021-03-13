export interface IUser {
  uid: string;
  email: string;
  name?: string;
  phone?: string;
  orders?: Array<any>;
}