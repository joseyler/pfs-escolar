import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ciudades')
export class Ciudad {
  @PrimaryColumn({
    generatedIdentity: 'ALWAYS',
    type: 'int',
  })
  private idCiudad: number;

  @Column({
    name: 'nombreCiudad',
    length: 100,
  })
  private nombre: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  private codigoPostal: number;

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
