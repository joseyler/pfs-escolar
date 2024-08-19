import { ICiudad } from 'src/ciudad/model/ICiudad';

export interface IEscuela {
  escuelaId: number;
  nombre: string;
  domicilio: string;
  ciudad?: ICiudad;
}
