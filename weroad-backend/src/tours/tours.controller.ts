import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { EditorGuard } from '../roles/roles.guard';
import { PaginationResponseDto } from '../utils/paginated-response.dto';
import { TourFiltersDto } from './dto/tour-filters.dto';
import { TourDto } from './dto/tour.dto';
import { Tour } from './entities/tour.entity';
import { ToursService } from './tours.service';
import { ToursQueryDto } from './dto/tours-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tours')
@Controller()
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get('travels/:slug/tours')
  findTours(
    @Param('slug') slug: string,
    @Query() queryDto: TourFiltersDto,
  ): Promise<PaginationResponseDto<Tour>> {
    return this.toursService.findTravelTours(slug, queryDto);
  }

  /* ADMIN */
  @UseGuards(AuthGuard, EditorGuard)
  @Get('admin/tours')
  findAll(@Query() queryDto: ToursQueryDto): Promise<PaginationResponseDto<Tour>> {
    return this.toursService.findAll(queryDto);
  }

  @UseGuards(AuthGuard, EditorGuard)
  @Get('admin/tours/:id')
  async findOne(@Param('id') id: string): Promise<Tour> {
    const tour = await this.toursService.findOneById(id);
    if (!tour) {
      throw new NotFoundException();
    }
    return tour;
  }

  @UseGuards(AuthGuard, EditorGuard)
  @Post('admin/tours')
  create(@Body() dto: TourDto): Promise<Tour> {
    return this.toursService.create(dto);
  }

  @UseGuards(AuthGuard, EditorGuard)
  @Put('admin/tours/:id')
  update(@Param('id') id: string, @Body() dto: TourDto): Promise<Tour> {
    return this.toursService.update(id, dto);
  }

  @UseGuards(AuthGuard, EditorGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('admin/tours/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.toursService.remove(id);
  }
}
