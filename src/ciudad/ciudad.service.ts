import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';

@Injectable()
export class CiudadService {
  private ciudades: Ciudad[] = [];

  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  public async getAll(): Promise<Ciudad[]> {
    const ciudades: Ciudad[] = await this.ciudadRepository.find();
    return ciudades;
  }

  public async getById(id: string): Promise<Ciudad> {
    try {
      // const criterio: FindOneOptions = { where: { idCiudad: id } };
      // const ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
      const ciudad: Ciudad = await this.ciudadRepository.findOneById(id);
      if (ciudad) return ciudad;
      throw new DOMException('La ciudad no se encuentra');
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda de ciudad ' + id + ' : ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
