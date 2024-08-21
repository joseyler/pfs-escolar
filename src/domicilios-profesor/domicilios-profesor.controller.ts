import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DomiciliosProfesorService } from './domicilios-profesor.service';

@Controller('domicilios-profesor')
export class DomiciliosProfesorController {
  constructor(private readonly domiciliosProfesorService: DomiciliosProfesorService) {}

 /*  @Post()
  create(@Body() createDomiciliosProfesorDto: CreateDomiciliosProfesorDto) {
    return this.domiciliosProfesorService.create(createDomiciliosProfesorDto);
  }

  @Get()
  findAll() {
    return this.domiciliosProfesorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domiciliosProfesorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomiciliosProfesorDto: UpdateDomiciliosProfesorDto) {
    return this.domiciliosProfesorService.update(+id, updateDomiciliosProfesorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domiciliosProfesorService.remove(+id);
  } */
}
