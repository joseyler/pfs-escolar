import { DomiciliosProfesor } from 'src/domicilios-profesor/entities/domicilios-profesor.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profesores')
export class Profesor {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public idProfesor: number;

  @Column({
    name: 'nombreProfesor',
    length: 100,
  })
  public nombreProfesor: string;

  @Column({
    name: 'apellidoProfesor',
    length: 100,
  })
  public apellidoProfesor: string;

  @OneToMany(()=>DomiciliosProfesor, (domiciliosProfesor)=>domiciliosProfesor.profesor)
  @JoinColumn()
  public domicilios:DomiciliosProfesor[]

  constructor(nombreProfesor: string, apellidoProfesor: string) {
    this.nombreProfesor = nombreProfesor;
    this.apellidoProfesor = apellidoProfesor;
  }

  public getIdProfesor(): number {
    return this.idProfesor;
  }

  public getNombreProfesor(): string {
    return this.nombreProfesor;
  }

  public getApellidoProfesor(): string {
    return this.apellidoProfesor;
  }

  public setNombreProfesor(nombreProfesor: string) {
    this.nombreProfesor = nombreProfesor;
  }

  public setApellidoProfesor(apellidoProfesor: string) {
    this.apellidoProfesor = apellidoProfesor;
  }
}
