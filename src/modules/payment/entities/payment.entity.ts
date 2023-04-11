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

interface PaymentEntityConstructor {
  id?: number;
  status: PaymentStatus;
  schedule?: Date;
  value: number;
  payed: number;
  player?: Partial<PlayersEntity>;
}

@Entity({
  schema: PaymentEntity.tableInfo.schema,
  name: PaymentEntity.tableInfo.name,
})
class PaymentEntity {
  constructor(data: PaymentEntityConstructor) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  public status: PaymentStatus;

  @Column({ type: 'timestamp', nullable: true })
  public schedule?: Date;

  @UpdateDateColumn()
  public updatedDate?: Date;

  @CreateDateColumn()
  public createAt?: Date;

  @Column({ type: 'decimal' })
  public value: number;

  @Column({ type: 'decimal', default: 0 })
  public payed: number;

  @ManyToOne(() => PlayersEntity, (player) => player.payment)
  public player: PlayersEntity;

  static readonly tableInfo = {
    name: 'payment',
    schema: tableSchemas.payment,
  };
}
export { PaymentStatus };
export default PaymentEntity;
