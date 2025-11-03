import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('partners')
@Index(['slug'], { unique: true })
export class Partner extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  logo_url: string;

  @Column({ type: 'jsonb', default: {} })
  contacts: Record<string, any>;

  @Column({ type: 'jsonb', default: {} })
  showroom_settings: Record<string, any>;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}

