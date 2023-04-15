import MatchEntity from '../../../modules/game/entities/matchs.entity';
import PlayersEntity from '../../../modules/game/entities/players.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

interface IUserEntityConstructor {
  name: string;
  lastName: string;
  email: string;
  password: string;

  id?: number;

  role?: Roles;
}

enum Roles {
  ADMIN = 'admin',
  MANAGER = 'manager',
  Coath = 'player',
  PLAYER = 'player',
}

@Entity({
  schema: UserEntity.tableInfo.schema,
  name: UserEntity.tableInfo.name,
})
class UserEntity {
  constructor(entityValue: IUserEntityConstructor) {
    Object.assign(this, entityValue);
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'text' })
  public name: string;

  @Column({ type: 'text' })
  public lastName: string;

  @Column({ type: 'text', unique: true })
  public email: string;

  @Column({ type: 'text' })
  public password: string;

  @Column({ default: true })
  public isActive: boolean;

  @UpdateDateColumn()
  public updatedDate?: Date;

  @CreateDateColumn()
  public createAt?: Date;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.PLAYER,
  })
  role: Roles;

  @OneToMany(() => PlayersEntity, (player) => player.user)
  public players: PlayersEntity[];

  @OneToMany(() => MatchEntity, (match) => match.user)
  public matchs: MatchEntity[];

  static readonly tableInfo = {
    name: 'user',
    schema: 'user',
  };
}

export { Roles };
export default UserEntity;
