import { Controller, Get } from '@nestjs/common';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadService } from './ciudad.service';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get('/getAll')
  async getAll(): Promise<Ciudad[]> {
    console.log('hello');

    return this.ciudadService.getAll();
  }
  @Get('/getById')
  async getById(): Promise<Ciudad> {
    console.log('hello');

    return this.ciudadService.getById(1);
  }
}
