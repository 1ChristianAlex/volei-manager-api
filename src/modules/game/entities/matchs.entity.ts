import { tableSchemas } from '../../../database/tableSchemas';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import PlayersEntity from './players.entity';
import UserEntity from 'src/modules/user/entities/user.entity';

enum MatchStatus {
  ON_GOING = 1,
  FINISHED,
  CANCEL,
}

interface MatchEntityContructor {
  id?: number;
  title: string;
  status: MatchStatus;
  datetime: Date;
  players?: Partial<PlayersEntity[]>;

  user?: Partial<UserEntity>;
}

@Entity({
  schema: MatchEntity.tableInfo.schema,
  name: MatchEntity.tableInfo.name,
})
class MatchEntity {
  constructor(data: MatchEntityContructor) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'text' })
  public title: string;

  @Column({
    type: 'enum',
    enum: MatchStatus,
    default: MatchStatus.ON_GOING,
  })
  public status: MatchStatus;

  @Column({ type: 'timestamp' })
  public datetime: Date;

  @Column({ type: 'timestamp' })
  public finishDate: Date;

  @Column({ type: 'numeric', nullable: true })
  public valueHour: number;

  @UpdateDateColumn()
  public updatedDate?: Date;

  @CreateDateColumn()
  public createAt?: Date;

  @OneToMany(() => PlayersEntity, (user) => user.match)
  public players: PlayersEntity[];

  @ManyToOne(() => UserEntity, (user) => user.matchs)
  public user: UserEntity;

  static readonly tableInfo = {
    name: 'matchs',
    schema: tableSchemas.game,
  };
}
export { MatchStatus };
export default MatchEntity;
