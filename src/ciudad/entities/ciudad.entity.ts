import { DomiciliosProfesor } from 'src/domicilios-profesor/entities/domicilios-profesor.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ciudades')
export class Ciudad {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  public idCiudad: number;

  @Column({
    name: 'nombreCiudad',
    length: 100,
  })
  public nombre: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  public codigoPostal: number;

  @OneToMany(() => Escuela, (escuela) => escuela.ciudad)
  public escuelas: Escuela[];

  @OneToMany(()=>DomiciliosProfesor, (domiciliosProfesor)=>domiciliosProfesor.ciudad)
  @JoinColumn()
  public domicilios:DomiciliosProfesor[]

  constructor(nombre: string, codigoPostal: number) {
    this.nombre = nombre;
    this.codigoPostal = codigoPostal;
  }

  public getIdCiudad(): number {
    return this.idCiudad;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string) {
    this.nombre = nombre;
  }

  public getCodigoPostal(): number {
    return this.codigoPostal;
  }

  public setCodigoPostal(codigoPostal: number) {
    this.codigoPostal = codigoPostal;
  }
}
