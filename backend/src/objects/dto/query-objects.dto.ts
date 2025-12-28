import { IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectType, ObjectStatus, PublishedStatus } from '../../entities/object.entity';

export class QueryObjectsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsEnum(ObjectType)
  type?: ObjectType;

  @IsOptional()
  @IsEnum(ObjectStatus)
  status?: ObjectStatus;

  @IsOptional()
  @IsEnum(PublishedStatus)
  published_status?: PublishedStatus = PublishedStatus.PUBLISHED;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  partner_id?: string;
}

