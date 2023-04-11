import { MigrationInterface, QueryRunner } from 'typeorm';
import UserEntity, { Roles } from '../../modules/user/entities/user.entity';
import PasswordHash from '../../modules/common/passwordHash/passwordHash.service';

export class userSeed2681221663797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repo = queryRunner.manager.getRepository(UserEntity);

    const admin = new UserEntity({
      email: 'christian@email.com',
      lastName: 'Alexsander',
      name: 'Christian',
      password: await new PasswordHash().genHash('123456789'),
      role: Roles.ADMIN,
    });

    const existAdmin = await repo.exist({ where: { email: admin.email } });

    if (!existAdmin) {
      await queryRunner.manager.save(UserEntity, admin);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.remove(UserEntity);
  }
}
