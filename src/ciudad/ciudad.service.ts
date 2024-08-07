import { Injectable } from '@nestjs/common';
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

  public async getById(id: number): Promise<Ciudad> {
    // const criterio: FindOneOptions = { where: { idCiudad: id } };
    // const ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
    const ciudad: Ciudad = await this.ciudadRepository.findOneById(id);
    if (ciudad) return ciudad;
  }
}
