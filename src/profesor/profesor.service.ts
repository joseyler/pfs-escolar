import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProfesor } from './model/IProfesor';
import { DeleteResult, FindOneOptions, FindOptionsWhere, Repository, UpdateResult, } from 'typeorm';
import { Profesor } from './entities/profesor.entity';

@Injectable()
export class ProfesorService {
  private profesores: Profesor[] = [];

  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>) { }

  public async getAll(): Promise<Profesor[]> {
    const profesores: Profesor[] = await this.profesorRepository.find();
    return profesores;
  }

  public async getById(id: number): Promise<Profesor> {
    try {

      const profesor: Profesor = await this.profesorRepository.findOneBy({
        idProfesor: id,
      });
      if (profesor) {
        return profesor;
      } throw new DOMException('El profesor no se encuentra');
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda del profesor ' + id + ' : ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }


  async createProfesor(profesor: IProfesor): Promise<IProfesor> {
    const profesorEntity: Profesor = new Profesor(
      profesor.nombre,
      profesor.apellido,
    );
    const response: Profesor = await this.profesorRepository.save(profesorEntity);
    return {
      id: response.idProfesor,
      nombre: response.nombreProfesor,
      apellido: response.apellidoProfesor,
    };
  }

  async actualizarProfesor(idProfesor: number, profesor: IProfesor): Promise<IProfesor> {

    const criterio: FindOneOptions<Profesor> = { where: { idProfesor } };
    const profesorDb: Profesor = await this.profesorRepository.findOne(criterio);
    profesorDb.setApellidoProfesor(profesor.apellido);
    profesorDb.setNombreProfesor(profesor.nombre);
    const response: Profesor = await this.profesorRepository.save(profesorDb);
    return {
      id: response.idProfesor,
      nombre: response.nombreProfesor,
      apellido: response.apellidoProfesor,
    };
  }

  async eliminarProfesor(idProfesor: number): Promise<string> {
    try {
      const criterioDelete: FindOptionsWhere<Profesor> = { idProfesor };
      const response: DeleteResult =
        await this.profesorRepository.delete(criterioDelete);
      if (response.affected == 0) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error:
              'Error emliminando el profesor id ' + idProfesor + ' : no se encuentra',
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
