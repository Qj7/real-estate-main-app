import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('developers')
export class Developer extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  logo_url: string;

  @Column({ type: 'jsonb', default: {} })
  contacts: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
