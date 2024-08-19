import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';
import { IEscuela } from './model/escuela.interface';
import {
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { CiudadService } from 'src/ciudad/ciudad.service';

@Injectable()
export class EscuelaService {
  constructor(
    @InjectRepository(Escuela)
    private readonly escuelaRepository: Repository<Escuela>,
    private ciudadService: CiudadService,
  ) {}

  public async deleteEscuela(id: number): Promise<string> {
    try {
      const criterio: FindOptionsWhere<Escuela> = { escuelaId: id };
      const responseDelete: DeleteResult =
        await this.escuelaRepository.delete(criterio);
      if (responseDelete.affected == 0) {
        throw new DOMException('Error al eliminar la escuela');
      }
      return '';
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error emliminando la escuela id ' + id + ' : no se encuentra',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async uptadeEscuela(escuela: IEscuela, id: number): Promise<IEscuela> {
    try {
      const criterio: FindOptionsWhere<Escuela> = { escuelaId: id };
      const response: UpdateResult = await this.escuelaRepository.update(
        criterio,
        {
          nombre: escuela.nombre,
          domicilio: escuela.domicilio,
        },
      );
      if (response.affected == 0) {
        throw new DOMException('No se pudo actualizar la escuela');
      }
      return escuela;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error:
            'Error en la busqueda de la escuela ' + id + ' : no se encuentra',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async createEscuela(escuela: IEscuela): Promise<IEscuela> {
    try {
      const escuelaEntity: Escuela = new Escuela(
        escuela.nombre,
        escuela.domicilio,
      );
      if (escuela.ciudad.idCiudad) {
        const ciudadEnt = await this.ciudadService.getById(
          escuela.ciudad.idCiudad,
        );
        if (ciudadEnt) {
          escuelaEntity.ciudad = ciudadEnt;
        } else {
          throw new HttpException('No se encuentra ciudad', 400);
        }
      } else {
        throw new HttpException('No se encuentra ciudad', 400);
      }

      const response: Escuela =
        await this.escuelaRepository.save(escuelaEntity);
      return {
        escuelaId: response.escuelaId,
        nombre: response.nombre,
        domicilio: response.domicilio,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error en la creación de la escuela',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getAll() {
    try {
      const escuelas: Escuela[] = await this.escuelaRepository.find();
      if (!escuelas) {
        throw new DOMException('La Escuela no se encuentra');
      }
      return escuelas;
    } catch (error) {
      console.error;
      throw new HttpException(
        'Error al obtener las escuelas',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async getById(id: number): Promise<Escuela> {
    try {
      const escuela: Escuela = await this.escuelaRepository.findOneBy({
        escuelaId: id,
      });
      if (escuela) return escuela;
      throw new DOMException('La escuela no se encuentra');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda de la escuela ' + id + ' : ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
