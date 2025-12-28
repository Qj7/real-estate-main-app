import { IsString, IsOptional, IsEnum, IsNumber, IsArray, IsObject, IsUUID } from 'class-validator';
import { ObjectType, ObjectStatus, PublishedStatus } from '../../entities/object.entity';

export class CreateObjectDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsObject()
  location?: Record<string, any>;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsEnum(ObjectType)
  type: ObjectType;

  @IsOptional()
  @IsNumber()
  rooms?: number;

  @IsOptional()
  @IsNumber()
  area?: number;

  @IsOptional()
  @IsNumber()
  price_min?: number;

  @IsOptional()
  @IsNumber()
  price_max?: number;

  @IsEnum(ObjectStatus)
  status: ObjectStatus;

  @IsOptional()
  @IsUUID()
  partner_id?: string;

  @IsOptional()
  @IsUUID()
  developer_id?: string;

  @IsOptional()
  @IsString()
  matterport_link?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(PublishedStatus)
  published_status?: PublishedStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

