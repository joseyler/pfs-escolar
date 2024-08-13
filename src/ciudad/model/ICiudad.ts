export interface ICiudad {
  idCiudad?: number;
  nombreCiudad: string;
  codigoPostal: number;
}

export class CiudadDTO {
  readonly nombre: string;
  readonly codigoPostal: number;
}
