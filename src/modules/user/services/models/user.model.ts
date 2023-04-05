import { RoleModel } from './role.model';

class UserModel {
  public id: number;

  public name: string;

  public lastName: string;

  public email: string;

  public password: string;

  public isActive: boolean;

  public updatedDate?: Date;

  public createAt?: Date;

  public role: RoleModel;
}

export { UserModel };
