import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PaginationRequestDto,
  PaginationResponseDto,
} from 'src/utils/paginated-response.dto';
import { Repository } from 'typeorm';
import { TravelDto } from './dto/travel.dto';
import { Travel } from './entities/travel.entity';

@Injectable()
export class TravelsService {
  constructor(
    @InjectRepository(Travel)
    private readonly travelsRepository: Repository<Travel>,
  ) {}

  async create(dto: TravelDto) {
    return await this.saveTravel(dto);
  }

  async findAllPublic(
    dto: PaginationRequestDto,
  ): Promise<PaginationResponseDto<Travel>> {
    const { page, pageSize } = dto;
    const [items, total] = await this.travelsRepository.findAndCount({
      where: { isPublic: true },
      take: pageSize,
      skip: (page - 1) * pageSize,
      relations: {
        tours: true,
      },
    });
    return {
      items,
      total,
    };
  }

  async findOnePublic(slug: string) {
    const travel = await this.travelsRepository.findOne({
      where: { slug, isPublic: true },
      relations: {
        tours: true,
      },
    });
    if (!travel) {
      throw new NotFoundException();
    }
    return travel;
  }

  /* ADMIN */

  async findAll() {
    return await this.travelsRepository.find({
      relations: {
        tours: true,
      },
    });
  }

  async findOne(id: string) {
    const travel = await this.travelsRepository.findOne({
      where: { id },
      relations: {
        tours: true,
      },
    });
    if (!travel) {
      throw new NotFoundException();
    }
    return travel;
  }

  async update(id: string, dto: TravelDto) {
    dto.id = id;
    return await this.saveTravel(dto);
  }

  async remove(id: string) {
    await this.travelsRepository.delete(id);
  }

  private async saveTravel(dto: TravelDto): Promise<Travel> {
    const newTravel = this.travelsRepository.create({
      id: dto.id,
      slug: dto.slug,
      name: dto.name,
      description: dto.description,
      numberOfDays: dto.numberOfDays,
      isPublic: dto.isPublic || false,
      numberOfNights: dto.numberOfDays > 0 ? dto.numberOfDays - 1 : 0,
    });

    return await this.travelsRepository.save(newTravel);
  }
}
