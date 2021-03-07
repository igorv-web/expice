import { IUser } from "../interfaces/user.interface";

export class User implements IUser {
  constructor(
    public readonly uid: string,
    public readonly email: string,
    public orders: Array<any> = []
  ){}
}