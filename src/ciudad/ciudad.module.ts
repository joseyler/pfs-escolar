import { Module } from '@nestjs/common';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { DomiciliosProfesor } from 'src/domicilios-profesor/entities/domicilios-profesor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad, Escuela,DomiciliosProfesor])],
  controllers: [CiudadController],
  providers: [CiudadService],
  exports: [CiudadService],
})
export class CiudadModule {}
