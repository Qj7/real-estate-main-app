import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectsController } from './objects.controller';
import { ObjectsService } from './objects.service';
import { Property } from '../entities/object.entity';
import { Partner } from '../entities/partner.entity';
import { Developer } from '../entities/developer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Partner, Developer])],
  controllers: [ObjectsController],
  providers: [ObjectsService],
  exports: [ObjectsService],
})
export class ObjectsModule {}

