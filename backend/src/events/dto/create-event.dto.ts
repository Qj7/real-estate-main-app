import { IsEnum, IsOptional, IsString, IsUUID, IsNumber, IsObject } from 'class-validator';
import { EventType } from '../../entities/event.entity';

export class CreateEventDto {
  @IsEnum(EventType)
  event: EventType;

  @IsOptional()
  @IsUUID()
  object_id?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  campaign?: string;

  @IsOptional()
  @IsString()
  session_id?: string;

  @IsOptional()
  @IsNumber()
  duration_ms?: number;

  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

