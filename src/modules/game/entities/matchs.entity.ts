import { tableSchemas } from '../../../database/tableSchemas';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import PlayersEntity from './players.entity';

enum MatchStatus {
  ON_GOING = 'onGoing',
  CANCEL = 'cancel',
  FINISHED = 'finished',
}

@Entity({
  schema: MatchEntity.tableInfo.schema,
  name: MatchEntity.tableInfo.name,
})
class MatchEntity {
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

  @UpdateDateColumn()
  public updatedDate?: Date;

  @CreateDateColumn()
  public createAt?: Date;

  @OneToMany(() => PlayersEntity, (user) => user.matchs)
  public player: PlayersEntity[];

  static readonly tableInfo = {
    name: 'matchs',
    schema: tableSchemas.game,
  };
}
export { MatchStatus };
export default MatchEntity;
