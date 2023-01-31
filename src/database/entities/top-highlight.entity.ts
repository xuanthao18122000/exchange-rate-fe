import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TopHighlight {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  public id: number;

  @Column({ type: 'varchar' })
  public highlight_coin: string;

  @Column({ type: 'varchar' })
  public new_listing: string;

  @Column({ type: 'varchar' })
  public top_gainer_coin: string;

  @Column({ type: 'varchar' })
  public top_volume_coin: string;

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updated_at: Date;
}
