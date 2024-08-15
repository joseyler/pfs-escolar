import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('estudiantes')
export class Estudiante {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public idEstudiante: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public nombre: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public apellido: string;

  @Column({
    type: 'date',
  })
  public fecha_nacimiento: Date;

  constructor(nombre: string, apellido: string, fecha_nacimiento: Date) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.fecha_nacimiento = fecha_nacimiento;
  }

  public getId(): number {
    return this.idEstudiante;
  }

  public setId(value: number) {
    this.idEstudiante = value;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(value: string) {
    this.nombre = value;
  }

  public getApellido(): string {
    return this.apellido;
  }

  public setApellido(value: string) {
    this.apellido = value;
  }

  public getFechaNacimiento(): Date {
    return this.fecha_nacimiento;
  }

  public setFechaNacimiento(value: Date) {
    this.fecha_nacimiento = value;
  }
}
