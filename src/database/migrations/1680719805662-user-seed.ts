import { MigrationInterface, QueryRunner } from 'typeorm';
import RolesEntity from '../../modules/user/entities/roles.entity';
import UserEntity from '../../modules/user/entities/user.entity';
import PasswordHash from '../../modules/common/passwordHash/passwordHash.service';

export class userSeed1680719805662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roles = [new RolesEntity('Admin'), new RolesEntity('Player')];

    await queryRunner.manager.save(RolesEntity, roles);

    const roleAdmin = await queryRunner.manager
      .getRepository(RolesEntity)
      .findOneBy({ description: 'Admin' });

    await queryRunner.manager.save(
      UserEntity,
      new UserEntity({
        email: 'christian@email.com',
        lastName: 'Alexsander',
        name: 'Christian',
        password: await new PasswordHash().genHash('123456789'),
        role: roleAdmin,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.remove(UserEntity);
    await queryRunner.manager.remove(RolesEntity);
  }
}
