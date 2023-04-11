import UserEntity, { Roles } from '../../entities/user.entity';

class UserOutputDto {
  constructor(data: UserOutputDto) {
    Object.assign(this, data);
  }

  public id: number;

  public name: string;

  public lastName: string;

  public email: string;

  public roles: Roles;

  static fromEntity = (entity: UserEntity): UserOutputDto =>
    new UserOutputDto({
      email: entity.email,
      id: entity.id,
      lastName: entity.lastName,
      name: entity.name,
      roles: entity.role,
    });
}

export { UserOutputDto };
