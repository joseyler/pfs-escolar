import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { IProfesor } from './model/IProfesor';
import { Profesor } from './entities/profesor.entity';

@Controller('profesores')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Get('/')
  async getAll(): Promise<Profesor[]> {
    return this.profesorService.getAll();
  }

  @Get('/:idProfesor')
  async getById(@Param('idProfesor') id: number): Promise<Profesor> {
    return this.profesorService.getById(id);
  }

  @Post('/')
  async createProfesor(@Body() profesor: IProfesor): Promise<IProfesor> {
    return this.profesorService.createProfesor(profesor);
  }


  @Put('/:idProfesor')
  async actualizarProfesor(@Param('idProfesor') idProfesor: number, @Body() profesor: IProfesor):Promise<IProfesor> {
    return this.profesorService.actualizarProfesor(idProfesor, profesor);
  }

  @Delete('/:idProfesor')
  async eliminarProfesor(@Param('idProfesor') idProfesor: number):Promise<void> {
    try {
      this.profesorService.eliminarProfesor(idProfesor);
    } catch(ex) {
      throw new NotFoundException();
    }
  }
}
