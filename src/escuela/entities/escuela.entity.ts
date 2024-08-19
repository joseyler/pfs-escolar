import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Aca represento mi tabla
@Entity('escuelas')
export class Escuela {
  @PrimaryGeneratedColumn('increment')
  public escuelaId: number;

  @Column({
    name: 'nombreEscuela',
    length: 100,
  })
  public nombre: string;

  @Column({
    name: 'domicilio',
    type: 'varchar',
    length: 255,
  })
  public domicilio: string;

  @ManyToOne(() => Ciudad, (ciudad) => ciudad.escuelas)
  @JoinColumn({
    name: 'idCiudad',
    foreignKeyConstraintName: 'FK_ciudadEscuelita',
  })
  public ciudad: Ciudad;

  constructor(nombre: string, domicilio: string) {
    this.nombre = nombre;
    this.domicilio = domicilio;
  }

  public getIdEscuela(): number {
    return this.escuelaId;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string): string {
    return (this.nombre = nombre);
  }

  public getDomicilio(): string {
    return this.domicilio;
  }

  public setDomicilio(domicilio: string): string {
    return (this.domicilio = domicilio);
  }
}
