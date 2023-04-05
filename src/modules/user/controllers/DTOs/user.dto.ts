import UserEntity from '../../entities/user.entity';

class UserOutputDto {
  constructor(data: UserOutputDto) {
    Object.assign(this, data);
  }

  public id: number;

  public name: string;

  public lastName: string;

  public email: string;

  public roleId: number;

  static fromEntity = (entity: UserEntity): UserOutputDto =>
    new UserOutputDto({
      email: entity.email,
      id: entity.id,
      lastName: entity.lastName,
      name: entity.name,
      roleId: entity.role.id,
    });
}

export { UserOutputDto };
