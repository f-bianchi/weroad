import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { EditorGuard } from 'src/roles/roles.guard';
import { PaginationResponseDto } from 'src/utils/paginated-response.dto';
import { TourDto } from './dto/tour.dto';
import { Tour } from './entities/tour.entity';
import { ToursService } from './tours.service';
import { TourFiltersDto } from './dto/tour-filters.dto';

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
  findAll(): Promise<Tour[]> {
    return this.toursService.findAll();
  }

  @UseGuards(AuthGuard, EditorGuard)
  @Get('admin/tours/:id')
  findOne(@Param('id') id: string): Promise<Tour> {
    return this.toursService.findOne(id);
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
  @Delete('admin/tours/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.toursService.remove(id);
  }
}
