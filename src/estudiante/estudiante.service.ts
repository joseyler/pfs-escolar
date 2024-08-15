import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { IEstudiante } from './model/IEstudiante';
import { Estudiante } from './entities/estudiante.entity';


@Injectable()
export class EstudianteService {
  private estudiantes: Estudiante[] = [];

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) { }

  public async getAll(): Promise<Estudiante[]> {
    const estudiante: Estudiante[] = await this.estudianteRepository.find();
    return estudiante;
  }

  public async getById(id: number): Promise<Estudiante> {
    try {
      const estudiante: Estudiante = await this.estudianteRepository.findOneBy({
        idEstudiante: id,
      });
      if (estudiante) return estudiante
      throw new DOMException('No se encuentra el estudiante');
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda del estudiante ' + id + ' : ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createEstudiante(estudiante: IEstudiante): Promise<IEstudiante> {
    const estudianteEntity: Estudiante = new Estudiante(
      estudiante.nombre,
      estudiante.apellido,
      estudiante.fecha_nacimiento
    );
    const response: Estudiante = await this.estudianteRepository.save(estudianteEntity);
    return {
      idEstudiante: response.idEstudiante,
      nombre: response.nombre,
      apellido: response.apellido,
      fecha_nacimiento: response.fecha_nacimiento
    };
  }

  async actualizarEstudiante(estudiante: IEstudiante, idEstudiante: number): Promise<IEstudiante> {



    const criterioUpdate: FindOptionsWhere<Estudiante> = { idEstudiante };
    const response: UpdateResult = await this.estudianteRepository.update(
      criterioUpdate,
      {
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        fecha_nacimiento: estudiante.fecha_nacimiento,
      },
    );
    if (response.affected == 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error:
            'Error en la busqueda de estudiaente ' + idEstudiante + ' : no se encuentra',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return estudiante;

  }

  async eliminarEstudiante(idEstudiante: number): Promise<string> {
    try {
      const criterioDelete: FindOptionsWhere<Estudiante> = { idEstudiante };
      const response: DeleteResult =
        await this.estudianteRepository.delete(criterioDelete);
      if (response.affected == 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error:
              'Error eliminando estudiante id ' + idEstudiante + ' : no se encuentra',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (e) {
      console.log(e);
    }

    return 'estudiante eliminado';
  }
}
