import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from '../entities/partner.entity';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private partnersRepository: Repository<Partner>,
  ) {}

  async findAll(): Promise<Partner[]> {
    return await this.partnersRepository.find({
      where: { is_active: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Partner> {
    const partner = await this.partnersRepository.findOne({ where: { id } });
    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    return partner;
  }

  async findBySlug(slug: string): Promise<Partner> {
    const partner = await this.partnersRepository.findOne({ where: { slug } });
    if (!partner) {
      throw new NotFoundException(`Partner with slug ${slug} not found`);
    }
    return partner;
  }
}

