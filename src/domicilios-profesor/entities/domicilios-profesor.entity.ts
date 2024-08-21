import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity('domicilioProfesor')
export class DomiciliosProfesor{
    @PrimaryGeneratedColumn('increment')
    public idDomicilioProfesor:number;

    @Column({
        name:'domicilio',
        length:200,
    })
    public domicilio:string;

    @ManyToOne(()=> Profesor, (profesor) => profesor.domicilios)
    @JoinColumn()
    public profesor:Profesor;

    @ManyToOne(()=> Ciudad, (ciudad) => ciudad.domicilios)
    @JoinColumn()
    public ciudad:Ciudad;
}