import { tableSchemas } from '../../../database/tableSchemas';
import PlayersEntity from '../../../modules/game/entities/players.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

enum PaymentStatus {
  PAYED,
  PENDING,
  SCHEDULED,
}

@Entity({
  schema: PaymentEntity.tableInfo.schema,
  name: PaymentEntity.tableInfo.name,
})
class PaymentEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  public status: PaymentStatus;

  @UpdateDateColumn()
  public updatedDate?: Date;

  @CreateDateColumn()
  public createAt?: Date;

  @Column({ type: 'decimal' })
  public value: number;

  @Column({ type: 'decimal', default: 0 })
  public payed: number;

  @ManyToOne(() => PlayersEntity, (player) => player.payment)
  player: PlayersEntity;

  static readonly tableInfo = {
    name: 'payment',
    schema: tableSchemas.payment,
  };
}

export default PaymentEntity;
