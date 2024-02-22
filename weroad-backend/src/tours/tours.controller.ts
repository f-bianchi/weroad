import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { EditorGuard } from 'src/roles/roles.guard';
import { ToursService } from './tours.service';
import { TourDto } from './dto/tour.dto';

@Controller()
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  /* ADMIN */
  @UseGuards(AuthGuard, EditorGuard)
  @Get('admin/tours')
  findAll() {
    return this.toursService.findAll();
  }

  @UseGuards(AuthGuard, EditorGuard)
  @Get('admin/tours/:id')
  findOne(@Param('id') id: string) {
    return this.toursService.findOne(id);
  }

  @UseGuards(AuthGuard, EditorGuard)
  @Post('admin/tours')
  create(@Body() dto: TourDto) {
    return this.toursService.create(dto);
  }

  @UseGuards(AuthGuard, EditorGuard)
  @Put('admin/tours/:id')
  update(@Param('id') id: string, @Body() dto: TourDto) {
    return this.toursService.update(id, dto);
  }

  @UseGuards(AuthGuard, EditorGuard)
  @Delete('admin/tours/:id')
  remove(@Param('id') id: string) {
    return this.toursService.remove(id);
  }
}
