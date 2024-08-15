import { Controller, Get, Post, Body,Put, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { IEstudiante } from './model/IEstudiante';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly EstudianteService: EstudianteService) {}
  @Get('/')
  async getAll(): Promise<IEstudiante[]> {
    return this.EstudianteService.getAll();
  }
  @Get('/:idEstudiante')
  async getById(@Param('idEstudiante') id: number): Promise<IEstudiante> {
    return this.EstudianteService.getById(id);
  }
  @Post('/')
  async createEstudiante(@Body() estudiante: IEstudiante): Promise<IEstudiante> {
    return this.EstudianteService.createEstudiante(estudiante);
  }
  @Put('/:idEstudiante')
  async updateEstudiante(
    @Body() estudiante: IEstudiante,
    @Param('idEstudiante') idEstudiante: number,
  ): Promise<IEstudiante> {
    return this.EstudianteService.actualizarEstudiante(estudiante, idEstudiante);
  }
  @Delete('/:idEstudiante')
  async deleteEstudiante(@Param('idEstudiante') idEstudiante: number): Promise<void> {
    try {
      this.EstudianteService.eliminarEstudiante(idEstudiante);
    } catch (ex) {
      throw new NotFoundException();
    }
  }
}
