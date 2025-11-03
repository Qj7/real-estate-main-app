import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('objects')
export class Property extends BaseEntity {
  @Column({ type: 'uuid' })
  id: string;
}

