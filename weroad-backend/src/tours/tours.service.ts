import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Travel } from 'src/travels/entities/travel.entity';
import { Repository } from 'typeorm';
import { TourDto } from './dto/tour.dto';
import { Tour } from './entities/tour.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private readonly toursRepository: Repository<Tour>,
    @InjectRepository(Travel)
    private readonly travelsRepository: Repository<Travel>,
  ) {}

  async create(dto: TourDto) {
    return await this.saveTour(dto);
  }

  async findAll() {
    return await this.toursRepository.find();
  }

  async findOne(id: string) {
    return await this.toursRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, dto: TourDto) {
    dto.id = id;
    return await this.saveTour(dto);
  }

  async remove(id: string) {
    await this.toursRepository.delete(id);
  }

  private async saveTour(dto: TourDto): Promise<Tour> {
    const travel = await this.travelsRepository.findOne({
      where: { id: dto.travelId },
    });
    if (!travel) {
      throw new BadRequestException(`Travel #${dto.travelId} not found`);
    }
    const newTour = this.toursRepository.create({
      id: dto.id,
      name: dto.name,
      startingDate: dto.startingDate,
      endingDate: dto.endingDate,
      price: dto.price,
      travel,
    });
    return await this.toursRepository.save(newTour);
  }
}
