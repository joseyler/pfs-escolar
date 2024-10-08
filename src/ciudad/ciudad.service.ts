import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { ICiudad } from './model/ICiudad';
import { CiudadRelOptions } from './model/CiudadRelOptions';

@Injectable()
export class CiudadService {
  private ciudades: Ciudad[] = [];

  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  public async getAll(): Promise<Ciudad[]> {
    const options: FindManyOptions = { relations: ['escuelas'] };
    const ciudades: Ciudad[] = await this.ciudadRepository.find(options);
    return ciudades;
  }

  public async getById(id: number, rel?: CiudadRelOptions): Promise<Ciudad> {
    try {
      const relations = [];
      if (rel) {
        if (rel.includeEscuelas) {
          relations.push('escuelas');
        }
      }
      const options: FindOneOptions = {
        relations,
        where: { idCiudad: id },
      };
      const ciudad: Ciudad = await this.ciudadRepository.findOne(options);
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

  async createCiudad(ciudad: ICiudad): Promise<ICiudad> {
    const ciudadEntity: Ciudad = new Ciudad(
      ciudad.nombreCiudad,
      ciudad.codigoPostal,
    );
    const response: Ciudad = await this.ciudadRepository.save(ciudadEntity);
    return {
      idCiudad: response.idCiudad,
      nombreCiudad: response.nombre,
      codigoPostal: response.codigoPostal,
    };
  }

  async actualizarCiudad(ciudad: ICiudad, idCiudad: number): Promise<ICiudad> {
    const criterio: FindOneOptions<Ciudad> = { where: { idCiudad } };
    const ciudadDb: Ciudad = await this.ciudadRepository.findOne(criterio);
    ciudadDb.setCodigoPostal(ciudad.codigoPostal);
    ciudadDb.setNombre(ciudad.nombreCiudad);
    const response: Ciudad = await this.ciudadRepository.save(ciudadDb);
    return {
      idCiudad: response.idCiudad,
      nombreCiudad: response.nombre,
      codigoPostal: response.codigoPostal,
    };
  }

  async eliminarCiudad(idCiudad: number): Promise<string> {
    try {
      const criterioDelete: FindOptionsWhere<Ciudad> = { idCiudad };
      const response: DeleteResult =
        await this.ciudadRepository.delete(criterioDelete);
      if (response.affected == 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error:
              'Error emliminando ciudad id ' + idCiudad + ' : no se encuentra',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (e) {
      console.log(e);
    }

    return '';
  }
}
