import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadService } from './ciudad.service';
import { ICiudad } from './model/ICiudad';

@Controller('ciudades')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get('/')
  async getAll(): Promise<Ciudad[]> {
    return this.ciudadService.getAll();
  }
  @Get('/:idCiudad')
  async getById(@Param('idCiudad') id: number): Promise<Ciudad> {
    return this.ciudadService.getById(id);
  }

  @Post('/')
  async createCiudad(@Body() ciudad: ICiudad): Promise<ICiudad> {
    return this.ciudadService.createCiudad(ciudad);
  }

  @Put('/:idCiudad')
  async updateCiudad(
    @Body() ciudad: ICiudad,
    @Param('idCiudad') idCiudad: number,
  ): Promise<ICiudad> {
    return this.ciudadService.actualizarCiudad(ciudad, idCiudad);
  }

  @Delete('/:idCiudad')
  async deleteCiudad(@Param('idCiudad') idCiudad: number): Promise<void> {
    try {
      this.ciudadService.eliminarCiudad(idCiudad);
    } catch (ex) {
      throw new NotFoundException();
    }
  }
}
